"use client";

import { useEffect, useRef } from "react";
import type { Material } from "@/content/materiales";
import { construirLinkWhatsApp, mensajeMaterial } from "@/lib/whatsapp";

interface FichaMaterialModalProps {
  material: Material;
  onCerrar: () => void;
}

/** Ficha técnica de un material, en modal accesible (Esc, foco, click fuera). */
export default function FichaMaterialModal({ material, onCerrar }: FichaMaterialModalProps) {
  const cerrarBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    cerrarBtnRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCerrar();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onCerrar]);

  const unidadLabel = material.tipoUnidad === "calibre" ? "Calibres disponibles" : "Gramajes disponibles";

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-negro-papel/80 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onCerrar}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ficha-titulo"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto border border-amarillo-fast bg-grafito p-6 sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="cifras font-display text-xs text-blanco-hueso/40">
              MAT-{String(material.ordenRotacion).padStart(2, "0")}
            </span>
            <h3 id="ficha-titulo" className="mt-1 font-display text-2xl uppercase tracking-tightest text-amarillo-fast sm:text-3xl">
              {material.nombre}
            </h3>
          </div>
          <button
            ref={cerrarBtnRef}
            type="button"
            onClick={onCerrar}
            aria-label="Cerrar ficha técnica"
            className="flex h-9 w-9 shrink-0 items-center justify-center border-2 border-blanco-hueso/30 text-blanco-hueso hover:border-amarillo-fast hover:text-amarillo-fast"
          >
            ✕
          </button>
        </div>

        <p className="mt-4 text-blanco-hueso/80">{material.descripcion}</p>

        <dl className="mt-6 divide-y divide-blanco-hueso/10 border-y border-blanco-hueso/10">
          <FilaFicha etiqueta="Marcas" valores={material.marcas} />
          <FilaFicha etiqueta={unidadLabel} valores={material.valoresDisponibles} />
          <FilaFicha etiqueta="Medidas" valores={material.medidas} />
          <FilaFicha etiqueta="Presentación" valores={[material.presentacion]} />
        </dl>

        <a
          href={construirLinkWhatsApp(mensajeMaterial(material.nombre))}
          target="_blank"
          rel="noopener noreferrer"
          className="boton-primario mt-7 w-full"
        >
          Quiero mi cotización
        </a>
      </div>
    </div>
  );
}

function FilaFicha({ etiqueta, valores }: { etiqueta: string; valores: string[] }) {
  return (
    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
      <dt className="text-xs uppercase tracking-[0.12em] text-blanco-hueso/50">{etiqueta}</dt>
      <dd className="sm:col-span-2 text-sm text-blanco-hueso/90">{valores.join(" · ")}</dd>
    </div>
  );
}
