import { motion } from 'framer-motion'
import { Project } from '../../data/portfolio'
import { formatDate, formatDuration } from '../../utils/dateUtils'

interface FeaturedProjectCardProps {
  project: Project
  index: number
  onOpenProject: (project: Project) => void
}

const FeaturedProjectCard = ({ project, index, onOpenProject }: FeaturedProjectCardProps) => {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="card rounded-xl p-6 border border-border hover:border-accent transition-all duration-300 group"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Side - Project Card */}
        <div className="space-y-4">
          {/* Project Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-secondary text-xs">{formatDate(project.year, project.month)}</span>
                {project.duration && (
                  <span className="text-secondary text-xs">• {formatDuration(project.duration)}</span>
                )}
                {project.projectType && (
                  <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full">
                    {project.projectType}
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-bold mb-2 leading-tight group-hover:text-accent transition-colors">
                {project.title}
              </h3>
            </div>
          </div>

          {/* Project Description */}
          <p className="text-secondary text-sm leading-relaxed">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-accent/10 text-accent rounded-md text-xs font-medium border border-accent/20 hover:border-accent/50 transition-colors"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-3 py-1 bg-border text-secondary rounded-md text-xs font-medium">
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>

          {/* View Details Button */}
          <div className="pt-2">
            <motion.button
              onClick={() => onOpenProject(project)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-primary"
            >
              View Details
            </motion.button>
          </div>
        </div>

        {/* Right Side - Achievement Log */}
        <div className="bg-gradient-to-br from-accent/5 to-accent/2 rounded-lg p-4 border border-accent/20 hover:border-accent/40 transition-colors">
          {project.achievementLog ? (
            <div className="text-secondary text-sm leading-relaxed">
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{
                  __html: project.achievementLog
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-accent">$1</strong>')
                    .replace(/\*\*Result\*\*:/g, '<br/><strong class="text-accent">✨ Result</strong>:')
                }}
              />
            </div>
          ) : (
            <p className="text-secondary text-sm italic">
              Achievement details not available for this project.
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default FeaturedProjectCard
