import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, Loader2, Upload } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { Partner } from '@/types/database'
import toast from 'react-hot-toast'

export function AdminPartners() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Partner | null>(null)
  const [form, setForm] = useState({ name: '', website_url: '' })
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)

  const fetch = async () => {
    const { data } = await supabase.from('partners').select('*').order('sort_order')
    if (data) setPartners(data as Partner[])
    setIsLoading(false)
  }
  useEffect(() => { fetch() }, [])

  const openEdit = (p: Partner) => { setEditing(p); setForm({ name: p.name, website_url: p.website_url || '' }); setLogoFile(null); setShowForm(true) }
  const openCreate = () => { setEditing(null); setForm({ name: '', website_url: '' }); setLogoFile(null); setShowForm(true) }

  const save = async () => {
    if (!form.name) { toast.error('Name required'); return }
    setSaving(true)
    let logoUrl = editing?.logo_url || null
    if (logoFile) {
      const ext = logoFile.name.split('.').pop()
      const path = `partners/${Date.now()}-${form.name.replace(/\s+/g, '-')}.${ext}`
      const { data, error } = await supabase.storage.from('logos').upload(path, logoFile, { upsert: true })
      if (!error && data) {
        const { data: { publicUrl } } = supabase.storage.from('logos').getPublicUrl(data.path)
        logoUrl = publicUrl
      }
    }
    if (editing) {
      await supabase.from('partners').update({ name: form.name, website_url: form.website_url || null, logo_url: logoUrl, updated_at: new Date().toISOString() }).eq('id', editing.id)
      toast.success('Partner updated')
    } else {
      await supabase.from('partners').insert({ name: form.name, website_url: form.website_url || null, logo_url: logoUrl, is_active: true, sort_order: partners.length + 1 })
      toast.success('Partner added')
    }
    setSaving(false); setShowForm(false); fetch()
  }

  const toggle = async (p: Partner) => {
    await supabase.from('partners').update({ is_active: !p.is_active }).eq('id', p.id)
    setPartners(prev => prev.map(x => x.id === p.id ? { ...x, is_active: !x.is_active } : x))
  }

  const remove = async (id: string) => {
    if (!confirm('Delete this partner?')) return
    await supabase.from('partners').delete().eq('id', id)
    setPartners(prev => prev.filter(p => p.id !== id))
    toast.success('Deleted')
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">Partners</h1>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-xl transition-colors">
          <Plus size={16} /> Add Partner
        </button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-20 bg-gray-800 rounded-xl animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {partners.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} className="p-4 bg-gray-900 border border-gray-800 rounded-xl flex flex-col items-center gap-3 relative">
              <div className="h-12 flex items-center justify-center">
                {p.logo_url ? <img src={p.logo_url} alt={p.name} className="h-10 object-contain" /> : <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center text-gray-400 font-bold text-sm">{p.name.charAt(0)}</div>}
              </div>
              <span className="text-white text-xs font-medium text-center">{p.name}</span>
              <div className="flex items-center gap-1.5">
                <button onClick={() => toggle(p)} className={`p-1.5 rounded-lg transition-colors ${p.is_active ? 'text-green-400' : 'text-gray-600'}`}>
                  {p.is_active ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
                </button>
                <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"><Pencil size={12} /></button>
                <button onClick={() => remove(p.id)} className="p-1.5 rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-950/20 transition-colors"><Trash2 size={12} /></button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={() => setShowForm(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} onClick={e => e.stopPropagation()} className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-2xl">
            <div className="flex items-center justify-between p-5 border-b border-gray-800">
              <h3 className="font-bold text-white">{editing ? 'Edit' : 'Add'} Partner</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-white">✕</button>
            </div>
            <div className="p-5 space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm text-gray-300">Company Name *</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm text-gray-300">Website URL</label>
                <input value={form.website_url} onChange={e => setForm(f => ({ ...f, website_url: e.target.value }))} placeholder="https://example.com" className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm text-gray-300">Logo</label>
                <label className="flex flex-col items-center gap-2 p-5 border-2 border-dashed border-gray-700 rounded-xl hover:border-orange-500 cursor-pointer transition-colors">
                  <Upload size={20} className="text-gray-500" />
                  <span className="text-xs text-gray-500">{logoFile ? logoFile.name : 'Upload logo (PNG, SVG, JPG)'}</span>
                  <input type="file" accept="image/*" onChange={e => setLogoFile(e.target.files?.[0] || null)} className="hidden" />
                </label>
              </div>
            </div>
            <div className="p-5 border-t border-gray-800 flex gap-3">
              <button onClick={save} disabled={saving} className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-medium rounded-xl transition-colors text-sm flex items-center justify-center gap-2">
                {saving ? <><Loader2 size={14} className="animate-spin" />Saving...</> : (editing ? 'Update' : 'Add')}
              </button>
              <button onClick={() => setShowForm(false)} className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-colors text-sm">Cancel</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
