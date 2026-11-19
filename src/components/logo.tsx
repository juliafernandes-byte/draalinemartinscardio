/**
 * Marca da Dra. Aline. Os arquivos oficiais são públicos e portáveis:
 * - SYMBOL_SRC = símbolo (ícone no header)
 * - FULL_SRC = logo completa (rodapé)
 */
const SYMBOL_SRC = "/logo-simbolo.png";
const FULL_SRC = "/logo-completo-web.png";

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
