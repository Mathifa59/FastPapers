"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { GALERIA_INDUSTRIAL } from "@/content/galeria";

/**
 * Carrusel de la galería industrial: scroll-snap nativo (fluido, sin
 * librerías), autoplay que se pausa con hover/foco/touch y respeta
 * prefers-reduced-motion, flechas y puntos accesibles por teclado.
 */
export default function GaleriaIndustrial() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausadoRef = useRef(false);
  const total = GALERIA_INDUSTRIAL.length;
  const [indiceActivo, setIndiceActivo] = useState(0);

  const irASlide = useCallback((i: number) => {
    const track = trackRef.current;
    const slide = track?.children[i] as HTMLElement | undefined;
    if (track && slide) {
      // getBoundingClientRect en vez de offsetLeft: offsetLeft se mide contra
      // el offsetParent, que no necesariamente es el contenedor de scroll.
      const trackRect = track.getBoundingClientRect();
      const slideRect = slide.getBoundingClientRect();
      const destino = track.scrollLeft + (slideRect.left - trackRect.left);
      track.scrollTo({ left: destino, behavior: "smooth" });
    }
  }, []);

  const siguiente = useCallback(() => setIndiceActivo((i) => (i + 1) % total), [total]);
  const anterior = useCallback(() => setIndiceActivo((i) => (i - 1 + total) % total), [total]);

  useEffect(() => {
    irASlide(indiceActivo);
  }, [indiceActivo, irASlide]);

  // Autoplay — se detiene con prefers-reduced-motion y al interactuar
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const track = trackRef.current;
    const marcarPausado = () => (pausadoRef.current = true);
    const marcarActivo = () => (pausadoRef.current = false);

    track?.addEventListener("pointerenter", marcarPausado);
    track?.addEventListener("pointerleave", marcarActivo);
    track?.addEventListener("touchstart", marcarPausado, { passive: true });
    track?.addEventListener("focusin", marcarPausado);
    track?.addEventListener("focusout", marcarActivo);

    const id = window.setInterval(() => {
      if (!pausadoRef.current) siguiente();
    }, 4500);

    return () => {
      window.clearInterval(id);
      track?.removeEventListener("pointerenter", marcarPausado);
      track?.removeEventListener("pointerleave", marcarActivo);
      track?.removeEventListener("touchstart", marcarPausado);
      track?.removeEventListener("focusin", marcarPausado);
      track?.removeEventListener("focusout", marcarActivo);
    };
  }, [siguiente]);

  // Mantiene el punto activo sincronizado si el usuario arrastra el carrusel a mano
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const trackRect = track.getBoundingClientRect();
        const centro = trackRect.left + trackRect.width / 2;
        const hijos = Array.from(track.children) as HTMLElement[];
        let masCercano = 0;
        let distanciaMin = Infinity;
        hijos.forEach((hijo, i) => {
          const r = hijo.getBoundingClientRect();
          const centroHijo = r.left + r.width / 2;
          const distancia = Math.abs(centroHijo - centro);
          if (distancia < distanciaMin) {
            distanciaMin = distancia;
            masCercano = i;
          }
        });
        setIndiceActivo(masCercano);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section aria-label="Galería del sector gráfico" className="relative overflow-hidden border-b border-blanco-hueso/10 bg-negro-papel py-16 sm:py-20">
      <div className="mx-auto mb-8 flex max-w-7xl items-end justify-between px-4 sm:px-6 lg:px-8">
        <div>
          <span className="etiqueta-seccion">El rubro, de cerca</span>
          <h2 className="mt-3 text-display-md text-blanco-hueso">MATERIA PRIMA EN MOVIMIENTO</h2>
        </div>
        <div className="hidden shrink-0 gap-2 sm:flex">
          <BotonCarrusel direccion="anterior" onClick={anterior} />
          <BotonCarrusel direccion="siguiente" onClick={siguiente} />
        </div>
      </div>

      <div
        ref={trackRef}
        role="region"
        aria-label="Carrusel de fotos del sector gráfico"
        className="sin-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 sm:px-6 lg:px-8"
      >
        {GALERIA_INDUSTRIAL.map((item, i) => (
          <figure
            key={item.id}
            className="corte-esquina group relative aspect-[4/5] w-[78%] shrink-0 snap-center overflow-hidden bg-grafito sm:aspect-[16/10] sm:w-[58%] lg:w-[44%]"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(min-width: 1024px) 44vw, (min-width: 640px) 58vw, 78vw"
              className="duotono object-cover transition-transform duration-300 group-hover:scale-105"
              priority={i === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-negro-papel via-negro-papel/10 to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
              <span className="font-display text-lg uppercase tracking-tightest text-amarillo-fast sm:text-2xl">
                {item.leyenda}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-7 flex items-center justify-center gap-4 sm:hidden">
        <BotonCarrusel direccion="anterior" onClick={anterior} />
        <BotonCarrusel direccion="siguiente" onClick={siguiente} />
      </div>

      <div role="tablist" aria-label="Ir a foto" className="mt-6 flex justify-center gap-2">
        {GALERIA_INDUSTRIAL.map((item, i) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={i === indiceActivo}
            aria-label={`Ir a foto ${i + 1}: ${item.leyenda}`}
            onClick={() => setIndiceActivo(i)}
            className={`h-1.5 rounded-full transition-all duration-200 ${
              i === indiceActivo ? "w-8 bg-amarillo-fast" : "w-1.5 bg-blanco-hueso/25 hover:bg-blanco-hueso/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

function BotonCarrusel({
  direccion,
  onClick,
}: {
  direccion: "anterior" | "siguiente";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direccion === "anterior" ? "Foto anterior" : "Foto siguiente"}
      className="flex h-10 w-10 items-center justify-center border-2 border-blanco-hueso/25 text-blanco-hueso transition-colors duration-150 hover:border-amarillo-fast hover:text-amarillo-fast"
    >
      <span aria-hidden="true">{direccion === "anterior" ? "←" : "→"}</span>
    </button>
  );
}
