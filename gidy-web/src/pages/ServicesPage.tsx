import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight, Globe, Smartphone, Cloud, Settings, Brain, Building, Code } from 'lucide-react'
import { SEOHead } from '@/components/layout/SEOHead'
import { supabase } from '@/lib/supabase'
import type { Service } from '@/types/database'

const iconMap: Record<string, React.ElementType> = { Globe, Smartphone, Cloud, Settings, Brain, Building, Code }

const fallbackServices: Service[] = [
  { id: '1', title: 'Software Development', description: 'We build custom software solutions tailored to your specific business needs — from enterprise applications to specialized tools that streamline operations.', features: ['Custom Application Development', 'Legacy System Modernization', 'API Development & Integration', 'Software Architecture Design', 'Quality Assurance & Testing'], technologies: ['React', 'Node.js', 'Python', 'Java', 'PostgreSQL'], benefits: ['Scalable solutions', 'On-time delivery', 'Post-launch support', 'Agile methodology'], icon: 'Code', is_active: true, sort_order: 1, created_at: '', updated_at: '' },
  { id: '2', title: 'Web Development', description: 'We craft modern, responsive web applications that deliver exceptional user experiences across all devices and browsers.', features: ['Frontend Development', 'Backend Development', 'E-Commerce Solutions', 'CMS Development', 'Performance Optimization'], technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'], benefits: ['Mobile-first design', 'SEO optimized', 'Fast load times', 'Secure & reliable'], icon: 'Globe', is_active: true, sort_order: 2, created_at: '', updated_at: '' },
  { id: '3', title: 'Mobile Applications', description: 'Native and cross-platform mobile applications for iOS and Android that engage users and drive business growth.', features: ['iOS App Development', 'Android App Development', 'Cross-Platform Apps', 'App UI/UX Design', 'App Store Deployment'], technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin'], benefits: ['Cross-platform support', 'Offline functionality', 'Push notifications', 'Analytics integration'], icon: 'Smartphone', is_active: true, sort_order: 3, created_at: '', updated_at: '' },
  { id: '4', title: 'Cloud Solutions', description: 'Scalable cloud infrastructure, migration services, and managed cloud solutions on AWS, GCP, and Azure.', features: ['Cloud Migration', 'Infrastructure as Code', 'Serverless Architecture', 'Cost Optimization', 'DevOps Implementation'], technologies: ['AWS', 'GCP', 'Azure', 'Terraform', 'Docker', 'Kubernetes'], benefits: ['99.9% uptime', 'Auto-scaling', 'Cost efficient', 'Disaster recovery'], icon: 'Cloud', is_active: true, sort_order: 4, created_at: '', updated_at: '' },
  { id: '5', title: 'Industrial Automation', description: 'Smart automation systems for manufacturing and industrial processes — improving efficiency, reducing errors, and cutting costs.', features: ['PLC Programming', 'SCADA Systems', 'IoT Integration', 'Process Automation', 'Predictive Maintenance'], technologies: ['PLC', 'SCADA', 'IoT', 'Python', 'MQTT'], benefits: ['Reduced downtime', 'Higher efficiency', 'Real-time monitoring', 'Predictive analytics'], icon: 'Settings', is_active: true, sort_order: 5, created_at: '', updated_at: '' },
  { id: '6', title: 'AI Solutions', description: 'Intelligent AI-powered solutions that automate complex tasks, derive insights from data, and create competitive advantages.', features: ['Machine Learning Models', 'Natural Language Processing', 'Computer Vision', 'AI Chatbots', 'Predictive Analytics'], technologies: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI API', 'LangChain'], benefits: ['Automated workflows', 'Data-driven insights', 'Competitive advantage', 'Scalable AI'], icon: 'Brain', is_active: true, sort_order: 6, created_at: '', updated_at: '' },
  { id: '7', title: 'Enterprise Solutions', description: 'End-to-end enterprise software implementations including ERP, CRM, and business intelligence platforms.', features: ['ERP Implementation', 'CRM Solutions', 'Business Intelligence', 'Data Warehousing', 'System Integration'], technologies: ['SAP', 'Salesforce', 'Power BI', 'Tableau', 'REST APIs'], benefits: ['Unified operations', 'Real-time reporting', 'Process automation', 'Scalable architecture'], icon: 'Building', is_active: true, sort_order: 7, created_at: '', updated_at: '' },
]

export function ServicesPage() {
  const [services, setServices] = useState<Service[]>(fallbackServices)

  useEffect(() => {
    supabase.from('services').select('*').eq('is_active', true).order('sort_order').then(({ data }) => {
      if (data && data.length > 0) setServices(data as Service[])
    })
  }, [])

  return (
    <>
      <SEOHead title="Technology Services - GIDY Technologies" description="Expert software development, web development, mobile apps, cloud solutions, industrial automation, and AI solutions for businesses of all sizes." />

      <div className="pt-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1.5 bg-orange-500/10 text-orange-400 text-sm font-medium rounded-full border border-orange-500/20 mb-4">Our Services</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Technology Solutions for Growth</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">From startups to enterprises — we deliver robust, scalable, and innovative technology solutions.</p>
          </motion.div>
        </div>
      </div>

      <div className="py-16 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon || 'Code'] || Code
            const isEven = i % 2 === 0
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}
              >
                <div className={!isEven ? 'lg:col-start-2' : ''}>
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-lg shadow-orange-500/25 mb-5">
                    <Icon size={28} />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">{service.title}</h2>
                  <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed mb-6">{service.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                    {service.features.map(f => (
                      <div key={f} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <CheckCircle2 size={15} className="text-orange-500 flex-shrink-0" /> {f}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.technologies.map(t => (
                      <span key={t} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-lg">{t}</span>
                    ))}
                  </div>
                  <Link to="/project-enquiry" className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors text-sm">
                    Get a Quote <ArrowRight size={16} />
                  </Link>
                </div>
                <div className={`${!isEven ? 'lg:col-start-1 lg:row-start-1' : ''} p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-orange-50/30 dark:from-gray-900 dark:to-orange-950/10 border border-gray-100 dark:border-gray-800`}>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Key Benefits</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {service.benefits.map(b => (
                      <div key={b} className="flex items-start gap-2 p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                        <div className="w-5 h-5 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle2 size={12} />
                        </div>
                        <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">Have a Project in Mind?</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Tell us about your requirements and we'll build the perfect solution for your business.</p>
          <Link to="/project-enquiry" className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-all hover:scale-105 shadow-lg shadow-orange-500/25">
            Start Your Project <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </>
  )
}
