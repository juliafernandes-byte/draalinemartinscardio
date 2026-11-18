import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { AlertTriangle, ArrowRight, Check, CheckCircle, Info, MessageCircle } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { agendamentoSchema, identidadeSchema, montarWhatsAppUrl, motivos, motivosSchema, acompanhamentos, acompanhamentoSchema, objetivos, alternarMotivo, origemDaBusca, origemSchema, preferenciasSchema, valoresConsulta, formatarValorConsulta, VALOR_CONSULTA, DEPOIMENTOS, type Origem } from "@/lib/agendamento";

const Context = createContext<(() => void) | null>(null);
const originKey = "agendamento_origem";
type Errors = Partial<Record<"nome" | "motivos" | "acompanhamento" | "objetivo" | "modalidade" | "consentimento", string>>;

export function AgendamentoProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const origem = useRef<Origem>({});
  const trigger = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const current = origemDaBusca(window.location.search);
    try {
      const saved = sessionStorage.getItem(originKey);
      const parsed = saved ? origemSchema.safeParse(JSON.parse(saved)) : null;
      if (parsed?.success && Object.keys(parsed.data).length) origem.current = parsed.data;
      else {
        origem.current = current;
        if (Object.keys(current).length) sessionStorage.setItem(originKey, JSON.stringify(current));
      }
    } catch {
      origem.current = current;
    }
  }, []);
  return (
    <Context.Provider value={() => { trigger.current = document.activeElement instanceof HTMLElement ? document.activeElement : null; setOpen(true); }}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        {open && <DialogContent
          className="bottom-0 left-0 top-auto flex h-dvh max-h-dvh max-w-none translate-x-0 translate-y-0 flex-col gap-0 rounded-t-[14px] p-0 data-[state=open]:slide-in-from-bottom data-[state=open]:zoom-in-100 sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:h-[850px] sm:max-h-[90dvh] sm:max-w-xl sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[14px] motion-reduce:animate-none"
          onCloseAutoFocus={event => { event.preventDefault(); trigger.current?.focus(); }}
        >
          <AgendamentoForm origem={origem.current} />
        </DialogContent>}
      </Dialog>
    </Context.Provider>
  );
}

export function AgendarButton({ onClick, ...props }: ButtonProps) {
  const abrir = useContext(Context);
  return <Button {...props} type="button" onClick={event => { onClick?.(event); abrir?.(); }} />;
}

function ErrorText({ name, errors }: { name: keyof Errors; errors: Errors }) {
  return errors[name] ? <p id={`${name}-error`} className="mt-2 text-sm text-primary" role="alert">{errors[name]}</p> : null;
}

function ChoiceCards({ options, selected, onChange, multiple = false }: {
  options: readonly string[]; selected: readonly string[]; onChange: (value: string) => void; multiple?: boolean;
}) {
  return <div className="space-y-2">
    {options.map(option => {
      const checked = selected.includes(option);
      return <Button key={option} type="button" variant="outline" aria-pressed={checked}
        className={`h-auto min-h-11 w-full justify-between whitespace-normal rounded-lg px-3 py-2 text-left text-sm font-normal leading-snug shadow-none ${checked ? "border-primary bg-secondary text-foreground hover:bg-secondary" : "text-foreground"}`}
        onClick={() => onChange(option)}>
        <span>{option}</span>
        <span aria-hidden className={`flex size-5 shrink-0 items-center justify-center border ${multiple ? "rounded" : "rounded-full"} ${checked ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>{checked && <Check size={14} />}</span>
      </Button>;
    })}
  </div>;
}

const labels = ["Vamos começar — só 4 passos rápidos", "Ótimo! Continue", "Quase lá", "Último passo"];
const questions = ["O que te traz à cardiologista?", "Você já faz acompanhamento com cardiologista?", "Qual frase melhor te descreve?", "Último passo"];
const emptyFields = { nome: "", motivos: [] as string[], acompanhamento: "", objetivo: "", modalidade: "", consentimento: false };

function AgendamentoForm({ origem }: { origem: Origem }) {
  const [step, setStep] = useState(1);
  const [fields, setFields] = useState(emptyFields);
  const [errors, setErrors] = useState<Errors>({});
  const [successUrl, setSuccessUrl] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const stageRef = useRef<HTMLHeadingElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
    if (step === 4 && !successUrl) nameRef.current?.focus();
    else stageRef.current?.focus();
  }, [step, successUrl]);
  function update(key: keyof typeof fields, value: string | string[] | boolean) {
    setFields(previous => ({ ...previous, [key]: value }));
    setErrors(previous => { const next = { ...previous }; delete next[key]; return next; });
  }
  function submit() {
    const schema = step === 1 ? motivosSchema : step === 2 ? acompanhamentoSchema : step === 3 ? preferenciasSchema : identidadeSchema;
    const parsed = schema.safeParse(fields);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) next[issue.path[0] as keyof Errors] ??= issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    if (step < 4) { setStep(step + 1); return; }
    const final = agendamentoSchema.safeParse(fields);
    if (!final.success) { setStep(1); return; }
    const url = montarWhatsAppUrl(final.data, origem);
    window.open(url, "_blank", "noopener,noreferrer");
    const trackingWindow = window as Window & { dataLayer?: { push: (event: { event: string; modalidade: string; tipo: string }) => unknown } };
    try { trackingWindow.dataLayer?.push({ event: "agendamento_whatsapp", modalidade: final.data.modalidade, tipo: final.data.acompanhamento === acompanhamentos[2] ? "retorno" : "primeira" }); } catch { /* Analytics must never interrupt scheduling. */ }
    setFields(emptyFields);
    setSuccessUrl(url);
  }
  const depoimento = DEPOIMENTOS[0];
  return <>
    <div className="shrink-0 border-b border-border px-5 pb-3 pt-5 sm:px-6">
      <DialogTitle className="pr-8 font-display text-2xl font-medium leading-tight tracking-normal text-navy">Conte um pouco sobre você</DialogTitle>
      <DialogDescription className="mt-2 text-sm leading-snug">A Dra. Aline vai ler suas respostas antes do primeiro contato para entender o melhor caminho para você. Leva menos de 1 minuto.</DialogDescription>
      <div className="mt-3 flex gap-2 rounded-lg bg-secondary p-3 text-xs leading-relaxed text-foreground">
        <AlertTriangle className="mt-0.5 shrink-0 text-primary" size={18} aria-hidden />
        <p>Em caso de dor no peito, falta de ar intensa ou desmaio agora, não agende: ligue 192 ou procure um pronto-socorro.</p>
      </div>
      {!successUrl && <div className="mt-3" role="progressbar" aria-valuemin={1} aria-valuemax={4} aria-valuenow={step} aria-label={`Passo ${step} de 4`}>
        <div className="grid grid-cols-4 gap-2" aria-hidden>{labels.map((label, index) => <span key={label} className={`h-1 rounded-full ${index < step ? "bg-primary" : "bg-border"}`} />)}</div>
        <p className="mt-2 text-xs font-semibold text-teal" aria-live="polite">{labels[step - 1]}</p>
      </div>}
    </div>
    {successUrl ? <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto px-5 py-8 text-center sm:px-6">
      <CheckCircle size={48} className="mx-auto text-primary" aria-hidden />
      <h3 ref={stageRef} tabIndex={-1} className="mt-5 text-2xl leading-snug focus:outline-none">Pronto! Finalize o envio no WhatsApp.</h3>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">A equipe combinará o horário e enviará os dados para pagamento do sinal de {formatarValorConsulta(valoresConsulta.sinalCentavos)}. A reserva na agenda será assegurada após a confirmação do pagamento pela equipe.</p>
      <Button asChild variant="link" className="mt-5 h-auto min-h-11 whitespace-normal text-base"><a href={successUrl} target="_blank" rel="noopener noreferrer">Abrir WhatsApp de novo<MessageCircle aria-hidden /></a></Button>
    </div> : <form noValidate className="flex min-h-0 flex-1 flex-col" onSubmit={event => { event.preventDefault(); submit(); }}>
      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4 sm:px-6">
        {step === 3 && <div className="mb-4 flex gap-3 rounded-lg bg-navy-soft p-3 text-sm leading-relaxed text-foreground">
          <Info size={20} className="mt-0.5 shrink-0 text-navy" aria-hidden />
          <div>
            <p>A primeira consulta com a Dra. Aline é particular, sem pressa, e inclui avaliação completa do seu risco cardiovascular e um plano de cuidado feito para você. Presencial no Centro Clínico OHB ou online.{VALOR_CONSULTA !== null && ` Valor da consulta: ${formatarValorConsulta(VALOR_CONSULTA * 100)}.`}</p>
            <p className="mt-3">Para garantir seu horário, é pago um sinal de {formatarValorConsulta(valoresConsulta.sinalCentavos)} no agendamento, abatido integralmente do valor da consulta.{valoresConsulta.estornarAoCancelar && " Se precisar cancelar, o sinal é devolvido;"}{valoresConsulta.manterSinalAoRemarcar && " se remarcar, ele continua válido."}</p>
          </div>
        </div>}
        <h3 ref={stageRef} tabIndex={-1} className="mb-3 text-xl leading-tight focus:outline-none">{questions[step - 1]}</h3>
        {step === 1 && <fieldset aria-labelledby="quiz-motivos" aria-describedby={errors.motivos ? "motivos-error" : undefined}>
          <legend id="quiz-motivos" className="mb-3 text-sm text-muted-foreground">Marque as principais opções.</legend>
          <ChoiceCards options={motivos} selected={fields.motivos} multiple onChange={value => update("motivos", alternarMotivo(fields.motivos, value))} />
          <ErrorText name="motivos" errors={errors} />
        </fieldset>}
        {step === 2 && <>
          {depoimento && <blockquote className="mb-4 border-l-4 border-primary pl-4 text-sm">
            <span aria-hidden className="font-display text-4xl leading-none text-primary">“</span>
            <p className="italic text-muted-foreground">{depoimento.texto}</p>
            <footer className="mt-2 font-semibold text-navy">{depoimento.nome} · {depoimento.cidade}</footer>
          </blockquote>}
          <ChoiceCards options={acompanhamentos} selected={[fields.acompanhamento]} onChange={value => update("acompanhamento", value)} />
          <ErrorText name="acompanhamento" errors={errors} />
        </>}
        {step === 3 && <>
          <ChoiceCards options={objetivos} selected={[fields.objetivo]} onChange={value => update("objetivo", value)} />
          <ErrorText name="objetivo" errors={errors} />
          <fieldset className="mt-5" aria-describedby={errors.modalidade ? "modalidade-error" : undefined}>
            <legend className="mb-3 text-sm font-semibold">Como prefere ser atendida(o)?</legend>
            <div className="flex flex-wrap gap-2">{([["presencial", "Presencial · OHB"], ["online", "Online"]] as const).map(([value, label]) => <Button key={value} type="button" variant="outline" aria-pressed={fields.modalidade === value} className={`h-auto min-h-11 rounded-full px-4 shadow-none ${fields.modalidade === value ? "border-primary bg-primary text-primary-foreground hover:bg-primary-hover hover:text-primary-foreground" : ""}`} onClick={() => update("modalidade", value)}>{label}</Button>)}</div>
            <ErrorText name="modalidade" errors={errors} />
          </fieldset>
        </>}
        {step === 4 && <>
          <label htmlFor="agendamento-nome" className="text-sm font-semibold">Seu nome</label>
          <Input ref={nameRef} id="agendamento-nome" autoComplete="name" required maxLength={100} value={fields.nome} onChange={event => update("nome", event.target.value)} aria-invalid={Boolean(errors.nome)} aria-describedby={errors.nome ? "nome-error" : undefined} className="mt-2 h-11 text-base" />
          <ErrorText name="nome" errors={errors} />
          <label htmlFor="agendamento-consentimento" className="mt-5 flex min-h-11 cursor-pointer items-start gap-3 py-2 text-sm leading-relaxed">
            <Checkbox id="agendamento-consentimento" checked={fields.consentimento} onCheckedChange={value => update("consentimento", value === true)} aria-required="true" aria-invalid={Boolean(errors.consentimento)} aria-describedby={errors.consentimento ? "consentimento-privacy consentimento-error" : "consentimento-privacy"} className="mt-1 shrink-0" />
            Concordo em enviar estas respostas pelo WhatsApp para agendamento.
          </label>
          <p id="consentimento-privacy" className="mt-1 text-xs text-muted-foreground">O site não guarda suas respostas.</p>
          <ErrorText name="consentimento" errors={errors} />
        </>}
      </div>
      <div className="flex shrink-0 gap-3 border-t border-border bg-background px-5 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-6">
        <Button type="button" variant="ghost" disabled={step === 1} className="min-h-11 rounded-full text-muted-foreground" onClick={() => { setErrors({}); setStep(step - 1); }}>Voltar</Button>
        <Button type="submit" className="h-auto min-h-11 flex-1 whitespace-normal rounded-full py-3">{step === 4 ? <><MessageCircle aria-hidden />Agendar pelo WhatsApp</> : <>Continuar<ArrowRight aria-hidden /></>}</Button>
      </div>
    </form>}
  </>;
}
