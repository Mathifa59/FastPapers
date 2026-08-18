import { construirLinkWhatsApp, mensajeGenerico } from "@/lib/whatsapp";
import { IconoWhatsApp } from "./Header";

/** Botón flotante de WhatsApp, visible en todo el scroll. */
export default function BotonWhatsAppFlotante() {
  return (
    <a
      href={construirLinkWhatsApp(mensajeGenerico())}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-verde-whatsapp text-negro-papel shadow-lg shadow-black/40 transition-transform duration-150 hover:scale-105 motion-reduce:animate-none animate-flotar sm:bottom-6 sm:right-6"
    >
      <IconoWhatsApp className="h-7 w-7" />
    </a>
  );
}
