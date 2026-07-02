import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import type { Partner } from '@/types/database'

const fallbackPartners = [
  { id: '1', name: 'TCS', logo_url: null },
  { id: '2', name: 'Infosys', logo_url: null },
  { id: '3', name: 'Wipro', logo_url: null },
  { id: '4', name: 'HCL', logo_url: null },
  { id: '5', name: 'Tech Mahindra', logo_url: null },
  { id: '6', name: 'Cognizant', logo_url: null },
]

export function PartnersSection() {
  const [partners, setPartners] = useState(fallbackPartners)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    supabase.from('partners').select('*').eq('is_active', true).order('sort_order').then(({ data }) => {
      if (data && data.length > 0) setPartners(data as unknown as typeof fallbackPartners)
    })
  }, [])

  return (
    <section ref={ref} className="py-16 bg-white dark:bg-gray-950 border-y border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center text-sm text-gray-400 uppercase tracking-widest font-medium mb-10"
        >
          Trusted by Industry Leaders
        </motion.p>
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center justify-center px-6 py-3 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-orange-200 dark:hover:border-orange-800 transition-colors min-w-[120px]"
            >
              {partner.logo_url ? (
                <img src={partner.logo_url} alt={partner.name} className="h-8 object-contain filter grayscale hover:grayscale-0 transition-all" />
              ) : (
                <span className="text-gray-400 dark:text-gray-500 font-semibold text-sm">{partner.name}</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
