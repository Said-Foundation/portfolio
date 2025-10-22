import { portfolioData } from '../data/portfolio'

/**
 * Generate sitemap.xml content with all pages and projects
 * This helps search engines discover all content
 */
export const generateSitemap = (): string => {
  const baseUrl = 'https://saidmustafasaid.com'
  
  // Main pages
  const pages = [
    { loc: '/', priority: '1.0', changefreq: 'monthly' },
    { loc: '/#/about', priority: '0.9', changefreq: 'monthly' },
    { loc: '/#/projects', priority: '0.9', changefreq: 'weekly' },
    { loc: '/#/certificates', priority: '0.7', changefreq: 'monthly' },
    { loc: '/#/contact', priority: '0.8', changefreq: 'monthly' },
  ]

  // Add project pages
  const projectPages = portfolioData.projects.map(project => ({
    loc: `/#/projects/${project.id}`,
    priority: project.ranking && project.ranking <= 4 ? '0.8' : '0.6',
    changefreq: 'monthly',
  }))

  const allPages = [...pages, ...projectPages]

  // Generate XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

  allPages.forEach(page => {
    xml += '  <url>\n'
    xml += `    <loc>${baseUrl}${page.loc}</loc>\n`
    xml += `    <priority>${page.priority}</priority>\n`
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`
    xml += '  </url>\n'
  })

  xml += '</urlset>'

  return xml
}

/**
 * Generate robots.txt content
 * Tells crawlers which pages to index
 */
export const generateRobotsTxt = (): string => {
  const baseUrl = 'https://saidmustafasaid.com'
  
  let txt = 'User-agent: *\n'
  txt += 'Allow: /\n'
  txt += 'Allow: /#/\n'
  txt += `Sitemap: ${baseUrl}/sitemap.xml\n`
  txt += `Sitemap: ${baseUrl}/api/manifest.json\n`
  txt += '\n'
  txt += '# Disallow private/admin areas (if any)\n'
  txt += 'Disallow: /admin/\n'
  txt += 'Disallow: /private/\n'
  txt += '\n'
  txt += '# Allow specific crawlers\n'
  txt += 'User-agent: Googlebot\n'
  txt += 'Allow: /\n'
  txt += '\n'
  txt += 'User-agent: Bingbot\n'
  txt += 'Allow: /\n'
  txt += '\n'
  txt += 'User-agent: ChatGPT-User\n'
  txt += 'Allow: /\n'
  txt += '\n'
  txt += 'User-agent: GPTBot\n'
  txt += 'Allow: /\n'
  txt += '\n'
  txt += 'User-agent: CCBot\n'
  txt += 'Allow: /\n'

  return txt
}

