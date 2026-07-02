import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { Domain } from '@/types/database'
import toast from 'react-hot-toast'

const iconOptions = ['Brain', 'Code2', 'Cloud', 'Shield', 'Database', 'Smartphone', 'Palette', 'TestTube', 'GitBranch', 'BarChart3', 'Cpu', 'Globe']

export function AdminDomains() {
  const [domains, setDomains] = useState<Domain[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Domain | null>(null)
  const [form, setForm] = useState({ name: '', description: '', icon: 'Code2' })
  const [saving, setSaving] = useState(false)

  const fetch = async () => {
    const { data } = await supabase.from('domains').select('*').order('sort_order')
    if (data) setDomains(data as Domain[])
    setIsLoading(false)
  }

  useEffect(() => { fetch() }, [])

  const openEdit = (d: Domain) => {
    setEditing(d)
    setForm({ name: d.name, description: d.description || '', icon: d.icon || 'Code2' })
    setShowForm(true)
  }

  const openCreate = () => {
    setEditing(null)
    setForm({ name: '', description: '', icon: 'Code2' })
    setShowForm(true)
  }

  const save = async () => {
    if (!form.name.trim()) { toast.error('Name is required'); return }
    setSaving(true)
    if (editing) {
      const { error } = await supabase.from('domains').update({ name: form.name, description: form.description, icon: form.icon, updated_at: new Date().toISOString() }).eq('id', editing.id)
      if (error) { toast.error('Failed to update'); setSaving(false); return }
      toast.success('Domain updated')
    } else {
      const { error } = await supabase.from('domains').insert({ name: form.name, description: form.description, icon: form.icon, is_active: true, sort_order: domains.length + 1 })
      if (error) { toast.error('Failed to create'); setSaving(false); return }
      toast.success('Domain created')
    }
    setSaving(false)
    setShowForm(false)
    fetch()
  }

  const toggle = async (d: Domain) => {
    await supabase.from('domains').update({ is_active: !d.is_active }).eq('id', d.id)
    setDomains(prev => prev.map(x => x.id === d.id ? { ...x, is_active: !x.is_active } : x))
    toast.success(d.is_active ? 'Domain disabled' : 'Domain enabled')
  }

  const remove = async (id: string) => {
    if (!confirm('Delete this domain?')) return
    await supabase.from('domains').delete().eq('id', id)
    setDomains(prev => prev.filter(d => d.id !== id))
    toast.success('Domain deleted')
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">Domains</h1>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-xl transition-colors">
          <Plus size={16} /> Add Domain
        </button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-24 bg-gray-800 rounded-xl animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {domains.map((d, i) => (
            <motion.div key={d.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="p-4 bg-gray-900 border border-gray-800 rounded-xl flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-orange-400 bg-orange-500/10 flex-shrink-0`}>
                {d.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-medium text-sm truncate">{d.name}</div>
                <div className="text-gray-500 text-xs truncate">{d.description}</div>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button onClick={() => toggle(d)} className={`p-1.5 rounded-lg transition-colors ${d.is_active ? 'text-green-400 hover:bg-green-950/40' : 'text-gray-600 hover:bg-gray-800'}`}>
                  {d.is_active ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                </button>
                <button onClick={() => openEdit(d)} className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
                  <Pencil size={14} />
                </button>
                <button onClick={() => remove(d.id)} className="p-1.5 rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-950/20 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={() => setShowForm(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} onClick={e => e.stopPropagation()} className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-2xl">
            <div className="flex items-center justify-between p-5 border-b border-gray-800">
              <h3 className="font-bold text-white">{editing ? 'Edit Domain' : 'Add Domain'}</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-white">✕</button>
            </div>
            <div className="p-5 space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm text-gray-300">Domain Name *</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. AI & Machine Learning" className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm text-gray-300">Description</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm text-gray-300">Icon</label>
                <select value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30">
                  {iconOptions.map(opt => <option key={opt}>{opt}</option>)}
                </select>
              </div>
            </div>
            <div className="p-5 border-t border-gray-800 flex gap-3">
              <button onClick={save} disabled={saving} className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 text-sm">
                {saving ? <><Loader2 size={14} className="animate-spin" /> Saving...</> : (editing ? 'Update Domain' : 'Create Domain')}
              </button>
              <button onClick={() => setShowForm(false)} className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-colors text-sm">Cancel</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
