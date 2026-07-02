import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Globe, Smartphone, Cloud, Settings, Brain, Building, Code } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { Service } from '@/types/database'

const fallbackServices = [
  { id: '1', title: 'Software Development', description: 'Custom software solutions tailored to your business requirements.', icon: 'Code' },
  { id: '2', title: 'Web Development', description: 'Modern, responsive web applications built with the latest technologies.', icon: 'Globe' },
  { id: '3', title: 'Mobile Applications', description: 'Cross-platform mobile apps for iOS and Android platforms.', icon: 'Smartphone' },
  { id: '4', title: 'Cloud Solutions', description: 'Scalable cloud infrastructure and migration services.', icon: 'Cloud' },
  { id: '5', title: 'Industrial Automation', description: 'Smart automation systems for manufacturing and industry.', icon: 'Settings' },
  { id: '6', title: 'AI Solutions', description: 'Intelligent AI-powered solutions to automate and optimize.', icon: 'Brain' },
  { id: '7', title: 'Enterprise Solutions', description: 'End-to-end enterprise software and ERP implementations.', icon: 'Building' },
]

const iconMap: Record<string, React.ElementType> = { Globe, Smartphone, Cloud, Settings, Brain, Building, Code }

export function ServicesPreview() {
  const [services, setServices] = useState(fallbackServices)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    supabase.from('services').select('*').eq('is_active', true).order('sort_order').then(({ data }) => {
      if (data && data.length > 0) setServices(data as unknown as typeof fallbackServices)
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
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Technology Solutions for Every Need
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            From startups to enterprises — we build robust technology solutions that drive growth and efficiency.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon || 'Code'] || Code
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group p-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-orange-200 dark:hover:border-orange-700 hover:shadow-lg transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-500 flex items-center justify-center mb-3 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1.5 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{service.description}</p>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-10"
        >
          <Link to="/services" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-semibold rounded-xl transition-all">
            View All Services <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
