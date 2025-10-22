import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Project, Infrastructure, Link, Skill } from '../../data/portfolio'
import { formatDate, formatDuration } from '../../utils/dateUtils'
import { generateProjectSchema, injectSchema } from '../../utils/schemaGenerator'

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  if (!project) return null

  // Inject schema markup when modal opens
  useEffect(() => {
    if (isOpen && project) {
      const schema = generateProjectSchema(project)
      injectSchema(schema, `project-schema-${project.id}`)
    }
  }, [isOpen, project])

  const hasContent = (content: any[] | undefined): boolean => {
    return Array.isArray(content) && content.length > 0
  }

  const renderSection = (
    title: string, 
    content: React.ReactNode,
    className: string = "bg-background/50 p-3 sm:p-4 rounded-lg border border-border"
  ) => (
    <div className="mb-4 last:mb-0">
      <h3 className="text-lg font-semibold mb-2 text-primary">{title}</h3>
      <div className={className}>
        {content}
      </div>
    </div>
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="modal-content bg-card rounded-xl p-3 sm:p-4 md:p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-border shadow-xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-4 bg-card pb-2">
              <div className="pr-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-1 text-primary">{project.title}</h2>
                <div className="flex flex-wrap items-center text-secondary gap-x-2 text-sm">
                  <span>{formatDate(project.year, project.month)}</span>
                  {project.duration && (
                    <>
                      <span className="hidden sm:inline">•</span>
                      <span>{formatDuration(project.duration)}</span>
                    </>
                  )}
                  {project.role && (
                    <>
                      <span className="hidden sm:inline">•</span>
                      <span>{project.role}</span>
                    </>
                  )}
                  {project.projectType && (
                    <>
                      <span className="hidden sm:inline">•</span>
                      <span className="capitalize">{project.projectType} Project</span>
                    </>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-secondary hover:text-primary transition-colors p-1 rounded-full hover:bg-background/80 -mt-1 -mr-2"
                aria-label="Close modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {/* Achievement Log Section - Show first for featured projects */}
              {project.achievementLog && renderSection(
                "Project Summary",
                <div className="text-secondary leading-relaxed text-sm">
                  <div
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: project.achievementLog
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary">$1</strong>')
                        .replace(/\*\*Result\*\*:/g, '<br/><strong class="text-accent">Result</strong>:')
                    }}
                  />
                </div>,
                "bg-accent/10 p-3 sm:p-4 rounded-lg border border-accent/20"
              )}

              {/* Description Section */}
              {project.description && renderSection(
                "Overview",
                <p className="text-secondary leading-relaxed text-sm">{project.description}</p>
              )}

              {/* Technologies Section */}
              {hasContent(project.technologies) && renderSection(
                "Technologies Used",
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-background text-primary rounded-md border border-border text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {/* Infrastructure Section */}
              {hasContent(project.infrastructure) && renderSection(
                "Implementation Details",
                <div className="space-y-3">
                  {project.infrastructure?.map((item: Infrastructure) => (
                    <div key={item.name} className="border-l-2 border-border pl-3">
                      <h4 className="font-medium mb-1 text-primary text-base">{item.name}</h4>
                      <p className="text-secondary text-sm mb-2">{item.description}</p>
                      {hasContent(item.steps) && (
                        <div className="ml-2 mt-2 space-y-1">
                          <p className="text-primary text-xs font-medium mb-1">Implementation Steps:</p>
                          <ol className="list-decimal list-inside space-y-1">
                            {item.steps.map((step, index) => (
                              <li key={index} className="text-secondary text-xs pl-1">{step}</li>
                            ))}
                          </ol>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Two-column layout for Skills and Challenges/Outcomes */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Skills Section */}
                {hasContent(project.skillsRequired) && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-primary">Skills Used</h3>
                    <div className="bg-background/50 p-3 rounded-lg border border-border h-full">
                      <ul className="space-y-2">
                        {project.skillsRequired?.map((skill: Skill) => (
                          <li key={skill.name} className="border-b border-border/50 pb-2 last:border-0">
                            <h5 className="font-medium text-primary text-sm">{skill.name}</h5>
                            {skill.description && (
                              <p className="text-secondary text-xs mt-1">{skill.description}</p>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Challenges Section */}
                {hasContent(project.challengesFaced) && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-primary">Challenges & Solutions</h3>
                    <div className="bg-background/50 p-3 rounded-lg border border-border h-full">
                      <ul className="space-y-2">
                        {project.challengesFaced && typeof project.challengesFaced[0] === 'string' ? (
                          project.challengesFaced.map((challenge, idx) => (
                            <li key={idx} className="text-secondary text-sm">
                              • {challenge}
                            </li>
                          ))
                        ) : (
                          project.challengesFaced?.map((challenge: any, idx) => (
                            <li key={idx} className="border-b border-border/50 pb-2 last:border-0">
                              <h5 className="font-medium text-primary text-sm">{challenge.name}</h5>
                              {challenge.description && (
                                <p className="text-secondary text-xs mt-1">{challenge.description}</p>
                              )}
                            </li>
                          ))
                        )}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Outcomes Section */}
              {hasContent(project.outcomes) && renderSection(
                "Outcomes & Results",
                <ul className="space-y-2">
                  {project.outcomes && typeof project.outcomes[0] === 'string' ? (
                    project.outcomes.map((outcome, idx) => (
                      <li key={idx} className="text-secondary flex items-start text-sm">
                        <span className="text-primary mr-2 mt-0.5">✓</span>
                        <span>{outcome}</span>
                      </li>
                    ))
                  ) : (
                    project.outcomes?.map((outcome: any, idx) => (
                      <li key={idx} className="text-secondary flex items-start border-b border-border/50 pb-2 last:border-0">
                        <div className="flex-1">
                          <h5 className="font-medium text-primary text-sm">{outcome.name}</h5>
                          {outcome.description && (
                            <p className="text-secondary text-xs mt-1">{outcome.description}</p>
                          )}
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              )}

              {/* Links Section */}
              {hasContent(project.links) && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2 text-primary">Project Links</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.links?.map((link: Link) => (
                      <a
                        key={link.type}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1.5 bg-accent text-background rounded-md hover:bg-accent/90 transition-colors text-sm"
                      >
                        {link.type === 'github' ? (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            View on GitHub
                          </>
                        ) : link.type === 'demo' ? (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
                            </svg>
                            Live Demo
                          </>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
                            </svg>
                            {link.type}
                          </>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ProjectModal 