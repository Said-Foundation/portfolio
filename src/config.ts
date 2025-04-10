/**
 * Portfolio Configuration
 * This file contains all configurable settings for the portfolio website.
 * Update these values to customize your portfolio without touching the main code.
 */

export const config = {
  // Theme settings
  theme: {
    primary: '#121212', // Main background color
    secondary: '#1e1e1e', // Secondary background color
    accent: '#66fcf1', // Accent color (matches logo)
    text: '#ffffff', // Primary text color
    textSecondary: '#a0a0a0', // Secondary text color
    border: '#333333', // Border color
  },
  
  // Layout settings
  layout: {
    maxWidth: '1200px', // Maximum width of the content
    borderRadius: '0.5rem', // Border radius for cards and buttons
  },
  
  // Animation settings
  animation: {
    duration: 0.3, // Animation duration in seconds
  },
  
  // Image paths
  images: {
    logo: '/photos/img/favicon.png',
    certificates: [
      '/photos/resume/certificate-1.png',
      '/photos/resume/certificate-2.png',
      '/photos/resume/certificate-3.png',
    ]
  },
  
  // Skills display settings
  skills: {
    defaultVisibleCount: 10, // Number of skills to show by default
  },
  
  // Contact information
  contact: {
    email: 'saidmustafa2812@gmail.com',
    github: 'https://github.com/saidmustafa-said',
    linkedin: 'https://www.linkedin.com/in/said-mustafa-said/',
  },
}; 