import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Brain, Code2, Cloud, Shield, Database, Smartphone, Palette, TestTube, GitBranch, BarChart3 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Domain } from '@/types/database'

const fallbackDomains = [
  { id: '1', name: 'AI & Machine Learning', icon: 'Brain', description: 'Build intelligent systems with Python, TensorFlow, and PyTorch', is_active: true },
  { id: '2', name: 'Full Stack Development', icon: 'Code2', description: 'Master React, Node.js, and modern web development', is_active: true },
  { id: '3', name: 'Cloud & AWS', icon: 'Cloud', description: 'Deploy scalable applications on AWS, GCP, and Azure', is_active: true },
  { id: '4', name: 'Cyber Security', icon: 'Shield', description: 'Protect systems with ethical hacking and security analysis', is_active: true },
  { id: '5', name: 'Data Science', icon: 'BarChart3', description: 'Analyze data and build predictive models', is_active: true },
  { id: '6', name: 'DevOps & CI/CD', icon: 'GitBranch', description: 'Automate deployment pipelines with Docker and Kubernetes', is_active: true },
  { id: '7', name: 'Mobile Development', icon: 'Smartphone', description: 'Build cross-platform apps with React Native & Flutter', is_active: true },
  { id: '8', name: 'UI/UX Design', icon: 'Palette', description: 'Design stunning interfaces with Figma and design systems', is_active: true },
  { id: '9', name: 'Software Testing', icon: 'TestTube', description: 'Master QA, automation testing with Selenium & Cypress', is_active: true },
  { id: '10', name: 'Database Management', icon: 'Database', description: 'Design and optimize databases with SQL and NoSQL', is_active: true },
]

const iconMap: Record<string, React.ElementType> = {
  Brain, Code2, Cloud, Shield, Database, Smartphone, Palette, TestTube, GitBranch, BarChart3,
}

export function DomainsSection() {
  const [domains, setDomains] = useState(fallbackDomains)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    supabase
      .from('domains')
      .select('*')
      .eq('is_active', true)
      .order('sort_order')
      .then(({ data }) => {
        if (data && data.length > 0) setDomains(data as unknown as typeof fallbackDomains)
      })
  }, [])

  return (
    <section ref={ref} className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 text-sm font-medium rounded-full border border-orange-100 dark:border-orange-900 mb-4">
            Internship Domains
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Explore Your Tech Path
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Choose from 15+ technology domains and gain hands-on experience with industry-standard tools.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {domains.slice(0, 10).map((domain, i) => {
            const Icon = iconMap[domain.icon || 'Code2'] || Code2
            return (
              <motion.div
                key={domain.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <Link
                  to={`/internships?domain=${encodeURIComponent(domain.name)}`}
                  className="group block p-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-orange-200 dark:hover:border-orange-700 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-500 flex items-center justify-center mb-3 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                    {domain.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                    {domain.description}
                  </p>
                </Link>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-10"
        >
          <Link
            to="/internships"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-all hover:scale-105"
          >
            View All Internships
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
