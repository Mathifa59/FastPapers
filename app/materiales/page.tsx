import type { Metadata } from "next";
import MaterialesSection from "@/components/MaterialesSection";
import ServicioCorte from "@/components/ServicioCorte";

export const metadata: Metadata = {
  title: "Materiales: bond, couché, folcote, dúplex, bristol y más | Fastpapers",
  description:
    "Catálogo de materia prima para el sector gráfico: papel bond, folcote, couché, dúplex, adhesivo, periódico, cartulinas finas, autocopiativo, bristol, liner y multipliego.",
};

export default function PaginaMateriales() {
  return (
    <div className="pt-8">
      <MaterialesSection />
      <ServicioCorte />
    </div>
  );
}
