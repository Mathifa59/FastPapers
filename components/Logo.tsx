import { DESCRIPTOR_MARCA, NOMBRE_MARCA } from "@/content/site";

// TODO: reemplazar con el SVG oficial del cliente
//
// El cliente tiene el logo real en formato editable pero todavía no lo ha
// entregado (solo existe un PNG pixelado, inservible para producción).
// Este componente es el ÚNICO lugar del sitio donde se renderiza el
// wordmark de marca: mientras no llegue el SVG oficial, dibuja un
// placeholder tipográfico que imita el estilo del logo real (bloques
// amarillos detrás del texto). Cuando llegue el archivo definitivo, solo
// hay que reemplazar el contenido de este archivo — nada más en el sitio
// referencia el logo directamente.

export type LogoVariant = "full" | "mono" | "icon";

export interface LogoProps {
  variant?: LogoVariant;
  className?: string;
}

/** Wordmark "FASTPAPERS" partido en dos: bloque amarillo + texto suelto. */
function Wordmark({ monocromo }: { monocromo: boolean }) {
  return (
    <span className="inline-flex items-baseline font-display uppercase tracking-tightest leading-none">
      <span
        className={
          monocromo
            ? "px-1"
            : "bg-amarillo-fast px-1.5 text-negro-papel"
        }
      >
        FAST
      </span>
      <span className={monocromo ? "" : "pl-1"}>PAPERS</span>
    </span>
  );
}

export default function Logo({ variant = "full", className = "" }: LogoProps) {
  if (variant === "icon") {
    return (
      <span
        aria-label={NOMBRE_MARCA}
        className={`inline-flex h-9 w-9 items-center justify-center bg-amarillo-fast font-display text-lg text-negro-papel ${className}`}
      >
        F
      </span>
    );
  }

  if (variant === "mono") {
    return (
      <span aria-label={NOMBRE_MARCA} className={`inline-flex ${className}`}>
        <Wordmark monocromo />
      </span>
    );
  }

  return (
    <span aria-label={NOMBRE_MARCA} className={`inline-flex flex-col gap-0.5 ${className}`}>
      <Wordmark monocromo={false} />
      <span className="font-body text-[0.55em] font-normal uppercase tracking-[0.2em] text-blanco-hueso/70">
        {DESCRIPTOR_MARCA}
      </span>
    </span>
  );
}
