import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Activity, Clock, Heart, Menu, MessageCircle, X, Instagram, MapPin, Phone, Video, Building2, Check,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { whatsappUrl } from "@/lib/whatsapp";

const TITLE = "Dra. Aline Martins | Cardiologista – Prevenção e Saúde do Coração da Mulher";
const DESC =
  "Cardiologista com foco em prevenção, longevidade e saúde do coração da mulher. Consulta sem pressa e acompanhamento contínuo, presencial e online.";

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
  { href: "#acompanhamento", label: "Acompanhamento" },
  { href: "#mulher", label: "Coração da mulher" },
  { href: "#consulta", label: "Consultas" },
  { href: "#duvidas", label: "Dúvidas" },
];

const btn =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-[15px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
const btnPrimary = `${btn} bg-primary text-primary-foreground hover:bg-primary/90`;
const btnOutline = `${btn} border border-foreground text-foreground hover:bg-foreground hover:text-background`;
const btnCream = `${btn} bg-background text-primary hover:bg-secondary`;
const wrap = "mx-auto w-full max-w-6xl px-5 md:px-8";
const ext = { href: whatsappUrl, target: "_blank", rel: "noopener noreferrer" };

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur">
      <div className={`${wrap} flex h-[76px] items-center justify-between gap-4`}>
        <a href="#inicio" className="flex flex-col leading-tight">
          <span className="font-display text-xl text-foreground">Dra. Aline Martins</span>
          <span className="eyebrow !text-[11px] !tracking-[0.12em]">Cardiologia · Prevenção e longevidade</span>
        </a>
        <nav aria-label="Principal" className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-[15px] text-muted-foreground hover:text-primary">{n.label}</a>
          ))}
          <a {...ext} className={btnPrimary}>Agendar consulta</a>
        </nav>
        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-primary lg:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X strokeWidth={1.5} /> : <Menu strokeWidth={1.5} />}
        </button>
      </div>
      {open && (
        <nav aria-label="Menu móvel" className="border-t border-border bg-background lg:hidden">
          <div className={`${wrap} flex flex-col py-4`}>
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="flex min-h-11 items-center text-foreground">{n.label}</a>
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
  { icon: Activity, t: "Acompanhamento de perto", d: "Pressão, colesterol e tratamento revisados entre as consultas, para agir antes que o risco aumente." },
  { icon: Heart, t: "Prevenção e longevidade", d: "Cuidado pensado para você viver mais e melhor, com hábitos possíveis na sua rotina." },
];
const steps = [
  { n: "01", t: "Consulta completa", d: "Avaliação do seu risco cardiovascular, histórico, hábitos e exames." },
  { n: "02", t: "Monitoramento entre consultas", d: "Você envia medidas de pressão e exames; a médica acompanha e ajusta quando necessário." },
  { n: "03", t: "Revisões periódicas", d: "Retornos presenciais ou online, em planos de 3, 6 ou 9 meses." },
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
  { q: "Como funciona o acompanhamento contínuo?", a: "[Detalhes dos planos de 3, 6 e 9 meses, após validação]" },
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
              <p className="eyebrow">Cardiologista · CRM-DF 15170 · RQE 10578 / 10577</p>
              <h1 className="mt-5 text-[2.5rem] leading-[1.08] md:text-6xl">Cuidar do coração antes que ele dê sinais.</h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Cardiologista há mais de 20 anos, com atuação preventiva para promover saúde e bem-estar com carinho e atenção. Consulta sem pressa e acompanhamento de perto, presencial e online.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a {...ext} className={btnPrimary}><MessageCircle size={18} strokeWidth={1.5} />Agendar pelo WhatsApp</a>
                <a href="#consulta" className={btnOutline}>Presencial ou online</a>
              </div>
            </div>
            <Placeholder text="Foto profissional da Dra. Aline" className="mx-auto aspect-[4/5] w-full max-w-sm rounded-b-[20px] rounded-t-[999px] bg-secondary" />
          </div>
        </section>

        {/* Diferenciais */}
        <section className="section-pad bg-secondary" aria-label="Diferenciais">
          <div className={`${wrap} grid gap-5 md:grid-cols-3`}>
            {diffs.map(({ icon: I, t, d }) => (
              <article key={t} className="rounded-[20px] bg-background p-8">
                <I className="text-primary" size={30} strokeWidth={1.5} aria-hidden />
                <h3 className="mt-5 text-2xl">{t}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{d}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Sobre */}
        <section id="sobre" className="section-pad">
          <div className={`${wrap} grid items-center gap-12 md:grid-cols-2`}>
            <Placeholder text="Foto da Dra. Aline no consultório" className="aspect-square w-full rounded-[20px] bg-muted" />
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

        {/* Acompanhamento */}
        <section id="acompanhamento" className="section-pad bg-ink text-ink-foreground">
          <div className={wrap}>
            <p className="eyebrow !text-blush">Acompanhamento contínuo</p>
            <h2 className="mt-4 max-w-3xl text-4xl leading-tight md:text-5xl">O risco não está só na doença. Está no intervalo entre uma consulta e outra.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed opacity-85">Em vez de esperar um ano para rever o tratamento, você conta com um acompanhamento próximo ao longo do caminho.</p>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {steps.map((s) => (
                <article key={s.n} className="rounded-[20px] border border-ink-foreground/15 p-8">
                  <span className="font-display text-5xl text-blush">{s.n}</span>
                  <h3 className="mt-4 text-2xl">{s.t}</h3>
                  <p className="mt-3 leading-relaxed opacity-85">{s.d}</p>
                </article>
              ))}
            </div>
            <a {...ext} className={`${btnCream} mt-12`}>Quero saber mais sobre o acompanhamento</a>
          </div>
        </section>

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
                <article key={w.t} className="rounded-[20px] bg-secondary p-6">
                  <h3 className="text-xl">{w.t}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{w.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Consultas */}
        <section id="consulta" className="section-pad bg-muted">
          <div className={wrap}>
            <p className="eyebrow">Consultas</p>
            <h2 className="mt-4 text-4xl leading-tight md:text-5xl">Atendimento presencial e online.</h2>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              <article className="rounded-[20px] bg-background p-8">
                <Building2 className="text-primary" size={30} strokeWidth={1.5} aria-hidden />
                <h3 className="mt-5 text-2xl">No consultório</h3>
                <ul className="mt-4 space-y-2 text-muted-foreground">
                  <li>[Endereço completo do consultório]</li>
                  <li>[Dias e horários de atendimento]</li>
                  <li>Atendimento particular</li>
                </ul>
              </article>
              <article className="rounded-[20px] bg-background p-8">
                <Video className="text-primary" size={30} strokeWidth={1.5} aria-hidden />
                <h3 className="mt-5 text-2xl">Consulta online</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">Atendimento por vídeo, de onde você estiver, com a mesma escuta e cuidado da consulta presencial.</p>
                <p className="mt-2 leading-relaxed text-muted-foreground">Receitas e pedidos de exame enviados digitalmente.</p>
              </article>
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
              <p className="mt-4 text-lg opacity-90">Agende sua avaliação presencial ou online.</p>
              <a {...ext} className={`${btnCream} mt-8`}><MessageCircle size={18} strokeWidth={1.5} />Agendar pelo WhatsApp</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-12">
        <div className={`${wrap} flex flex-col gap-8 md:flex-row md:justify-between`}>
          <div>
            <p className="font-display text-2xl">Dra. Aline Martins</p>
            <p className="mt-2 text-muted-foreground">Médica cardiologista · CRM-DF 15170 · RQE 10578 / 10577</p>
            <p className="text-muted-foreground">Responsável técnica: Dra. Aline Martins</p>
          </div>
          <ul className="space-y-1 text-muted-foreground md:text-right">
            <li><a href="https://www.instagram.com/dra.alinemartinscardio" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 hover:text-primary"><Instagram size={18} strokeWidth={1.5} className="text-primary" aria-hidden />@dra.alinemartinscardio</a></li>
            <li className="flex items-center gap-2 md:justify-end"><MapPin size={18} strokeWidth={1.5} className="text-primary" aria-hidden />[Endereço do consultório]</li>
            <li className="flex min-h-11 items-center gap-2 md:justify-end"><Phone size={18} strokeWidth={1.5} className="text-primary" aria-hidden />[WhatsApp]</li>
          </ul>
        </div>
      </footer>

      <a {...ext} aria-label="Agendar pelo WhatsApp" className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90">
        <MessageCircle size={26} strokeWidth={1.5} aria-hidden />
      </a>
    </>
  );
}
