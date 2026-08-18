/**
 * Helper central para construir deep links de WhatsApp (wa.me).
 * Todo CTA del sitio pasa por aquí para mantener el mensaje precargado
 * consistente con el contexto desde donde se hizo clic.
 */

import { WHATSAPP_NUMERO } from "@/content/site";

/** Construye un link wa.me con número y mensaje precargado (URL-encoded). */
export function construirLinkWhatsApp(mensaje: string, numero: string = WHATSAPP_NUMERO): string {
  const numeroLimpio = numero.replace(/\D/g, "");
  return `https://wa.me/${numeroLimpio}?text=${encodeURIComponent(mensaje)}`;
}

// --- Mensajes precargados por contexto ---

export const mensajeHeroMayorista = () =>
  "Buenos días, quisiera cotizar materia prima para imprenta.";

export const mensajeHeroFinal = () =>
  "Hola, quisiera cotizar pliegos para uso personal.";

export const mensajeGenerico = () => "Hola, quisiera más información sobre sus materiales.";

export const mensajeMaterial = (nombreMaterial: string) =>
  `Hola, quisiera cotizar ${nombreMaterial}. ¿Qué calibres/gramajes tienen disponibles?`;

export const mensajeCorte = () =>
  "Hola, quisiera cotizar un pliego con servicio de corte. Le paso el formato final que necesito.";

export interface DatosCalculadoraWhatsApp {
  pliegoAncho: number;
  pliegoAlto: number;
  piezaAncho: number;
  piezaAlto: number;
  piezasPorPliego: number;
  cantidadPiezas?: number;
  pliegosNecesarios?: number;
}

export const mensajeCalculadora = (datos: DatosCalculadoraWhatsApp) => {
  const base = `Hola, quisiera cotizar este corte:\n- Pliego: ${datos.pliegoAncho}x${datos.pliegoAlto} cm\n- Formato final: ${datos.piezaAncho}x${datos.piezaAlto} cm\n- Piezas por pliego: ${datos.piezasPorPliego}`;
  const cantidad =
    datos.cantidadPiezas && datos.pliegosNecesarios
      ? `\n- Cantidad que necesito: ${datos.cantidadPiezas} piezas (${datos.pliegosNecesarios} pliegos aprox.)`
      : "";
  return `${base}${cantidad}\n¿Me confirman precio y stock?`;
};
