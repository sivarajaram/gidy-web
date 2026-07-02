import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Save, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

interface Settings {
  company_name: string
  company_tagline: string
  company_email: string
  company_phone: string
  company_address: string
  linkedin_url: string
  twitter_url: string
  instagram_url: string
  youtube_url: string
  hero_headline: string
  hero_subheadline: string
  stat_students: string
  stat_projects: string
  stat_domains: string
  stat_partners: string
}

const defaultSettings: Settings = {
  company_name: 'GIDY Technologies',
  company_tagline: 'Transform Learning Into Real Industry Experience',
  company_email: 'contactgidytech@gmail.com',
  company_phone: '+91 70101 22535',
  company_address: '4/46, Yellama Kothur, Gandhi Nagar, Hosur - 635109',
  linkedin_url: '',
  twitter_url: '',
  instagram_url: '',
  youtube_url: '',
  hero_headline: 'Transform Learning Into Real Industry Experience',
  hero_subheadline: 'Gain practical experience through internships, real-world projects, mentorship, and technology training.',
  stat_students: '2500+',
  stat_projects: '180+',
  stat_domains: '15+',
  stat_partners: '40+',
}

export function AdminSettings() {
  const [settings, setSettings] = useState<Settings>(defaultSettings)
  const [isLoading, setIsLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    supabase.from('website_settings').select('*').then(({ data }) => {
      if (data && data.length > 0) {
        const merged: Settings = { ...defaultSettings }
        data.forEach(row => {
          if (row.key in merged) (merged as unknown as Record<string, string>)[row.key] = String(row.value)
        })
        setSettings(merged)
      }
      setIsLoading(false)
    })
  }, [])

  const save = async () => {
    setSaving(true)
    const upserts = Object.entries(settings).map(([key, value]) => ({ key, value, updated_at: new Date().toISOString() }))
    for (const item of upserts) {
      await supabase.from('website_settings').upsert(item, { onConflict: 'key' })
    }
    setSaving(false)
    toast.success('Settings saved successfully!')
  }

  const update = (key: keyof Settings, value: string) => setSettings(s => ({ ...s, [key]: value }))

  if (isLoading) return <div className="space-y-4">{Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-14 bg-gray-800 rounded-xl animate-pulse" />)}</div>

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">Site Settings</h1>
        <button onClick={save} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white text-sm font-medium rounded-xl transition-colors">
          {saving ? <><Loader2 size={14} className="animate-spin" /> Saving...</> : <><Save size={14} /> Save Settings</>}
        </button>
      </div>

      {[
        { title: 'Company Information', fields: [
          { label: 'Company Name', key: 'company_name' as const }, { label: 'Tagline', key: 'company_tagline' as const },
          { label: 'Email', key: 'company_email' as const }, { label: 'Phone', key: 'company_phone' as const },
          { label: 'Address', key: 'company_address' as const },
        ]},
        { title: 'Hero Section', fields: [
          { label: 'Headline', key: 'hero_headline' as const }, { label: 'Subheadline', key: 'hero_subheadline' as const },
        ]},
        { title: 'Statistics', fields: [
          { label: 'Students Trained', key: 'stat_students' as const }, { label: 'Projects Completed', key: 'stat_projects' as const },
          { label: 'Internship Domains', key: 'stat_domains' as const }, { label: 'Industry Partners', key: 'stat_partners' as const },
        ]},
        { title: 'Social Media Links', fields: [
          { label: 'LinkedIn URL', key: 'linkedin_url' as const }, { label: 'Twitter URL', key: 'twitter_url' as const },
          { label: 'Instagram URL', key: 'instagram_url' as const }, { label: 'YouTube URL', key: 'youtube_url' as const },
        ]},
      ].map(section => (
        <motion.div key={section.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-4">
          <h2 className="font-semibold text-white text-sm border-b border-gray-800 pb-3">{section.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {section.fields.map(field => (
              <div key={field.key} className="space-y-1.5">
                <label className="text-xs text-gray-400">{field.label}</label>
                <input
                  value={settings[field.key]}
                  onChange={e => update(field.key, e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500"
                />
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
