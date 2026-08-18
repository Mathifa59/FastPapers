"use client";

import { useId, useMemo, useState } from "react";
import { calcularAprovechamiento, calcularPliegosNecesarios } from "@/lib/calculadora";
import { construirLinkWhatsApp, mensajeCalculadora } from "@/lib/whatsapp";
import Reveal from "./Reveal";

/** Calculadora de aprovechamiento de pliego — gancho SEO del sitio. */
export default function Calculadora() {
  const idPliegoAncho = useId();
  const idPliegoAlto = useId();
  const idPiezaAncho = useId();
  const idPiezaAlto = useId();
  const idCantidad = useId();

  const [pliegoAncho, setPliegoAncho] = useState("70");
  const [pliegoAlto, setPliegoAlto] = useState("100");
  const [piezaAncho, setPiezaAncho] = useState("");
  const [piezaAlto, setPiezaAlto] = useState("");
  const [cantidadPiezas, setCantidadPiezas] = useState("");

  const nPliegoAncho = parseFloat(pliegoAncho) || 0;
  const nPliegoAlto = parseFloat(pliegoAlto) || 0;
  const nPiezaAncho = parseFloat(piezaAncho) || 0;
  const nPiezaAlto = parseFloat(piezaAlto) || 0;
  const nCantidadPiezas = parseFloat(cantidadPiezas) || 0;

  const resultado = useMemo(
    () => calcularAprovechamiento(nPliegoAncho, nPliegoAlto, nPiezaAncho, nPiezaAlto),
    [nPliegoAncho, nPliegoAlto, nPiezaAncho, nPiezaAlto]
  );

  const hayFormato = nPiezaAncho > 0 && nPiezaAlto > 0;
  const sinAprovechamiento = hayFormato && resultado !== null && resultado.mejor.piezasPorPliego === 0;

  const pliegosNecesarios =
    resultado && resultado.mejor.piezasPorPliego > 0 && nCantidadPiezas > 0
      ? calcularPliegosNecesarios(nCantidadPiezas, resultado.mejor.piezasPorPliego)
      : 0;

  const linkWhatsApp =
    resultado && resultado.mejor.piezasPorPliego > 0
      ? construirLinkWhatsApp(
          mensajeCalculadora({
            pliegoAncho: nPliegoAncho,
            pliegoAlto: nPliegoAlto,
            piezaAncho: nPiezaAncho,
            piezaAlto: nPiezaAlto,
            piezasPorPliego: resultado.mejor.piezasPorPliego,
            cantidadPiezas: nCantidadPiezas > 0 ? nCantidadPiezas : undefined,
            pliegosNecesarios: pliegosNecesarios > 0 ? pliegosNecesarios : undefined,
          })
        )
      : null;

  return (
    <section id="calculadora" className="border-b border-blanco-hueso/10 bg-negro-papel py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <span className="etiqueta-seccion">Herramienta gratuita</span>
          <h2 className="mt-3 text-display-lg text-blanco-hueso">¿CUÁNTO LE SALE DE CADA PLIEGO?</h2>
          <p className="mt-4 max-w-xl text-blanco-hueso/70">
            Calcule piezas por pliego y merma antes de comprar. Gratis y sin registro.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Formulario */}
          <Reveal retraso={80} className="space-y-8">
            <fieldset>
              <legend className="font-display text-sm uppercase tracking-tightest text-amarillo-fast">
                Medida del pliego (cm)
              </legend>
              <div className="mt-3 grid grid-cols-2 gap-4">
                <CampoNumero
                  id={idPliegoAncho}
                  etiqueta="Ancho"
                  valor={pliegoAncho}
                  onChange={setPliegoAncho}
                />
                <CampoNumero
                  id={idPliegoAlto}
                  etiqueta="Alto"
                  valor={pliegoAlto}
                  onChange={setPliegoAlto}
                />
              </div>
            </fieldset>

            <fieldset>
              <legend className="font-display text-sm uppercase tracking-tightest text-amarillo-fast">
                Formato final que necesita (cm)
              </legend>
              <div className="mt-3 grid grid-cols-2 gap-4">
                <CampoNumero
                  id={idPiezaAncho}
                  etiqueta="Ancho"
                  valor={piezaAncho}
                  onChange={setPiezaAncho}
                  placeholder="ej. 21"
                />
                <CampoNumero
                  id={idPiezaAlto}
                  etiqueta="Alto"
                  valor={piezaAlto}
                  onChange={setPiezaAlto}
                  placeholder="ej. 29.7"
                />
              </div>
            </fieldset>

            <fieldset>
              <legend className="font-display text-sm uppercase tracking-tightest text-amarillo-fast">
                Cantidad de piezas que necesita (opcional)
              </legend>
              <div className="mt-3 max-w-[calc(50%-0.5rem)]">
                <CampoNumero
                  id={idCantidad}
                  etiqueta="Piezas"
                  valor={cantidadPiezas}
                  onChange={setCantidadPiezas}
                  placeholder="ej. 500"
                  unidad=""
                />
              </div>
            </fieldset>
          </Reveal>

          {/* Resultados */}
          <Reveal retraso={140} tipo="aparecer" className="resplandor-amarillo border border-blanco-hueso/15 bg-grafito p-6 sm:p-8">
            {!hayFormato && (
              <p className="text-blanco-hueso/60">
                Ingrese el formato final para ver cuántas piezas salen por pliego.
              </p>
            )}

            {sinAprovechamiento && (
              <p className="text-amarillo-fast">
                El formato ingresado no cabe en este pliego en ninguna orientación. Revise las
                medidas.
              </p>
            )}

            {hayFormato && resultado && resultado.mejor.piezasPorPliego > 0 && (
              <div
                key={`${resultado.mejor.piezasPorPliego}-${resultado.mejor.orientacion}-${pliegosNecesarios}`}
                className="aparecer-suave"
              >
                <div className="grid grid-cols-2 gap-px overflow-hidden bg-blanco-hueso/10 sm:grid-cols-3">
                  <ResultadoStat etiqueta="Piezas por pliego" valor={resultado.mejor.piezasPorPliego} />
                  <ResultadoStat
                    etiqueta="Merma"
                    valor={`${resultado.mermaPorcentaje.toFixed(1)}%`}
                  />
                  {pliegosNecesarios > 0 && (
                    <ResultadoStat etiqueta="Pliegos necesarios" valor={pliegosNecesarios} />
                  )}
                </div>

                <p className="mt-4 text-sm text-blanco-hueso/60">
                  Mejor corte:{" "}
                  <span className="text-blanco-hueso">
                    {resultado.mejor.columnas} × {resultado.mejor.filas}
                  </span>{" "}
                  piezas,{" "}
                  {resultado.mejor.orientacion === "rotada"
                    ? "pieza rotada 90° sobre el pliego."
                    : "pieza sin rotar sobre el pliego."}
                </p>

                <DiagramaPliego
                  pliegoAncho={nPliegoAncho}
                  pliegoAlto={nPliegoAlto}
                  columnas={resultado.mejor.columnas}
                  filas={resultado.mejor.filas}
                  anchoUsado={resultado.mejor.anchoUsado}
                  altoUsado={resultado.mejor.altoUsado}
                />

                {linkWhatsApp && (
                  <a
                    href={linkWhatsApp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="boton-primario mt-6 w-full"
                  >
                    Cotizar este corte por WhatsApp
                  </a>
                )}
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CampoNumero({
  id,
  etiqueta,
  valor,
  onChange,
  placeholder,
  unidad = "cm",
}: {
  id: string;
  etiqueta: string;
  valor: string;
  onChange: (v: string) => void;
  placeholder?: string;
  unidad?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs uppercase tracking-[0.12em] text-blanco-hueso/50">
        {etiqueta}
      </label>
      <div className="mt-1 flex items-center border border-blanco-hueso/25 bg-negro-papel focus-within:border-amarillo-fast">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min="0"
          step={unidad === "cm" ? "0.1" : "1"}
          value={valor}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="cifras w-full bg-transparent px-3 py-2.5 text-blanco-hueso outline-none placeholder:text-blanco-hueso/30"
        />
        {unidad && <span className="pr-3 text-sm text-blanco-hueso/40">{unidad}</span>}
      </div>
    </div>
  );
}

function ResultadoStat({ etiqueta, valor }: { etiqueta: string; valor: string | number }) {
  return (
    <div className="bg-grafito px-4 py-4">
      <dt className="text-xs uppercase tracking-[0.1em] text-blanco-hueso/50">{etiqueta}</dt>
      <dd className="cifras mt-1 font-display text-3xl text-amarillo-fast">{valor}</dd>
    </div>
  );
}

/** Diagrama SVG del pliego cortado en la mejor orientación, con la merma marcada. */
function DiagramaPliego({
  pliegoAncho,
  pliegoAlto,
  columnas,
  filas,
  anchoUsado,
  altoUsado,
}: {
  pliegoAncho: number;
  pliegoAlto: number;
  columnas: number;
  filas: number;
  anchoUsado: number;
  altoUsado: number;
}) {
  const LIENZO = 320;
  const escala = Math.min(LIENZO / pliegoAncho, LIENZO / pliegoAlto);
  const pliegoWpx = pliegoAncho * escala;
  const pliegoHpx = pliegoAlto * escala;
  const offsetX = (LIENZO - pliegoWpx) / 2;
  const offsetY = (LIENZO - pliegoHpx) / 2;
  const celdaW = anchoUsado * escala;
  const celdaH = altoUsado * escala;

  return (
    <svg
      viewBox={`0 0 ${LIENZO} ${LIENZO}`}
      role="img"
      aria-label={`Diagrama del pliego de ${pliegoAncho} por ${pliegoAlto} centímetros dividido en ${columnas} columnas por ${filas} filas`}
      className="mx-auto mt-6 w-full max-w-[280px]"
    >
      <defs>
        <pattern id="merma-hatch" width="6" height="6" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="6" stroke="#F7F5F0" strokeOpacity="0.15" strokeWidth="2" />
        </pattern>
      </defs>

      {/* Pliego completo (incluye merma) */}
      <rect x={offsetX} y={offsetY} width={pliegoWpx} height={pliegoHpx} fill="url(#merma-hatch)" stroke="#F7F5F0" strokeOpacity="0.4" strokeWidth="1.5" />

      {/* Piezas aprovechadas */}
      {Array.from({ length: filas }).flatMap((_, fila) =>
        Array.from({ length: columnas }).map((_, col) => (
          <rect
            key={`${fila}-${col}`}
            x={offsetX + col * celdaW}
            y={offsetY + fila * celdaH}
            width={celdaW}
            height={celdaH}
            fill="rgba(255,194,14,0.18)"
            stroke="#FFC20E"
            strokeWidth="1.5"
          />
        ))
      )}
    </svg>
  );
}
