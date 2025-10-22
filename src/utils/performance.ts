/**
 * Performance optimization utilities for static SPA
 */

/**
 * Lazy load images with Intersection Observer
 */
export const setupLazyLoading = () => {
  const images = document.querySelectorAll('img[data-src]')
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          img.src = img.dataset.src || ''
          img.removeAttribute('data-src')
          observer.unobserve(img)
        }
      })
    })

    images.forEach(img => imageObserver.observe(img))
  } else {
    // Fallback for browsers without IntersectionObserver
    images.forEach(img => {
      const htmlImg = img as HTMLImageElement
      htmlImg.src = htmlImg.dataset.src || ''
      htmlImg.removeAttribute('data-src')
    })
  }
}

/**
 * Preload critical resources
 */
export const preloadCriticalResources = () => {
  // Preload fonts
  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'font'
  link.type = 'font/woff2'
  link.crossOrigin = 'anonymous'
  document.head.appendChild(link)
}

/**
 * Report Web Vitals
 */
export const reportWebVitals = () => {
  // Largest Contentful Paint
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1] as any
        console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime)
      })
      observer.observe({ entryTypes: ['largest-contentful-paint'] })
    } catch (e) {
      console.log('LCP observer not supported')
    }
  }

  // First Input Delay
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach(entry => {
          console.log('FID:', (entry as any).processingDuration)
        })
      })
      observer.observe({ entryTypes: ['first-input'] })
    } catch (e) {
      console.log('FID observer not supported')
    }
  }

  // Cumulative Layout Shift
  let clsValue = 0
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach(entry => {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value
            console.log('CLS:', clsValue)
          }
        })
      })
      observer.observe({ entryTypes: ['layout-shift'] })
    } catch (e) {
      console.log('CLS observer not supported')
    }
  }
}

/**
 * Optimize CSS delivery
 */
export const optimizeCSSDelivery = () => {
  // Move non-critical CSS to async loading
  const links = document.querySelectorAll('link[rel="stylesheet"]')
  links.forEach(link => {
    if (!link.getAttribute('data-critical')) {
      link.setAttribute('media', 'print')
      const linkElement = link as HTMLLinkElement
      linkElement.addEventListener('load', () => {
        linkElement.media = 'all'
      })
    }
  })
}

/**
 * Enable resource hints
 */
export const enableResourceHints = () => {
  // DNS prefetch for external resources
  const dnsHints = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ]

  dnsHints.forEach(url => {
    const link = document.createElement('link')
    link.rel = 'dns-prefetch'
    link.href = url
    document.head.appendChild(link)
  })

  // Preconnect to critical origins
  const preconnectHints = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ]

  preconnectHints.forEach(url => {
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = url
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  })
}

/**
 * Initialize all performance optimizations
 */
export const initializePerformanceOptimizations = () => {
  setupLazyLoading()
  preloadCriticalResources()
  reportWebVitals()
  optimizeCSSDelivery()
  enableResourceHints()
}

