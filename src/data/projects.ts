import { Project } from './portfolio'

// Import all project JSON files
const projectFiles = import.meta.glob('./projects/*.json', { eager: true })

// Convert the imported files to an array of projects
export const loadProjects = (): Project[] => {
  const projects: Project[] = []
  
  // Process each file and add it to the projects array
  Object.entries(projectFiles).forEach(([path, module]) => {
    // Extract the filename from the path
    const filename = path.split('/').pop() || ''
    
    // Only process files that start with 'X'
    if (filename.startsWith('X')) {
      // Extract the project ID from the filename (e.g., './projects/X1.json' -> 1)
      const id = parseInt(filename.substring(1).split('.')[0] || '0')
      
      // Add the project data with its ID
      if (module && typeof module === 'object') {
        const projectData = module as any
        projects.push({
          id,
          title: projectData.project_name,
          description: projectData.description,
          technologies: projectData.technologies_used.map((tech: any) => tech.name),
          year: projectData.year,
          month: projectData.month,
          role: projectData.role,
          projectType: projectData.project_type,
          infrastructure: projectData.infrastructure,
          skillsRequired: projectData.skills_required,
          challengesFaced: projectData.challenges_faced,
          outcomes: projectData.outcomes,
          links: projectData.links,
          githubUrl: projectData.links?.find((link: any) => link.type === 'github')?.url,
          demoUrl: projectData.links?.find((link: any) => link.type === 'demo')?.url
        })
      }
    }
  })
  
  // Sort projects by ID (ascending order)
  return projects.sort((a, b) => a.id - b.id)
} 