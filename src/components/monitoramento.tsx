import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Bell, ClipboardList, LineChart, Stethoscope, ArrowUpRight, ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, useCarousel, type CarouselApi } from "@/components/ui/carousel";
import { whatsappMonitoramentoUrl, whatsappUrl } from "@/lib/whatsapp";

const steps = [
  { n: "01", title: "Consulta inicial", text: "Avaliação completa do seu risco cardiovascular e definição do seu plano de cuidado." },
  { n: "02", title: "Você no aplicativo", text: "Receba lembretes para aferir a pressão e registre suas medidas em poucos toques." },
  { n: "03", title: "Sua médica acompanhando", text: "A Dra. Aline acompanha seus registros e orienta ajustes no tratamento, sem esperar a próxima consulta." },
];
const features = [
  { icon: Bell, title: "Lembretes de aferição", text: "Alertas no horário certo para você não esquecer de medir a pressão." },
  { icon: ClipboardList, title: "Registro na palma da mão", text: "Suas medidas organizadas em um só lugar, prontas para a consulta." },
  { icon: LineChart, title: "Evolução visível", text: "Acompanhe como sua pressão se comporta ao longo das semanas." },
  { icon: Stethoscope, title: "Sua médica por perto", text: "A Dra. Aline acompanha seus dados e orienta os próximos passos." },
];
const creamButton = "h-auto min-h-11 whitespace-normal rounded-full bg-background px-6 py-3 text-[15px] font-semibold text-primary hover:bg-secondary shadow-none";
const arrowButton = "h-11 w-11 shrink-0 rounded-full border border-ink-foreground/30 bg-transparent text-ink-foreground shadow-none hover:bg-ink-foreground/10 hover:text-ink-foreground disabled:opacity-35";

export function MonitoringPhone() {
  return (
    <div className="monitor-phone" role="img" aria-label="Exemplo ilustrativo do aplicativo Monitoramento 360°: lembrete de pressão, última medida, evolução semanal e acompanhamento da Dra. Aline">
      <div className="monitor-screen">
        <div className="monitor-speaker" />
        <div className="pb-5 pt-3">
          <p className="text-sm text-muted-foreground">Olá, Maria</p>
          <p className="mt-1 font-display text-xl text-primary">Monitoramento 360°</p>
        </div>
        <div className="rounded-lg bg-primary p-4 text-primary-foreground">
          <Bell size={20} strokeWidth={1.5} aria-hidden />
          <p className="mt-2 text-sm font-semibold">Hora de medir sua pressão · 08:00</p>
          <span className="mt-3 inline-flex min-h-11 items-center rounded-full bg-background px-5 text-sm font-semibold text-primary">Registrar</span>
        </div>
        <div className="mt-3 rounded-lg border border-border p-4">
          <p className="text-sm text-muted-foreground">Última medida</p>
          <p className="mt-1 font-display text-4xl text-foreground">12/8 <span className="font-sans text-sm text-muted-foreground">mmHg</span></p>
          <p className="mt-1 text-xs text-muted-foreground">Hoje, 08:05</p>
        </div>
        <div className="py-4">
          <p className="mb-3 text-xs font-semibold text-muted-foreground">Sua semana</p>
          <div className="monitor-chart" aria-hidden="true">
            {["S", "T", "Q", "Q", "S", "S", "D"].map((day, i) => <div key={i} className="monitor-chart-column"><span className={`monitor-bar monitor-bar-${i}`} /><span className="text-xs text-muted-foreground">{day}</span></div>)}
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg bg-secondary p-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary font-display text-sm text-primary-foreground">AM</span>
          <p className="text-xs leading-relaxed text-foreground">Dra. Aline acompanhou seus registros desta semana</p>
        </div>
      </div>
    </div>
  );
}

function FeatureCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [playing, setPlaying] = React.useState(true);
  const autoplayRef = React.useRef<ReturnType<typeof Autoplay> | null>(null);
  if (!autoplayRef.current) autoplayRef.current = Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true });
  const autoplay = autoplayRef.current;

  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
      setCount(api.scrollSnapList().length);
    };
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  React.useEffect(() => {
    if (!api) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      api.plugins().autoplay.stop();
      setPlaying(false);
    }
    const onPlay = () => setPlaying(true);
    const onStop = () => setPlaying(false);
    api.on("autoplay:play", onPlay);
    api.on("autoplay:stop", onStop);
    return () => {
      api.off("autoplay:play", onPlay);
      api.off("autoplay:stop", onStop);
    };
  }, [api]);

  const toggleAutoplay = () => {
    const auto = api?.plugins().autoplay;
    if (!auto) return;
    if (auto.isPlaying()) auto.stop();
    else auto.play();
  };

  return (
    <Carousel
      setApi={setApi}
      plugins={[autoplay]}
      opts={{ align: "start", containScroll: "trimSnaps" }}
      aria-label="Recursos do Monitoramento 360°"
    >
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
        <h3 className="text-3xl">O que o Monitoramento 360° oferece</h3>
        <div className="ms-auto flex items-center gap-2">
          <CarouselPreviousArrow />
          <CarouselNextArrow />
          <Button type="button" variant="ghost" size="icon" className={arrowButton} onClick={toggleAutoplay} aria-pressed={playing} aria-label={playing ? "Pausar a passagem automática dos itens" : "Continuar a passagem automática dos itens"}>
            {playing ? <Pause aria-hidden /> : <Play aria-hidden />}
          </Button>
        </div>
      </div>

      <CarouselContent className="mt-8">
          {features.map(({ icon: Icon, title, text }, i) => (
            <CarouselItem key={title} className="basis-full sm:basis-1/2 lg:basis-1/3" aria-label={`Recurso ${i + 1} de ${features.length}`}>
              <div className="h-full rounded-[14px] border border-ink-foreground/15 p-6">
                <Icon className="text-blush" size={28} strokeWidth={1.5} aria-hidden />
                <h4 className="mt-4 font-display text-2xl">{title}</h4>
                <p className="mt-3 leading-relaxed text-ink-foreground/85">{text}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <p className="sr-only" aria-live="polite">
          {count > 0 ? `Recurso ${current + 1} de ${count}` : ""}
        </p>
        {count > 1 && (
          <div className="mt-6 flex items-center justify-center">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => api?.scrollTo(i)}
                aria-label={`Ir para o recurso ${i + 1}`}
                aria-current={i === current || undefined}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blush"
              >
                <span className={i === current ? "h-2.5 w-2.5 rounded-full bg-blush" : "h-2 w-2 rounded-full bg-ink-foreground/35"} />
              </button>
            ))}
          </div>
        )}
      </Carousel>
  );
}

function CarouselPreviousArrow() {
  const { scrollPrev, canScrollPrev } = useCarousel();
  return (
    <Button type="button" variant="ghost" size="icon" className={arrowButton} disabled={!canScrollPrev} onClick={scrollPrev} aria-label="Recurso anterior">
      <ArrowLeft aria-hidden />
    </Button>
  );
}

function CarouselNextArrow() {
  const { scrollNext, canScrollNext } = useCarousel();
  return (
    <Button type="button" variant="ghost" size="icon" className={arrowButton} disabled={!canScrollNext} onClick={scrollNext} aria-label="Próximo recurso">
      <ArrowRight aria-hidden />
    </Button>
  );
}

export function Monitoramento() {
  return (
    <section id="monitoramento" className="section-pad bg-ink text-ink-foreground">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <div className="grid items-center gap-12 md:grid-cols-[1.2fr_1fr]">
          <div>
            <span className="inline-block rounded-full border border-blush px-4 py-2 text-sm text-ink-foreground">Diferencial exclusivo para pacientes</span>
            <p className="eyebrow mt-7 !text-blush">Monitoramento 360°</p>
            <h2 className="mt-4 text-4xl leading-tight md:text-5xl">E depois da consulta, sua médica continua com você.</h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-foreground/85">O risco não está só na doença — está no intervalo longo entre uma consulta e outra. Com o Monitoramento 360°, a pressão e os seus registros chegam até a Dra. Aline, que acompanha sua evolução e orienta ajustes no momento certo.</p>
            <Button asChild className={`${creamButton} mt-8`}><a href={whatsappMonitoramentoUrl} target="_blank" rel="noopener noreferrer">Quero o Monitoramento 360°<ArrowUpRight aria-hidden /></a></Button>
          </div>
          <MonitoringPhone />
        </div>

        <div className="mt-16 border-t border-ink-foreground/15 pt-12 md:mt-24">
          <h3 className="text-3xl">Como funciona</h3>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {steps.map(s => <article key={s.n} className="rounded-[14px] border border-ink-foreground/15 p-8"><span className="font-display text-5xl text-blush">{s.n}</span><h4 className="mt-4 font-display text-2xl">{s.title}</h4><p className="mt-3 leading-relaxed text-ink-foreground/85">{s.text}</p></article>)}
          </div>
        </div>

        <div className="mt-16">
          <FeatureCarousel />
        </div>

        <div className="mt-16">
          <h3 className="text-3xl">Para quem é</h3>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <article className="rounded-[14px] bg-ink-foreground/[0.06] p-8"><h4 className="font-display text-2xl">Já é paciente da Dra. Aline</h4><p className="mt-3 leading-relaxed text-ink-foreground/85">Ative o Monitoramento 360° e passe a ser acompanhada também entre as consultas.</p><Button variant="link" asChild className="mt-4 h-auto min-h-11 whitespace-normal px-0 text-base text-blush"><a href={whatsappMonitoramentoUrl} target="_blank" rel="noopener noreferrer">Quero ativar<ArrowUpRight aria-hidden /></a></Button></article>
            <article className="rounded-[14px] bg-ink-foreground/[0.06] p-8"><h4 className="font-display text-2xl">Ainda não é paciente</h4><p className="mt-3 leading-relaxed text-ink-foreground/85">Agende sua consulta inicial e comece seu acompanhamento já com o aplicativo.</p><Button variant="link" asChild className="mt-4 h-auto min-h-11 whitespace-normal px-0 text-base text-blush"><a href={whatsappUrl} target="_blank" rel="noopener noreferrer">Agendar consulta inicial<ArrowUpRight aria-hidden /></a></Button></article>
          </div>
        </div>

        <div className="mt-14 text-center"><p className="text-lg">Planos de acompanhamento de 3, 6 ou 9 meses.</p><Button asChild className={`${creamButton} mt-6`}><a href={whatsappMonitoramentoUrl} target="_blank" rel="noopener noreferrer">Quero o Monitoramento 360°<ArrowUpRight aria-hidden /></a></Button></div>
        <p className="mx-auto mt-10 max-w-3xl text-center text-sm leading-relaxed text-ink-foreground/70">O Monitoramento 360° complementa as consultas e não substitui atendimento de urgência. Em caso de sintomas agudos, procure um pronto-socorro.</p>
      </div>
    </section>
  );
}
