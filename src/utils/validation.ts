/**
 * SEO and crawlability validation utilities
 */

export interface ValidationResult {
  name: string
  passed: boolean
  message: string
  severity: 'error' | 'warning' | 'info'
}

/**
 * Validate schema.org markup
 */
export const validateSchemaMarkup = (): ValidationResult[] => {
  const results: ValidationResult[] = []

  // Check for JSON-LD scripts
  const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]')
  results.push({
    name: 'JSON-LD Schema',
    passed: jsonLdScripts.length > 0,
    message: `Found ${jsonLdScripts.length} JSON-LD schema(s)`,
    severity: jsonLdScripts.length > 0 ? 'info' : 'error',
  })

  // Check for Person schema
  let hasPersonSchema = false
  jsonLdScripts.forEach(script => {
    try {
      const schema = JSON.parse(script.textContent || '{}')
      if (schema['@type'] === 'Person' || schema['@type'] === 'CreativeWork') {
        hasPersonSchema = true
      }
    } catch (e) {
      // Invalid JSON
    }
  })

  results.push({
    name: 'Person/CreativeWork Schema',
    passed: hasPersonSchema,
    message: hasPersonSchema ? 'Person or CreativeWork schema found' : 'No Person/CreativeWork schema found',
    severity: hasPersonSchema ? 'info' : 'warning',
  })

  return results
}

/**
 * Validate meta tags
 */
export const validateMetaTags = (): ValidationResult[] => {
  const results: ValidationResult[] = []

  const metaTags = {
    'description': document.querySelector('meta[name="description"]'),
    'viewport': document.querySelector('meta[name="viewport"]'),
    'og:title': document.querySelector('meta[property="og:title"]'),
    'og:description': document.querySelector('meta[property="og:description"]'),
    'og:image': document.querySelector('meta[property="og:image"]'),
  }

  Object.entries(metaTags).forEach(([name, element]) => {
    results.push({
      name: `Meta: ${name}`,
      passed: !!element,
      message: element ? `${name} meta tag found` : `${name} meta tag missing`,
      severity: element ? 'info' : 'warning',
    })
  })

  return results
}

/**
 * Validate accessibility
 */
export const validateAccessibility = (): ValidationResult[] => {
  const results: ValidationResult[] = []

  // Check for alt text on images
  const images = document.querySelectorAll('img')
  let imagesWithAlt = 0
  images.forEach(img => {
    if (img.alt) imagesWithAlt++
  })

  results.push({
    name: 'Image Alt Text',
    passed: imagesWithAlt === images.length,
    message: `${imagesWithAlt}/${images.length} images have alt text`,
    severity: imagesWithAlt === images.length ? 'info' : 'warning',
  })

  // Check for heading hierarchy
  const h1s = document.querySelectorAll('h1')
  results.push({
    name: 'H1 Tags',
    passed: h1s.length > 0,
    message: `Found ${h1s.length} H1 tag(s)`,
    severity: h1s.length > 0 ? 'info' : 'warning',
  })

  // Check for semantic HTML
  const semanticElements = document.querySelectorAll('header, nav, main, section, footer, article')
  results.push({
    name: 'Semantic HTML',
    passed: semanticElements.length > 0,
    message: `Found ${semanticElements.length} semantic element(s)`,
    severity: semanticElements.length > 0 ? 'info' : 'warning',
  })

  return results
}

/**
 * Validate robots.txt
 */
export const validateRobotsTxt = async (): Promise<ValidationResult> => {
  try {
    const response = await fetch('/robots.txt')
    const content = await response.text()
    const hasSitemap = content.includes('Sitemap:')
    const hasUserAgent = content.includes('User-agent:')

    return {
      name: 'robots.txt',
      passed: hasSitemap && hasUserAgent,
      message: `robots.txt found with ${hasSitemap ? 'sitemap' : 'no sitemap'} and ${hasUserAgent ? 'user-agent' : 'no user-agent'}`,
      severity: hasSitemap && hasUserAgent ? 'info' : 'warning',
    }
  } catch (e) {
    return {
      name: 'robots.txt',
      passed: false,
      message: 'robots.txt not found',
      severity: 'error',
    }
  }
}

/**
 * Validate sitemap.xml
 */
export const validateSitemap = async (): Promise<ValidationResult> => {
  try {
    const response = await fetch('/sitemap.xml')
    const content = await response.text()
    const urlCount = (content.match(/<url>/g) || []).length

    return {
      name: 'sitemap.xml',
      passed: urlCount > 0,
      message: `sitemap.xml found with ${urlCount} URL(s)`,
      severity: urlCount > 0 ? 'info' : 'warning',
    }
  } catch (e) {
    return {
      name: 'sitemap.xml',
      passed: false,
      message: 'sitemap.xml not found',
      severity: 'error',
    }
  }
}

/**
 * Run all validations
 */
export const runAllValidations = async (): Promise<ValidationResult[]> => {
  const results: ValidationResult[] = []

  results.push(...validateSchemaMarkup())
  results.push(...validateMetaTags())
  results.push(...validateAccessibility())
  results.push(await validateRobotsTxt())
  results.push(await validateSitemap())

  return results
}

/**
 * Print validation results
 */
export const printValidationResults = (results: ValidationResult[]) => {
  console.log('\n=== SEO & Crawlability Validation ===\n')

  const errors = results.filter(r => r.severity === 'error')
  const warnings = results.filter(r => r.severity === 'warning')
  const infos = results.filter(r => r.severity === 'info')

  if (errors.length > 0) {
    console.log('❌ ERRORS:')
    errors.forEach(r => console.log(`  - ${r.name}: ${r.message}`))
  }

  if (warnings.length > 0) {
    console.log('\n⚠️  WARNINGS:')
    warnings.forEach(r => console.log(`  - ${r.name}: ${r.message}`))
  }

  if (infos.length > 0) {
    console.log('\nℹ️  INFO:')
    infos.forEach(r => console.log(`  - ${r.name}: ${r.message}`))
  }

  console.log('\n=== Summary ===')
  console.log(`Total: ${results.length} | Errors: ${errors.length} | Warnings: ${warnings.length} | Info: ${infos.length}\n`)
}

