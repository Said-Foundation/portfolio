import { useState } from 'react'
import { motion } from 'framer-motion'
import { getFeaturedProjects, getOtherProjects } from '../data/projects'
import ProjectCard from './projects/ProjectCard'
import FeaturedProjectCard from './projects/FeaturedProjectCard'
import ProjectModal from './projects/ProjectModal'
import { Project } from '../data/portfolio'

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showAllProjects, setShowAllProjects] = useState(false)

  const featuredProjects = getFeaturedProjects()
  const otherProjects = getOtherProjects()

  const handleOpenProject = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  return (
    <div className="py-8">
      {/* Featured Projects Section */}
      <div className="mb-12">
        <div className="space-y-8">
          {featuredProjects.map((project, index) => (
            <FeaturedProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpenProject={handleOpenProject}
            />
          ))}
        </div>
      </div>

      {/* Other Projects Section */}
      {otherProjects.length > 0 && (
        <div>
          <div className="text-center mb-8">
            <button
              onClick={() => setShowAllProjects(!showAllProjects)}
              className="btn btn-secondary"
            >
              {showAllProjects ? 'Show Less' : `See More Projects (${otherProjects.length})`}
            </button>
          </div>

          {showAllProjects && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr"
            >
              {otherProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onOpenProject={handleOpenProject}
                />
              ))}
            </motion.div>
          )}
        </div>
      )}

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