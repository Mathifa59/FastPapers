/**
 * Galería industrial — fotografía de stock con licencia libre (Pexels License:
 * uso comercial permitido, sin atribución obligatoria), tratada en duotono
 * negro/amarillo para no romper la identidad de marca.
 *
 * IMPORTANTE: son fotos genéricas del rubro (rollos, almacén, máquinas), NO
 * fotos del local o del stock real de Fastpapers. Cuando el cliente entregue
 * fotos propias de su almacén/tienda, esta galería debería reemplazarse por
 * esas — dejamos la estructura lista para ese cambio.
 *
 * Cada leyenda reutiliza copy ya aprobado en otras secciones del sitio
 * (Por qué Fastpapers / Servicio de corte) para no inventar mensajes nuevos.
 */

import { AÑOS_OPERANDO } from "./site";

export interface ImagenGaleria {
  id: string;
  src: string;
  alt: string;
  leyenda: string;
  // Créditos del banco de imágenes — no obligatorio por la licencia, se deja
  // por transparencia y trazabilidad interna.
  credito: string;
}

export const GALERIA_INDUSTRIAL: ImagenGaleria[] = [
  {
    id: "rollos",
    src: "/images/galeria-01-rollos-papel.jpg",
    alt: "Rollos de papel apilados en un estante industrial",
    leyenda: "IMPORTAMOS DIRECTO.",
    credito: "Foto: Brett Sayles / Pexels",
  },
  {
    id: "almacen",
    src: "/images/galeria-02-almacen.jpg",
    alt: "Pasillo de almacén industrial con estantes de gran altura",
    leyenda: "STOCK QUE NO SE CAE.",
    credito: "Foto: Patrice Werner / Pexels",
  },
  {
    id: "maquina",
    src: "/images/galeria-06-maquina.jpg",
    alt: "Máquina industrial de precisión en verde y negro",
    leyenda: "SE LO ENTREGAMOS CORTADO.",
    credito: "Pexels",
  },
  {
    id: "despacho",
    src: "/images/galeria-05-despacho.jpg",
    alt: "Cajas apiladas y organizadas en un almacén",
    leyenda: "DESPACHAMOS A TODO EL PERÚ.",
    credito: "Pexels",
  },
  {
    id: "cartulinas",
    src: "/images/galeria-04-cartulinas.jpg",
    alt: "Pliegos de papel de colores apilados en orden",
    leyenda: "ONCE MATERIALES. UN SOLO PROVEEDOR.",
    credito: "Foto: Ali Salman Rizvi / Pexels",
  },
  {
    id: "imprenta",
    src: "/images/galeria-03-imprenta.jpg",
    alt: "Detalle de un rodillo de una máquina de imprenta",
    leyenda: `${AÑOS_OPERANDO} AÑOS EN EL RUBRO.`,
    credito: "Pexels",
  },
];
