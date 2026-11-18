import { describe, expect, it } from "vitest";
import { agendamentoSchema, identidadeSchema, mascararWhatsApp, montarMensagem, montarWhatsAppUrl, origemDaBusca } from "./agendamento";

const base = { nome: "Ana Maria", whatsapp: "(61) 99999-1234", tipo: "primeira", modalidade: "online", periodo: "manha", consentimento: true };
describe("Mensagem de agendamento", () => {
  it("primeira consulta online com motivo", () => {
    expect(montarMensagem({ ...base, motivo: "Check-up preventivo" })).toBe("Olá, Dra. Aline! Sou Ana Maria e gostaria de agendar uma primeira consulta online, de preferência pela manhã. Motivo: Check-up preventivo. Meu WhatsApp: 61999991234.");
  });
  it("retorno presencial sem motivo", () => {
    expect(montarMensagem({ ...base, tipo: "retorno", modalidade: "presencial", periodo: "tarde" })).toBe("Olá, Dra. Aline! Sou Ana Maria e gostaria de agendar um retorno presencial no OHB, de preferência à tarde. Meu WhatsApp: 61999991234.");
  });
  it("omite Prefiro contar na consulta", () => {
    expect(montarMensagem({ ...base, motivo: "Prefiro contar na consulta", periodo: "qualquer" })).toBe("Olá, Dra. Aline! Sou Ana Maria e gostaria de agendar uma primeira consulta online, de preferência em qualquer período. Meu WhatsApp: 61999991234.");
  });
  it("gclid identifica Google Ads antes de utm_source", () => {
    expect(montarMensagem(base, { gclid: "abc_123", utm_source: "instagram" })).toBe("Olá, Dra. Aline! Sou Ana Maria e gostaria de agendar uma primeira consulta online, de preferência pela manhã. Meu WhatsApp: 61999991234. (via: Google Ads)");
  });
  it("inclui origem utm e lê campanha", () => {
    const origem = origemDaBusca("?utm_source=instagram&utm_campaign=consulta");
    expect(origem).toEqual({ utm_source: "instagram", utm_campaign: "consulta" });
    expect(montarMensagem(base, origem)).toContain(" (via: instagram)");
  });
  it("usa o destino real e codifica a mensagem", () => {
    const url = new URL(montarWhatsAppUrl(base));
    expect(url.origin + url.pathname).toBe("https://wa.me/5561999832552");
    expect(url.searchParams.get("text")).toBe(montarMensagem(base));
  });
});
describe("Validação antes do envio", () => {
  it("aceita 10 e 11 dígitos e rejeita outros comprimentos", () => {
    for (const whatsapp of ["6199991234", "61999991234"]) expect(identidadeSchema.safeParse({ ...base, whatsapp }).success).toBe(true);
    for (const whatsapp of ["619999123", "619999912345"]) expect(identidadeSchema.safeParse({ ...base, whatsapp }).success).toBe(false);
  });
  it("exige consentimento", () => {
    expect(agendamentoSchema.safeParse({ ...base, consentimento: false }).success).toBe(false);
    expect(() => montarMensagem({ ...base, consentimento: false })).toThrow();
  });
  it("exige nome e escolhas obrigatórias", () => {
    for (const key of ["nome", "tipo", "modalidade", "periodo"]) expect(agendamentoSchema.safeParse({ ...base, [key]: "" }).success).toBe(false);
  });
  it("limita nome e rejeita caracteres de marcação", () => {
    for (const nome of ["a".repeat(101), "<script>"]) expect(agendamentoSchema.safeParse({ ...base, nome }).success).toBe(false);
  });
  it("ignora origem inválida", () => {
    expect(origemDaBusca("?utm_source=%3Cscript%3E&gclid=%3Cscript%3E")).toEqual({});
  });
  it("aplica máscara de 10 e 11 dígitos", () => {
    expect(mascararWhatsApp("61999991234")).toBe("(61) 99999-1234");
    expect(mascararWhatsApp("6199991234")).toBe("(61) 9999-1234");
  });
});