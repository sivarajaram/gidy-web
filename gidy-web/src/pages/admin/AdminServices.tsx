import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { Service } from '@/types/database'
import toast from 'react-hot-toast'

export function AdminServices() {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Service | null>(null)
  const [form, setForm] = useState({ title: '', description: '', icon: 'Code', features: '', technologies: '', benefits: '' })
  const [saving, setSaving] = useState(false)

  const fetch = async () => {
    const { data } = await supabase.from('services').select('*').order('sort_order')
    if (data) setServices(data as Service[])
    setIsLoading(false)
  }
  useEffect(() => { fetch() }, [])

  const openEdit = (s: Service) => {
    setEditing(s)
    setForm({ title: s.title, description: s.description, icon: s.icon || 'Code', features: s.features.join('\n'), technologies: s.technologies.join(', '), benefits: s.benefits.join('\n') })
    setShowForm(true)
  }
  const openCreate = () => { setEditing(null); setForm({ title: '', description: '', icon: 'Code', features: '', technologies: '', benefits: '' }); setShowForm(true) }

  const save = async () => {
    if (!form.title || !form.description) { toast.error('Title and description required'); return }
    setSaving(true)
    const payload = {
      title: form.title,
      description: form.description,
      icon: form.icon,
      features: form.features.split('\n').filter(Boolean),
      technologies: form.technologies.split(',').map(t => t.trim()).filter(Boolean),
      benefits: form.benefits.split('\n').filter(Boolean),
    }
    if (editing) {
      await supabase.from('services').update({ ...payload, updated_at: new Date().toISOString() }).eq('id', editing.id)
      toast.success('Service updated')
    } else {
      await supabase.from('services').insert({ ...payload, is_active: true, sort_order: services.length + 1 })
      toast.success('Service created')
    }
    setSaving(false); setShowForm(false); fetch()
  }

  const toggle = async (s: Service) => {
    await supabase.from('services').update({ is_active: !s.is_active }).eq('id', s.id)
    setServices(prev => prev.map(x => x.id === s.id ? { ...x, is_active: !x.is_active } : x))
  }

  const remove = async (id: string) => {
    if (!confirm('Delete this service?')) return
    await supabase.from('services').delete().eq('id', id)
    setServices(prev => prev.filter(s => s.id !== id))
    toast.success('Deleted')
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">Services</h1>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-xl transition-colors">
          <Plus size={16} /> Add Service
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-16 bg-gray-800 rounded-xl animate-pulse" />)}</div>
      ) : (
        <div className="space-y-3">
          {services.map((s, i) => (
            <motion.div key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }} className="p-4 bg-gray-900 border border-gray-800 rounded-xl flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="text-white font-medium text-sm">{s.title}</div>
                <div className="text-gray-500 text-xs line-clamp-1">{s.description}</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {s.technologies.slice(0, 4).map(t => <span key={t} className="text-xs px-1.5 py-0.5 bg-gray-800 text-gray-400 rounded">{t}</span>)}
                </div>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button onClick={() => toggle(s)} className={`p-1.5 rounded-lg transition-colors ${s.is_active ? 'text-green-400' : 'text-gray-600'}`}>
                  {s.is_active ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                </button>
                <button onClick={() => openEdit(s)} className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"><Pencil size={14} /></button>
                <button onClick={() => remove(s.id)} className="p-1.5 rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-950/20 transition-colors"><Trash2 size={14} /></button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={() => setShowForm(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} onClick={e => e.stopPropagation()} className="w-full max-w-lg bg-gray-900 border border-gray-700 rounded-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-800 sticky top-0 bg-gray-900">
              <h3 className="font-bold text-white">{editing ? 'Edit' : 'Add'} Service</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-white">✕</button>
            </div>
            <div className="p-5 space-y-4">
              {[
                { label: 'Title *', key: 'title', type: 'input', placeholder: 'Web Development' },
                { label: 'Description *', key: 'description', type: 'textarea', placeholder: 'Service description...' },
                { label: 'Features (one per line)', key: 'features', type: 'textarea', placeholder: 'Custom Development\nAPI Integration' },
                { label: 'Technologies (comma separated)', key: 'technologies', type: 'input', placeholder: 'React, Node.js, PostgreSQL' },
                { label: 'Benefits (one per line)', key: 'benefits', type: 'textarea', placeholder: 'Fast delivery\nScalable solutions' },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key} className="space-y-1.5">
                  <label className="text-sm text-gray-300">{label}</label>
                  {type === 'textarea' ? (
                    <textarea value={form[key as keyof typeof form]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} rows={3} placeholder={placeholder} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 placeholder-gray-600" />
                  ) : (
                    <input value={form[key as keyof typeof form]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} placeholder={placeholder} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 placeholder-gray-600" />
                  )}
                </div>
              ))}
            </div>
            <div className="p-5 border-t border-gray-800 flex gap-3 sticky bottom-0 bg-gray-900">
              <button onClick={save} disabled={saving} className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-medium rounded-xl transition-colors text-sm flex items-center justify-center gap-2">
                {saving ? <><Loader2 size={14} className="animate-spin" />Saving...</> : (editing ? 'Update' : 'Create')}
              </button>
              <button onClick={() => setShowForm(false)} className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-colors text-sm">Cancel</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
