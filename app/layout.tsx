import type { Metadata } from "next";
import { Archivo_Black, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BotonWhatsAppFlotante from "@/components/BotonWhatsAppFlotante";
import FiltroDuotono from "@/components/FiltroDuotono";
import { CORREO_CONTACTO, NOMBRE_MARCA, RAZON_SOCIAL, TIENDAS } from "@/content/site";

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-archivo-black",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const URL_SITIO = "https://fastpapers.pe"; // TODO: dato pendiente del cliente — dominio final de producción

export const metadata: Metadata = {
  metadataBase: new URL(URL_SITIO),
  title: "Fastpapers | Distribuidor de papel y cartulina para imprentas — Lima y todo el Perú",
  description:
    "Importador y distribuidor de bond, couché, folcote, dúplex, bristol y cartulinas. Stock permanente, servicio de corte y despacho nacional. Tiendas en Lima y Breña.",
  openGraph: {
    title: "Fastpapers | Distribuidor de papel y cartulina para imprentas — Lima y todo el Perú",
    description:
      "Importador y distribuidor de bond, couché, folcote, dúplex, bristol y cartulinas. Stock permanente, servicio de corte y despacho nacional. Tiendas en Lima y Breña.",
    locale: "es_PE",
    type: "website",
    siteName: NOMBRE_MARCA,
  },
  twitter: {
    card: "summary_large_image",
    title: "Fastpapers | Distribuidor de papel y cartulina para imprentas",
    description:
      "Importador y distribuidor de materia prima para el sector gráfico. Stock permanente, corte a medida y despacho nacional.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

function jsonLdNegocio() {
  return {
    "@context": "https://schema.org",
    "@graph": TIENDAS.map((tienda) => ({
      "@type": "LocalBusiness",
      "@id": `${URL_SITIO}/#${tienda.id}`,
      name: `${NOMBRE_MARCA} — ${tienda.nombre}`,
      legalName: RAZON_SOCIAL,
      email: CORREO_CONTACTO,
      address: {
        "@type": "PostalAddress",
        streetAddress: tienda.direccion, // TODO: dato pendiente del cliente
        addressLocality: tienda.distrito,
        addressCountry: "PE",
      },
      openingHours: tienda.horario, // TODO: dato pendiente del cliente
      telephone: tienda.telefono, // TODO: dato pendiente del cliente
      url: URL_SITIO,
    })),
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-PE" className={`${archivoBlack.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdNegocio()) }}
        />
        <a
          href="#contenido"
          className="fixed left-2 top-2 z-[100] -translate-y-20 bg-amarillo-fast px-4 py-2 font-display text-sm text-negro-papel transition-transform focus:translate-y-0"
        >
          Saltar al contenido
        </a>
        <FiltroDuotono />
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <BotonWhatsAppFlotante />
      </body>
    </html>
  );
}
