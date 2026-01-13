import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://devinnguyen.com'
  const languages = ['en', 'es', 'fr', 'de', 'zh', 'ko', 'vi', 'hi']
  const routes = [
    '',
    'bauhaus',
    'bauhauslers',
    'concerts',
    'covid-appointments',
    'covid-myturn',
    'homekit-magnepan',
    'la-main-ouverte',
    'mcp-wildfire',
    'se1'
  ]

  const sitemap: MetadataRoute.Sitemap = []

  // Add all routes for each language
  languages.forEach((lang) => {
    routes.forEach((route) => {
      const path = route ? `/${lang}/${route}` : `/${lang}`
      sitemap.push({
        url: `${baseUrl}${path}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: route === '' ? 1 : 0.8,
      })
    })
  })

  return sitemap
}