import { Project } from '../data/portfolio'
import { portfolioData } from '../data/portfolio'

/**
 * Generate schema.org CreativeWork markup for a project
 * This makes project content indexable by search engines and LLMs
 */
export const generateProjectSchema = (project: Project) => {
  const baseUrl = window.location.origin
  const projectUrl = `${baseUrl}/#/projects/${project.id}`
  
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': projectUrl,
    name: project.title,
    description: project.description,
    url: projectUrl,
    author: {
      '@type': 'Person',
      name: portfolioData.name,
      url: baseUrl,
    },
    datePublished: `${project.year}-${String(project.month).padStart(2, '0')}-01`,
    keywords: project.technologies.join(', '),
    about: project.technologies.map(tech => ({
      '@type': 'Thing',
      name: tech,
    })),
    ...(project.role && { jobTitle: project.role }),
    ...(project.projectType && { genre: project.projectType }),
    ...(project.duration && { duration: `P${project.duration}W` }),
    ...(project.outcomes && project.outcomes.length > 0 && {
      result: project.outcomes.join('; '),
    }),
    ...(project.links && project.links.length > 0 && {
      sameAs: project.links.map(link => link.url),
    }),
  }

  return schema
}

/**
 * Generate BreadcrumbList schema for navigation
 * Helps crawlers understand site structure
 */
export const generateBreadcrumbSchema = (currentPage: string) => {
  const baseUrl = window.location.origin
  
  const breadcrumbs: Array<{ name: string; url: string }> = [
    { name: 'Home', url: baseUrl },
  ]

  if (currentPage === 'projects') {
    breadcrumbs.push({ name: 'Projects', url: `${baseUrl}/#/projects` })
  } else if (currentPage.startsWith('project-')) {
    breadcrumbs.push({ name: 'Projects', url: `${baseUrl}/#/projects` })
    breadcrumbs.push({ name: 'Project Details', url: window.location.href })
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return schema
}

/**
 * Inject schema.org markup into page head
 * This makes content crawlable by search engines and LLMs
 */
export const injectSchema = (schema: any, id: string = 'schema-markup') => {
  // Remove existing schema if present
  const existing = document.getElementById(id)
  if (existing) {
    existing.remove()
  }

  // Create and inject new schema
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.id = id
  script.textContent = JSON.stringify(schema)
  document.head.appendChild(script)
}

/**
 * Generate API manifest for AI crawlers
 * Provides structured data about all projects
 */
export const generateApiManifest = () => {
  const baseUrl = window.location.origin
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: portfolioData.name,
    url: baseUrl,
    description: portfolioData.bio,
    author: {
      '@type': 'Person',
      name: portfolioData.name,
      url: baseUrl,
    },
    projects: portfolioData.projects.map(project => ({
      '@type': 'CreativeWork',
      '@id': `${baseUrl}/#/projects/${project.id}`,
      name: project.title,
      description: project.description,
      url: `${baseUrl}/#/projects/${project.id}`,
      datePublished: `${project.year}-${String(project.month).padStart(2, '0')}-01`,
      keywords: project.technologies.join(', '),
      technologies: project.technologies,
      role: project.role,
      projectType: project.projectType,
      duration: project.duration ? `${project.duration} weeks` : undefined,
      outcomes: project.outcomes,
      links: project.links,
    })),
  }
}

