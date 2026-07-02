import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Building2, CheckCircle2, Loader2 } from 'lucide-react'
import { SEOHead } from '@/components/layout/SEOHead'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

const schema = z.object({
  company_name: z.string().min(2, 'Company name is required'),
  contact_person: z.string().min(2, 'Contact person name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Valid phone required'),
  project_category: z.string().min(1, 'Please select a category'),
  estimated_budget: z.string().optional(),
  project_description: z.string().min(20, 'Please provide at least 20 characters'),
})
type FormData = z.infer<typeof schema>

const categories = ['Web Development', 'Mobile Application', 'Software Development', 'Cloud & DevOps', 'AI & ML Solution', 'Industrial Automation', 'Enterprise Solution', 'UI/UX Design', 'Data Analytics', 'Other']
const budgets = ['Under ₹50,000', '₹50,000 – ₹2,00,000', '₹2,00,000 – ₹5,00,000', '₹5,00,000 – ₹10,00,000', 'Above ₹10,00,000', 'To be discussed']

const inputClass = 'w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-colors'

export function ProjectEnquiryPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    try {
      const { error } = await supabase.from('project_inquiries').insert({ ...data, status: 'NEW' })
      if (error) throw error
      setIsSubmitted(true)
      toast.success('Inquiry submitted successfully!')
    } catch {
      toast.error('Failed to submit inquiry. Please try again.')
    }
  }

  return (
    <>
      <SEOHead title="Project Enquiry - GIDY Technologies" description="Submit your project requirements to GIDY Technologies. We'll review and get back to you with a tailored proposal." />

      <div className="pt-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1.5 bg-orange-500/10 text-orange-400 text-sm font-medium rounded-full border border-orange-500/20 mb-4">Project Enquiry</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Tell Us About Your Project</h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">Share your requirements and we'll come back with a custom proposal tailored to your needs.</p>
          </motion.div>
        </div>
      </div>

      <div className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {isSubmitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-950/40 text-green-500 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Inquiry Received!</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">Thank you for reaching out. Our team will review your requirements and contact you within 1–2 business days.</p>
              <a href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors">Back to Home</a>
            </motion.div>
          ) : (
            <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
                  <Building2 size={20} />
                </div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Company & Contact Details</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { label: 'Company Name *', field: 'company_name' as const, placeholder: 'Acme Pvt Ltd', type: 'text' },
                  { label: 'Contact Person *', field: 'contact_person' as const, placeholder: 'Rajesh Kumar', type: 'text' },
                  { label: 'Email Address *', field: 'email' as const, placeholder: 'rajesh@company.com', type: 'email' },
                  { label: 'Phone Number *', field: 'phone' as const, placeholder: '+91 98765 43210', type: 'tel' },
                ].map(({ label, field, placeholder, type }) => (
                  <div key={field} className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
                    <input {...register(field)} type={type} placeholder={placeholder} className={inputClass} />
                    {errors[field] && <p className="text-xs text-red-500">{errors[field]?.message}</p>}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Project Category *</label>
                  <select {...register('project_category')} className={inputClass}>
                    <option value="">Select category</option>
                    {categories.map(c => <option key={c}>{c}</option>)}
                  </select>
                  {errors.project_category && <p className="text-xs text-red-500">{errors.project_category.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Estimated Budget</label>
                  <select {...register('estimated_budget')} className={inputClass}>
                    <option value="">Select budget range</option>
                    {budgets.map(b => <option key={b}>{b}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Project Description *</label>
                <textarea {...register('project_description')} rows={6} placeholder="Describe your project requirements, goals, timeline, and any technical specifications..." className={inputClass} />
                {errors.project_description && <p className="text-xs text-red-500">{errors.project_description.message}</p>}
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
                {isSubmitting ? <><Loader2 size={18} className="animate-spin" /> Submitting...</> : 'Submit Enquiry'}
              </button>
            </motion.form>
          )}
        </div>
      </div>
    </>
  )
}
