import { AÑOS_OPERANDO } from "@/content/site";
import Reveal from "./Reveal";

const BLOQUES = [
  {
    titulo: "Importamos directo.",
    cuerpo: "Sin intermediarios entre la fábrica y su imprenta.",
  },
  {
    titulo: "Stock que no se cae.",
    cuerpo: "Los materiales de rotación diaria, siempre disponibles.",
  },
  {
    titulo: "Despachamos a todo el Perú.",
    cuerpo: "Provincia incluida, no solo Lima.",
  },
  {
    titulo: `${AÑOS_OPERANDO} años en el rubro.`,
    cuerpo: "Dos locales físicos, en Lima y en Breña.",
  },
];

export default function PorQueFastpapers() {
  return (
    <section id="por-que" className="border-b border-blanco-hueso/10 bg-blanco-hueso py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <span className="font-display text-xs uppercase tracking-[0.15em] text-ambar-profundo">
            Por qué Fastpapers
          </span>
          <h2 className="mt-3 text-display-lg text-negro-papel">LA MATERIA PRIMA, RESUELTA.</h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden bg-negro-papel/10 sm:grid-cols-2 lg:grid-cols-4">
          {BLOQUES.map((bloque, i) => (
            <Reveal key={bloque.titulo} retraso={i * 90} className="group bg-blanco-hueso p-6 transition-colors duration-200 hover:bg-amarillo-fast/10 sm:p-8">
              <span className="cifras font-display text-sm text-ambar-profundo transition-transform duration-200 group-hover:scale-110 inline-block">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-xl uppercase tracking-tightest text-negro-papel">
                {bloque.titulo}
              </h3>
              <p className="mt-2 text-negro-papel/70">{bloque.cuerpo}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
