"use client";

import { useId, useState } from "react";
import { FAQ } from "@/content/faq";
import Reveal from "./Reveal";

export default function FAQAcordeon() {
  const [abiertoId, setAbiertoId] = useState<string | null>(FAQ[0]?.id ?? null);

  return (
    <section id="faq" className="border-b border-blanco-hueso/10 bg-negro-papel py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <span className="etiqueta-seccion">Preguntas frecuentes</span>
          <h2 className="mt-3 text-display-lg text-blanco-hueso">FAQ</h2>
        </Reveal>

        <Reveal retraso={100} className="mt-10 divide-y divide-blanco-hueso/15 border-y border-blanco-hueso/15">
          {FAQ.map((item) => (
            <ItemFAQ
              key={item.id}
              pregunta={item.pregunta}
              respuesta={item.respuesta}
              abierto={abiertoId === item.id}
              onToggle={() => setAbiertoId(abiertoId === item.id ? null : item.id)}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function ItemFAQ({
  pregunta,
  respuesta,
  abierto,
  onToggle,
}: {
  pregunta: string;
  respuesta: string;
  abierto: boolean;
  onToggle: () => void;
}) {
  const idContenido = useId();

  return (
    <div>
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={abierto}
          aria-controls={idContenido}
          className="flex w-full items-center justify-between gap-4 py-5 text-left"
        >
          <span className="font-display text-base uppercase tracking-tightest text-blanco-hueso sm:text-lg">
            {pregunta}
          </span>
          <span
            aria-hidden="true"
            className={`shrink-0 font-display text-2xl text-amarillo-fast transition-transform duration-200 ${
              abierto ? "rotate-45" : ""
            }`}
          >
            +
          </span>
        </button>
      </h3>
      <div
        id={idContenido}
        role="region"
        className={`grid overflow-hidden transition-[grid-template-rows] duration-200 ease-out ${
          abierto ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-5 pr-8 text-blanco-hueso/75">{respuesta}</p>
        </div>
      </div>
    </div>
  );
}
