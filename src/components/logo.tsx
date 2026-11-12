import { Heart } from "lucide-react";

/**
 * Marca da Dra. Aline. Para usar os arquivos oficiais, defina:
 * - SYMBOL_SRC = "/logo-simbolo.png" (ícone no header)
 * - FULL_SRC = "/logo-completo.png" (logo completa no rodapé)
 */
const SYMBOL_SRC: string | null = null;
const FULL_SRC: string | null = null;

export function Logo({ variant = "header" }: { variant?: "header" | "footer" }) {
  const footer = variant === "footer";
  if (footer && FULL_SRC) return <img src={FULL_SRC} alt="Dra. Aline Martins Dall'Orto · Cardiologia e Ecocardiografia" className="h-20 w-auto" />;
  return (
    <span className="flex min-w-0 items-center gap-3">
      {SYMBOL_SRC ? (
        <img src={SYMBOL_SRC} alt="" className="h-10 w-10 shrink-0 object-contain" />
      ) : (
        <Heart aria-hidden className={`shrink-0 ${footer ? "text-blush" : "text-primary"}`} size={footer ? 34 : 30} strokeWidth={1.5} />
      )}
      <span className="flex min-w-0 flex-col leading-tight">
        <span className={`font-brand font-medium uppercase ${footer ? "text-xl md:text-2xl" : "text-[15px] sm:text-lg"} ${footer ? "text-ink-foreground" : "text-navy"}`}>Dra. Aline Martins Dall'Orto</span>
        <span className={`mt-1 font-sans text-[9px] font-light uppercase tracking-[0.28em] sm:text-[10px] ${footer ? "text-ink-foreground/85" : "text-muted-foreground"}`}>Cardiologia e Ecocardiografia</span>
      </span>
    </span>
  );
}
