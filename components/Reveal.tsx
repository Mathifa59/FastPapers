"use client";

import { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  retraso?: number;
  /** "subir" (por defecto) o "aparecer" (solo fade, sin desplazamiento) */
  tipo?: "subir" | "aparecer";
}

/**
 * Envoltorio de scroll-reveal con mejora progresiva: por defecto el
 * contenido es visible (no depende de JS ni de IntersectionObserver para
 * mostrarse). Solo si el elemento arranca fuera de la ventana visible, lo
 * ocultamos brevemente para animarlo al entrar en scroll. Así no hay
 * parpadeo en el contenido que ya está sobre el pliegue al cargar.
 */
export default function Reveal({ children, className = "", retraso = 0, tipo = "subir" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = el.getBoundingClientRect();
    const yaVisible = rect.top < window.innerHeight * 0.95 && rect.bottom > 0;
    if (yaVisible) return;

    setVisible(false);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const oculto = tipo === "subir" ? "opacity-0 translate-y-8" : "opacity-0";

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${retraso}ms` : "0ms" }}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${
        visible ? "translate-y-0 opacity-100" : oculto
      } ${className}`}
    >
      {children}
    </div>
  );
}
