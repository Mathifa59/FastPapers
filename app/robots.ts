import type { MetadataRoute } from "next";

const URL_SITIO = "https://fastpapers.pe"; // TODO: dato pendiente del cliente — dominio final de producción

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${URL_SITIO}/sitemap.xml`,
  };
}
