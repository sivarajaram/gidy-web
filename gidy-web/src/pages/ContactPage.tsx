import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, CheckCircle2, Loader2 } from 'lucide-react'
import { SEOHead } from '@/components/layout/SEOHead'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})
type FormData = z.infer<typeof schema>

const inputClass = 'w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-colors'

export function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    try {
      const { error } = await supabase.from('contact_messages').insert(data)
      if (error) throw error
      setIsSubmitted(true)
      toast.success('Message sent successfully!')
    } catch {
      toast.error('Failed to send message. Please try again.')
    }
  }

  return (
    <>
      <SEOHead title="Contact GIDY Technologies" description="Get in touch with GIDY Technologies for internship inquiries, project discussions, or any questions." />

      <div className="pt-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1.5 bg-orange-500/10 text-orange-400 text-sm font-medium rounded-full border border-orange-500/20 mb-4">Contact Us</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Get In Touch</h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">Have questions about our programs or services? We'd love to hear from you.</p>
          </motion.div>
        </div>
      </div>

      <div className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Info */}
            <div className="space-y-6">
              {[
                { icon: MapPin, title: 'Address', lines: ['4/46, Yellama Kothur,', 'Gandhi Nagar, Hosur - 635109'] },
                { icon: Phone, title: 'Phone', lines: ['+91 70101 22535'] },
                { icon: Mail, title: 'Email', lines: ['contactgidytech@gmail.com'] },
                { icon: Clock, title: 'Business Hours', lines: ['Mon–Sat: 9:00 AM – 6:00 PM', 'Sunday: Closed'] },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <motion.div key={item.title} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-500 flex items-center justify-center flex-shrink-0">
                      <Icon size={18} />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{item.title}</div>
                      {item.lines.map(l => <div key={l} className="text-sm text-gray-500 dark:text-gray-400">{l}</div>)}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {isSubmitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex items-center justify-center text-center p-12 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                  <div>
                    <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-950/40 text-green-500 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-500 dark:text-gray-400">We'll get back to you within 24 hours.</p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Name *</label>
                      <input {...register('name')} placeholder="Your name" className={inputClass} />
                      {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email *</label>
                      <input {...register('email')} type="email" placeholder="your@email.com" className={inputClass} />
                      {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                      <input {...register('phone')} placeholder="+91 98765 43210" className={inputClass} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Subject *</label>
                      <input {...register('subject')} placeholder="How can we help?" className={inputClass} />
                      {errors.subject && <p className="text-xs text-red-500">{errors.subject.message}</p>}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Message *</label>
                    <textarea {...register('message')} rows={5} placeholder="Tell us more about your inquiry..." className={inputClass} />
                    {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
                    {isSubmitting ? <><Loader2 size={18} className="animate-spin" /> Sending...</> : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
