"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";
import { construirLinkWhatsApp, mensajeGenerico } from "@/lib/whatsapp";

const ENLACES_NAV = [
  { href: "#materiales", texto: "Materiales" },
  { href: "#corte", texto: "Servicio de corte" },
  { href: "#calculadora", texto: "Calculadora" },
  { href: "#por-que", texto: "Por qué Fastpapers" },
  { href: "#tiendas", texto: "Tiendas" },
  { href: "#faq", texto: "FAQ" },
];

export default function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-blanco-hueso/10 bg-negro-papel/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0" aria-label="Fastpapers — ir al inicio">
          <Logo variant="full" className="text-lg sm:text-xl" />
        </Link>

        <nav aria-label="Navegación principal" className="hidden lg:flex lg:items-center lg:gap-7">
          {ENLACES_NAV.map((enlace) => (
            <a
              key={enlace.href}
              href={enlace.href}
              className="resaltador py-1 text-sm font-medium text-blanco-hueso"
            >
              {enlace.texto}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={construirLinkWhatsApp(mensajeGenerico())}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-sm bg-verde-whatsapp px-4 py-2.5 font-display text-xs uppercase tracking-tightest text-negro-papel transition-colors duration-150 hover:brightness-95 sm:inline-flex"
          >
            <IconoWhatsApp className="h-4 w-4" />
            WhatsApp
          </a>

          <button
            type="button"
            onClick={() => setMenuAbierto((v) => !v)}
            aria-expanded={menuAbierto}
            aria-controls="menu-movil"
            aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
            className="inline-flex h-10 w-10 items-center justify-center border-2 border-blanco-hueso/30 text-blanco-hueso lg:hidden"
          >
            <span aria-hidden="true" className="relative block h-3 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 bg-blanco-hueso transition-transform duration-150 ${
                  menuAbierto ? "translate-y-[5px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 bottom-0 h-0.5 w-5 bg-blanco-hueso transition-transform duration-150 ${
                  menuAbierto ? "-translate-y-[5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {menuAbierto && (
        <nav
          id="menu-movil"
          aria-label="Navegación móvil"
          className="border-t border-blanco-hueso/10 bg-negro-papel px-4 pb-6 pt-2 lg:hidden"
        >
          <ul className="flex flex-col">
            {ENLACES_NAV.map((enlace) => (
              <li key={enlace.href} className="border-b border-blanco-hueso/10">
                <a
                  href={enlace.href}
                  onClick={() => setMenuAbierto(false)}
                  className="block py-3.5 text-base font-medium text-blanco-hueso"
                >
                  {enlace.texto}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={construirLinkWhatsApp(mensajeGenerico())}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 rounded-sm bg-verde-whatsapp px-4 py-3 font-display text-xs uppercase tracking-tightest text-negro-papel"
          >
            <IconoWhatsApp className="h-4 w-4" />
            Escríbenos por WhatsApp
          </a>
        </nav>
      )}
    </header>
  );
}

export function IconoWhatsApp({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.85.5 3.58 1.37 5.08L2 22l5.15-1.47a9.87 9.87 0 0 0 4.89 1.29h.005c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.85 9.85 0 0 0 12.04 2Zm0 18.05h-.004a8.15 8.15 0 0 1-4.16-1.14l-.298-.177-3.056.87.816-2.98-.194-.306a8.12 8.12 0 0 1-1.246-4.35c0-4.5 3.65-8.16 8.15-8.16 2.176 0 4.222.85 5.76 2.39a8.1 8.1 0 0 1 2.383 5.78c0 4.5-3.66 8.08-8.15 8.08Z" />
    </svg>
  );
}
