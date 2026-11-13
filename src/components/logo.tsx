import symbolAsset from "@/assets/logo-simbolo.png.asset.json";
import fullAsset from "@/assets/logo-completo-web.png.asset.json";

/**
 * Marca da Dra. Aline. Os arquivos oficiais estão na CDN do projeto:
 * - SYMBOL_SRC = símbolo (ícone no header)
 * - FULL_SRC = logo completa (rodapé)
 */
const SYMBOL_SRC: string = symbolAsset.url;
const FULL_SRC: string = fullAsset.url;

export function Logo({ variant = "header" }: { variant?: "header" | "footer" }) {
  if (variant === "footer") {
    return (
      <img
        src={FULL_SRC}
        alt="Dra. Aline Martins Dall'Orto · Cardiologia e Ecocardiografia"
        className="h-28 w-auto md:h-32"
      />
    );
  }
  return (
    <span className="flex min-w-0 items-center gap-3">
      <img src={SYMBOL_SRC} alt="" className="h-10 w-auto shrink-0 object-contain" />
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="whitespace-nowrap font-brand text-[15px] font-medium uppercase text-navy sm:text-[16px]">Dra. Aline Martins Dall'Orto</span>
        <span className="mt-1 font-sans text-[9px] font-light uppercase tracking-[0.28em] text-muted-foreground sm:text-[10px]">Cardiologia e Ecocardiografia</span>
      </span>
    </span>
  );
}
