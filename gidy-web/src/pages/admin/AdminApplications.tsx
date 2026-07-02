import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Download, ChevronDown, Eye } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { formatDate } from '@/lib/utils'
import type { InternshipApplication } from '@/types/database'
import toast from 'react-hot-toast'

const statuses = ['NEW', 'REVIEWING', 'SHORTLISTED', 'CONTACTED', 'SELECTED', 'REJECTED', 'COMPLETED']

const statusColors: Record<string, string> = {
  NEW: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  REVIEWING: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  SHORTLISTED: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  CONTACTED: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  SELECTED: 'bg-green-500/10 text-green-400 border-green-500/20',
  REJECTED: 'bg-red-500/10 text-red-400 border-red-500/20',
  COMPLETED: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
}

export function AdminApplications() {
  const [applications, setApplications] = useState<InternshipApplication[]>([])
  const [filtered, setFiltered] = useState<InternshipApplication[]>([])
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedApp, setSelectedApp] = useState<InternshipApplication | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    supabase.from('internship_applications').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      if (data) { setApplications(data as InternshipApplication[]); setFiltered(data as InternshipApplication[]) }
      setIsLoading(false)
    })
  }, [])

  useEffect(() => {
    let res = applications
    if (search) res = res.filter(a => a.full_name.toLowerCase().includes(search.toLowerCase()) || a.email.toLowerCase().includes(search.toLowerCase()) || a.domain.toLowerCase().includes(search.toLowerCase()))
    if (statusFilter !== 'all') res = res.filter(a => a.status === statusFilter)
    setFiltered(res)
  }, [search, statusFilter, applications])

  const updateStatus = async (id: string, status: InternshipApplication['status']) => {
    const { error } = await supabase.from('internship_applications').update({ status }).eq('id', id)
    if (error) { toast.error('Failed to update status'); return }
    setApplications(prev => prev.map(a => a.id === id ? { ...a, status } : a))
    if (selectedApp?.id === id) setSelectedApp(prev => prev ? { ...prev, status } : null)
    toast.success('Status updated')
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">Applications</h1>
        <span className="text-sm text-gray-500">{filtered.length} total</span>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input type="text" placeholder="Search applicants..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500" />
        </div>
        <div className="relative">
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="pl-4 pr-8 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 appearance-none">
            <option value="all">All Status</option>
            {statuses.map(s => <option key={s}>{s}</option>)}
          </select>
          <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-12 bg-gray-800 rounded-lg animate-pulse" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-600">No applications found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left text-xs text-gray-500 font-medium px-5 py-3">Applicant</th>
                  <th className="text-left text-xs text-gray-500 font-medium px-4 py-3 hidden md:table-cell">Domain</th>
                  <th className="text-left text-xs text-gray-500 font-medium px-4 py-3 hidden lg:table-cell">College</th>
                  <th className="text-left text-xs text-gray-500 font-medium px-4 py-3">Status</th>
                  <th className="text-left text-xs text-gray-500 font-medium px-4 py-3 hidden sm:table-cell">Date</th>
                  <th className="text-left text-xs text-gray-500 font-medium px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((app, i) => (
                  <motion.tr key={app.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                          {app.full_name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-white font-medium">{app.full_name}</div>
                          <div className="text-gray-500 text-xs">{app.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-gray-300 hidden md:table-cell">{app.domain}</td>
                    <td className="px-4 py-3.5 text-gray-300 hidden lg:table-cell text-xs">{app.college_name}</td>
                    <td className="px-4 py-3.5">
                      <select
                        value={app.status}
                        onChange={e => updateStatus(app.id, e.target.value as InternshipApplication['status'])}
                        className={`text-xs px-2.5 py-1 rounded-full border bg-transparent focus:outline-none cursor-pointer ${statusColors[app.status]}`}
                      >
                        {statuses.map(s => <option key={s} value={s} className="bg-gray-800 text-white">{s}</option>)}
                      </select>
                    </td>
                    <td className="px-4 py-3.5 text-gray-500 text-xs hidden sm:table-cell">{formatDate(app.created_at)}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <button onClick={() => setSelectedApp(app)} className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                          <Eye size={14} />
                        </button>
                        {app.resume_url && (
                          <a href={app.resume_url} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg text-gray-400 hover:text-orange-400 hover:bg-gray-700 transition-colors">
                            <Download size={14} />
                          </a>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={() => setSelectedApp(null)}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} onClick={e => e.stopPropagation()} className="w-full max-w-lg bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-gray-800">
              <h3 className="font-bold text-white">Application Details</h3>
              <button onClick={() => setSelectedApp(null)} className="text-gray-500 hover:text-white">✕</button>
            </div>
            <div className="p-5 space-y-3 text-sm max-h-[70vh] overflow-y-auto">
              {[
                ['Name', selectedApp.full_name], ['Email', selectedApp.email], ['Phone', selectedApp.phone],
                ['College', selectedApp.college_name], ['Degree', selectedApp.degree], ['Department', selectedApp.department],
                ['Year', selectedApp.year_of_study], ['Domain', selectedApp.domain], ['Date', formatDate(selectedApp.created_at)],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-3">
                  <span className="text-gray-500 w-24 flex-shrink-0">{label}</span>
                  <span className="text-white">{value}</span>
                </div>
              ))}
              {selectedApp.message && (
                <div>
                  <div className="text-gray-500 mb-1">Message</div>
                  <p className="text-white text-xs leading-relaxed bg-gray-800 p-3 rounded-lg">{selectedApp.message}</p>
                </div>
              )}
            </div>
            <div className="p-5 border-t border-gray-800 flex gap-3">
              {selectedApp.resume_url && (
                <a href={selectedApp.resume_url} target="_blank" rel="noopener noreferrer" className="flex-1 py-2.5 text-center bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-xl transition-colors">
                  Download Resume
                </a>
              )}
              <button onClick={() => setSelectedApp(null)} className="flex-1 py-2.5 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-xl transition-colors">Close</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
