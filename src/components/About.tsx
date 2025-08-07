import { useState } from 'react'
import { motion } from 'framer-motion'
import { portfolioData } from '../data/portfolio'


const About = () => {
  const [showAllSkills, setShowAllSkills] = useState(false);
  
  const visibleSkills = showAllSkills
    ? portfolioData.skills.technical
    : portfolioData.skills.technical.slice(0, portfolioData.settings.skills.defaultVisibleCount);

  const hasMoreSkills = portfolioData.skills.technical.length > portfolioData.settings.skills.defaultVisibleCount;

  return (
    <div className="grid md:grid-cols-2 gap-12">
      {/* Left side - Bio and Skills */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold mb-4">Summary</h3>
          <p className="text-secondary">{portfolioData.bio}</p>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold mb-4">Skills</h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-medium mb-2">Technical</h4>
              <div className="flex flex-wrap gap-2">
                {visibleSkills.map((skill) => (
                  <span
                    key={skill}
                    className="skill-tag"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              {hasMoreSkills && (
                <button 
                  onClick={() => setShowAllSkills(!showAllSkills)}
                  className="mt-2 text-accent hover:underline text-sm"
                >
                  {showAllSkills ? 'Show Less' : 'Show More'}
                </button>
              )}
            </div>
            <div>
              <h4 className="text-lg font-medium mb-2">Soft Skills</h4>
              <div className="flex flex-wrap gap-2">
                {portfolioData.skills.soft.map((skill) => (
                  <span
                    key={skill}
                    className="skill-tag"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-2">Languages</h4>
              <div className="flex flex-wrap gap-2">
                {portfolioData.skills.languages.map((language) => (
                  <span
                    key={language}
                    className="skill-tag"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right side - Experience Timeline and Education */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-6">Experience</h3>
          <div className="space-y-8">
            {portfolioData.experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-6 border-l border-border"
              >
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-accent" />
                <div className="mb-2">
                  <h4 className="text-lg font-semibold">{exp.company}</h4>
                  <p className="text-secondary">{exp.title}</p>
                </div>
                <p className="text-sm text-secondary mb-2">
                  {exp.startDate} - {exp.endDate}
                </p>
                <p className="text-secondary">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <h3 className="text-2xl font-bold mb-6">Education</h3>
          <div className="space-y-8">
            {portfolioData.education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-6 border-l border-border"
              >
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-accent" />
                <div className="mb-2">
                  <h4 className="text-lg font-semibold">{edu.institution}</h4>
                  <p className="text-secondary">
                    {edu.degree} in {edu.field}
                  </p>
                </div>
                <p className="text-sm text-secondary">
                  {edu.startDate} - {edu.endDate}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About 