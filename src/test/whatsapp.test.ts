import { describe, expect, it } from "vitest";
import { whatsappUrl } from "@/lib/whatsapp";
describe("whatsapp link", () => {
  it("uses the central number and encoded message", () => {
    expect(whatsappUrl).toBe(
      "https://wa.me/55XXXXXXXXXXX?text=" +
        encodeURIComponent("Olá! Vim pelo site e gostaria de agendar uma consulta com a Dra. Aline."),
    );
  });
});
