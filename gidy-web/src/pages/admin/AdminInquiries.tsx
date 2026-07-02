import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Eye, ChevronDown } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { formatDate } from '@/lib/utils'
import type { ProjectInquiry } from '@/types/database'
import toast from 'react-hot-toast'

const statuses: ProjectInquiry['status'][] = ['NEW', 'CONTACTED', 'DISCUSSION', 'PROPOSAL_SENT', 'CLOSED']
const statusColors: Record<string, string> = {
  NEW: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  CONTACTED: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  DISCUSSION: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  PROPOSAL_SENT: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  CLOSED: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
}

export function AdminInquiries() {
  const [inquiries, setInquiries] = useState<ProjectInquiry[]>([])
  const [filtered, setFiltered] = useState<ProjectInquiry[]>([])
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selected, setSelected] = useState<ProjectInquiry | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    supabase.from('project_inquiries').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      if (data) { setInquiries(data as ProjectInquiry[]); setFiltered(data as ProjectInquiry[]) }
      setIsLoading(false)
    })
  }, [])

  useEffect(() => {
    let res = inquiries
    if (search) res = res.filter(i => i.company_name.toLowerCase().includes(search.toLowerCase()) || i.contact_person.toLowerCase().includes(search.toLowerCase()) || i.email.toLowerCase().includes(search.toLowerCase()))
    if (statusFilter !== 'all') res = res.filter(i => i.status === statusFilter)
    setFiltered(res)
  }, [search, statusFilter, inquiries])

  const updateStatus = async (id: string, status: ProjectInquiry['status']) => {
    const { error } = await supabase.from('project_inquiries').update({ status }).eq('id', id)
    if (error) { toast.error('Failed to update'); return }
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i))
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null)
    toast.success('Status updated')
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">Project Inquiries</h1>
        <span className="text-sm text-gray-500">{filtered.length} total</span>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input type="text" placeholder="Search companies..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500" />
        </div>
        <div className="relative">
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="pl-4 pr-8 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none appearance-none">
            <option value="all">All Status</option>
            {statuses.map(s => <option key={s}>{s}</option>)}
          </select>
          <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-12 bg-gray-800 rounded-lg animate-pulse" />)}</div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-600">No inquiries found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left text-xs text-gray-500 font-medium px-5 py-3">Company</th>
                  <th className="text-left text-xs text-gray-500 font-medium px-4 py-3 hidden md:table-cell">Category</th>
                  <th className="text-left text-xs text-gray-500 font-medium px-4 py-3 hidden lg:table-cell">Budget</th>
                  <th className="text-left text-xs text-gray-500 font-medium px-4 py-3">Status</th>
                  <th className="text-left text-xs text-gray-500 font-medium px-4 py-3 hidden sm:table-cell">Date</th>
                  <th className="text-left text-xs text-gray-500 font-medium px-4 py-3">View</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((inq, i) => (
                  <motion.tr key={inq.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="text-white font-medium">{inq.company_name}</div>
                      <div className="text-gray-500 text-xs">{inq.contact_person} · {inq.email}</div>
                    </td>
                    <td className="px-4 py-3.5 text-gray-300 hidden md:table-cell">{inq.project_category}</td>
                    <td className="px-4 py-3.5 text-gray-300 text-xs hidden lg:table-cell">{inq.estimated_budget || '—'}</td>
                    <td className="px-4 py-3.5">
                      <select value={inq.status} onChange={e => updateStatus(inq.id, e.target.value as ProjectInquiry['status'])} className={`text-xs px-2.5 py-1 rounded-full border bg-transparent focus:outline-none cursor-pointer ${statusColors[inq.status]}`}>
                        {statuses.map(s => <option key={s} value={s} className="bg-gray-800 text-white">{s}</option>)}
                      </select>
                    </td>
                    <td className="px-4 py-3.5 text-gray-500 text-xs hidden sm:table-cell">{formatDate(inq.created_at)}</td>
                    <td className="px-4 py-3.5">
                      <button onClick={() => setSelected(inq)} className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                        <Eye size={14} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={() => setSelected(null)}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} onClick={e => e.stopPropagation()} className="w-full max-w-lg bg-gray-900 border border-gray-700 rounded-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-800 sticky top-0 bg-gray-900">
              <h3 className="font-bold text-white">Inquiry Details</h3>
              <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-white">✕</button>
            </div>
            <div className="p-5 space-y-3 text-sm">
              {[
                ['Company', selected.company_name], ['Contact', selected.contact_person], ['Email', selected.email], ['Phone', selected.phone],
                ['Category', selected.project_category], ['Budget', selected.estimated_budget || '—'], ['Date', formatDate(selected.created_at)],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-3">
                  <span className="text-gray-500 w-24 flex-shrink-0">{label}</span>
                  <span className="text-white">{value}</span>
                </div>
              ))}
              <div>
                <div className="text-gray-500 mb-2">Description</div>
                <p className="text-white text-xs leading-relaxed bg-gray-800 p-3 rounded-lg">{selected.project_description}</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
