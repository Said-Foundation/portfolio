/**
 * Simple hash-based router for static SPA
 * Maintains SEO-friendly structure without React Router
 */

export type RouteType = 'home' | 'about' | 'projects' | 'certificates' | 'contact' | 'project-detail'

export interface Route {
  id: RouteType
  path: string
  label: string
  section?: string
}

export const routes: Route[] = [
  { id: 'home', path: '/', label: 'Home', section: 'home' },
  { id: 'about', path: '/about', label: 'About', section: 'about' },
  { id: 'projects', path: '/projects', label: 'Projects', section: 'projects' },
  { id: 'certificates', path: '/certificates', label: 'Certificates', section: 'certificates' },
  { id: 'contact', path: '/contact', label: 'Contact', section: 'contact' },
]

/**
 * Get current route from hash
 */
export const getCurrentRoute = (): RouteType => {
  const hash = window.location.hash.slice(1) || '/'
  const route = routes.find(r => r.path === hash)
  return route?.id || 'home'
}

/**
 * Navigate to a route
 */
export const navigateTo = (routeId: RouteType | string) => {
  const route = routes.find(r => r.id === routeId)
  if (route) {
    window.location.hash = route.path
  }
}

/**
 * Get section ID from route
 */
export const getSectionFromRoute = (routeId: RouteType): string => {
  const route = routes.find(r => r.id === routeId)
  return route?.section || 'home'
}

/**
 * Listen to route changes
 */
export const onRouteChange = (callback: (route: RouteType) => void) => {
  const handleHashChange = () => {
    callback(getCurrentRoute())
  }

  window.addEventListener('hashchange', handleHashChange)
  return () => window.removeEventListener('hashchange', handleHashChange)
}

/**
 * Get project route
 */
export const getProjectRoute = (projectId: string | number): string => {
  return `/#/projects/${projectId}`
}

/**
 * Parse project ID from current route
 */
export const getProjectIdFromRoute = (): string | null => {
  const hash = window.location.hash.slice(1)
  const match = hash.match(/^\/projects\/(\d+)$/)
  return match ? match[1] : null
}

