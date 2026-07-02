import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Lock, Mail, Loader2, Eye, EyeOff } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})
type FormData = z.infer<typeof schema>

export function AdminLoginPage() {
  const navigate = useNavigate()
  const { signIn } = useAuthStore()
  const [showPass, setShowPass] = useState(false)
  const [authError, setAuthError] = useState('')
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setAuthError('')
    const { error } = await signIn(data.email, data.password)
    if (error) {
      setAuthError('Invalid email or password.')
      return
    }
    navigate('/admin/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/logo.png" alt="GIDY Technologies" className="h-14 w-auto object-contain mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-1">Admin Portal</h1>
          <p className="text-gray-500 text-sm">GIDY Technologies — Restricted Access</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-900 border border-gray-800 rounded-2xl p-8 space-y-5">
          {authError && (
            <div className="p-3 rounded-xl bg-red-950/40 border border-red-900 text-red-400 text-sm text-center">
              {authError}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300">Email Address</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input {...register('email')} type="email" placeholder="admin@gidytech.com" className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-700 bg-gray-800 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-colors" />
            </div>
            {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input {...register('password')} type={showPass ? 'text' : 'password'} placeholder="••••••••" className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-700 bg-gray-800 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-colors" />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-400">{errors.password.message}</p>}
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 mt-2">
            {isSubmitting ? <><Loader2 size={18} className="animate-spin" /> Signing in...</> : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-600 mt-6">
          Protected admin area. Unauthorized access is prohibited.
        </p>
      </motion.div>
    </div>
  )
}
