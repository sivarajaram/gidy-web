import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, Star, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { Testimonial } from '@/types/database'
import toast from 'react-hot-toast'

type FormState = { name: string; role: string; company: string; content: string; rating: number }

export function AdminTestimonials() {
  const [items, setItems] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Testimonial | null>(null)
  const [form, setForm] = useState<FormState>({ name: '', role: '', company: '', content: '', rating: 5 })
  const [saving, setSaving] = useState(false)

  const fetch = async () => {
    const { data } = await supabase.from('testimonials').select('*').order('sort_order')
    if (data) setItems(data as Testimonial[])
    setIsLoading(false)
  }
  useEffect(() => { fetch() }, [])

  const openEdit = (t: Testimonial) => {
    setEditing(t)
    setForm({ name: t.name, role: t.role, company: t.company || '', content: t.content, rating: t.rating })
    setShowForm(true)
  }
  const openCreate = () => { setEditing(null); setForm({ name: '', role: '', company: '', content: '', rating: 5 }); setShowForm(true) }

  const save = async () => {
    if (!form.name || !form.content) { toast.error('Name and content required'); return }
    setSaving(true)
    if (editing) {
      await supabase.from('testimonials').update({ ...form, updated_at: new Date().toISOString() }).eq('id', editing.id)
      toast.success('Testimonial updated')
    } else {
      await supabase.from('testimonials').insert({ ...form, is_active: true, sort_order: items.length + 1 })
      toast.success('Testimonial created')
    }
    setSaving(false); setShowForm(false); fetch()
  }

  const toggle = async (t: Testimonial) => {
    await supabase.from('testimonials').update({ is_active: !t.is_active }).eq('id', t.id)
    setItems(prev => prev.map(x => x.id === t.id ? { ...x, is_active: !x.is_active } : x))
  }

  const remove = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return
    await supabase.from('testimonials').delete().eq('id', id)
    setItems(prev => prev.filter(t => t.id !== id))
    toast.success('Deleted')
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">Testimonials</h1>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-xl transition-colors">
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-20 bg-gray-800 rounded-xl animate-pulse" />)}</div>
      ) : (
        <div className="space-y-3">
          {items.map((t, i) => (
            <motion.div key={t.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="p-4 bg-gray-900 border border-gray-800 rounded-xl flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {t.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-medium text-sm">{t.name}</span>
                  <span className="text-gray-500 text-xs">· {t.role}{t.company ? ` at ${t.company}` : ''}</span>
                  <div className="flex ml-1">
                    {Array.from({ length: 5 }).map((_, idx) => <Star key={idx} size={10} className={idx < t.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-700'} />)}
                  </div>
                </div>
                <p className="text-gray-400 text-xs line-clamp-2">{t.content}</p>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button onClick={() => toggle(t)} className={`p-1.5 rounded-lg transition-colors ${t.is_active ? 'text-green-400 hover:bg-green-950/40' : 'text-gray-600 hover:bg-gray-800'}`}>
                  {t.is_active ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                </button>
                <button onClick={() => openEdit(t)} className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"><Pencil size={14} /></button>
                <button onClick={() => remove(t.id)} className="p-1.5 rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-950/20 transition-colors"><Trash2 size={14} /></button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={() => setShowForm(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} onClick={e => e.stopPropagation()} className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-2xl">
            <div className="flex items-center justify-between p-5 border-b border-gray-800">
              <h3 className="font-bold text-white">{editing ? 'Edit' : 'Add'} Testimonial</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-white">✕</button>
            </div>
            <div className="p-5 space-y-4">
              {(['name', 'role', 'company'] as const).map(field => (
                <div key={field} className="space-y-1.5">
                  <label className="text-sm text-gray-300 capitalize">{field}</label>
                  <input value={form[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500" />
                </div>
              ))}
              <div className="space-y-1.5">
                <label className="text-sm text-gray-300">Content *</label>
                <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} rows={3} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm text-gray-300">Rating</label>
                <div className="flex gap-2">
                  {[1,2,3,4,5].map(r => (
                    <button key={r} type="button" onClick={() => setForm(f => ({ ...f, rating: r }))} className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${r <= form.rating ? 'bg-amber-500/20 text-amber-400' : 'bg-gray-800 text-gray-600'}`}>
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-5 border-t border-gray-800 flex gap-3">
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
