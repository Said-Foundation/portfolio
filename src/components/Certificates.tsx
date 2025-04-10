import { motion } from 'framer-motion'
import { portfolioData } from '../data/portfolio'

const Certificates = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {portfolioData.certificates.map((cert, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="flex justify-center items-center"
        >
          <img 
            src={cert.image} 
            alt={cert.title} 
            className="max-h-64 w-auto object-contain rounded-md"
          />
        </motion.div>
      ))}
    </div>
  )
}

export default Certificates 