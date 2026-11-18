import { z } from "zod";
import { WHATSAPP_NUMBER } from "./whatsapp";

export const valoresConsulta = {
  consultaCentavos: 35000,
  sinalCentavos: 10000,
  estornarAoCancelar: true,
  manterSinalAoRemarcar: true,
};

export function saldoConsultaCentavos() {
  return valoresConsulta.consultaCentavos - valoresConsulta.sinalCentavos;
}

export function formatarValorConsulta(centavos: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(centavos / 100);
}

export const motivos = ["Check-up preventivo", "Pressão ou colesterol", "Menopausa e coração", "Avaliação antes de treinar", "Acompanhamento pelo Cardio 360", "Outro", "Prefiro contar na consulta"] as const;

export const identidadeSchema = z.object({
  nome: z.string().trim().min(1, "Informe seu nome.").max(100, "Use até 100 caracteres.").regex(/^[\p{L}\p{M} .’'-]+$/u, "Use apenas letras, espaços, apóstrofos, pontos ou hífens."),
  whatsapp: z.string().max(16).regex(/^[\d ()-]+$/, "Informe um WhatsApp válido.").transform(value => value.replace(/\D/g, "")).refine(value => /^\d{10,11}$/.test(value), "Informe um WhatsApp com DDD e 10 ou 11 dígitos."),
  tipo: z.enum(["primeira", "retorno"], { errorMap: () => ({ message: "Selecione se é sua primeira consulta." }) }),
});
export const preferenciasSchema = z.object({
  modalidade: z.enum(["presencial", "online"], { errorMap: () => ({ message: "Selecione a modalidade." }) }),
  periodo: z.enum(["manha", "tarde", "qualquer"], { errorMap: () => ({ message: "Selecione o melhor período." }) }),
  motivo: z.enum(motivos).optional(),
  consentimento: z.literal(true, { errorMap: () => ({ message: "É necessário concordar com o envio pelo WhatsApp." }) }),
});
export const agendamentoSchema = identidadeSchema.merge(preferenciasSchema);
export type Agendamento = z.infer<typeof agendamentoSchema>;

export const origemSchema = z.object({
  utm_source: z.string().trim().max(100).regex(/^[\p{L}\p{N} _.-]*$/u).optional(),
  utm_campaign: z.string().trim().max(150).regex(/^[\p{L}\p{N} _.-]*$/u).optional(),
  gclid: z.string().max(256).regex(/^[a-zA-Z0-9_-]+$/).optional(),
}).strict();
export type Origem = z.infer<typeof origemSchema>;

export function origemDaBusca(search: string): Origem {
  const params = new URLSearchParams(search);
  const origem: Origem = {};
  for (const key of ["utm_source", "utm_campaign", "gclid"] as const) {
    const value = params.get(key);
    const parsed = origemSchema.shape[key].safeParse(value ?? undefined);
    if (parsed.success && parsed.data) origem[key] = parsed.data;
  }
  return origem;
}

export function montarMensagem(input: unknown, source?: unknown): string {
  // Revalidate at the outbound boundary; no data is sent to a site server.
  const data = agendamentoSchema.parse(input);
  const parsed = origemSchema.safeParse(source ?? {});
  const origem = parsed.success ? parsed.data : {};
  const tipo = data.tipo === "primeira" ? "uma primeira consulta" : "um retorno";
  const modalidade = data.modalidade === "online" ? "online" : "presencial no OHB";
  const periodo = { manha: "pela manhã", tarde: "à tarde", qualquer: "em qualquer período" }[data.periodo];
  const motivo = data.motivo && data.motivo !== "Prefiro contar na consulta" ? ` Motivo: ${data.motivo}.` : "";
  const via = origem.gclid ? " (via: Google Ads)" : origem.utm_source ? ` (via: ${origem.utm_source})` : "";
  return `Olá, Dra. Aline! Sou ${data.nome} e gostaria de agendar ${tipo} ${modalidade}, de preferência ${periodo}.${motivo} Meu WhatsApp: ${data.whatsapp}.${via}`;
}

export function montarWhatsAppUrl(input: unknown, source?: unknown): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(montarMensagem(input, source))}`;
}

export function mascararWhatsApp(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (!digits) return "";
  if (digits.length <= 2) return `(${digits}`;
  const middle = digits.length > 10 ? 7 : 6;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, middle)}${digits.length > middle ? `-${digits.slice(middle)}` : ""}`;
}