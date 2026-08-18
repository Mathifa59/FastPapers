"use client";

import Image from "next/image";
import { useState } from "react";
import { construirLinkWhatsApp, mensajeHeroFinal, mensajeHeroMayorista } from "@/lib/whatsapp";
import { AÑOS_OPERANDO } from "@/content/site";
import Reveal from "./Reveal";

type Publico = "mayorista" | "final";

const COPY: Record<
  Publico,
  { h1: string; sub: string; ctaPrimario: string; ctaSecundario?: string; mensajeWA: () => string }
> = {
  mayorista: {
    h1: "MATERIA PRIMA PARA EL SECTOR GRÁFICO. A TODO EL PERÚ.",
    sub: "Bond, couché, folcote, dúplex y cartulinas finas. Importación directa, stock permanente y servicio de corte a su medida.",
    ctaPrimario: "Cotizar por WhatsApp",
    ctaSecundario: "Ver materiales",
    mensajeWA: mensajeHeroMayorista,
  },
  final: {
    h1: "¿NECESITAS UN PLIEGO O NECESITAS MIL?",
    sub: "Compra cartulinas, bristol y folcote por unidad al precio de importador.",
    ctaPrimario: "Escríbenos por WhatsApp",
    mensajeWA: mensajeHeroFinal,
  },
};

export default function HeroSection() {
  const [publico, setPublico] = useState<Publico>("mayorista");
  const copy = COPY[publico];

  return (
    <section className="relative overflow-hidden border-b border-blanco-hueso/10 bg-negro-papel">
      {/* Fondo: foto de stock en duotono + degradado + retícula técnica + resplandor */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/galeria-02-almacen.jpg"
          alt=""
          fill
          priority
          className="duotono object-cover opacity-[0.16]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-negro-papel via-negro-papel/85 to-negro-papel" />
        <div className="fondo-retícula absolute inset-0" />
        <div className="animar-pulso absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-amarillo-fast/20 blur-[110px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        {/* Selector de público */}
        <Reveal>
          <div
            role="group"
            aria-label="Elige cómo compras"
            className="mb-10 inline-flex rounded-sm border-2 border-blanco-hueso/20 p-1"
          >
            <button
              type="button"
              aria-pressed={publico === "mayorista"}
              onClick={() => setPublico("mayorista")}
              className={`px-4 py-2 font-display text-xs uppercase tracking-tightest transition-colors duration-150 sm:text-sm ${
                publico === "mayorista"
                  ? "bg-amarillo-fast text-negro-papel"
                  : "text-blanco-hueso/70 hover:text-blanco-hueso"
              }`}
            >
              Compro por volumen
            </button>
            <button
              type="button"
              aria-pressed={publico === "final"}
              onClick={() => setPublico("final")}
              className={`px-4 py-2 font-display text-xs uppercase tracking-tightest transition-colors duration-150 sm:text-sm ${
                publico === "final"
                  ? "bg-amarillo-fast text-negro-papel"
                  : "text-blanco-hueso/70 hover:text-blanco-hueso"
              }`}
            >
              Compro por pliego
            </button>
          </div>
        </Reveal>

        {/* key=publico: al cambiar de público, el bloque remonta y dispara el fade-in */}
        <div key={publico} className="aparecer-suave">
          <h1 className="max-w-4xl text-display-xl text-blanco-hueso">{copy.h1}</h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-blanco-hueso/80 sm:text-xl">
            {copy.sub}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={construirLinkWhatsApp(copy.mensajeWA())}
              target="_blank"
              rel="noopener noreferrer"
              className="boton-primario resplandor-amarillo"
            >
              {copy.ctaPrimario}
            </a>
            {copy.ctaSecundario && (
              <a href="#materiales" className="boton-secundario">
                {copy.ctaSecundario}
              </a>
            )}
          </div>
        </div>

        {/* Ficha de datos duros — tipo señalética de almacén */}
        <Reveal retraso={120}>
          <dl className="mt-16 grid max-w-2xl grid-cols-1 gap-px overflow-hidden border border-blanco-hueso/15 bg-blanco-hueso/15 sm:grid-cols-3">
            <div className="bg-negro-papel px-5 py-4">
              <dt className="text-xs uppercase tracking-[0.15em] text-blanco-hueso/50">Operando</dt>
              <dd className="cifras mt-1 font-display text-2xl text-amarillo-fast">
                {AÑOS_OPERANDO} AÑOS
              </dd>
            </div>
            <div className="bg-negro-papel px-5 py-4">
              <dt className="text-xs uppercase tracking-[0.15em] text-blanco-hueso/50">Tiendas</dt>
              <dd className="cifras mt-1 font-display text-2xl text-amarillo-fast">LIMA · BREÑA</dd>
            </div>
            <div className="bg-negro-papel px-5 py-4">
              <dt className="text-xs uppercase tracking-[0.15em] text-blanco-hueso/50">Despacho</dt>
              <dd className="cifras mt-1 font-display text-2xl text-amarillo-fast">TODO EL PERÚ</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
