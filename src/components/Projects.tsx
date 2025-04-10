import { useState } from 'react'
import { portfolioData } from '../data/portfolio'
import ProjectCard from './projects/ProjectCard'
import ProjectModal from './projects/ProjectModal'

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<typeof portfolioData.projects[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // The projects are already filtered in the loadProjects function
  // We don't need to filter them again here
  const projects = portfolioData.projects

  const handleOpenProject = (project: typeof portfolioData.projects[0]) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  return (
    <div className="py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onOpenProject={handleOpenProject}
          />
        ))}
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}

export default Projects 