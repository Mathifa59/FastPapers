/**
 * Filtro SVG de duotono: mapea sombras a --negro-papel y luces a
 * --amarillo-fast (o --ambar-profundo en la variante "ambar"). Convierte
 * cualquier foto de stock en una imagen dentro de la paleta de marca, sin
 * salirnos de negro/amarillo/blanco hueso. Se referencia desde CSS con
 * `filter: url(#duotono-amarillo)` / `url(#duotono-ambar)`.
 */
export default function FiltroDuotono() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <filter id="duotono-amarillo">
          <feColorMatrix
            type="matrix"
            values="0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0 0 0 1 0"
          />
          <feComponentTransfer>
            <feFuncR type="table" tableValues="0.055 1" />
            <feFuncG type="table" tableValues="0.055 0.76" />
            <feFuncB type="table" tableValues="0.055 0.055" />
          </feComponentTransfer>
        </filter>
        <filter id="duotono-ambar">
          <feColorMatrix
            type="matrix"
            values="0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0 0 0 1 0"
          />
          <feComponentTransfer>
            <feFuncR type="table" tableValues="0.02 0.79" />
            <feFuncG type="table" tableValues="0.02 0.54" />
            <feFuncB type="table" tableValues="0.02 0" />
          </feComponentTransfer>
        </filter>
      </defs>
    </svg>
  );
}
