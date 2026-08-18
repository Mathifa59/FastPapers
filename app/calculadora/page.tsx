import type { Metadata } from "next";
import Calculadora from "@/components/Calculadora";

export const metadata: Metadata = {
  title: "Calculadora de aprovechamiento de pliego | Fastpapers",
  description:
    "Calcule piezas por pliego, merma y cuántos pliegos necesita según el formato final. Herramienta gratuita para imprentas, sin registro.",
};

export default function PaginaCalculadora() {
  return (
    <div className="pt-8">
      <Calculadora />
    </div>
  );
}
