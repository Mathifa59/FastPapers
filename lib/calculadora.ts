/**
 * Lógica de la calculadora de aprovechamiento de pliego.
 *
 * Dado un pliego (ancho x alto) y un formato final (ancho x alto), calcula
 * cuántas piezas caben por pliego probando las dos orientaciones de corte
 * posibles (pieza "normal" y pieza "rotada 90°") y devuelve la que más
 * piezas rinde — que es como corta en la práctica cualquier guillotinero.
 */

export type Orientacion = "normal" | "rotada";

export interface ResultadoOrientacion {
  orientacion: Orientacion;
  columnas: number;
  filas: number;
  piezasPorPliego: number;
  // ancho/alto de la pieza tal como quedó orientada sobre el pliego
  anchoUsado: number;
  altoUsado: number;
}

export interface ResultadoAprovechamiento {
  mejor: ResultadoOrientacion;
  alterna: ResultadoOrientacion;
  areaPliegoCm2: number;
  areaUtilCm2: number;
  mermaPorcentaje: number;
}

/** Calcula cuántas piezas de piezaAncho x piezaAlto caben en un pliego, en ambas orientaciones. */
export function calcularAprovechamiento(
  pliegoAncho: number,
  pliegoAlto: number,
  piezaAncho: number,
  piezaAlto: number
): ResultadoAprovechamiento | null {
  if (
    !isFinite(pliegoAncho) ||
    !isFinite(pliegoAlto) ||
    !isFinite(piezaAncho) ||
    !isFinite(piezaAlto) ||
    pliegoAncho <= 0 ||
    pliegoAlto <= 0 ||
    piezaAncho <= 0 ||
    piezaAlto <= 0
  ) {
    return null;
  }

  const normal: ResultadoOrientacion = {
    orientacion: "normal",
    columnas: Math.floor(pliegoAncho / piezaAncho),
    filas: Math.floor(pliegoAlto / piezaAlto),
    piezasPorPliego: 0,
    anchoUsado: piezaAncho,
    altoUsado: piezaAlto,
  };
  normal.piezasPorPliego = normal.columnas * normal.filas;

  const rotada: ResultadoOrientacion = {
    orientacion: "rotada",
    columnas: Math.floor(pliegoAncho / piezaAlto),
    filas: Math.floor(pliegoAlto / piezaAncho),
    piezasPorPliego: 0,
    anchoUsado: piezaAlto,
    altoUsado: piezaAncho,
  };
  rotada.piezasPorPliego = rotada.columnas * rotada.filas;

  const [mejor, alterna] =
    normal.piezasPorPliego >= rotada.piezasPorPliego ? [normal, rotada] : [rotada, normal];

  const areaPliegoCm2 = pliegoAncho * pliegoAlto;
  const areaUtilCm2 = mejor.piezasPorPliego * piezaAncho * piezaAlto;
  const mermaPorcentaje =
    areaPliegoCm2 > 0 ? Math.max(0, 100 - (areaUtilCm2 / areaPliegoCm2) * 100) : 0;

  return { mejor, alterna, areaPliegoCm2, areaUtilCm2, mermaPorcentaje };
}

/** Cuántos pliegos se necesitan para obtener una cantidad de piezas dada. */
export function calcularPliegosNecesarios(piezasNecesarias: number, piezasPorPliego: number): number {
  if (piezasPorPliego <= 0 || !isFinite(piezasNecesarias) || piezasNecesarias <= 0) return 0;
  return Math.ceil(piezasNecesarias / piezasPorPliego);
}
