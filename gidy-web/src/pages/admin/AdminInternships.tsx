import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Pencil, Trash2, Eye, EyeOff, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { Internship } from '@/types/database'
import toast from 'react-hot-toast'

export function AdminInternships() {
  const [internships, setInternships] = useState<Internship[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Internship | null>(null)
  const [form, setForm] = useState({ title: '', description: '', skills_covered: '', duration: '3 months', mode: 'online' as Internship['mode'], certificate_details: '', benefits: '' })
  const [saving, setSaving] = useState(false)

  const fetch = async () => {
    const { data } = await supabase.from('internships').select('*').order('created_at', { ascending: false })
    if (data) setInternships(data as Internship[])
    setIsLoading(false)
  }
  useEffect(() => { fetch() }, [])

  const openEdit = (i: Internship) => {
    setEditing(i)
    setForm({ title: i.title, description: i.description, skills_covered: i.skills_covered.join(', '), duration: i.duration, mode: i.mode, certificate_details: i.certificate_details || '', benefits: i.benefits.join('\n') })
    setShowForm(true)
  }
  const openCreate = () => { setEditing(null); setForm({ title: '', description: '', skills_covered: '', duration: '3 months', mode: 'online', certificate_details: '', benefits: '' }); setShowForm(true) }

  const save = async () => {
    if (!form.title || !form.description) { toast.error('Title and description required'); return }
    setSaving(true)
    const payload = {
      title: form.title, description: form.description, duration: form.duration, mode: form.mode, certificate_details: form.certificate_details,
      skills_covered: form.skills_covered.split(',').map(s => s.trim()).filter(Boolean),
      benefits: form.benefits.split('\n').filter(Boolean),
    }
    if (editing) {
      await supabase.from('internships').update({ ...payload, updated_at: new Date().toISOString() }).eq('id', editing.id)
      toast.success('Internship updated')
    } else {
      await supabase.from('internships').insert({ ...payload, is_published: false, is_archived: false })
      toast.success('Internship created')
    }
    setSaving(false); setShowForm(false); fetch()
  }

  const togglePublish = async (i: Internship) => {
    await supabase.from('internships').update({ is_published: !i.is_published }).eq('id', i.id)
    setInternships(prev => prev.map(x => x.id === i.id ? { ...x, is_published: !x.is_published } : x))
    toast.success(i.is_published ? 'Unpublished' : 'Published')
  }

  const remove = async (id: string) => {
    if (!confirm('Delete this internship?')) return
    await supabase.from('internships').delete().eq('id', id)
    setInternships(prev => prev.filter(i => i.id !== id))
    toast.success('Deleted')
  }

  const modeColors = { online: 'text-green-400 bg-green-500/10', offline: 'text-blue-400 bg-blue-500/10', hybrid: 'text-purple-400 bg-purple-500/10' }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">Internships</h1>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-xl transition-colors">
          <Plus size={16} /> Add Internship
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-20 bg-gray-800 rounded-xl animate-pulse" />)}</div>
      ) : (
        <div className="space-y-3">
          {internships.map((int, i) => (
            <motion.div key={int.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }} className="p-4 bg-gray-900 border border-gray-800 rounded-xl flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-white font-medium text-sm">{int.title}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${modeColors[int.mode]}`}>{int.mode}</span>
                  {int.is_published ? <span className="text-xs px-2 py-0.5 rounded-full text-green-400 bg-green-500/10">Published</span> : <span className="text-xs px-2 py-0.5 rounded-full text-gray-500 bg-gray-800">Draft</span>}
                </div>
                <div className="text-gray-500 text-xs">{int.duration} · {int.skills_covered.slice(0, 3).join(', ')}{int.skills_covered.length > 3 ? `...` : ''}</div>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button onClick={() => togglePublish(int)} className={`p-1.5 rounded-lg transition-colors ${int.is_published ? 'text-green-400 hover:bg-green-950/20' : 'text-gray-600 hover:bg-gray-800'}`} title={int.is_published ? 'Unpublish' : 'Publish'}>
                  {int.is_published ? <Eye size={15} /> : <EyeOff size={15} />}
                </button>
                <button onClick={() => openEdit(int)} className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"><Pencil size={14} /></button>
                <button onClick={() => remove(int.id)} className="p-1.5 rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-950/20 transition-colors"><Trash2 size={14} /></button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={() => setShowForm(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} onClick={e => e.stopPropagation()} className="w-full max-w-lg bg-gray-900 border border-gray-700 rounded-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-800 sticky top-0 bg-gray-900">
              <h3 className="font-bold text-white">{editing ? 'Edit' : 'Add'} Internship</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-white">✕</button>
            </div>
            <div className="p-5 space-y-4">
              <InputField label="Title *" value={form.title} onChange={v => setForm(f => ({ ...f, title: v }))} placeholder="AI & Machine Learning Internship" />
              <TextAreaField label="Description *" value={form.description} onChange={v => setForm(f => ({ ...f, description: v }))} />
              <InputField label="Skills (comma separated)" value={form.skills_covered} onChange={v => setForm(f => ({ ...f, skills_covered: v }))} placeholder="Python, TensorFlow, Data Analysis" />
              <div className="grid grid-cols-2 gap-4">
                <InputField label="Duration" value={form.duration} onChange={v => setForm(f => ({ ...f, duration: v }))} placeholder="3 months" />
                <div className="space-y-1.5">
                  <label className="text-sm text-gray-300">Mode</label>
                  <select value={form.mode} onChange={e => setForm(f => ({ ...f, mode: e.target.value as Internship['mode'] }))} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none">
                    <option value="online">Online</option><option value="offline">Offline</option><option value="hybrid">Hybrid</option>
                  </select>
                </div>
              </div>
              <InputField label="Certificate Details" value={form.certificate_details} onChange={v => setForm(f => ({ ...f, certificate_details: v }))} placeholder="Industry-recognized certificate on completion" />
              <TextAreaField label="Benefits (one per line)" value={form.benefits} onChange={v => setForm(f => ({ ...f, benefits: v }))} placeholder="Mentorship&#10;Real Projects&#10;Certificate" />
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

const inputCls = "w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500"

function InputField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm text-gray-300">{label}</label>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={inputCls} />
    </div>
  )
}

function TextAreaField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm text-gray-300">{label}</label>
      <textarea value={value} onChange={e => onChange(e.target.value)} rows={3} placeholder={placeholder} className={inputCls} />
    </div>
  )
}
