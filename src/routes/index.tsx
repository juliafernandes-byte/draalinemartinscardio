import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Bell, Smartphone, Clock, GraduationCap, Heart, Menu, MessageCircle, X, Instagram, MapPin, Phone, Video, Building2, Check,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Logo } from "@/components/logo";
import { whatsappUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { Monitoramento } from "@/components/monitoramento";

const TITLE = "Dra. Aline Martins Dall'Orto | Cardiologista em Brasília";
const DESC =
  "Cardiologista em Brasília com mais de 20 anos de experiência. Atendimento particular presencial e online, com foco em prevenção e acompanhamento entre as consultas pelo Monitoramento 360°.";

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
  { href: "#consulta", label: "Consulta" },
  { href: "#monitoramento", label: "Monitoramento 360°" },
  { href: "#mulher", label: "Coração da mulher" },
  { href: "#duvidas", label: "Dúvidas" },
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
        <nav aria-label="Principal" className="hidden items-center gap-4 xl:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="inline-flex min-h-11 items-center gap-2 text-[14px] text-muted-foreground hover:text-primary">{n.label}{n.href === "#monitoramento" && <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">Novo</span>}</a>
          ))}
          <a {...ext} className={btnPrimary}>Agendar consulta</a>
        </nav>
        <Button
          variant="ghost"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-primary xl:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X strokeWidth={1.5} /> : <Menu strokeWidth={1.5} />}
        </Button>
      </div>
      {open && (
        <nav aria-label="Menu móvel" className="border-t border-border bg-background xl:hidden">
          <div className={`${wrap} flex flex-col py-4`}>
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="flex min-h-11 items-center gap-2 text-foreground">{n.label}{n.href === "#monitoramento" && <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">Novo</span>}</a>
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

const diffs = [
  { icon: Clock, t: "Consulta sem pressa", d: "Tempo para entender sua história, seus hábitos e suas dúvidas — e explicar cada exame com clareza." },
  { icon: GraduationCap, t: "Experiência e formação", d: "Mais de 20 anos de cardiologia, com residências em Clínica Médica, Cardiologia e Ecocardiografia e mestrado pela UnB." },
  { icon: Heart, t: "Prevenção e longevidade", d: "Cuidado pensado para você viver mais e melhor, com hábitos possíveis na sua rotina." },
  { icon: Smartphone, t: "Acompanhamento pelo app", d: "Com o Monitoramento 360°, a Dra. Aline segue com você entre uma consulta e outra." },
];
const women = [
  { t: "Menopausa e risco cardíaco", d: "O que muda com os hormônios e como se antecipar." },
  { t: "Sintomas silenciosos", d: "Cansaço, falta de ar e palpitação merecem atenção." },
  { t: "Atividade física com segurança", d: "Avaliação para treinar com tranquilidade." },
  { t: "Histórico gestacional", d: "Pré-eclâmpsia e diabetes gestacional contam no seu risco." },
];
const faqs = [
  { q: "Preciso ter algum sintoma para consultar uma cardiologista?", a: "Não. A avaliação preventiva é indicada justamente para identificar e controlar fatores de risco antes de qualquer sintoma." },
  { q: "A partir de que idade devo fazer um check-up do coração?", a: "[Resposta da Dra. Aline]" },
  { q: "Como funciona a consulta online?", a: "[Plataforma usada, como receber o link, envio de exames antes da consulta]" },
  { q: "O que levar na primeira consulta?", a: "Exames recentes, lista de medicamentos em uso e, se tiver, medidas de pressão feitas em casa." },
  { q: "O que é o Monitoramento 360°?", a: "É o aplicativo de acompanhamento da Dra. Aline. Ele envia lembretes para você medir a pressão, guarda seus registros e permite que a médica acompanhe sua evolução entre as consultas." },
  { q: "Quem pode usar o Monitoramento 360°?", a: "Pacientes da Dra. Aline — quem já está em acompanhamento e quem está começando. O acesso é liberado após a consulta inicial." },
  { q: "O aplicativo substitui a consulta?", a: "Não. Ele complementa o cuidado: as consultas continuam, e o aplicativo mantém você e a médica conectadas no intervalo entre elas." },
];

function Index() {
  return (
    <>
      <Header />
      <main id="inicio" className="pt-[76px] text-foreground">
        {/* Hero */}
        <section className="section-pad">
          <div className={`${wrap} grid items-center gap-12 md:grid-cols-[1.15fr_1fr]`}>
            <div>
              <p className="eyebrow">Cardiologista em Brasília · CRM-DF 15170 · RQE 10578 / 10577</p>
               <h1 className="mt-5 text-[2.5rem] leading-[1.08] md:text-6xl">Cuidar do coração antes que ele dê sinais.</h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                 Cardiologista com mais de 20 anos de experiência, com atuação preventiva e atendimento particular feito com tempo, escuta e atenção. Presencial e online.
              </p>
               <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                 <Button asChild className={`${btnPrimary} h-auto whitespace-normal shadow-none`}><a {...ext}>Agendar consulta</a></Button>
                 <Button asChild variant="outline" className={`${btnOutline} h-auto whitespace-normal shadow-none`}><a href="#consulta">Como é a consulta</a></Button>
              </div>
               <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm text-muted-foreground">
                 {["Mais de 20 anos de experiência", "Consulta sem pressa", "Presencial e online"].map(text => <li key={text} className="flex items-center gap-2"><Check size={16} className="shrink-0 text-primary" strokeWidth={1.5} aria-hidden />{text}</li>)}
               </ul>
            </div>
             <div className="relative mx-auto w-full max-w-sm pb-6">
               <Placeholder text="Foto profissional da Dra. Aline" className="aspect-[4/5] w-full rounded-b-[20px] rounded-t-[999px] bg-secondary" />
               <div className="hero-notification absolute bottom-0 left-0 flex w-[min(100%,290px)] items-center gap-3 rounded-lg border border-border/60 bg-background p-4 md:-left-5">
                 <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary text-primary"><Bell size={23} strokeWidth={1.5} aria-hidden /></span>
                 <div className="min-w-0"><p className="text-sm font-semibold text-primary">Monitoramento 360°</p><p className="mt-1 text-sm">Sua médica acompanhando entre as consultas</p></div>
               </div>
             </div>
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
                {t === "Acompanhamento pelo app" && <Button variant="link" asChild className="mt-3 h-auto min-h-11 px-0 text-base"><a href="#monitoramento">Conhecer</a></Button>}
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
              <p className="mt-6 leading-relaxed text-muted-foreground">Sou médica cardiologista com mais de 20 anos de experiência e atuo na saúde cardiovascular de forma preventiva, para promover saúde e bem-estar com carinho e atenção. Atendo pacientes particulares de forma presencial e online, em Brasília.</p>
              <p className="mt-4 leading-relaxed text-muted-foreground">Acredito que o melhor momento de cuidar do coração é antes da doença aparecer — quando ainda dá para mudar hábitos com mais leveza e menos remédio.</p>
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

        {/* Consultas */}
        <section id="consulta" className="section-pad bg-navy-soft">
          <div className={wrap}>
            <p className="eyebrow">Consulta particular</p>
            <h2 className="mt-4 text-4xl leading-tight md:text-5xl">Uma consulta feita com tempo para você.</h2>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">Na consulta com a Dra. Aline, você não é só mais um horário na agenda. É o momento de olhar para a sua saúde do coração por inteiro.</p>
            <h3 className="mt-10 text-2xl">O que a consulta inclui</h3>
            <ul className="mt-5 grid gap-4 md:grid-cols-2">
              {["Escuta da sua história, rotina e hábitos", "Avaliação do seu risco cardiovascular", "Explicação clara dos exames e do tratamento", "Plano de cuidado individual, com foco em prevenção"].map(text => <li key={text} className="flex gap-3"><Check size={20} strokeWidth={1.5} className="shrink-0 text-primary" aria-hidden />{text}</li>)}
            </ul>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              <article className="rounded-[14px] bg-background p-8">
                <Building2 className="text-primary" size={30} strokeWidth={1.5} aria-hidden />
                <h3 className="mt-5 text-2xl">No consultório</h3>
                <ul className="mt-4 space-y-2 text-muted-foreground">
                  <li>[Endereço completo do consultório]</li>
                  <li>[Dias e horários de atendimento]</li>
                  <li>Atendimento particular</li>
                </ul>
              </article>
              <article className="rounded-[14px] bg-background p-8">
                <Video className="text-primary" size={30} strokeWidth={1.5} aria-hidden />
                <h3 className="mt-5 text-2xl">Consulta online</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">Atendimento por vídeo, de onde você estiver, com a mesma escuta e cuidado da consulta presencial.</p>
                <p className="mt-2 leading-relaxed text-muted-foreground">Receitas e pedidos de exame enviados digitalmente.</p>
                 <p className="mt-2 leading-relaxed text-muted-foreground">Pacientes do Monitoramento 360° também podem fazer os retornos online.</p>
              </article>
            </div>
            <div className="mt-10 text-center"><Button asChild className={`${btnPrimary} h-auto whitespace-normal shadow-none`}><a {...ext}>Agendar minha consulta</a></Button></div>
          </div>
        </section>

        <Monitoramento />

        {/* Mulher */}
        <section id="mulher" className="section-pad">
          <div className={`${wrap} grid gap-12 md:grid-cols-2 md:items-center`}>
            <div>
              <p className="eyebrow">Coração da mulher</p>
              <h2 className="mt-4 text-4xl leading-tight md:text-5xl">Depois dos 40, o coração da mulher pede um olhar próprio.</h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">As doenças cardiovasculares são a principal causa de morte entre mulheres no Brasil — e muitas vezes os sinais não são a dor no peito clássica. Perimenopausa, menopausa e o histórico das gestações mudam o risco.</p>
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

        {/* CTA */}
        <section id="agendar" className="pb-16 md:pb-24">
          <div className={wrap}>
            <div className="rounded-[32px] bg-primary px-6 py-14 text-center text-primary-foreground md:py-20">
              <h2 className="text-4xl leading-tight md:text-5xl">Venha cuidar do seu bem mais precioso: o seu coração.</h2>
               <p className="mt-4 text-lg opacity-90">Atendimento particular, presencial e online.</p>
               <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
                 <Button asChild className={`${btnCream} h-auto whitespace-normal shadow-none`}><a {...ext}><MessageCircle size={18} strokeWidth={1.5} />Agendar consulta</a></Button>
                 <Button asChild variant="outline" className={`${btn} h-auto whitespace-normal border border-primary-foreground bg-transparent text-primary-foreground shadow-none hover:bg-background hover:text-primary`}><a href="#monitoramento">Conhecer o Monitoramento 360°</a></Button>
               </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-ink-foreground/15 bg-navy py-12 text-ink-foreground">
        <div className={`${wrap} flex flex-col gap-8 md:flex-row md:justify-between`}>
          <div>
            <Logo variant="footer" />
            <p className="mt-2 text-ink-foreground/85">Médica cardiologista · CRM-DF 15170 · RQE 10578 / 10577</p>
            <p className="text-ink-foreground/85">Responsável técnica: Dra. Aline Martins Dall'Orto</p>
          </div>
          <ul className="space-y-1 text-ink-foreground/85 md:text-right">
            <li><a href="https://www.instagram.com/dra.alinemartinscardio" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 hover:text-blush"><Instagram size={18} strokeWidth={1.5} className="text-blush" aria-hidden />@dra.alinemartinscardio</a></li>
            <li className="flex items-center gap-2 md:justify-end"><MapPin size={18} strokeWidth={1.5} className="text-blush" aria-hidden />[Endereço do consultório]</li>
            <li className="flex min-h-11 items-center gap-2 md:justify-end"><Phone size={18} strokeWidth={1.5} className="text-blush" aria-hidden />[WhatsApp]</li>
          </ul>
        </div>
      </footer>

      <a {...ext} aria-label="Agendar pelo WhatsApp" className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary-hover">
        <MessageCircle size={26} strokeWidth={1.5} aria-hidden />
      </a>
    </>
  );
}
