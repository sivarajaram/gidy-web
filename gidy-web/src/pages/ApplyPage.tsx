import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Upload, CheckCircle2, Loader2 } from 'lucide-react'
import { SEOHead } from '@/components/layout/SEOHead'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

const schema = z.object({
  full_name: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number required').max(15),
  college_name: z.string().min(2, 'College name is required'),
  degree: z.string().min(2, 'Degree is required'),
  department: z.string().min(2, 'Department is required'),
  year_of_study: z.string().min(1, 'Year of study is required'),
  domain: z.string().min(1, 'Please select a domain'),
  message: z.string().optional(),
})

type FormData = z.infer<typeof schema>

const domains = ['AI & Machine Learning', 'Full Stack Development', 'Cyber Security', 'Data Science', 'DevOps & Cloud', 'Mobile Development', 'UI/UX Design', 'Software Testing', 'Database Management', 'Industrial Automation']

export function ApplyPage() {
  const [searchParams] = useSearchParams()
  const internshipTitle = searchParams.get('title') || ''
  const [resume, setResume] = useState<File | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { domain: internshipTitle || '' },
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      let resumeUrl: string | null = null

      if (resume) {
        const ext = resume.name.split('.').pop()
        const fileName = `${Date.now()}-${data.email}.${ext}`
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('resumes')
          .upload(fileName, resume)
        if (uploadError) throw uploadError
        const { data: { publicUrl } } = supabase.storage.from('resumes').getPublicUrl(uploadData.path)
        resumeUrl = publicUrl
      }

      const { error } = await supabase.from('internship_applications').insert({
        ...data,
        resume_url: resumeUrl,
        status: 'NEW',
        internship_id: searchParams.get('internship') || null,
      })

      if (error) throw error
      setIsSubmitted(true)
      toast.success('Application submitted successfully!')
    } catch {
      toast.error('Failed to submit application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md px-4">
          <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-950/40 text-green-500 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Application Submitted!</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Thank you for applying. Our team will review your application and contact you within 2-3 business days.</p>
          <a href="/internships" className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors">
            Explore More Internships
          </a>
        </motion.div>
      </div>
    )
  }

  return (
    <>
      <SEOHead title="Apply for Internship - GIDY Technologies" description="Submit your internship application to GIDY Technologies. Fill in your details and upload your resume to get started." />

      <div className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                {internshipTitle ? `Apply: ${internshipTitle}` : 'Internship Application'}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">Fill out the form below and we'll get back to you within 2-3 business days.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Field label="Full Name *" error={errors.full_name?.message}>
                  <input {...register('full_name')} placeholder="Priya Sharma" className={inputClass} />
                </Field>
                <Field label="Email Address *" error={errors.email?.message}>
                  <input {...register('email')} type="email" placeholder="priya@example.com" className={inputClass} />
                </Field>
                <Field label="Phone Number *" error={errors.phone?.message}>
                  <input {...register('phone')} placeholder="+91 98765 43210" className={inputClass} />
                </Field>
                <Field label="College Name *" error={errors.college_name?.message}>
                  <input {...register('college_name')} placeholder="Anna University" className={inputClass} />
                </Field>
                <Field label="Degree *" error={errors.degree?.message}>
                  <input {...register('degree')} placeholder="B.E. / B.Tech / MCA" className={inputClass} />
                </Field>
                <Field label="Department *" error={errors.department?.message}>
                  <input {...register('department')} placeholder="Computer Science" className={inputClass} />
                </Field>
                <Field label="Year of Study *" error={errors.year_of_study?.message}>
                  <select {...register('year_of_study')} className={inputClass}>
                    <option value="">Select year</option>
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>4th Year</option>
                    <option>Final Year</option>
                  </select>
                </Field>
                <Field label="Preferred Domain *" error={errors.domain?.message}>
                  <select {...register('domain')} className={inputClass}>
                    <option value="">Select domain</option>
                    {domains.map(d => <option key={d}>{d}</option>)}
                  </select>
                </Field>
              </div>

              <Field label="Resume / CV">
                <label className="flex flex-col items-center gap-3 p-6 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl hover:border-orange-400 transition-colors cursor-pointer bg-gray-50 dark:bg-gray-800">
                  <Upload size={24} className="text-gray-400" />
                  <span className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    {resume ? resume.name : 'Click to upload resume (PDF, DOC, DOCX — max 5MB)'}
                  </span>
                  <input type="file" accept=".pdf,.doc,.docx" onChange={e => setResume(e.target.files?.[0] || null)} className="hidden" />
                </label>
              </Field>

              <Field label="Message (Optional)" error={errors.message?.message}>
                <textarea {...register('message')} rows={4} placeholder="Tell us about yourself, your goals, or any specific areas you'd like to work on..." className={inputClass} />
              </Field>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? <><Loader2 size={18} className="animate-spin" /> Submitting...</> : 'Submit Application'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  )
}

const inputClass = 'w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-colors'

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
