import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { Testimonial } from '@/types/database'

const fallbackTestimonials: Testimonial[] = [
  { id: '1', name: 'Priya Sharma', role: 'Software Engineer', company: 'TCS', content: 'GIDY Technologies gave me the perfect platform to apply my theoretical knowledge in real projects. The mentorship was exceptional and helped me land my dream job.', rating: 5, avatar_url: null, is_active: true, sort_order: 1, created_at: '', updated_at: '' },
  { id: '2', name: 'Rahul Kumar', role: 'Data Analyst', company: 'Wipro', content: 'The Data Science internship at GIDY was incredibly comprehensive. I learned industry tools and gained confidence in presenting data-driven insights.', rating: 5, avatar_url: null, is_active: true, sort_order: 2, created_at: '', updated_at: '' },
  { id: '3', name: 'Ananya Patel', role: 'Full Stack Developer', company: 'Infosys', content: 'From zero coding experience to a full-stack developer role in 6 months — GIDY made it possible with their structured internship program.', rating: 5, avatar_url: null, is_active: true, sort_order: 3, created_at: '', updated_at: '' },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} className={i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'} />
      ))}
    </div>
  )
}

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    supabase.from('testimonials').select('*').eq('is_active', true).order('sort_order').then(({ data }) => {
      if (data && data.length > 0) setTestimonials(data as Testimonial[])
    })
  }, [])

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
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Students Say
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Join thousands of students who transformed their careers with GIDY Technologies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 6).map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-shadow"
            >
              <Quote size={32} className="text-orange-200 dark:text-orange-900 mb-4" />
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-5">
                "{t.content}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 dark:text-white text-sm">{t.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{t.role}{t.company ? ` · ${t.company}` : ''}</div>
                </div>
                <StarRating rating={t.rating} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
