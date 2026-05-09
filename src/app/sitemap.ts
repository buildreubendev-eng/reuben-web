import type { MetadataRoute } from "next";

const baseUrl = "https://reuben.inc";

const routes = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/status", priority: 0.9, changeFrequency: "daily" },
  { path: "/simulator", priority: 0.9, changeFrequency: "weekly" },
  { path: "/simulator/new", priority: 0.8, changeFrequency: "weekly" },
  { path: "/projects", priority: 0.8, changeFrequency: "weekly" },
  { path: "/projects/reux", priority: 0.9, changeFrequency: "weekly" },
  { path: "/projects/reux/roadmap", priority: 0.8, changeFrequency: "weekly" },
  { path: "/projects/reux/demo", priority: 0.7, changeFrequency: "weekly" },
  { path: "/projects/plos", priority: 0.9, changeFrequency: "weekly" },
  { path: "/docs", priority: 0.8, changeFrequency: "weekly" },
  { path: "/founder-pilot", priority: 0.8, changeFrequency: "weekly" },
  { path: "/founder-pilot/outreach", priority: 0.5, changeFrequency: "monthly" },
  { path: "/founder-pilot/demo-script", priority: 0.5, changeFrequency: "monthly" },
  { path: "/founder-pilot/intake", priority: 0.5, changeFrequency: "monthly" },
  { path: "/founder-pilot/delivery-template", priority: 0.5, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/blog/ecosystem-status-and-shipping-proof-live", priority: 0.8, changeFrequency: "monthly" },
  { path: "/blog/plos-mvp-foundation-live", priority: 0.7, changeFrequency: "monthly" },
  { path: "/blog/reux-prototype-complete", priority: 0.6, changeFrequency: "monthly" },
  { path: "/blog/why-we-are-building-reux", priority: 0.5, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
