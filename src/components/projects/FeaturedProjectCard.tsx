import { motion } from 'framer-motion'
import { Project } from '../../data/portfolio'

interface FeaturedProjectCardProps {
  project: Project
  index: number
  onOpenProject: (project: Project) => void
}

const FeaturedProjectCard = ({ project, index, onOpenProject }: FeaturedProjectCardProps) => {
  const formatDate = (year: number, month: number) => {
    return new Date(year, month - 1).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card rounded-xl p-6 border border-border hover:border-accent transition-all duration-300"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Side - Project Card */}
        <div className="space-y-4">
          {/* Project Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-secondary text-sm">{formatDate(project.year, project.month)}</span>
              </div>
              <h3 className="text-xl font-bold mb-2 leading-tight">{project.title}</h3>
            </div>
          </div>

          {/* Project Description */}
          <p className="text-secondary text-sm leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-background text-accent rounded-md text-xs border border-border"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-1 bg-background text-secondary rounded-md text-xs border border-border">
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>

          {/* View Details Button */}
          <div className="pt-2">
            <button
              onClick={() => onOpenProject(project)}
              className="btn btn-primary"
            >
              View Details
            </button>
          </div>
        </div>

        {/* Right Side - Achievement Log */}
        <div className="bg-background/50 rounded-lg p-4 border border-border">
          {project.achievementLog ? (
            <div className="text-secondary text-sm leading-relaxed">
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{
                  __html: project.achievementLog
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary">$1</strong>')
                    .replace(/\*\*Result\*\*:/g, '<br/><strong class="text-accent">Result</strong>:')
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
