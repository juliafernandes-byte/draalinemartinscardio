import { useId } from "react";

/**
 * Marca da Dra. Aline. Para usar os arquivos oficiais, defina:
 * - SYMBOL_SRC = "/logo-simbolo.png" (ícone no header)
 * - FULL_SRC = "/logo-completo.png" (logo completa no rodapé)
 */
const SYMBOL_SRC: string | null = null;
const FULL_SRC: string | null = null;

/** Coração com monograma "AM" no degradê da marca: azul-petróleo -> vermelho. */
function BrandMark({ size, className }: { size: number; className?: string }) {
  const rawId = useId();
  const gradientId = `brand-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden focusable="false">
      <defs>
        <linearGradient id={gradientId} x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0C6E9B" />
          <stop offset="1" stopColor="#ED3237" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gradientId})`}
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      />
      <text
        x="12"
        y="12.3"
        textAnchor="middle"
        fontFamily="Cinzel, Georgia, serif"
        fontSize="7"
        fontWeight="500"
        letterSpacing="0.25"
        fill="#FBF7F2"
      >
        AM
      </text>
    </svg>
  );
}

export function Logo({ variant = "header" }: { variant?: "header" | "footer" }) {
  const footer = variant === "footer";
  if (footer && FULL_SRC) return <img src={FULL_SRC} alt="Dra. Aline Martins Dall'Orto · Cardiologia e Ecocardiografia" className="h-20 w-auto" />;
  return (
    <span className="flex min-w-0 items-center gap-3">
      {SYMBOL_SRC ? (
        <img src={SYMBOL_SRC} alt="" className="h-10 w-10 shrink-0 object-contain" />
      ) : (
        <BrandMark size={footer ? 38 : 34} className="shrink-0" />
      )}
      <span className="flex min-w-0 flex-col leading-tight">
        <span className={`font-brand font-medium uppercase ${footer ? "text-xl md:text-2xl" : "text-[15px] sm:text-lg"} ${footer ? "text-ink-foreground" : "text-navy"}`}>Dra. Aline Martins Dall'Orto</span>
        <span className={`mt-1 font-sans text-[9px] font-light uppercase tracking-[0.28em] sm:text-[10px] ${footer ? "text-ink-foreground/85" : "text-muted-foreground"}`}>Cardiologia e Ecocardiografia</span>
      </span>
    </span>
  );
}
