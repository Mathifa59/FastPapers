import type { MetadataRoute } from "next";

const URL_SITIO = "https://fastpapers.pe"; // TODO: dato pendiente del cliente — dominio final de producción

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: URL_SITIO,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${URL_SITIO}/materiales`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${URL_SITIO}/calculadora`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
