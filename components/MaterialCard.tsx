import type { Material } from "@/content/materiales";

interface MaterialCardProps {
  material: Material;
  destacado: boolean;
  onAbrir: () => void;
}

/** Tarjeta de material — estilo ficha de almacén (código, nombre, unidad). */
export default function MaterialCard({ material, destacado, onAbrir }: MaterialCardProps) {
  const codigo = `MAT-${String(material.ordenRotacion).padStart(2, "0")}`;

  return (
    <button
      type="button"
      onClick={onAbrir}
      className={`group relative flex h-full flex-col justify-between border text-left transition-colors duration-150 ${
        destacado
          ? "border-amarillo-fast bg-grafito p-6"
          : "border-blanco-hueso/15 bg-grafito/60 p-5 hover:border-blanco-hueso/40"
      }`}
    >
      {destacado && (
        <span className="absolute -top-3 left-5 bg-amarillo-fast px-2 py-0.5 font-display text-[0.65rem] uppercase tracking-tightest text-negro-papel">
          Destacado
        </span>
      )}

      <div>
        <span className="cifras block font-display text-xs text-blanco-hueso/40">{codigo}</span>
        <h3
          className={`mt-2 font-display uppercase tracking-tightest text-blanco-hueso ${
            destacado ? "text-xl sm:text-2xl" : "text-base sm:text-lg"
          }`}
        >
          {material.nombre}
        </h3>
        <p
          className={`mt-2 text-blanco-hueso/70 ${
            destacado ? "text-sm" : "text-xs sm:text-sm"
          }`}
        >
          {material.descripcion}
        </p>
      </div>

      <span className="resaltador mt-5 inline-flex w-fit items-center gap-1 font-display text-xs uppercase tracking-tightest text-amarillo-fast">
        Ver ficha técnica
        <span aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-1">
          →
        </span>
      </span>
    </button>
  );
}
