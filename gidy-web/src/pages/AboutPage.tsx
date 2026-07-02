import { motion } from 'framer-motion'
import { Target, Eye, Heart, Building2, Users, Award, Globe, Cpu } from 'lucide-react'
import { SEOHead } from '@/components/layout/SEOHead'

const values = [
  { icon: Heart, title: 'Student-First Approach', description: 'Every decision we make centers around student success and career growth.' },
  { icon: Award, title: 'Quality Excellence', description: 'We maintain the highest standards in training, mentorship, and project delivery.' },
  { icon: Users, title: 'Collaborative Culture', description: 'We foster a supportive community where everyone thrives together.' },
  { icon: Globe, title: 'Industry Relevance', description: 'Our curriculum evolves with industry needs, keeping you ahead of the curve.' },
]

const industries = [
  { icon: Cpu, label: 'Information Technology' },
  { icon: Building2, label: 'Manufacturing' },
  { icon: Heart, label: 'Healthcare Tech' },
  { icon: Globe, label: 'E-Commerce' },
  { icon: Users, label: 'Education' },
  { icon: Target, label: 'FinTech' },
]

export function AboutPage() {
  return (
    <>
      <SEOHead title="About GIDY Technologies - Our Story & Mission" description="Learn about GIDY Technologies — our mission, vision, values, and commitment to transforming student careers and business growth through technology." />

      {/* Hero */}
      <div className="pt-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-orange-500/10 text-orange-400 text-sm font-medium rounded-full border border-orange-500/20 mb-4">About Us</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Empowering the Next Generation of{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">Tech Leaders</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              GIDY Technologies is a premier technology solutions and internship company dedicated to bridging the gap between academic knowledge and industry requirements. We transform ambitious learners into skilled professionals.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Company Overview */}
      <div className="py-16 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-5">Who We Are</h2>
              <div className="space-y-4 text-gray-500 dark:text-gray-400 leading-relaxed">
                <p>GIDY Technologies was founded with a clear mission: to make quality technology education and real-world experience accessible to every aspiring technologist in India.</p>
                <p>We operate at the intersection of education and industry, providing internship programs that give students hands-on experience with the same tools, processes, and challenges they'll face in professional environments.</p>
                <p>On the business side, we partner with startups, SMEs, enterprises, and industrial companies to deliver technology solutions that drive efficiency, innovation, and growth.</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="grid grid-cols-2 gap-4">
              {[{ label: 'Students Trained', value: '2500+' }, { label: 'Projects Delivered', value: '180+' }, { label: 'Domains Offered', value: '15+' }, { label: 'Industry Partners', value: '40+' }].map(stat => (
                <div key={stat.label} className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-center">
                  <div className="text-3xl font-bold text-orange-500 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
              <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-950/40 text-orange-500 flex items-center justify-center mb-5">
                <Target size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Our Mission</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">To empower students with industry-relevant skills and practical experience while delivering innovative technology solutions that help businesses succeed in the digital age.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
              <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-950/40 text-orange-500 flex items-center justify-center mb-5">
                <Eye size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Our Vision</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">To become India's most trusted technology partner — one that is known for producing exceptional talent, delivering cutting-edge solutions, and driving digital transformation across industries.</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="py-16 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">Our Core Values</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">The principles that guide everything we do.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center p-6 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-orange-200 dark:hover:border-orange-700 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/20">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{v.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{v.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Industries */}
      <div className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">Industries We Serve</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-10 max-w-xl mx-auto">Our technology solutions span across multiple sectors.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {industries.map((ind, i) => {
              const Icon = ind.icon
              return (
                <motion.div key={ind.label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-orange-200 dark:hover:border-orange-700 transition-colors">
                  <Icon size={18} className="text-orange-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{ind.label}</span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
