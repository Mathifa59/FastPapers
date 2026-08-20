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
  const seccionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pausadoRef = useRef(false);
  const primerRenderRef = useRef(true);
  const reactivarSnapRef = useRef<number | undefined>(undefined);
  const total = GALERIA_INDUSTRIAL.length;
  const [indiceActivo, setIndiceActivo] = useState(0);

  const irASlide = useCallback((i: number) => {
    const track = trackRef.current;
    const slide = track?.children[i] as HTMLElement | undefined;
    if (track && slide) {
      // Centramos el slide (no lo alineamos por el borde izquierdo): el CSS
      // usa snap-center y la detección de "activo" de más abajo también mide
      // contra el centro. Si esto no coincide, ambas lógicas compiten entre
      // sí y el carrusel salta de forma errática en vez de asentarse.
      const trackRect = track.getBoundingClientRect();
      const slideRect = slide.getBoundingClientRect();
      const centroSlide = slideRect.left - trackRect.left + slideRect.width / 2;
      const destino = track.scrollLeft + centroSlide - track.clientWidth / 2;

      // scroll-snap-type:mandatory + scrollTo programático: en varios motores
      // el navegador "rechaza" el scroll que no viene de un gesto real y lo
      // revierte de inmediato al punto de snap actual (el carrusel quedaba
      // congelado tras el primer slide). Lo evitamos apagando el snap justo
      // durante el scroll animado y lo reactivamos al terminar.
      track.style.scrollSnapType = "none";
      track.scrollTo({ left: destino, behavior: "smooth" });
      window.clearTimeout(reactivarSnapRef.current);
      reactivarSnapRef.current = window.setTimeout(() => {
        track.style.scrollSnapType = "";
      }, 500);
    }
  }, []);

  const siguiente = useCallback(() => setIndiceActivo((i) => (i + 1) % total), [total]);
  const anterior = useCallback(() => setIndiceActivo((i) => (i - 1 + total) % total), [total]);

  useEffect(() => {
    // En el montaje inicial el slide 0 ya está en su lugar: no hace falta
    // animar un scroll hacia donde ya estamos.
    if (primerRenderRef.current) {
      primerRenderRef.current = false;
      return;
    }
    irASlide(indiceActivo);
  }, [indiceActivo, irASlide]);

  useEffect(() => {
    return () => window.clearTimeout(reactivarSnapRef.current);
  }, []);

  // Autoplay — se pausa con hover/foco/touch en toda la sección (no solo la
  // pista) y se detiene por completo si el usuario prefiere menos movimiento.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const seccion = seccionRef.current;
    const marcarPausado = () => (pausadoRef.current = true);
    const marcarActivo = () => (pausadoRef.current = false);

    seccion?.addEventListener("pointerenter", marcarPausado);
    seccion?.addEventListener("pointerleave", marcarActivo);
    seccion?.addEventListener("touchstart", marcarPausado, { passive: true });
    seccion?.addEventListener("focusin", marcarPausado);
    seccion?.addEventListener("focusout", marcarActivo);

    const id = window.setInterval(() => {
      if (!pausadoRef.current) siguiente();
    }, 4500);

    return () => {
      window.clearInterval(id);
      seccion?.removeEventListener("pointerenter", marcarPausado);
      seccion?.removeEventListener("pointerleave", marcarActivo);
      seccion?.removeEventListener("touchstart", marcarPausado);
      seccion?.removeEventListener("focusin", marcarPausado);
      seccion?.removeEventListener("focusout", marcarActivo);
    };
  }, [siguiente]);

  // Sincroniza el punto activo con la posición real del scroll — pero solo
  // cuando el scroll ya se asentó (debounce), nunca en cada frame. Reaccionar
  // a cada frame de una animación programática es lo que causaba el ciclo:
  // scroll → recalcula índice a mitad de camino → reprograma el scroll →
  // vuelve a scrollear → nuevo evento de scroll... y el carrusel no se
  // asentaba nunca.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let idQuieto: number | undefined;
    const onScroll = () => {
      window.clearTimeout(idQuieto);
      idQuieto = window.setTimeout(() => {
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
      }, 120);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      window.clearTimeout(idQuieto);
    };
  }, []);

  return (
    <section
      ref={seccionRef}
      aria-label="Galería del sector gráfico"
      className="relative overflow-hidden border-b border-blanco-hueso/10 bg-negro-papel py-16 sm:py-20"
    >
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
              <span className="font-display text-base uppercase tracking-tightest text-amarillo-fast sm:text-xl">
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
