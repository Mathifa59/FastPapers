import Reveal from "./Reveal";

const PASOS = [
  {
    titulo: "Nos escribe por WhatsApp.",
    cuerpo: "Material, calibre, medida y cantidad.",
  },
  {
    titulo: "Le confirmamos precio y stock.",
    cuerpo: "Con opción de corte si lo necesita.",
  },
  {
    titulo: "Despachamos.",
    cuerpo: "A su dirección o recojo en tienda.",
  },
];

export default function ComoPedir() {
  return (
    <section className="border-b border-blanco-hueso/10 bg-negro-papel py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <span className="etiqueta-seccion">Cómo pedir</span>
          <h2 className="mt-3 text-display-lg text-blanco-hueso">TRES PASOS. SIN VUELTAS.</h2>
        </Reveal>

        <ol className="relative mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
          {/* Línea conductora entre pasos — solo visible desde sm, puramente decorativa */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-[2px] hidden h-px bg-gradient-to-r from-amarillo-fast/60 via-amarillo-fast/20 to-amarillo-fast/60 sm:block"
          />
          {PASOS.map((paso, i) => (
            <li key={paso.titulo} className="relative border-t-2 border-amarillo-fast pt-6">
              <Reveal retraso={i * 120}>
                <span className="cifras font-display text-4xl text-amarillo-fast">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-lg uppercase tracking-tightest text-blanco-hueso sm:text-xl">
                  {paso.titulo}
                </h3>
                <p className="mt-2 text-blanco-hueso/70">{paso.cuerpo}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
