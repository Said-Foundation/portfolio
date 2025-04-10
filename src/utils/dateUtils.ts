/**
 * Format a date from year and month to a readable string
 * @param year The year
 * @param month The month (1-12)
 * @returns Formatted date string (e.g., "January 2023")
 */
export const formatDate = (year: number, month: number): string => {
  const date = new Date(year, month - 1)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
}

/**
 * Prevent background scrolling when a modal is open
 * @param isOpen Whether the modal is open
 */
export const usePreventScroll = (isOpen: boolean): void => {
  if (typeof window !== 'undefined') {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }
} 