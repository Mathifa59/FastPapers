import Link from "next/link";
import Logo from "./Logo";
import {
  CORREO_CONTACTO,
  NOMBRE_MARCA,
  RAZON_SOCIAL,
  REDES_SOCIALES,
  RUC,
  TAGLINE,
  TIENDAS,
  WHATSAPP_NUMERO_VISIBLE,
} from "@/content/site";

const ENLACES_NAV = [
  { href: "#materiales", texto: "Materiales" },
  { href: "#corte", texto: "Servicio de corte" },
  { href: "#calculadora", texto: "Calculadora" },
  { href: "#tiendas", texto: "Tiendas" },
  { href: "#faq", texto: "FAQ" },
];

export default function Footer() {
  const año = new Date().getFullYear();

  return (
    <footer className="bg-negro-papel pb-28 pt-16 sm:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo variant="full" className="text-lg" />
            <p className="mt-4 text-sm text-blanco-hueso/60">{TAGLINE}</p>
            <ul className="mt-6 flex gap-4">
              {REDES_SOCIALES.map((red) => (
                <li key={red.id}>
                  <a
                    href={red.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resaltador text-sm text-blanco-hueso/70"
                  >
                    {red.nombre}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-xs uppercase tracking-[0.15em] text-amarillo-fast">
              Navegación
            </h3>
            <ul className="mt-4 space-y-2.5">
              {ENLACES_NAV.map((enlace) => (
                <li key={enlace.href}>
                  <a href={enlace.href} className="resaltador text-sm text-blanco-hueso/70">
                    {enlace.texto}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-xs uppercase tracking-[0.15em] text-amarillo-fast">
              Contacto
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-blanco-hueso/70">
              <li>{WHATSAPP_NUMERO_VISIBLE}</li>
              <li>{CORREO_CONTACTO}</li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-xs uppercase tracking-[0.15em] text-amarillo-fast">
              Tiendas
            </h3>
            <ul className="mt-4 space-y-4 text-sm text-blanco-hueso/70">
              {TIENDAS.map((tienda) => (
                <li key={tienda.id}>
                  <span className="block font-medium text-blanco-hueso/90">{tienda.nombre}</span>
                  {tienda.direccion}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-blanco-hueso/10 pt-6 text-xs text-blanco-hueso/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {año} {NOMBRE_MARCA}. {RAZON_SOCIAL} · RUC {RUC}
          </p>
          <Link href="/" className="resaltador w-fit">
            Volver al inicio
          </Link>
        </div>
      </div>
    </footer>
  );
}
