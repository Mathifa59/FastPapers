/**
 * Datos centrales del sitio Fastpapers.
 *
 * Todo lo marcado con "TODO: dato pendiente del cliente" es un valor de
 * relleno EVIDENTE (no un dato real). No se debe publicar en producción sin
 * antes reemplazarlo. Ver el resumen final de TODOs entregado al cliente.
 */

// Nombre de marca — visible en logo, header y copy. Confirmado por el
// cliente en el brief del proyecto.
export const NOMBRE_MARCA = "Fastpapers";

// TODO: dato pendiente del cliente — razón social / nombre comercial exacto
// registrado (puede diferir de la marca "Fastpapers" arriba).
export const RAZON_SOCIAL = "[RAZÓN SOCIAL PENDIENTE — TODO]";

// TODO: dato pendiente del cliente — RUC de la empresa.
export const RUC = "[RUC PENDIENTE — TODO]";

export const DESCRIPTOR_MARCA = "PAPELERÍA COMERCIAL";
export const TAGLINE = "Papelería comercial. Rápido, como su nombre.";

// TODO: dato pendiente del cliente — número de WhatsApp de pedidos.
// Formato esperado: código de país + número, solo dígitos (ej. 51987654321).
export const WHATSAPP_NUMERO = "51900000000";
export const WHATSAPP_NUMERO_VISIBLE = "+51 900 000 000 (TODO: número pendiente)";

// TODO: dato pendiente del cliente — correo de contacto.
export const CORREO_CONTACTO = "contacto@pendiente.todo";

export interface Tienda {
  id: string;
  nombre: string;
  direccion: string;
  distrito: string;
  horario: string;
  telefono: string;
  mapaQuery: string;
  esPrincipal?: boolean;
}

// TODO: dato pendiente del cliente — direcciones, horarios y teléfonos
// exactos de cada tienda. El texto del query de mapa usa la dirección
// placeholder; actualizar junto con la dirección real.
export const TIENDAS: Tienda[] = [
  {
    id: "lima",
    nombre: "Tienda Lima",
    direccion: "[DIRECCIÓN TIENDA LIMA PENDIENTE — TODO]",
    distrito: "Lima",
    horario: "[HORARIO PENDIENTE — TODO]",
    telefono: "[TELÉFONO PENDIENTE — TODO]",
    mapaQuery: "Lima, Perú",
    esPrincipal: true,
  },
  {
    id: "brena",
    nombre: "Tienda Breña",
    direccion: "[DIRECCIÓN TIENDA BREÑA PENDIENTE — TODO]",
    distrito: "Breña",
    horario: "[HORARIO PENDIENTE — TODO]",
    telefono: "[TELÉFONO PENDIENTE — TODO]",
    mapaQuery: "Breña, Lima, Perú",
  },
];

export interface RedSocial {
  id: string;
  nombre: string;
  url: string;
}

// TODO: dato pendiente del cliente — URLs reales de redes sociales.
export const REDES_SOCIALES: RedSocial[] = [
  { id: "instagram", nombre: "Instagram", url: "https://instagram.com/TODO-pendiente" },
  { id: "facebook", nombre: "Facebook", url: "https://facebook.com/TODO-pendiente" },
];

export const AÑOS_OPERANDO = 6;

// Mensaje base para el botón flotante de WhatsApp (uso genérico, sin contexto de sección)
export const MENSAJE_WHATSAPP_GENERICO =
  "Hola, quisiera más información sobre sus materiales.";
