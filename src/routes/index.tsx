import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Smartphone, Mail, ExternalLink, FileText, ArrowUpRight, Clock, GraduationCap, Heart, Menu, MessageCircle, X, Instagram, MapPin, Phone, Video, Building2, Check,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Logo } from "@/components/logo";
import { whatsappUrl, WHATSAPP_DISPLAY, EMAIL, ADDRESS_LINE_1, ADDRESS_LINE_2, MAPS_URL, MAPS_EMBED_URL } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { Cardio360 } from "@/components/cardio360";

const TITLE = "Dra. Aline Martins Dall'Orto | Cardiologista em Brasília";
const DESC =
  "Cardiologista em Brasília médica há mais de 20 anos. Atendimento particular presencial e online na Asa Sul, com foco em prevenção e acompanhamento entre as consultas pelo app Cardio 360.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const NAV = [
  { href: "#sobre", label: "Sobre" },
  { href: "#publicacoes", label: "Publicações" },
  { href: "#consulta", label: "Consulta" },
  { href: "#cardio360", label: "Cardio 360" },
  { href: "#mulher", label: "Coração da mulher" },
  { href: "#duvidas", label: "Dúvidas" },
  { href: "#localizacao", label: "Localização" },
];

const btn =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-[15px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
const btnPrimary = `${btn} bg-primary text-primary-foreground hover:bg-primary-hover`;
const btnOutline = `${btn} border border-navy text-navy hover:bg-navy hover:text-background`;
const btnCream = `${btn} bg-background text-primary hover:bg-secondary`;
const wrap = "mx-auto w-full max-w-6xl px-5 md:px-8";
const ext = { href: whatsappUrl, target: "_blank", rel: "noopener noreferrer" };

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur">
      <div className={`${wrap} flex h-[76px] items-center justify-between gap-4`}>
        <a href="#inicio" className="min-w-0" aria-label="Dra. Aline Martins Dall'Orto, início"><Logo /></a>
        <nav aria-label="Principal" className="hidden shrink-0 items-center gap-4 min-[1440px]:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="inline-flex min-h-11 items-center whitespace-nowrap text-[13.5px] leading-none text-muted-foreground transition-colors hover:text-primary">{n.label}{n.href === "#cardio360" && <span className="ml-1.5 rounded-full bg-primary px-1.5 py-[3px] text-[9px] font-semibold leading-none text-primary-foreground">Novo</span>}</a>
          ))}
          <a {...ext} className={`${btnPrimary} ml-1 shrink-0 whitespace-nowrap`}>Agendar consulta</a>
        </nav>
        <Button
          variant="ghost"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-primary min-[1440px]:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X strokeWidth={1.5} /> : <Menu strokeWidth={1.5} />}
        </Button>
      </div>
      {open && (
        <nav aria-label="Menu móvel" className="border-t border-border bg-background min-[1440px]:hidden">
          <div className={`${wrap} flex flex-col py-4`}>
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="flex min-h-11 items-center gap-2 text-foreground">{n.label}{n.href === "#cardio360" && <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">Novo</span>}</a>
            ))}
            <a {...ext} className={`${btnPrimary} mt-3`}>Agendar consulta</a>
          </div>
        </nav>
      )}
    </header>
  );
}

function Placeholder({ text, className }: { text: string; className: string }) {
  return (
    <div role="img" aria-label={text} className={`flex items-center justify-center border-2 border-dashed border-primary/30 p-6 text-center text-muted-foreground ${className}`}>
      {text}
    </div>
  );
}

/** Foto do hero: envie o arquivo como public/foto-dra-aline.jpg. Sem arquivo, aparece o placeholder. */
const HERO_PHOTO_SRC = "/foto-dra-aline.jpg";
function HeroPhoto() {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);
  const frame = "mx-auto aspect-square w-56 overflow-hidden rounded-full border border-primary p-1.5 md:w-72";
  if (failed) {
    return (
      <div className={frame}>
        <div role="img" aria-label="Foto da Dra. Aline" className="flex h-full w-full items-center justify-center rounded-full bg-secondary px-6 text-center text-muted-foreground">Foto da Dra. Aline</div>
      </div>
    );
  }
  return (
    <div className={frame}>
      <img ref={ref} src={HERO_PHOTO_SRC} alt="Dra. Aline Martins Dall'Orto, cardiologista" onError={() => setFailed(true)} className="h-full w-full rounded-full object-cover" />
    </div>
  );
}

/** Preencha com os trabalhos da Dra. Aline. */
const publications = [
  { title: "[Título do trabalho]", venue: "[Revista ou evento · ano]", url: "#" },
  { title: "[Título do trabalho]", venue: "[Revista ou evento · ano]", url: "#" },
  { title: "[Título do trabalho]", venue: "[Revista ou evento · ano]", url: "#" },
];

const diffs = [
  { icon: Clock, t: "Consulta sem pressa", d: "Tempo para entender sua história, seus hábitos e suas dúvidas — e explicar cada exame com clareza." },
  { icon: GraduationCap, t: "Experiência e formação", d: "Mais de 20 anos de formada em Medicina, com residências em Clínica Médica, Cardiologia e Ecocardiografia e mestrado pela UnB." },
  { icon: Heart, t: "Prevenção e longevidade", d: "Cuidado pensado para você viver mais e melhor, com hábitos possíveis na sua rotina." },
  { icon: Smartphone, t: "Acompanhamento pelo app", d: "Com o Cardio 360, a Dra. Aline segue com você entre uma consulta e outra." },
];
const women = [
  { t: "Menopausa e coração", d: "O que muda com os hormônios e como se antecipar." },
  { t: "Sintomas silenciosos", d: "Cansaço, falta de ar e palpitação merecem atenção." },
  { t: "Atividade física com segurança", d: "Avaliação para treinar com tranquilidade." },
  { t: "Histórico gestacional", d: "Pré-eclâmpsia e diabetes gestacional contam no seu risco." },
];
const faqs = [
  { q: "Preciso ter algum sintoma para consultar uma cardiologista?", a: "Não. A avaliação preventiva é indicada justamente para identificar e controlar fatores de risco antes de qualquer sintoma." },
  { q: "A partir de que idade devo fazer um check-up do coração?", a: "O ideal é iniciar o acompanhamento preventivo regular a partir dos 30 a 40 anos, mesmo sem sintomas, para avaliar a pressão arterial, o colesterol e o risco cardiovascular global. Quem tem histórico familiar de doenças do coração, hipertensão, diabetes, fuma ou apresenta sintomas como falta de ar e dor no peito deve procurar um cardiologista independentemente da idade." },
  { q: "Como funciona a consulta online?", a: "Você agenda pelo WhatsApp, paga por Pix ou link do cartão, envia seus exames e recebe o link da consulta no próprio WhatsApp; receitas e pedidos de exame chegam por e-mail ou WhatsApp, com assinatura eletrônica." },
  { q: "O que levar na primeira consulta?", a: "Histórico familiar completo, relato dos seus sintomas e exames laboratoriais e de imagem anteriores." },
  { q: "O que é o Cardio 360?", a: "É um programa de acompanhamento cardiovascular em que a Dra. Aline se conecta com você por um aplicativo, para monitorar de perto sua saúde cardiovascular e intervir precocemente, com foco na prevenção de doenças." },
  { q: "Quem pode usar o Cardio 360?", a: "Pacientes da Dra. Aline — quem já está em acompanhamento e quem está começando. O acesso é liberado após a consulta inicial." },
  { q: "O aplicativo substitui a consulta?", a: "Não. Ele complementa o cuidado: as consultas continuam, e o aplicativo mantém você e a médica conectadas no intervalo entre elas." },
];

function Index() {
  return (
    <>
      <Header />
      <main id="inicio" className="pt-[76px] text-foreground">
        {/* Hero */}
        <section className="section-pad">
          <div className={`${wrap} flex flex-col items-center text-center`}>
            <HeroPhoto />
            <p className="mt-8 font-brand text-xl font-medium uppercase text-navy md:text-2xl">Dra. Aline Martins Dall'Orto</p>
            <p className="eyebrow mt-3">Cardiologista · Prevenção e longevidade</p>
            <p className="mt-2 text-sm text-muted-foreground">CRM-DF 15170 · RQE 10578 / 10577</p>
            <h1 className="mt-6 max-w-3xl text-[2.5rem] leading-[1.08] md:text-6xl">Cuidar do coração antes que ele dê sinais.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">Médica há mais de 20 anos, com atuação preventiva e atendimento particular feito com tempo, escuta e atenção. Presencial e online.</p>
            <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
              <Button asChild className={`${btnPrimary} h-auto whitespace-normal shadow-none`}><a {...ext}>Agendar consulta</a></Button>
              <Button asChild variant="outline" className={`${btnOutline} h-auto whitespace-normal shadow-none`}><a href="#cardio360">Conhecer o Cardio 360</a></Button>
              <Button asChild variant="outline" className={`${btnOutline} h-auto whitespace-normal shadow-none`}><a href="#localizacao">Como chegar</a></Button>
            </div>
            <ul className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-3 text-sm text-muted-foreground">
              {["Mais de 20 anos de formada", "Consulta sem pressa", "Presencial e online"].map(text => <li key={text} className="flex items-center gap-2"><Check size={16} className="shrink-0 text-primary" strokeWidth={1.5} aria-hidden />{text}</li>)}
            </ul>
          </div>
        </section>

        {/* Diferenciais */}
        <section className="section-pad bg-secondary" aria-label="Diferenciais">
          <div className={`${wrap} grid gap-5 md:grid-cols-2 xl:grid-cols-4`}>
            {diffs.map(({ icon: I, t, d }) => (
              <article key={t} className="rounded-[14px] bg-background p-8">
                <I className="text-primary" size={30} strokeWidth={1.5} aria-hidden />
                <h3 className="mt-5 text-2xl">{t}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{d}</p>
                {t === "Acompanhamento pelo app" && <Button variant="link" asChild className="mt-3 h-auto min-h-11 px-0 text-base"><a href="#cardio360">Conhecer</a></Button>}
              </article>
            ))}
          </div>
        </section>

        {/* Sobre */}
        <section id="sobre" className="section-pad">
          <div className={`${wrap} grid items-center gap-12 md:grid-cols-2`}>
            <Placeholder text="Foto da Dra. Aline no consultório" className="aspect-square w-full rounded-[14px] bg-muted" />
            <div>
              <p className="eyebrow">Sobre a Dra. Aline</p>
              <h2 className="mt-4 text-4xl leading-tight md:text-5xl">Medicina feita com escuta, ciência e presença.</h2>
              <p className="mt-6 leading-relaxed text-muted-foreground">Sou médica há mais de 20 anos e cardiologista com atuação preventiva, para promover saúde e bem-estar com carinho e atenção. Atendo pacientes particulares de forma presencial e online, em Brasília.</p>
              <p className="mt-4 leading-relaxed text-muted-foreground">Acredito que o melhor momento de cuidar do coração é antes da doença aparecer, quando ainda é possível mudar hábitos com mais leveza.</p>
              <p className="eyebrow mt-8">Formação acadêmica</p>
              <ul className="mt-4 space-y-3">
                {[
                  "Graduação em Medicina pela Universidade Federal do Pará, com destaque acadêmico",
                  "Residência em Clínica Médica pela Secretaria de Saúde do Distrito Federal (SES-DF)",
                  "Residência em Cardiologia pela Universidade de Brasília (UnB) e Instituto de Cardiologia e Transplante do Distrito Federal (ICTDF)",
                  "Residência em Ecocardiografia pelo ICTDF",
                  "Mestrado em Ciências Médicas pela Universidade de Brasília (UnB)",
                  "Título de Especialista em Cardiologia e Ecocardiografia",
                ].map((i) => (
                  <li key={i} className="flex gap-3"><Check className="mt-0.5 shrink-0 text-primary" size={20} strokeWidth={1.5} aria-hidden />{i}</li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-muted-foreground">CRM-DF 15170 · RQE 10578 / 10577</p>
            </div>
          </div>
        </section>

        {/* Publicações */}
        <section id="publicacoes" className="section-pad pt-0 md:pt-0">
          <div className={wrap}>
            <p className="eyebrow">Produção científica</p>
            <h2 className="mt-4 text-4xl leading-tight md:text-5xl">Trabalhos publicados</h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">Artigos e pesquisas da Dra. Aline em cardiologia e ecocardiografia.</p>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {publications.map((pub, i) => (
                <article key={i} className="flex flex-col rounded-[14px] border border-border p-6">
                  <FileText className="text-primary" size={26} strokeWidth={1.5} aria-hidden />
                  <h3 className="mt-4 text-xl">{pub.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{pub.venue}</p>
                  <a href={pub.url} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex min-h-11 items-center gap-1.5 pt-3 font-semibold text-primary hover:underline">Ler publicação<ArrowUpRight size={16} aria-hidden /></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Consultas */}
        <section id="consulta" className="section-pad bg-navy-soft">
          <div className={wrap}>
            <p className="eyebrow">Consulta particular</p>
            <h2 className="mt-4 text-4xl leading-tight md:text-5xl">Uma consulta feita com tempo para você.</h2>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">Na minha consulta, você não é só mais um horário na agenda. É o momento de olhar para a sua saúde do coração por inteiro.</p>
            <h3 className="mt-10 text-2xl">O que a consulta inclui</h3>
            <ul className="mt-5 grid gap-4 md:grid-cols-2">
              {["Escuta da sua história, rotina e hábitos", "Avaliação do seu risco cardiovascular", "Explicação clara dos exames e do tratamento", "Plano de cuidado individual, com foco em prevenção"].map(text => <li key={text} className="flex gap-3"><Check size={20} strokeWidth={1.5} className="shrink-0 text-primary" aria-hidden />{text}</li>)}
            </ul>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              <article className="rounded-[14px] bg-background p-8">
                <Building2 className="text-primary" size={30} strokeWidth={1.5} aria-hidden />
                <h3 className="mt-5 text-2xl">No consultório</h3>
                <ul className="mt-4 space-y-2 text-muted-foreground">
                  <li>{ADDRESS_LINE_1}</li>
                  <li>{ADDRESS_LINE_2}</li>
                  <li>[Dias e horários de atendimento]</li>
                  <li>Atendimento particular</li>
                </ul>
              </article>
              <article className="rounded-[14px] bg-background p-8">
                <Video className="text-primary" size={30} strokeWidth={1.5} aria-hidden />
                <h3 className="mt-5 text-2xl">Consulta online</h3>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  {["Agendamento pelo WhatsApp", "Pagamento por Pix ou link do cartão de crédito", "Você envia seus exames pelo WhatsApp e recebe o link da consulta diretamente no seu WhatsApp", "Receitas e pedidos de exame por e-mail ou WhatsApp, com assinatura eletrônica"].map(t => <li key={t} className="flex gap-3"><Check size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-primary" aria-hidden />{t}</li>)}
                </ul>
                <p className="mt-4 leading-relaxed text-muted-foreground">Pacientes do Cardio 360 também podem fazer os retornos online.</p>
              </article>
            </div>
            <div className="mt-10 text-center"><Button asChild className={`${btnPrimary} h-auto whitespace-normal shadow-none`}><a {...ext}>Agendar minha consulta</a></Button></div>
          </div>
        </section>

        <Cardio360 />

        {/* Mulher */}
        <section id="mulher" className="section-pad">
          <div className={`${wrap} grid gap-12 md:grid-cols-2 md:items-center`}>
            <div>
              <p className="eyebrow">Coração da mulher</p>
              <h2 className="mt-4 text-4xl leading-tight md:text-5xl">Depois dos 40, o coração da mulher pede um olhar próprio.</h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">Com a queda do estrogênio na menopausa, a mulher perde sua proteção vascular natural, com aumento da pressão arterial, piora do colesterol e acúmulo de gordura abdominal. Isso eleva significativamente o risco cardiovascular, tornando fundamental o rastreamento e o controle rigoroso dos fatores de risco nessa fase.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {women.map((w) => (
                <article key={w.t} className="rounded-[14px] bg-secondary p-6">
                  <h3 className="text-xl">{w.t}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{w.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Dúvidas */}
        <section id="duvidas" className="section-pad">
          <div className="mx-auto w-full max-w-[860px] px-5 md:px-8">
            <p className="eyebrow">Dúvidas frequentes</p>
            <h2 className="mt-4 text-4xl leading-tight md:text-5xl">Perguntas que costumam surgir.</h2>
            <Accordion type="single" collapsible className="mt-10">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`q${i}`}>
                  <AccordionTrigger className="min-h-11 text-left text-lg font-semibold hover:no-underline">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-base leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Localização */}
        <section id="localizacao" className="section-pad pt-0 md:pt-0">
          <div className={wrap}>
            <p className="eyebrow">Localização</p>
            <h2 className="mt-4 text-4xl leading-tight md:text-5xl">Onde atendo</h2>
            <div className="mt-8 grid gap-8 md:grid-cols-[1fr_1.6fr] md:items-start">
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex gap-3"><MapPin size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-primary" aria-hidden /><span><span className="font-semibold text-foreground">{ADDRESS_LINE_1}</span><br />{ADDRESS_LINE_2}</span></li>
                <li><a {...ext} className="flex min-h-11 items-center gap-3 hover:text-primary"><Phone size={20} strokeWidth={1.5} className="shrink-0 text-primary" aria-hidden />{WHATSAPP_DISPLAY}</a></li>
                <li><a href={`mailto:${EMAIL}`} className="flex min-h-11 items-center gap-3 break-all hover:text-primary"><Mail size={20} strokeWidth={1.5} className="shrink-0 text-primary" aria-hidden />{EMAIL}</a></li>
                <li><Button asChild variant="outline" className={`${btnOutline} h-auto whitespace-normal shadow-none`}><a href={MAPS_URL} target="_blank" rel="noopener noreferrer">Abrir no Google Maps<ExternalLink size={16} aria-hidden /></a></Button></li>
              </ul>
              <iframe src={MAPS_EMBED_URL} title="Mapa: Centro Clínico OHB, Asa Sul, Brasília" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-[360px] w-full rounded-[14px] border border-border" />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="agendar" className="pb-16 md:pb-24">
          <div className={wrap}>
            <div className="rounded-[32px] bg-primary px-6 py-14 text-center text-primary-foreground md:py-20">
              <h2 className="text-4xl leading-tight md:text-5xl">Venha cuidar do seu bem mais precioso: o seu coração.</h2>
               <p className="mt-4 text-lg opacity-90">Atendimento particular, presencial e online.</p>
               <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
                 <Button asChild className={`${btnCream} h-auto whitespace-normal shadow-none`}><a {...ext}><MessageCircle size={18} strokeWidth={1.5} />Agendar consulta</a></Button>
                 <Button asChild variant="outline" className={`${btn} h-auto whitespace-normal border border-primary-foreground bg-transparent text-primary-foreground shadow-none hover:bg-background hover:text-primary`}><a href="#cardio360">Conhecer o Cardio 360</a></Button>
               </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-background py-12 text-foreground">
        <div className={`${wrap} flex flex-col gap-8 md:flex-row md:justify-between`}>
          <div>
            <Logo variant="footer" />
            <p className="mt-3 text-sm text-muted-foreground">Médica cardiologista · CRM-DF 15170 · RQE 10578 / 10577</p>
            <p className="text-sm text-muted-foreground">Responsável técnica: Dra. Aline Martins Dall'Orto</p>
          </div>
          <ul className="space-y-1 text-muted-foreground md:text-right">
            <li><a href="https://www.instagram.com/dra.alinemartinscardio" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 hover:text-primary"><Instagram size={18} strokeWidth={1.5} className="text-primary" aria-hidden />@dra.alinemartinscardio</a></li>
            <li className="flex items-start gap-2 md:justify-end"><MapPin size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-primary" aria-hidden /><span className="max-w-sm">{ADDRESS_LINE_1} · {ADDRESS_LINE_2}</span></li>
            <li><a {...ext} className="inline-flex min-h-11 items-center gap-2 hover:text-primary"><Phone size={18} strokeWidth={1.5} className="text-primary" aria-hidden />{WHATSAPP_DISPLAY}</a></li>
            <li><a href={`mailto:${EMAIL}`} className="inline-flex min-h-11 items-center gap-2 break-all hover:text-primary"><Mail size={18} strokeWidth={1.5} className="shrink-0 text-primary" aria-hidden />{EMAIL}</a></li>
          </ul>
        </div>
      </footer>

      <a {...ext} aria-label="Agendar pelo WhatsApp" className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary-hover">
        <MessageCircle size={26} strokeWidth={1.5} aria-hidden />
      </a>
    </>
  );
}
