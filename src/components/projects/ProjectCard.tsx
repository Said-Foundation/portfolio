import { motion } from 'framer-motion'
import { Project } from '../../data/portfolio'
import { formatDate, formatDuration } from '../../utils/dateUtils'

interface ProjectCardProps {
  project: Project
  index: number
  onOpenProject: (project: Project) => void
}

const ProjectCard = ({ project, index, onOpenProject }: ProjectCardProps) => {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card rounded-xl p-6 border border-border hover:border-accent transition-all duration-300 flex flex-col h-full"
    >
      {/* Content Section */}
      <div className="flex-grow">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <div className="text-secondary mb-4 space-y-1">
          <p>{formatDate(project.year, project.month)}</p>
          {project.duration && (
            <p className="text-sm">Duration: {formatDuration(project.duration)}</p>
          )}
        </div>
        <p className="text-secondary mb-4 line-clamp-3">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-background text-accent rounded-md text-sm"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-1 bg-background text-secondary rounded-md text-sm">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Button Section - Always at the bottom */}
      <div className="mt-auto pt-4">
        <button
          onClick={() => onOpenProject(project)}
          className="btn btn-primary w-full"
        >
          View Details
        </button>
      </div>
    </motion.div>
  )
}

export default ProjectCard 