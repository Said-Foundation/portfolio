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

    // Process files that start with 'X', are numbered directly, or follow the new ranking format (id_ranking.json)
    if (filename.startsWith('X') || /^\d+\.json$/.test(filename) || /^\d+_\d+\.json$/.test(filename)) {
      // Extract the project ID and ranking from the filename
      let id: number
      let ranking: number = 999 // Default ranking for non-ranked projects

      if (filename.startsWith('X')) {
        // Extract the project ID from the filename (e.g., './projects/X1.json' -> 1)
        id = parseInt(filename.substring(1).split('.')[0] || '0')
      } else if (/^\d+_\d+\.json$/.test(filename)) {
        // Extract ID and ranking from new format (e.g., './projects/29_1.json' -> id: 29, ranking: 1)
        const parts = filename.split('_')
        id = parseInt(parts[0] || '0')
        ranking = parseInt(parts[1].split('.')[0] || '999')
      } else {
        // Extract the project ID from the filename (e.g., './projects/15.json' -> 15)
        id = parseInt(filename.split('.')[0] || '0')
      }

      // Add the project data with its ID and ranking
      if (module && typeof module === 'object') {
        const projectData = module as any
        projects.push({
          id,
          ranking,
          title: projectData.project_name,
          description: projectData.description,
          technologies: projectData.technologies_used.map((tech: any) => tech.name),
          year: projectData.year,
          month: projectData.month,
          duration: projectData.duration,
          role: projectData.role,
          projectType: projectData.project_type,
          infrastructure: projectData.infrastructure,
          skillsRequired: projectData.skills_required,
          challengesFaced: projectData.challenges_faced,
          outcomes: projectData.outcomes,
          links: projectData.links,
          githubUrl: projectData.links?.find((link: any) => link.type === 'github')?.url,
          demoUrl: projectData.links?.find((link: any) => link.type === 'demo')?.url,
          achievementLog: projectData.achievement_log
        })
      }
    }
  })

  // Sort projects by ranking first (ascending), then by ID (ascending)
  return projects.sort((a, b) => {
    const aRanking = a.ranking ?? 999
    const bRanking = b.ranking ?? 999
    if (aRanking !== bRanking) {
      return aRanking - bRanking
    }
    return a.id - b.id
  })
}

// Get top featured projects (ranking 1-4)
export const getFeaturedProjects = (): Project[] => {
  return loadProjects().filter(project => (project.ranking ?? 999) <= 4)
}

// Get all other projects (ranking > 4 or no ranking)
export const getOtherProjects = (): Project[] => {
  return loadProjects().filter(project => (project.ranking ?? 999) > 4)
}