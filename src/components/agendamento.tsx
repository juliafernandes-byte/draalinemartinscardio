import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { AlertTriangle, ArrowLeft, ArrowRight, CheckCircle, MessageCircle } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { agendamentoSchema, identidadeSchema, mascararWhatsApp, montarWhatsAppUrl, motivos, origemDaBusca, origemSchema, preferenciasSchema, type Origem } from "@/lib/agendamento";

const Context = createContext<(() => void) | null>(null);
const originKey = "agendamento_origem";
type Errors = Partial<Record<"nome" | "whatsapp" | "tipo" | "modalidade" | "periodo" | "motivo" | "consentimento", string>>;

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
          className="bottom-0 left-0 top-auto flex h-dvh max-h-dvh max-w-none translate-x-0 translate-y-0 flex-col gap-0 rounded-t-[14px] p-0 data-[state=open]:slide-in-from-bottom data-[state=open]:zoom-in-100 sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:h-auto sm:max-h-[90dvh] sm:max-w-xl sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[14px] motion-reduce:animate-none"
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

function Choices({ name, legend, value, options, onChange, errors, optional = false }: {
  name: keyof Errors; legend: string; value: string; options: readonly (readonly [string, string])[];
  onChange: (value: string) => void; errors: Errors; optional?: boolean;
}) {
  return <fieldset aria-describedby={errors[name] ? `${name}-error` : undefined}>
    <legend className="mb-3 text-sm font-semibold text-foreground">{legend}{optional && <span className="font-normal text-muted-foreground"> (opcional)</span>}</legend>
    <div className="flex flex-wrap gap-2">
      {options.map(([key, label]) => <Button key={key} variant="outline" type="button" aria-pressed={value === key}
        className={`h-auto min-h-11 max-w-full whitespace-normal rounded-full px-4 py-2.5 text-left shadow-none ${value === key ? "border-primary bg-primary text-primary-foreground hover:bg-primary-hover hover:text-primary-foreground" : "text-foreground"}`}
        onClick={() => onChange(optional && value === key ? "" : key)}>{label}</Button>)}
    </div>
    <ErrorText name={name} errors={errors} />
  </fieldset>;
}

function AgendamentoForm({ origem }: { origem: Origem }) {
  const [step, setStep] = useState(1);
  const [fields, setFields] = useState({ nome: "", whatsapp: "", tipo: "", modalidade: "", periodo: "", motivo: "", consentimento: false });
  const [errors, setErrors] = useState<Errors>({});
  const [successUrl, setSuccessUrl] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const stageRef = useRef<HTMLHeadingElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
    if (step === 1 && !successUrl) nameRef.current?.focus();
    else stageRef.current?.focus();
  }, [step, successUrl]);
  const update = (key: keyof typeof fields, value: string | boolean) => {
    setFields(previous => ({ ...previous, [key]: value }));
    setErrors(previous => { const next = { ...previous }; delete next[key]; return next; });
  };
  function validate(nextStep: boolean) {
    const input = { ...fields, motivo: fields.motivo || undefined };
    const parsed = (nextStep ? identidadeSchema : preferenciasSchema).safeParse(input);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Errors;
        next[key] ??= issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    if (nextStep) { setStep(2); return; }
    const final = agendamentoSchema.safeParse(input);
    if (!final.success) { setStep(1); return; }
    const url = montarWhatsAppUrl(final.data, origem);
    window.open(url, "_blank", "noopener,noreferrer");
    const trackingWindow = window as Window & { dataLayer?: { push: (event: { event: string; modalidade: string; tipo: string }) => unknown } };
    try { trackingWindow.dataLayer?.push({ event: "agendamento_whatsapp", modalidade: final.data.modalidade, tipo: final.data.tipo }); } catch { /* Analytics must never interrupt scheduling. */ }
    setFields({ nome: "", whatsapp: "", tipo: "", modalidade: "", periodo: "", motivo: "", consentimento: false });
    setSuccessUrl(url);
  }
  return <>
    <div className="shrink-0 border-b border-border px-5 pb-4 pt-6 sm:px-6">
      <DialogTitle className="pr-10 font-display text-2xl font-medium leading-tight tracking-normal text-navy">Agendar consulta</DialogTitle>
      <DialogDescription className="mt-2 pr-7 leading-relaxed">Leva 30 segundos. Em seguida você fala direto com a equipe pelo WhatsApp.</DialogDescription>
      <div className="mt-4 flex gap-3 rounded-lg bg-secondary p-3 text-sm leading-relaxed text-foreground">
        <AlertTriangle className="mt-0.5 shrink-0 text-primary" size={20} aria-hidden />
        <p>Em caso de dor no peito, falta de ar intensa ou desmaio agora, não agende: ligue 192 ou procure um pronto-socorro.</p>
      </div>
    </div>
    <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6">
      {successUrl ? <div className="py-8 text-center">
        <CheckCircle size={48} className="mx-auto text-primary" aria-hidden />
        <h3 ref={stageRef} tabIndex={-1} className="mt-5 text-2xl leading-snug focus:outline-none">Pronto! Finalize o envio no WhatsApp.</h3>
        <Button asChild variant="link" className="mt-5 h-auto min-h-11 whitespace-normal text-base"><a href={successUrl} target="_blank" rel="noopener noreferrer">Abrir WhatsApp de novo<MessageCircle aria-hidden /></a></Button>
      </div> : <form noValidate onSubmit={event => { event.preventDefault(); validate(step === 1); }}>
        <p className="text-sm font-semibold text-teal" aria-live="polite">{step} de 2</p>
        <h3 ref={stageRef} tabIndex={-1} className="mb-5 mt-2 text-2xl focus:outline-none">{step === 1 ? "Quem é você" : "Como prefere"}</h3>
        <div className="space-y-5">
          {step === 1 ? <>
            <div><label htmlFor="agendamento-nome" className="text-sm font-semibold">Nome</label>
              <Input ref={nameRef} id="agendamento-nome" autoComplete="name" required maxLength={100} value={fields.nome} onChange={event => update("nome", event.target.value)} aria-invalid={Boolean(errors.nome)} aria-describedby={errors.nome ? "nome-error" : undefined} className="mt-2 h-11 text-base" />
              <ErrorText name="nome" errors={errors} />
            </div>
            <div><label htmlFor="agendamento-whatsapp" className="text-sm font-semibold">WhatsApp</label>
              <Input id="agendamento-whatsapp" type="tel" inputMode="tel" autoComplete="tel-national" placeholder="(00) 00000-0000" required maxLength={16} value={fields.whatsapp} onChange={event => update("whatsapp", mascararWhatsApp(event.target.value))} aria-invalid={Boolean(errors.whatsapp)} aria-describedby={errors.whatsapp ? "whatsapp-error" : undefined} className="mt-2 h-11 text-base" />
              <ErrorText name="whatsapp" errors={errors} />
            </div>
            <Choices name="tipo" legend="É sua primeira consulta com a Dra. Aline?" value={fields.tipo} options={[["primeira", "Sim, primeira consulta"], ["retorno", "Já sou paciente"]]} onChange={value => update("tipo", value)} errors={errors} />
          </> : <>
            <Choices name="modalidade" legend="Modalidade" value={fields.modalidade} options={[["presencial", "Presencial · Centro Clínico OHB"], ["online", "Online"]]} onChange={value => update("modalidade", value)} errors={errors} />
            <Choices name="periodo" legend="Melhor período" value={fields.periodo} options={[["manha", "Manhã"], ["tarde", "Tarde"], ["qualquer", "Tanto faz"]]} onChange={value => update("periodo", value)} errors={errors} />
            <Choices name="motivo" legend="Motivo principal" value={fields.motivo} options={motivos.map(value => [value, value] as const)} onChange={value => update("motivo", value)} errors={errors} optional />
            <div>
              <label htmlFor="agendamento-consentimento" className="flex min-h-11 cursor-pointer items-start gap-3 py-2 text-sm leading-relaxed">
                <Checkbox id="agendamento-consentimento" checked={fields.consentimento} onCheckedChange={value => update("consentimento", value === true)} aria-required="true" aria-invalid={Boolean(errors.consentimento)} aria-describedby="consentimento-privacy consentimento-error" className="mt-1 shrink-0" />
                Concordo em enviar estes dados pelo WhatsApp para agendamento.
              </label>
              <p id="consentimento-privacy" className="mt-1 text-xs leading-relaxed text-muted-foreground">O site não guarda suas respostas; elas seguem apenas na mensagem para a equipe da Dra. Aline.</p>
              <ErrorText name="consentimento" errors={errors} />
            </div>
          </>}
        </div>
        <div className="mt-6 flex gap-3">
          {step === 2 && <Button type="button" variant="outline" className="h-auto min-h-11 rounded-full" onClick={() => { setErrors({}); setStep(1); }}><ArrowLeft aria-hidden />Voltar</Button>}
          <Button type="submit" className="h-auto min-h-11 flex-1 whitespace-normal rounded-full py-3">{step === 1 ? <>Continuar<ArrowRight aria-hidden /></> : <><MessageCircle aria-hidden />Enviar e abrir WhatsApp</>}</Button>
        </div>
      </form>}
    </div>
  </>;
}