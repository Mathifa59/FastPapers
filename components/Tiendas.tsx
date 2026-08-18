import { TIENDAS } from "@/content/site";
import { construirLinkWhatsApp, mensajeGenerico } from "@/lib/whatsapp";
import Reveal from "./Reveal";

export default function Tiendas() {
  return (
    <section id="tiendas" className="border-b border-blanco-hueso/10 bg-negro-papel py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <span className="etiqueta-seccion">Tiendas físicas</span>
          <h2 className="mt-3 text-display-lg text-blanco-hueso">DOS LOCALES. UN SOLO STOCK NACIONAL.</h2>
          <p className="mt-4 max-w-xl text-blanco-hueso/70">
            Recoja en tienda o pida despacho — a Lima o a provincia, no hacemos distinción.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          {TIENDAS.map((tienda, i) => (
            <Reveal key={tienda.id} retraso={i * 100} tipo="aparecer">
            <article className="border border-blanco-hueso/15 bg-grafito">
              <div className="aspect-[16/9] w-full grayscale">
                <iframe
                  title={`Mapa de ${tienda.nombre}`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(tienda.mapaQuery)}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full border-0"
                />
              </div>

              <div className="p-6 sm:p-8">
                <h3 className="font-display text-2xl uppercase tracking-tightest text-amarillo-fast">
                  {tienda.nombre}
                </h3>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex gap-3">
                    <dt className="w-24 shrink-0 uppercase tracking-[0.1em] text-blanco-hueso/50">
                      Dirección
                    </dt>
                    <dd className="text-blanco-hueso/90">{tienda.direccion}</dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="w-24 shrink-0 uppercase tracking-[0.1em] text-blanco-hueso/50">
                      Horario
                    </dt>
                    <dd className="text-blanco-hueso/90">{tienda.horario}</dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="w-24 shrink-0 uppercase tracking-[0.1em] text-blanco-hueso/50">
                      Teléfono
                    </dt>
                    <dd className="text-blanco-hueso/90">{tienda.telefono}</dd>
                  </div>
                </dl>
              </div>
            </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-10 flex flex-col items-start gap-4 border border-blanco-hueso/15 bg-grafito p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <p className="text-blanco-hueso/80">
              <span className="font-display uppercase tracking-tightest text-amarillo-fast">
                ¿Está en provincia?
              </span>{" "}
              Despachamos a todo el Perú, no solo Lima.
            </p>
            <a
              href={construirLinkWhatsApp(mensajeGenerico())}
              target="_blank"
              rel="noopener noreferrer"
              className="boton-secundario shrink-0"
            >
              Consultar despacho
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
