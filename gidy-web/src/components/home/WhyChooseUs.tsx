import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Users, Wrench, Award, TrendingUp, Clock, BookOpen } from 'lucide-react'

const features = [
  {
    icon: Users,
    title: 'Industry Mentorship',
    description: 'Learn directly from experienced professionals actively working in top technology companies.',
  },
  {
    icon: Wrench,
    title: 'Practical Projects',
    description: 'Work on real client projects and build a portfolio that impresses recruiters.',
  },
  {
    icon: Award,
    title: 'Certification Programs',
    description: 'Earn industry-recognized certificates that validate your skills and knowledge.',
  },
  {
    icon: TrendingUp,
    title: 'Placement Guidance',
    description: 'Get dedicated support with resume building, interview prep, and job placement.',
  },
  {
    icon: Clock,
    title: 'Flexible Learning',
    description: 'Choose online, offline, or hybrid modes that fit your schedule and location.',
  },
  {
    icon: BookOpen,
    title: 'Industry-Relevant Curriculum',
    description: 'Curriculum updated regularly to match current industry demands and technologies.',
  },
]

export function WhyChooseUs() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section ref={ref} className="py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 text-sm font-medium rounded-full border border-orange-100 dark:border-orange-900 mb-4">
            Why GIDY
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            The GIDY Advantage
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            We go beyond theory to give you the practical skills and industry connections you need to succeed.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-orange-200 dark:hover:border-orange-700 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 text-white flex items-center justify-center mb-4 shadow-lg shadow-orange-500/25 group-hover:scale-110 transition-transform">
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
