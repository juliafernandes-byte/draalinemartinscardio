import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Smartphone, Mail, FileText, ArrowUpRight, Clock, GraduationCap, Heart, Menu, MessageCircle, X, Instagram, MapPin, Phone, Video, Building2, Check, Award, Star,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Logo } from "@/components/logo";
import { whatsappUrl, WHATSAPP_DISPLAY, EMAIL, ADDRESS_LINE_1, ADDRESS_LINE_2, MAPS_EMBED_URL } from "@/lib/whatsapp";
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
  { href: "#inicio", label: "Home" },
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
/** O topo usa uma faixa mais larga que o corpo do site para o menu caber inteiro no computador. */
const wrapHeader = "mx-auto w-full max-w-[1360px] px-5 md:px-8";
const ext = { href: whatsappUrl, target: "_blank", rel: "noopener noreferrer" };

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur">
      <div className={`${wrapHeader} flex h-[76px] items-center justify-between gap-4`}>
        <a href="#inicio" className="shrink-0" aria-label="Dra. Aline Martins Dall'Orto, início"><Logo /></a>
        <nav aria-label="Principal" className="hidden shrink-0 items-center gap-3.5 min-[1280px]:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="inline-flex min-h-11 items-center whitespace-nowrap text-[13px] leading-none text-muted-foreground transition-colors hover:text-primary">{n.label}{n.href === "#cardio360" && <span className="ml-1.5 rounded-full bg-primary px-1.5 py-[3px] text-[9px] font-semibold leading-none text-primary-foreground">Novo</span>}</a>
          ))}
          <Button asChild className={`${btnPrimary} h-auto ml-1 shrink-0 whitespace-nowrap px-5`}><a href={whatsappUrl} target="_blank" rel="noopener noreferrer">Agendar consulta</a></Button>
        </nav>
        <Button
          variant="ghost"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-primary min-[1280px]:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X strokeWidth={1.5} /> : <Menu strokeWidth={1.5} />}
        </Button>
      </div>
      {open && (
        <nav aria-label="Menu móvel" className="border-t border-border bg-background min-[1280px]:hidden">
          <div className={`${wrap} flex flex-col py-4`}>
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="flex min-h-11 items-center gap-2 text-foreground">{n.label}{n.href === "#cardio360" && <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">Novo</span>}</a>
            ))}
            <Button asChild className={`${btnPrimary} h-auto mt-3`}><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>Agendar consulta</a></Button>
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

/** Foto do hero: arquivo em public/foto-dra-aline.jpg. Sem arquivo, aparece o placeholder. */
const HERO_PHOTO_SRC = "/foto-dra-aline.jpg";
const ARCH = "rounded-t-[999px] rounded-b-[14px]";
/** Foto da seção Sobre: arquivo em public/foto-dra-alineee.jpg. Sem arquivo, aparece o placeholder. */
const SOBRE_PHOTO_SRC = "/foto-dra-alineee.jpg";
function SobrePhoto() {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);
  return (
    <div className="relative mx-auto w-full max-w-[400px] md:max-w-[440px]">
      <div aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 rounded-[14px] bg-secondary" />
      <div className="relative overflow-hidden rounded-[14px] border border-primary/50 bg-secondary">
        {failed ? (
          <Placeholder text="Foto da Dra. Aline no consultório" className="aspect-[3/4] w-full rounded-[14px]" />
        ) : (
          <img ref={ref} src={SOBRE_PHOTO_SRC} alt="Dra. Aline Martins Dall'Orto de jaleco, realizando um exame de ultrassonografia no consultório" onError={() => setFailed(true)} loading="lazy" className="aspect-[3/4] w-full object-cover object-center" />
        )}
      </div>
    </div>
  );
}

/** Avaliação do Google exibida abaixo da foto do hero: apenas as 5 estrelas. */
const GOOGLE_REVIEWS_URL = "https://www.google.com/search?q=dra+aline+martins+cardiologista+brasilia";

/** "G" oficial do Google (marca registrada — cores fixas da identidade). */
function GoogleIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden focusable="false">
      <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z" />
      <path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z" />
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z" />
    </svg>
  );
}

function GoogleRating() {
  return (
    <a
      href={GOOGLE_REVIEWS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="relative mt-5 flex min-h-11 items-center justify-center gap-2 rounded-[14px] border border-primary/30 bg-background px-4 py-2 text-sm text-foreground transition-colors hover:border-primary/60"
      aria-label="Avaliação 5 de 5 estrelas no Google"
    >
      <GoogleIcon />
      <span className="flex gap-0.5 text-primary" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={16} fill="currentColor" strokeWidth={1.5} />
        ))}
      </span>
    </a>
  );
}

function HeroPhoto() {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);
  return (
    <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[340px] md:w-full md:max-w-[400px]">
      <div aria-hidden className={`absolute inset-0 translate-x-3 translate-y-3 ${ARCH} bg-secondary`} />
      <div className={`relative overflow-hidden border border-primary/50 bg-secondary ${ARCH}`}>
        {failed ? (
          <div role="img" aria-label="Foto da Dra. Aline" className="flex aspect-[4/5] w-full items-center justify-center px-10 text-center text-muted-foreground">Foto da Dra. Aline</div>
        ) : (
          <img ref={ref} src={HERO_PHOTO_SRC} alt="Dra. Aline Martins Dall'Orto, cardiologista, sentada no consultório" onError={() => setFailed(true)} className="aspect-[4/5] w-full object-cover object-top" />
        )}
      </div>
      <GoogleRating />
    </div>
  );
}

/** Trabalhos da Dra. Aline. `highlight: true` marca o card de destaque (selo, borda vinho, fundo navy-soft). */
type Publication = {
  title: string;
  original: string;
  venue: string;
  authorship: string;
  url: string;
  highlight?: boolean;
  badge?: string;
};
const publications: Publication[] = [
  {
    title:
      "Análise comparativa de variáveis ecocardiográficas convencionais e de speckle tracking entre transplantados cardíacos sem rejeição e indivíduos saudáveis",
    original:
      "Comparative Analysis of Conventional and Speckle Tracking Echocardiographic Variables between Patients with Unrejected Heart Transplants and Healthy Individuals",
    venue: "Arquivos Brasileiros de Cardiologia · 2024 · v. 121, n. 8",
    authorship:
      "Primeira autora. Premiado como Melhor Tema Livre no XXII Congresso de Cardiologia de Brasília (SBC/DF, 2022).",
    url: "https://abccardiol.org/en/article/comparative-analysis-of-conventional-and-speckle-tracking-echocardiographic-variables-between-patients-with-unrejected-heart-transplants-and-healthy-individuals/",
    highlight: true,
    badge: "1º lugar · Melhor Tema Livre",
  },
  {
    title: "Ressecção de sarcoma cardíaco recorrente com autotransplante parcial modificado",
    original: "Recurrent Cardiac Sarcoma Resection With Modified Partial Autotransplantation",
    venue: "JACC: Case Reports · 2021 · v. 3, n. 15",
    authorship: "Primeira autora",
    url: "https://doi.org/10.1016/j.jaccas.2021.08.005",
  },
  {
    title:
      "Rejeição celular aguda em transplantados cardíacos: strain longitudinal global, trabalho miocárdico e um grupo exclusivo de doença de Chagas",
    original:
      "Acute Cellular Rejection in Heart Transplant Patients: Insights of Global Longitudinal Strain, Myocardial Work, and an Exclusive Group of Chagas Disease",
    venue: "Frontiers in Cardiovascular Medicine · 2022 · v. 9",
    authorship: "Coautora",
    url: "https://www.frontiersin.org/article/10.3389/fcvm.2022.841698",
  },
];

const diffs = [
  { icon: Clock, t: "Consulta sem pressa", d: "Tempo para entender sua história, seus hábitos e suas dúvidas — e explicar cada exame com clareza." },
  { icon: GraduationCap, t: "Experiência e formação", d: "Graduada em Medicina há mais de 20 anos, com residências em Clínica Médica, Cardiologia e Ecocardiografia, além de mestrado pela UnB." },
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
  { q: "O aplicativo substitui a consulta?", a: "Não. Ele complementa o cuidado: as consultas continuam, e o aplicativo mantém você e a médica conectados no intervalo entre elas." },
];

function Index() {
  return (
    <>
      <Header />
      <main id="inicio" className="pt-[76px] text-foreground">
        {/* Hero */}
        <section className="section-pad">
          <div className={`${wrap} grid items-center gap-10 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:gap-14`}>
            <div className="order-2 text-center md:order-1 md:text-left">
              <p className="font-brand text-xl font-medium uppercase text-navy md:text-2xl">Dra. Aline Martins Dall'Orto</p>
              <p className="eyebrow mt-3">Cardiologista · Prevenção e longevidade</p>
              <p className="mt-2 text-sm text-muted-foreground">CRM-DF 15170 · RQE 10578 / 10577</p>
              <h1 className="mx-auto mt-6 max-w-3xl text-[2.5rem] leading-[1.08] md:mx-0 md:text-5xl">Cuidar do coração antes que ele dê sinais.</h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:mx-0">Médica há mais de 20 anos, com atuação preventiva e atendimento particular feito com tempo, escuta e atenção.</p>
              <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap md:justify-start">
                 <Button asChild className={`${btnPrimary} h-auto whitespace-normal px-4 shadow-none`}><a href={whatsappUrl} target="_blank" rel="noopener noreferrer">Agendar consulta</a></Button>
                <Button asChild variant="outline" className={`${btnOutline} h-auto whitespace-normal px-4 shadow-none`}><a href="#cardio360">Conhecer o Cardio 360</a></Button>
                <Button asChild variant="outline" className={`${btnOutline} h-auto whitespace-normal px-4 shadow-none`}><a href="#localizacao">Como chegar</a></Button>
              </div>
            </div>
            <div className="order-1 md:order-2"><HeroPhoto /></div>
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
            <div className="flex flex-col items-center gap-7">
              <SobrePhoto />
              <Button asChild variant="outline" className={`${btnOutline} h-auto shadow-none`}>
                <a href="https://www.instagram.com/dra.alinemartinscardio/" target="_blank" rel="noopener noreferrer">
                  <Instagram size={20} strokeWidth={1.5} aria-hidden />Instagram da Dra. Aline
                </a>
              </Button>
            </div>
            <div>
              <p className="eyebrow">Sobre a Dra. Aline</p>
              <h2 className="mt-4 text-4xl leading-tight md:text-5xl">Medicina feita com escuta, ciência e presença.</h2>
              <p className="mt-6 leading-relaxed text-muted-foreground">Sou médica há mais de 20 anos e cardiologista com atuação preventiva, para promover saúde e bem-estar com carinho e atenção. Atendo pacientes particulares de forma online e presencial em Brasília.</p>
              <p className="mt-4 leading-relaxed text-muted-foreground">Acredito que o melhor momento de cuidar do coração é antes da doença aparecer, quando ainda é possível mudar hábitos com mais leveza.</p>
              <p className="eyebrow mt-8">Formação acadêmica</p>
              <ul className="mt-4 space-y-3">
                {[
                  "Graduação em Medicina pela Universidade Federal do Pará, com destaque acadêmico",
                  "Residência em Clínica Médica pela Secretaria de Saúde do Distrito Federal (SES-DF)",
                  "Residência em Cardiologia pela Universidade de Brasília (UnB) e Instituto de Cardiologia e Transplantes do Distrito Federal (ICTDF)",
                  "Residência em Ecocardiografia pelo ICTDF",
                  "Mestrado em Ciências Médicas pela Universidade de Brasília (UnB)",
                  "Título de especialista em Cardiologia e Ecocardiografia pela Sociedade Brasileira de Cardiologia (SBC)",
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
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">Pesquisa em ecocardiografia avançada e transplante cardíaco, publicada em revistas nacionais e internacionais.</p>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {publications.map((pub) => (
                <article key={pub.url} className={`flex flex-col rounded-[14px] border border-border p-5 ${pub.highlight ? "border-l-4 border-l-primary bg-navy-soft" : ""}`}>
                  {pub.highlight ? (
                    <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-3 py-1.5 text-[12px] font-semibold leading-none text-primary-foreground">
                      <Award size={14} strokeWidth={1.5} aria-hidden />{pub.badge}
                    </span>
                  ) : (
                    <FileText className="text-primary" size={22} strokeWidth={1.5} aria-hidden />
                  )}
                  <p className="mt-3 text-xs text-muted-foreground">{pub.venue}</p>
                  <h3 className="mt-1.5 text-base leading-snug">{pub.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{pub.authorship}</p>
                  <p className="mt-2 text-xs italic leading-relaxed text-muted-foreground">{pub.original}</p>
                  <a href={pub.url} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex min-h-11 items-center gap-1.5 pt-3 text-sm font-semibold text-primary hover:underline">Ler publicação<ArrowUpRight size={14} aria-hidden /></a>
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
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">Na minha consulta, você não é só mais um horário na agenda. É o momento de olhar para a saúde do seu coração por inteiro.</p>
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
                  <li>Segunda a sexta, 8h30 às 18h</li>
                  <li>Atendimento particular</li>
                  <li>Pagamento por Pix ou cartão de crédito</li>
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
            <div className="mt-10 text-center"><Button asChild className={`${btnPrimary} h-auto whitespace-normal shadow-none`}><a href={whatsappUrl} target="_blank" rel="noopener noreferrer">Agendar minha consulta</a></Button></div>
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
            <div className="mt-8 grid gap-8 md:grid-cols-[1fr_1.6fr] md:items-start">
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex gap-3"><MapPin size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-primary" aria-hidden /><span><span className="font-semibold text-foreground">{ADDRESS_LINE_1}</span><br />{ADDRESS_LINE_2}</span></li>
                <li><Button asChild variant="link" className="h-auto min-h-11 justify-start gap-3 px-0 text-base text-muted-foreground hover:text-primary"><a href={whatsappUrl} target="_blank" rel="noopener noreferrer"><Phone size={20} strokeWidth={1.5} className="shrink-0 text-primary" aria-hidden />{WHATSAPP_DISPLAY}</a></Button></li>
                <li><a href={`mailto:${EMAIL}`} className="flex min-h-11 items-center gap-3 break-all hover:text-primary"><Mail size={20} strokeWidth={1.5} className="shrink-0 text-primary" aria-hidden />{EMAIL}</a></li>
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
                 <Button asChild className={`${btnCream} h-auto whitespace-normal shadow-none`}><a href={whatsappUrl} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} strokeWidth={1.5} />Agendar consulta</a></Button>
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

      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Agendar pelo WhatsApp" className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary-hover">
        <MessageCircle size={26} strokeWidth={1.5} aria-hidden />
      </a>
    </>
  );
}
