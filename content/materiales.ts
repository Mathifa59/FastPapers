/**
 * Catálogo técnico de materiales Fastpapers.
 *
 * Estructura de datos para las 11 categorías, ordenadas por rotación real
 * (de mayor a menor venta) según el brief del cliente.
 *
 * Las descripciones de cada material son conocimiento general del rubro
 * gráfico (qué es y para qué se usa), NO datos propios de Fastpapers.
 * Todo lo que sea específico del negocio (marcas que importan, calibres o
 * gramajes exactos que manejan, medidas de pliego disponibles y forma de
 * presentación) está marcado como TODO: dato pendiente del cliente — no se
 * debe inventar ni publicar sin confirmar.
 */

const PENDIENTE = "Dato pendiente del cliente";

export type TipoUnidad = "calibre" | "gramaje";

export interface Material {
  id: string;
  slug: string;
  nombre: string;
  ordenRotacion: number;
  /** Los 4 de mejor margen: autocopiativo, bristol, liner, multipliego */
  destacadoMargen: boolean;
  descripcion: string;
  tipoUnidad: TipoUnidad;
  // TODO: dato pendiente del cliente en cada uno de los siguientes campos
  marcas: string[];
  valoresDisponibles: string[]; // calibres o gramajes según tipoUnidad
  medidas: string[];
  presentacion: string;
}

export const MATERIALES: Material[] = [
  {
    id: "bond",
    slug: "papel-bond",
    nombre: "Papel Bond",
    ordenRotacion: 1,
    destacadoMargen: false,
    descripcion:
      "Papel de uso general para impresión offset, formularios, cuadernillos y trabajos de oficina.",
    tipoUnidad: "gramaje",
    marcas: [PENDIENTE],
    valoresDisponibles: [PENDIENTE],
    medidas: [PENDIENTE],
    presentacion: PENDIENTE,
  },
  {
    id: "folcote",
    slug: "folcote",
    nombre: "Folcote",
    ordenRotacion: 2,
    destacadoMargen: false,
    descripcion:
      "Cartulina estucada por una cara (blanca) y natural por la otra. Muy usada en empaques y cajas plegadizas.",
    tipoUnidad: "calibre",
    marcas: [PENDIENTE],
    valoresDisponibles: [PENDIENTE],
    medidas: [PENDIENTE],
    presentacion: PENDIENTE,
  },
  {
    id: "couche",
    slug: "couche",
    nombre: "Couché",
    ordenRotacion: 3,
    destacadoMargen: false,
    descripcion:
      "Papel estucado en ambas caras, brillante o mate. Estándar para folletos, catálogos y material publicitario.",
    tipoUnidad: "gramaje",
    marcas: [PENDIENTE],
    valoresDisponibles: [PENDIENTE],
    medidas: [PENDIENTE],
    presentacion: PENDIENTE,
  },
  {
    id: "duplex",
    slug: "duplex",
    nombre: "Dúplex",
    ordenRotacion: 4,
    destacadoMargen: false,
    descripcion:
      "Cartulina estucada blanca por una cara y gris por la otra. Usada en empaques donde no se necesita blancura interior.",
    tipoUnidad: "calibre",
    marcas: [PENDIENTE],
    valoresDisponibles: [PENDIENTE],
    medidas: [PENDIENTE],
    presentacion: PENDIENTE,
  },
  {
    id: "adhesivo",
    slug: "adhesivo",
    nombre: "Papel Adhesivo",
    ordenRotacion: 5,
    destacadoMargen: false,
    descripcion:
      "Papel autoadhesivo con liner siliconado, en versión blanca o transparente. Para etiquetas y stickers.",
    tipoUnidad: "gramaje",
    marcas: [PENDIENTE],
    valoresDisponibles: [PENDIENTE],
    medidas: [PENDIENTE],
    presentacion: PENDIENTE,
  },
  {
    id: "periodico",
    slug: "papel-periodico",
    nombre: "Papel Periódico",
    ordenRotacion: 6,
    destacadoMargen: false,
    descripcion:
      "Papel económico de baja gramatura, usado en volantes, diarios y material de tiraje masivo.",
    tipoUnidad: "gramaje",
    marcas: [PENDIENTE],
    valoresDisponibles: [PENDIENTE],
    medidas: [PENDIENTE],
    presentacion: PENDIENTE,
  },
  {
    id: "cartulinas-finas",
    slug: "cartulinas-finas",
    nombre: "Cartulinas Finas",
    ordenRotacion: 7,
    destacadoMargen: false,
    descripcion:
      "Cartulinas de color y texturas especiales para acabados finos: invitaciones, tarjetería y trabajos de diseño.",
    tipoUnidad: "calibre",
    marcas: [PENDIENTE],
    valoresDisponibles: [PENDIENTE],
    medidas: [PENDIENTE],
    presentacion: PENDIENTE,
  },
  {
    id: "autocopiativo",
    slug: "autocopiativo",
    nombre: "Papel Autocopiativo",
    ordenRotacion: 8,
    destacadoMargen: true,
    descripcion:
      "Papel químico que copia sin carbón entre hojas (CB, CFB, CF). Usado en talonarios, facturas y formatos por duplicado o triplicado.",
    tipoUnidad: "gramaje",
    marcas: [PENDIENTE],
    valoresDisponibles: [PENDIENTE],
    medidas: [PENDIENTE],
    presentacion: PENDIENTE,
  },
  {
    id: "bristol",
    slug: "bristol",
    nombre: "Bristol",
    ordenRotacion: 9,
    destacadoMargen: true,
    descripcion:
      "Cartulina blanca de un solo componente, rígida y lisa. Muy usada en trabajos escolares, fólderes y material impreso de mayor cuerpo.",
    tipoUnidad: "calibre",
    marcas: [PENDIENTE],
    valoresDisponibles: [PENDIENTE],
    medidas: [PENDIENTE],
    presentacion: PENDIENTE,
  },
  {
    id: "liner",
    slug: "liner",
    nombre: "Liner",
    ordenRotacion: 10,
    destacadoMargen: true,
    descripcion:
      "Papel para cara de cartón corrugado. Insumo industrial para conversión de cajas y empaques de cartón.",
    tipoUnidad: "gramaje",
    marcas: [PENDIENTE],
    valoresDisponibles: [PENDIENTE],
    medidas: [PENDIENTE],
    presentacion: PENDIENTE,
  },
  {
    id: "multipliego",
    slug: "multipliego",
    nombre: "Multipliego",
    ordenRotacion: 11,
    destacadoMargen: true,
    descripcion:
      "Cartón gris multicapa de alto espesor, usado como base rígida en empastados, cajas resistentes y soportes rígidos.",
    tipoUnidad: "calibre",
    marcas: [PENDIENTE],
    valoresDisponibles: [PENDIENTE],
    medidas: [PENDIENTE],
    presentacion: PENDIENTE,
  },
];

export const MATERIALES_DESTACADOS = MATERIALES.filter((m) => m.destacadoMargen);
export const MATERIALES_ROTACION = [...MATERIALES].sort(
  (a, b) => a.ordenRotacion - b.ordenRotacion
);
