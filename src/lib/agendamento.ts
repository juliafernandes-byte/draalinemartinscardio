import { z } from "zod";
import { WHATSAPP_NUMBER } from "./whatsapp";

export const valoresConsulta = {
  consultaCentavos: 35000,
  sinalCentavos: 20000,
  estornarAoCancelar: true,
  manterSinalAoRemarcar: true,
};

export function saldoConsultaCentavos() {
  return valoresConsulta.consultaCentavos - valoresConsulta.sinalCentavos;
}

export function formatarValorConsulta(centavos: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(centavos / 100);
}

// Optional display value in reais; null keeps the consultation price hidden in the quiz.
export const VALOR_CONSULTA: number | null = null;
export type Depoimento = { texto: string; nome: string; cidade: string };
// Usar apenas depoimentos reais e espontâneos, com autorização escrita do paciente e sem adjetivos de superioridade (Resolução CFM 2.336/2023).
export const DEPOIMENTOS: Depoimento[] = [];

export const PREFIRO_CONTAR = "Prefiro contar na consulta";
export const motivos = [
  "Quero fazer um check-up preventivo do coração",
  "Tenho pressão alta ou colesterol alterado",
  "Estou na menopausa (ou perto dela) e quero cuidar do coração",
  "Tenho histórico de doença do coração na família",
  "Quero começar ou intensificar atividade física com segurança",
  "Já tenho um diagnóstico e quero um acompanhamento mais próximo",
  PREFIRO_CONTAR,
] as const;
export const acompanhamentos = [
  "Sim, mas sinto falta de um acompanhamento mais próximo",
  "Não, esta seria minha primeira avaliação",
  "Já sou paciente da Dra. Aline",
] as const;
export const objetivos = [
  "Quero cuidar do coração com um acompanhamento próximo, inclusive entre as consultas",
  "Quero primeiro uma avaliação completa e entender os próximos passos",
] as const;

export function alternarMotivo(atuais: readonly string[], motivo: string): string[] {
  if (atuais.includes(motivo)) return atuais.filter(item => item !== motivo);
  if (motivo === PREFIRO_CONTAR) return [motivo];
  return [...atuais.filter(item => item !== PREFIRO_CONTAR), motivo];
}

export const motivosSchema = z.object({
  motivos: z.array(z.enum(motivos)).min(1, "Selecione pelo menos uma opção.").refine(items => !items.includes(PREFIRO_CONTAR) || items.length === 1, "Escolha contar na consulta ou selecione os outros motivos."),
});
export const acompanhamentoSchema = z.object({
  acompanhamento: z.enum(acompanhamentos, { errorMap: () => ({ message: "Selecione uma opção de acompanhamento." }) }),
});
export const preferenciasSchema = z.object({
  objetivo: z.enum(objetivos, { errorMap: () => ({ message: "Selecione a frase que melhor te descreve." }) }),
  modalidade: z.enum(["presencial", "online"], { errorMap: () => ({ message: "Selecione como prefere ser atendida(o)." }) }),
});
export const identidadeSchema = z.object({
  nome: z.string().trim().min(1, "Informe seu nome.").max(100, "Use até 100 caracteres.").regex(/^[\p{L}\p{M} .’'-]+$/u, "Use apenas letras, espaços, apóstrofos, pontos ou hífens."),
  consentimento: z.literal(true, { errorMap: () => ({ message: "É necessário concordar com o envio pelo WhatsApp." }) }),
});
export const agendamentoSchema = motivosSchema.merge(acompanhamentoSchema).merge(preferenciasSchema).merge(identidadeSchema);
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
  const modalidade = data.modalidade === "online" ? "online" : "presencial no OHB";
  const linhas = [`Olá, Dra. Aline! Sou ${data.nome} e gostaria de agendar uma consulta ${modalidade}.`];
  if (!data.motivos.includes(PREFIRO_CONTAR)) linhas.push(`• O que me traz: ${data.motivos.join("; ")}`);
  linhas.push(`• Acompanhamento: ${data.acompanhamento}`, `• ${data.objetivo}`);
  if (origem.gclid) linhas.push("(via: Google Ads)");
  else if (origem.utm_source) linhas.push(`(via: ${origem.utm_source})`);
  return linhas.join("\n");
}

export function montarWhatsAppUrl(input: unknown, source?: unknown): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(montarMensagem(input, source))}`;
}
