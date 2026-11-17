import { describe, expect, it } from "vitest";
import { whatsappUrl, whatsappCardioUrl } from "@/lib/whatsapp";
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
});
