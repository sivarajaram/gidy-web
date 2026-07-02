import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Users, FileText, Globe, Settings, Star, MessageSquare, TrendingUp, Clock } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { formatDate } from '@/lib/utils'

interface Stats {
  applications: number
  inquiries: number
  domains: number
  services: number
  testimonials: number
  messages: number
}

interface RecentApplication {
  id: string
  full_name: string
  domain: string
  status: string
  created_at: string
}

const statusColors: Record<string, string> = {
  NEW: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  REVIEWING: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  SHORTLISTED: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  CONTACTED: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  SELECTED: 'bg-green-500/10 text-green-400 border-green-500/20',
  REJECTED: 'bg-red-500/10 text-red-400 border-red-500/20',
  COMPLETED: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
}

export function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ applications: 0, inquiries: 0, domains: 0, services: 0, testimonials: 0, messages: 0 })
  const [recentApps, setRecentApps] = useState<RecentApplication[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const [apps, inqs, doms, svcs, tests, msgs, recent] = await Promise.all([
        supabase.from('internship_applications').select('id', { count: 'exact', head: true }),
        supabase.from('project_inquiries').select('id', { count: 'exact', head: true }),
        supabase.from('domains').select('id', { count: 'exact', head: true }),
        supabase.from('services').select('id', { count: 'exact', head: true }),
        supabase.from('testimonials').select('id', { count: 'exact', head: true }),
        supabase.from('contact_messages').select('id', { count: 'exact', head: true }),
        supabase.from('internship_applications').select('id, full_name, domain, status, created_at').order('created_at', { ascending: false }).limit(5),
      ])
      setStats({
        applications: apps.count ?? 0,
        inquiries: inqs.count ?? 0,
        domains: doms.count ?? 0,
        services: svcs.count ?? 0,
        testimonials: tests.count ?? 0,
        messages: msgs.count ?? 0,
      })
      if (recent.data) setRecentApps(recent.data as RecentApplication[])
      setIsLoading(false)
    }
    fetchData()
  }, [])

  const statCards = [
    { label: 'Applications', value: stats.applications, icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10', to: '/admin/applications' },
    { label: 'Inquiries', value: stats.inquiries, icon: FileText, color: 'text-purple-400', bg: 'bg-purple-500/10', to: '/admin/inquiries' },
    { label: 'Domains', value: stats.domains, icon: Globe, color: 'text-orange-400', bg: 'bg-orange-500/10', to: '/admin/domains' },
    { label: 'Services', value: stats.services, icon: Settings, color: 'text-green-400', bg: 'bg-green-500/10', to: '/admin/services' },
    { label: 'Testimonials', value: stats.testimonials, icon: Star, color: 'text-amber-400', bg: 'bg-amber-500/10', to: '/admin/testimonials' },
    { label: 'Messages', value: stats.messages, icon: MessageSquare, color: 'text-cyan-400', bg: 'bg-cyan-500/10', to: '/admin/messages' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-0.5">Welcome back. Here's what's happening.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((card, i) => {
          const Icon = card.icon
          return (
            <motion.a
              key={card.label}
              href={card.to}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="p-4 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-700 transition-colors block"
            >
              <div className={`w-9 h-9 rounded-lg ${card.bg} ${card.color} flex items-center justify-center mb-3`}>
                <Icon size={18} />
              </div>
              <div className="text-2xl font-bold text-white">
                {isLoading ? <div className="h-7 w-10 bg-gray-700 rounded animate-pulse" /> : card.value}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">{card.label}</div>
            </motion.a>
          )
        })}
      </div>

      {/* Recent Applications */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl">
        <div className="flex items-center justify-between p-5 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <TrendingUp size={18} className="text-orange-400" />
            <h2 className="font-semibold text-white text-sm">Recent Applications</h2>
          </div>
          <a href="/admin/applications" className="text-xs text-orange-400 hover:text-orange-300">View all →</a>
        </div>
        {isLoading ? (
          <div className="p-5 space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-10 bg-gray-800 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : recentApps.length === 0 ? (
          <div className="p-10 text-center text-gray-600 text-sm">No applications yet.</div>
        ) : (
          <div className="divide-y divide-gray-800">
            {recentApps.map((app) => (
              <div key={app.id} className="flex items-center gap-4 p-4 hover:bg-gray-800/50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                  {app.full_name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-medium truncate">{app.full_name}</div>
                  <div className="text-gray-500 text-xs">{app.domain}</div>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full border flex-shrink-0 ${statusColors[app.status] || statusColors.NEW}`}>
                  {app.status}
                </span>
                <div className="text-gray-600 text-xs flex items-center gap-1 flex-shrink-0 hidden sm:flex">
                  <Clock size={10} /> {formatDate(app.created_at)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
