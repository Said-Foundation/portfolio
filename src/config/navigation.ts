export const APP_URLS = {
  HOME: import.meta.env.VITE_HOME_URL || 'https://saidmustafasaid.com',
  PORTFOLIO: import.meta.env.VITE_PORTFOLIO_URL || 'https://portfolio.saidmustafasaid.com',
  TARGETED_CV: import.meta.env.VITE_TARGETED_CV_URL || 'https://targetedcv.saidmustafasaid.com',
}

export interface NavItem {
  id: string
  label: string
  href?: string
  type: 'internal' | 'external'
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'hub', label: 'Home', href: APP_URLS.HOME, type: 'external' },
  { id: 'home', label: 'Portfolio', type: 'internal' },
  { id: 'certificates', label: 'Certificates', type: 'internal' },
  { id: 'about', label: 'About', type: 'internal' },
  { id: 'projects', label: 'Projects', type: 'internal' },
  { id: 'contact', label: 'Contact', type: 'internal' },
  { id: 'targeted-cv', label: 'TargetedCV', href: APP_URLS.TARGETED_CV, type: 'external' }
]
