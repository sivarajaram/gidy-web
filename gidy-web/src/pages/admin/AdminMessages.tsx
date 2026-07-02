import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Eye } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { formatDate } from '@/lib/utils'
import type { ContactMessage } from '@/types/database'

export function AdminMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [filtered, setFiltered] = useState<ContactMessage[]>([])
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<ContactMessage | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    supabase.from('contact_messages').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      if (data) { setMessages(data as ContactMessage[]); setFiltered(data as ContactMessage[]) }
      setIsLoading(false)
    })
  }, [])

  useEffect(() => {
    if (search) setFiltered(messages.filter(m => m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase()) || m.subject.toLowerCase().includes(search.toLowerCase())))
    else setFiltered(messages)
  }, [search, messages])

  const markRead = async (id: string) => {
    await supabase.from('contact_messages').update({ is_read: true }).eq('id', id)
    setMessages(prev => prev.map(m => m.id === id ? { ...m, is_read: true } : m))
  }

  const openMessage = (m: ContactMessage) => {
    setSelected(m)
    if (!m.is_read) markRead(m.id)
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">Contact Messages</h1>
        <span className="text-sm text-gray-500">{messages.filter(m => !m.is_read).length} unread</span>
      </div>
      <div className="relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input type="text" placeholder="Search messages..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500" />
      </div>
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="p-5 space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-16 bg-gray-800 rounded-xl animate-pulse" />)}</div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-600">No messages found.</div>
        ) : (
          <div className="divide-y divide-gray-800">
            {filtered.map((m, i) => (
              <motion.div key={m.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }} className={`flex items-start gap-4 p-4 hover:bg-gray-800/50 transition-colors cursor-pointer ${!m.is_read ? 'border-l-2 border-orange-500' : ''}`} onClick={() => openMessage(m)}>
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${!m.is_read ? 'bg-gradient-to-br from-orange-400 to-orange-600' : 'bg-gray-700'}`}>
                  {m.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`font-medium text-sm ${!m.is_read ? 'text-white' : 'text-gray-300'}`}>{m.name}</span>
                    <span className="text-gray-600 text-xs">{m.email}</span>
                  </div>
                  <div className="text-gray-400 text-sm truncate">{m.subject}</div>
                  <div className="text-gray-600 text-xs truncate">{m.message}</div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-gray-600 text-xs">{formatDate(m.created_at)}</span>
                  <Eye size={14} className="text-gray-600" />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={() => setSelected(null)}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} onClick={e => e.stopPropagation()} className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-2xl">
            <div className="flex items-center justify-between p-5 border-b border-gray-800">
              <h3 className="font-bold text-white truncate">{selected.subject}</h3>
              <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-white flex-shrink-0 ml-3">✕</button>
            </div>
            <div className="p-5 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div><div className="text-gray-500 text-xs mb-1">From</div><div className="text-white">{selected.name}</div></div>
                <div><div className="text-gray-500 text-xs mb-1">Email</div><div className="text-white">{selected.email}</div></div>
                {selected.phone && <div><div className="text-gray-500 text-xs mb-1">Phone</div><div className="text-white">{selected.phone}</div></div>}
                <div><div className="text-gray-500 text-xs mb-1">Date</div><div className="text-white">{formatDate(selected.created_at)}</div></div>
              </div>
              <div>
                <div className="text-gray-500 text-xs mb-2">Message</div>
                <p className="text-white leading-relaxed bg-gray-800 p-4 rounded-xl text-sm">{selected.message}</p>
              </div>
              <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`} className="block w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-center font-medium rounded-xl transition-colors text-sm">
                Reply via Email
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
