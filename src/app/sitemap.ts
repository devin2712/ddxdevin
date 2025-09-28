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
    'la-main-ouverte',
    'mcp-wildfire',
    'resume',
    'se1'
  ]

  const sitemap: MetadataRoute.Sitemap = []

  // Add root URL
  sitemap.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1,
  })

  // Add all routes for each language
  languages.forEach((lang) => {
    routes.forEach((route) => {
      const path = route ? `/${lang}/${route}` : `/${lang}`
      sitemap.push({
        url: `${baseUrl}${path}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: route === '' ? 0.9 : 0.8,
      })
    })
  })

  return sitemap
}