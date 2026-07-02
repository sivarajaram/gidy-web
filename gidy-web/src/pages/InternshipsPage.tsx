import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Filter, Clock, Monitor, MapPin, Award, ArrowRight, ChevronDown } from 'lucide-react'
import { SEOHead } from '@/components/layout/SEOHead'
import { supabase } from '@/lib/supabase'
import type { Internship } from '@/types/database'

const fallbackInternships: Internship[] = [
  { id: '1', title: 'AI & Machine Learning Internship', domain_id: null, description: 'Master deep learning, neural networks, and AI model deployment with hands-on projects using Python, TensorFlow, and real datasets.', skills_covered: ['Python', 'TensorFlow', 'PyTorch', 'Data Analysis', 'Model Deployment'], duration: '3 months', mode: 'online', certificate_details: 'Industry-recognized certificate upon completion', benefits: ['Mentorship', 'Real Projects', 'Certificate', 'Placement Support'], is_published: true, is_archived: false, created_at: '', updated_at: '' },
  { id: '2', title: 'Full Stack Web Development Internship', domain_id: null, description: 'Build complete web applications from front to back using React, Node.js, and PostgreSQL. Work on real client projects.', skills_covered: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'REST APIs'], duration: '3 months', mode: 'hybrid', certificate_details: 'Industry-recognized certificate upon completion', benefits: ['Mentorship', 'Real Projects', 'Certificate', 'Job Assistance'], is_published: true, is_archived: false, created_at: '', updated_at: '' },
  { id: '3', title: 'Cyber Security Internship', domain_id: null, description: 'Learn ethical hacking, penetration testing, and security analysis. Work with industry-grade tools to protect systems.', skills_covered: ['Ethical Hacking', 'Network Security', 'OWASP', 'Kali Linux', 'SOC'], duration: '2 months', mode: 'online', certificate_details: 'Industry-recognized certificate upon completion', benefits: ['Mentorship', 'Lab Access', 'Certificate', 'Career Guidance'], is_published: true, is_archived: false, created_at: '', updated_at: '' },
  { id: '4', title: 'Data Science & Analytics Internship', domain_id: null, description: 'Analyze large datasets, build predictive models, and create dashboards. Master Python, SQL, and visualization tools.', skills_covered: ['Python', 'SQL', 'Pandas', 'Matplotlib', 'Machine Learning'], duration: '3 months', mode: 'online', certificate_details: 'Industry-recognized certificate upon completion', benefits: ['Mentorship', 'Real Datasets', 'Certificate', 'Portfolio Projects'], is_published: true, is_archived: false, created_at: '', updated_at: '' },
  { id: '5', title: 'DevOps & Cloud Internship', domain_id: null, description: 'Master CI/CD pipelines, Docker, Kubernetes, and deploy applications on AWS and GCP with best practices.', skills_covered: ['Docker', 'Kubernetes', 'AWS', 'GitHub Actions', 'Terraform'], duration: '2 months', mode: 'online', certificate_details: 'Industry-recognized certificate upon completion', benefits: ['Cloud Credits', 'Real Projects', 'Certificate', 'Mentorship'], is_published: true, is_archived: false, created_at: '', updated_at: '' },
  { id: '6', title: 'Mobile App Development Internship', domain_id: null, description: 'Build cross-platform mobile applications using React Native and Flutter for both iOS and Android platforms.', skills_covered: ['React Native', 'Flutter', 'Dart', 'API Integration', 'App Store Deployment'], duration: '3 months', mode: 'hybrid', certificate_details: 'Industry-recognized certificate upon completion', benefits: ['Mentorship', 'App Projects', 'Certificate', 'Portfolio'], is_published: true, is_archived: false, created_at: '', updated_at: '' },
]

const modeLabels = { online: 'Online', offline: 'Offline', hybrid: 'Hybrid' }
const modeColors = { online: 'bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-400', offline: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400', hybrid: 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400' }

export function InternshipsPage() {
  const [internships, setInternships] = useState<Internship[]>(fallbackInternships)
  const [filtered, setFiltered] = useState<Internship[]>(fallbackInternships)
  const [search, setSearch] = useState('')
  const [modeFilter, setModeFilter] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(true)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    supabase.from('internships').select('*').eq('is_published', true).eq('is_archived', false).then(({ data }) => {
      if (data && data.length > 0) {
        setInternships(data as Internship[])
        setFiltered(data as Internship[])
      }
      setIsLoading(false)
    })
    const domainParam = searchParams.get('domain')
    if (domainParam) setSearch(domainParam)
  }, [searchParams])

  useEffect(() => {
    let result = internships
    if (search) result = result.filter(i => i.title.toLowerCase().includes(search.toLowerCase()) || i.skills_covered.some(s => s.toLowerCase().includes(search.toLowerCase())))
    if (modeFilter !== 'all') result = result.filter(i => i.mode === modeFilter)
    setFiltered(result)
  }, [search, modeFilter, internships])

  return (
    <>
      <SEOHead title="Internship Programs - GIDY Technologies" description="Explore 15+ internship domains including AI, ML, Full Stack, DevOps, Cyber Security, and more. Apply now and kickstart your tech career." />

      {/* Header */}
      <div className="pt-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1.5 bg-orange-500/10 text-orange-400 text-sm font-medium rounded-full border border-orange-500/20 mb-4">Internship Programs</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Build Your Tech Career</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Practical, industry-focused internships with mentorship, real projects, and placement support.</p>
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px] relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by domain or skill..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500"
            />
          </div>
          <div className="relative">
            <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <select
              value={modeFilter}
              onChange={e => setModeFilter(e.target.value)}
              className="pl-9 pr-8 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 appearance-none"
            >
              <option value="all">All Modes</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="hybrid">Hybrid</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">{filtered.length} program{filtered.length !== 1 ? 's' : ''} found</span>
        </div>
      </div>

      {/* Listings */}
      <div className="py-12 bg-gray-50 dark:bg-gray-900 min-h-[400px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-64 rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 dark:text-gray-400 text-lg">No internships found matching your criteria.</p>
              <button onClick={() => { setSearch(''); setModeFilter('all') }} className="mt-4 text-orange-500 hover:text-orange-600 text-sm font-medium">Clear filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((internship, i) => (
                <motion.div
                  key={internship.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-orange-200 dark:hover:border-orange-700 hover:shadow-lg transition-all flex flex-col"
                >
                  <div className="p-6 flex-1">
                    <div className="flex items-start justify-between mb-4 gap-2">
                      <h3 className="font-bold text-gray-900 dark:text-white text-base leading-tight">{internship.title}</h3>
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 ${modeColors[internship.mode]}`}>
                        {modeLabels[internship.mode]}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-3">{internship.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {internship.skills_covered.slice(0, 4).map(skill => (
                        <span key={skill} className="text-xs px-2 py-1 bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 rounded-md">{skill}</span>
                      ))}
                      {internship.skills_covered.length > 4 && <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-500 rounded-md">+{internship.skills_covered.length - 4}</span>}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1"><Clock size={12} /> {internship.duration}</span>
                      {internship.certificate_details && <span className="flex items-center gap-1"><Award size={12} /> Certificate</span>}
                    </div>
                  </div>
                  <div className="p-4 border-t border-gray-50 dark:border-gray-800">
                    <Link
                      to={`/apply?internship=${internship.id}&title=${encodeURIComponent(internship.title)}`}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-colors"
                    >
                      Apply Now <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
