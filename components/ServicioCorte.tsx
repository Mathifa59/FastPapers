import { construirLinkWhatsApp, mensajeCorte } from "@/lib/whatsapp";
import Reveal from "./Reveal";

/** Sección de servicio de corte — peso visual alto, diferenciador fuerte del negocio. */
export default function ServicioCorte() {
  return (
    <section id="corte" className="border-b border-blanco-hueso/10 bg-negro-papel py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="resplandor-amarillo grid grid-cols-1 items-center gap-12 border-2 border-amarillo-fast p-6 sm:p-10 lg:grid-cols-2 lg:p-16">
            <div>
              <span className="etiqueta-seccion">Servicio de corte</span>
              <h2 className="mt-3 text-display-lg text-blanco-hueso">SE LO ENTREGAMOS CORTADO.</h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-blanco-hueso/80 sm:text-lg">
                Díganos el formato final y nosotros cortamos el pliego. Menos merma, menos tiempo de
                máquina, menos manipuleo en su taller.
              </p>
              <a
                href={construirLinkWhatsApp(mensajeCorte())}
                target="_blank"
                rel="noopener noreferrer"
                className="boton-primario mt-8"
              >
                Quiero servicio de corte
              </a>
            </div>

            <DiagramaCorte />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Diagrama técnico simple de un pliego dividido en formato final, con líneas de corte "en movimiento". */
function DiagramaCorte() {
  return (
    <svg
      viewBox="0 0 400 300"
      role="img"
      aria-label="Diagrama de un pliego dividido en piezas más pequeñas mediante líneas de corte"
      className="mx-auto w-full max-w-md"
    >
      <rect x="10" y="10" width="380" height="280" fill="none" stroke="#F7F5F0" strokeOpacity="0.4" strokeWidth="2" />
      {[1, 2, 3].map((i) => (
        <line
          key={`v-${i}`}
          x1={10 + (380 / 3) * i}
          y1="10"
          x2={10 + (380 / 3) * i}
          y2="290"
          stroke="#FFC20E"
          strokeWidth="2"
          className="linea-corte-animada"
        />
      ))}
      <line x1="10" y1="150" x2="390" y2="150" stroke="#FFC20E" strokeWidth="2" className="linea-corte-animada" />
      {Array.from({ length: 6 }).map((_, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        return (
          <text
            key={i}
            x={10 + (380 / 3) * col + 380 / 6}
            y={10 + 140 * row + 75}
            textAnchor="middle"
            fontSize="14"
            fill="#F7F5F0"
            fillOpacity="0.5"
            fontFamily="monospace"
          >
            {`0${i + 1}`}
          </text>
        );
      })}
    </svg>
  );
}
