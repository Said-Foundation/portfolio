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
      whileHover={{ y: -5 }}
      className="card rounded-xl p-6 border border-border hover:border-accent transition-all duration-300 flex flex-col h-full group"
    >
      {/* Content Section */}
      <div className="flex-grow">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold group-hover:text-accent transition-colors">{project.title}</h3>
          {project.projectType && (
            <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full whitespace-nowrap ml-2">
              {project.projectType}
            </span>
          )}
        </div>
        <div className="text-secondary mb-4 space-y-1 text-sm">
          <p>{formatDate(project.year, project.month)}</p>
          {project.duration && (
            <p className="text-xs">Duration: {formatDuration(project.duration)}</p>
          )}
        </div>
        <p className="text-secondary mb-4 line-clamp-3 text-sm leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-accent/10 text-accent rounded-md text-xs font-medium hover:bg-accent/20 transition-colors"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-1 bg-border text-secondary rounded-md text-xs font-medium">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Button Section - Always at the bottom */}
      <div className="mt-auto pt-4">
        <motion.button
          onClick={() => onOpenProject(project)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn btn-primary w-full"
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  )
}

export default ProjectCard 