import { describe, expect, it } from "vitest";
import { whatsappUrl, whatsappMonitoramentoUrl } from "@/lib/whatsapp";
describe("whatsapp link", () => {
  it("uses the central number and encoded message", () => {
    expect(whatsappUrl).toBe(
      "https://wa.me/55XXXXXXXXXXX?text=" +
        encodeURIComponent("Olá! Vim pelo site e gostaria de agendar uma consulta com a Dra. Aline."),
    );
  });
  it("routes monitoring inquiries to the same central number with its own message", () => {
    expect(whatsappMonitoramentoUrl).toBe(
      "https://wa.me/55XXXXXXXXXXX?text=" +
        encodeURIComponent("Olá! Quero saber mais sobre o Monitoramento 360° da Dra. Aline."),
    );
  });
});
