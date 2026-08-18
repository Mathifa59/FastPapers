/**
 * Preguntas frecuentes. La de formas de pago se responde con honestidad:
 * Fastpapers NO otorga crédito. No maquillar esto.
 */

export interface FAQItem {
  id: string;
  pregunta: string;
  respuesta: string;
}

export const FAQ: FAQItem[] = [
  {
    id: "formas-pago",
    pregunta: "¿Qué formas de pago aceptan?",
    respuesta:
      "Trabajamos con pago al confirmar el pedido. No otorgamos crédito ni financiamiento: el pedido se despacha una vez confirmado el pago.",
  },
  {
    id: "despacho-provincia",
    pregunta: "¿Hacen envíos a provincia?",
    respuesta:
      "Sí. Despachamos a nivel nacional, no solo en Lima. Cuéntenos su destino al cotizar y le confirmamos el método de envío.",
  },
  {
    id: "servicio-corte",
    pregunta: "¿Puedo pedir el pliego ya cortado?",
    respuesta:
      "Sí. Ofrecemos servicio de corte: indíquenos el formato final que necesita y nosotros cortamos el pliego antes de despacharlo.",
  },
  {
    id: "cantidad-minima",
    pregunta: "¿Venden por pliego suelto o solo por volumen?",
    respuesta:
      "Ambos. Atendemos pedidos por pliego suelto para el público final y pedidos por volumen para imprentas, colegios y oficinas.",
  },
  {
    id: "stock-permanente",
    pregunta: "¿Siempre tienen stock disponible?",
    respuesta:
      "Los materiales de mayor rotación los mantenemos en stock permanente. Para materiales de menor rotación, confírmenos disponibilidad por WhatsApp antes de acercarse.",
  },
  {
    id: "como-cotizar",
    pregunta: "¿Cómo pido una cotización?",
    respuesta:
      "Por WhatsApp. Indíquenos material, calibre o gramaje, medida y cantidad; le confirmamos precio, stock y si necesita corte.",
  },
];
