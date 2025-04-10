import { motion } from 'framer-motion'
import { portfolioData } from '../data/portfolio'

const Blog = () => {
  return (
    <div className="space-y-8">
      {portfolioData.blogPosts.length > 0 ? (
        portfolioData.blogPosts.map((post, index) => (
          <motion.article
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="card"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold mb-2">
                  <a href={post.url} className="hover:text-accent transition-colors">
                    {post.title}
                  </a>
                </h3>
                <p className="text-secondary">{post.excerpt}</p>
              </div>
              <div className="text-sm text-secondary whitespace-nowrap">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>
          </motion.article>
        ))
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card text-center py-12"
        >
          <h3 className="text-xl font-bold mb-4">No Blog Posts Yet</h3>
          <p className="text-secondary max-w-md mx-auto">
            I'm working on creating valuable content. Check back soon for new blog posts!
          </p>
        </motion.div>
      )}
    </div>
  )
}

export default Blog 