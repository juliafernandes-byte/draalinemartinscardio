import { describe, expect, it } from "vitest";
import { agendamentoSchema, identidadeSchema, alternarMotivo, motivos, acompanhamentos, objetivos, PREFIRO_CONTAR, VALOR_CONSULTA, DEPOIMENTOS, montarMensagem, montarWhatsAppUrl, origemDaBusca, valoresConsulta, saldoConsultaCentavos } from "./agendamento";

describe("Valores da consulta", () => {
  it("consulta custa R$350,00", () => {
    expect(valoresConsulta.consultaCentavos).toBe(35000);
  });
  it("sinal custa R$200,00", () => {
    expect(valoresConsulta.sinalCentavos).toBe(20000);
  });
  it("deduz o sinal do pagamento final, restando R$150,00", () => {
    expect(saldoConsultaCentavos()).toBe(15000);
  });
  it("estorna o sinal em caso de cancelamento", () => {
    expect(valoresConsulta.estornarAoCancelar).toBe(true);
  });
  it("mantém o sinal válido ao remarcar", () => {
    expect(valoresConsulta.manterSinalAoRemarcar).toBe(true);
  });
});

const base = { nome: "Ana Maria", motivos: [motivos[0]], acompanhamento: acompanhamentos[1], objetivo: objetivos[0], modalidade: "online", consentimento: true };
describe("Mensagem do quiz", () => {
  it("envia múltiplos motivos separados por ponto e vírgula", () => {
    expect(montarMensagem({ ...base, motivos: [motivos[0], motivos[1]] })).toBe(`Olá, Dra. Aline! Sou Ana Maria e gostaria de agendar uma consulta online.\n• O que me traz: ${motivos[0]}; ${motivos[1]}\n• Acompanhamento: ${acompanhamentos[1]}\n• ${objetivos[0]}`);
  });
  it("omite a linha de motivos quando prefere contar na consulta", () => {
    const mensagem = montarMensagem({ ...base, motivos: [PREFIRO_CONTAR] });
    expect(mensagem).not.toContain("O que me traz");
    expect(mensagem).not.toContain(PREFIRO_CONTAR);
    expect(mensagem).toContain(`• Acompanhamento: ${acompanhamentos[1]}`);
  });
  it("identifica paciente atual e atendimento presencial", () => {
    expect(montarMensagem({ ...base, acompanhamento: acompanhamentos[2], modalidade: "presencial", objetivo: objetivos[1] })).toBe(`Olá, Dra. Aline! Sou Ana Maria e gostaria de agendar uma consulta presencial no OHB.\n• O que me traz: ${motivos[0]}\n• Acompanhamento: Já sou paciente da Dra. Aline\n• ${objetivos[1]}`);
  });
  it("prioriza origem gclid", () => {
    expect(montarMensagem(base, { gclid: "abc_123", utm_source: "instagram" })).toBe(montarMensagem(base) + "\n(via: Google Ads)");
  });
  it("lê origem e campanha sem enviar campanha na mensagem", () => {
    const origem = origemDaBusca("?utm_source=instagram&utm_campaign=consulta");
    expect(origem).toEqual({ utm_source: "instagram", utm_campaign: "consulta" });
    expect(montarMensagem(base, origem)).toBe(montarMensagem(base) + "\n(via: instagram)");
  });
  it("usa o WhatsApp real e codifica a mensagem", () => {
    const url = new URL(montarWhatsAppUrl(base));
    expect(url.origin + url.pathname).toBe("https://wa.me/5561999832552");
    expect(url.searchParams.get("text")).toBe(montarMensagem(base));
  });
});
describe("Regras do quiz", () => {
  it("exige ao menos um motivo", () => {
    expect(agendamentoSchema.safeParse({ ...base, motivos: [] }).success).toBe(false);
  });
  it("Prefiro contar desmarca outros motivos", () => {
    expect(alternarMotivo([motivos[0], motivos[1]], PREFIRO_CONTAR)).toEqual([PREFIRO_CONTAR]);
  });
  it("outro motivo desmarca Prefiro contar", () => {
    expect(alternarMotivo([PREFIRO_CONTAR], motivos[0])).toEqual([motivos[0]]);
  });
  it("permite remover uma escolha múltipla", () => {
    expect(alternarMotivo([motivos[0], motivos[1]], motivos[0])).toEqual([motivos[1]]);
  });
  it("rejeita Prefiro contar junto com outros motivos na saída", () => {
    expect(() => montarMensagem({ ...base, motivos: [PREFIRO_CONTAR, motivos[0]] })).toThrow();
  });
  it("exige acompanhamento, objetivo e modalidade", () => {
    for (const key of ["acompanhamento", "objetivo", "modalidade"]) expect(agendamentoSchema.safeParse({ ...base, [key]: "" }).success).toBe(false);
  });
  it("exige consentimento", () => {
    expect(() => montarMensagem({ ...base, consentimento: false })).toThrow();
  });
  it("exige nome válido", () => {
    for (const nome of ["", "a".repeat(101), "<script>"]) expect(identidadeSchema.safeParse({ nome, consentimento: true }).success).toBe(false);
  });
  it("não exige número de WhatsApp", () => {
    expect(agendamentoSchema.safeParse(base).success).toBe(true);
    expect(montarMensagem(base)).not.toContain("Meu WhatsApp");
  });
  it("inicia sem depoimentos", () => {
    expect(DEPOIMENTOS).toEqual([]);
  });
  it("inicia sem valor de consulta visível no quiz", () => {
    expect(VALOR_CONSULTA).toBeNull();
  });
  it("ignora origem inválida", () => {
    expect(origemDaBusca("?utm_source=%3Cscript%3E&gclid=%3Cscript%3E")).toEqual({});
  });
});
