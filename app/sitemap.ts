import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://eaglewrench.com", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: "https://eaglewrench.com/oil-change", lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
  ];
}
