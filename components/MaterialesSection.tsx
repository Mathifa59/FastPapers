"use client";

import { useState } from "react";
import { MATERIALES } from "@/content/materiales";
import MaterialCard from "./MaterialCard";
import FichaMaterialModal from "./FichaMaterialModal";
import Reveal from "./Reveal";

// Orden de presentación: intercalamos los 4 materiales de mejor margen
// (autocopiativo, bristol, liner, multipliego) entre los de mayor rotación
// para darles espacio destacado a lo largo de todo el grid, tal como pide
// el negocio — sin ocultar el resto del catálogo.
const ORDEN_PRESENTACION = [
  "bond",
  "folcote",
  "autocopiativo",
  "couche",
  "duplex",
  "bristol",
  "adhesivo",
  "periodico",
  "liner",
  "cartulinas-finas",
  "multipliego",
];

const MATERIALES_ORDENADOS = ORDEN_PRESENTACION.map((id) =>
  MATERIALES.find((m) => m.id === id)
).filter((m): m is NonNullable<typeof m> => Boolean(m));

export default function MaterialesSection() {
  const [materialAbiertoId, setMaterialAbiertoId] = useState<string | null>(null);
  const materialAbierto = MATERIALES.find((m) => m.id === materialAbiertoId) ?? null;

  return (
    <section id="materiales" className="border-b border-blanco-hueso/10 bg-negro-papel py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <span className="etiqueta-seccion">Catálogo</span>
          <h2 className="mt-3 text-display-lg text-blanco-hueso">MATERIALES</h2>
          <p className="mt-4 max-w-xl text-blanco-hueso/70">
            Toque cualquier material para ver marcas, calibres o gramajes, medidas y presentación
            disponibles.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-6">
          {MATERIALES_ORDENADOS.map((material, i) => (
            <Reveal
              key={material.id}
              retraso={Math.min(i, 6) * 60}
              className={
                material.destacadoMargen
                  ? "sm:col-span-6 lg:col-span-3"
                  : "sm:col-span-3 lg:col-span-2"
              }
            >
              <MaterialCard
                material={material}
                destacado={material.destacadoMargen}
                onAbrir={() => setMaterialAbiertoId(material.id)}
              />
            </Reveal>
          ))}
        </div>
      </div>

      {materialAbierto && (
        <FichaMaterialModal material={materialAbierto} onCerrar={() => setMaterialAbiertoId(null)} />
      )}
    </section>
  );
}
