import { motion } from 'framer-motion'
import { portfolioData } from '../data/portfolio'


const About = () => {

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
          <h3 className="text-2xl font-bold mb-6">Skills</h3>
          <div className="space-y-6">
            {/* Skill Categories */}
            {Object.entries(portfolioData.skills.categories).map(([category, skills], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h4 className="text-sm font-semibold text-accent mb-3 uppercase tracking-wide">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.split(', ').map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.08, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-card border border-border rounded-full text-xs font-medium text-secondary hover:text-accent hover:border-accent transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Languages */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <h4 className="text-sm font-semibold text-accent mb-3 uppercase tracking-wide">Languages</h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(portfolioData.skills.languages).map(([language, level]) => (
                  <motion.span
                    key={language}
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1.5 bg-card border border-border rounded-full text-xs font-medium text-secondary hover:text-accent hover:border-accent transition-all duration-200 cursor-default"
                    title={`${language} - ${level}`}
                  >
                    {language}
                  </motion.span>
                ))}
              </div>
            </motion.div>
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
                <ul className="text-secondary space-y-1">
                  {exp.description.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <span className="text-accent mr-2 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
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
                <p className="text-sm text-secondary mb-2">
                  {edu.startDate} - {edu.endDate}
                </p>
                {edu.description && (
                  <ul className="text-secondary space-y-1">
                    {edu.description.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <span className="text-accent mr-2 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About 