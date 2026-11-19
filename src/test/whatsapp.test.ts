import { describe, expect, it } from "vitest";
import { whatsappUrl, whatsappCardioUrl, whatsappMedicoUrl } from "@/lib/whatsapp";
describe("whatsapp link", () => {
  it("uses the real number and encoded message", () => {
    expect(whatsappUrl).toBe(
      "https://wa.me/5561999832552?text=" +
        encodeURIComponent("Olá! Vim pelo site e gostaria de agendar uma consulta com a Dra. Aline."),
    );
  });
  it("routes Cardio 360 inquiries to the same number with its own message", () => {
    expect(whatsappCardioUrl).toBe(
      "https://wa.me/5561999832552?text=" +
        encodeURIComponent("Olá! Quero saber mais sobre o Cardio 360 da Dra. Aline."),
    );
  });
  it("routes doctor inquiries to the same number with its own message", () => {
    expect(whatsappMedicoUrl).toBe(
      "https://wa.me/5561999832552?text=" +
        encodeURIComponent("Olá! Sou médico e gostaria de adquirir o Cardio 360 para acompanhar os meus pacientes."),
    );
  });
});
