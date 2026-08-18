import HeroSection from "@/components/HeroSection";
import GaleriaIndustrial from "@/components/GaleriaIndustrial";
import MaterialesSection from "@/components/MaterialesSection";
import ServicioCorte from "@/components/ServicioCorte";
import Calculadora from "@/components/Calculadora";
import PorQueFastpapers from "@/components/PorQueFastpapers";
import ComoPedir from "@/components/ComoPedir";
import Tiendas from "@/components/Tiendas";
import FAQAcordeon from "@/components/FAQAcordeon";

export default function Home() {
  return (
    <>
      <HeroSection />
      <GaleriaIndustrial />
      <MaterialesSection />
      <ServicioCorte />
      <Calculadora />
      <PorQueFastpapers />
      <ComoPedir />
      <Tiendas />
      <FAQAcordeon />
    </>
  );
}
