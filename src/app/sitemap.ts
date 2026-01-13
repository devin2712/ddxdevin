import { MetadataRoute } from 'next'

type RouteConfig = {
  path: string
  lastModified: Date
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://devinnguyen.com'
  const languages = ['en', 'es', 'fr', 'de', 'zh', 'ko', 'vi', 'hi']

  // Route configurations with actual last modified dates and appropriate change frequencies
  const routes: RouteConfig[] = [
    {
      path: "",
      lastModified: new Date("2026-01-12"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      path: "homekit-magnepan",
      lastModified: new Date("2026-01-12"),
      changeFrequency: "never",
      priority: 0.8,
    },
    {
      path: "mcp-wildfire",
      lastModified: new Date("2025-03-01"),
      changeFrequency: "never",
      priority: 0.8,
    },
    {
      path: "bauhaus",
      lastModified: new Date("2024-06-01"),
      changeFrequency: "never",
      priority: 0.8,
    },
    {
      path: "bauhauslers",
      lastModified: new Date("2024-06-01"),
      changeFrequency: "never",
      priority: 0.7,
    },
    {
      path: "concerts",
      lastModified: new Date("2026-01-01"),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      path: "la-main-ouverte",
      lastModified: new Date("2023-01-01"),
      changeFrequency: "never",
      priority: 0.7,
    },
    {
      path: "se1",
      lastModified: new Date("2020-06-01"),
      changeFrequency: "never",
      priority: 0.7,
    },
    {
      path: "covid-appointments",
      lastModified: new Date("2021-03-01"),
      changeFrequency: "never",
      priority: 0.5,
    },
    {
      path: "covid-myturn",
      lastModified: new Date("2021-03-01"),
      changeFrequency: "never",
      priority: 0.5,
    },
  ];

  const sitemap: MetadataRoute.Sitemap = []

  // Add all routes for each language
  languages.forEach((lang) => {
    routes.forEach((route) => {
      const path = route.path ? `/${lang}/${route.path}` : `/${lang}`
      sitemap.push({
        url: `${baseUrl}${path}`,
        lastModified: route.lastModified,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      })
    })
  })

  return sitemap
}
