import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Users, Briefcase, FileText, Settings,
  MessageSquare, Star, Building, Globe, LogOut, Menu, X, ChevronRight
} from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Dashboard', to: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Applications', to: '/admin/applications', icon: Users },
  { label: 'Internships', to: '/admin/internships', icon: Briefcase },
  { label: 'Domains', to: '/admin/domains', icon: Globe },
  { label: 'Services', to: '/admin/services', icon: Settings },
  { label: 'Project Inquiries', to: '/admin/inquiries', icon: FileText },
  { label: 'Testimonials', to: '/admin/testimonials', icon: Star },
  { label: 'Partners', to: '/admin/partners', icon: Building },
  { label: 'Messages', to: '/admin/messages', icon: MessageSquare },
  { label: 'Site Settings', to: '/admin/settings', icon: Settings },
]

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { signOut, user } = useAuthStore()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/admin')
  }

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Sidebar */}
      <aside className={cn('fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-gray-800 flex flex-col transition-transform duration-300', sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0')}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 h-16 border-b border-gray-800">
          <img src="/logo.png" alt="GIDY" className="h-8 w-auto object-contain" />
          <div>
            <div className="text-white font-bold text-sm">GIDY Admin</div>
            <div className="text-gray-500 text-xs">Control Panel</div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden text-gray-500 hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) => cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors group',
                  isActive ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : 'text-gray-400 hover:text-white hover:bg-gray-800'
                )}
              >
                <Icon size={18} />
                {item.label}
                <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </NavLink>
            )
          })}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm">
              {user?.email?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-xs font-medium truncate">{user?.email || 'Admin'}</div>
              <div className="text-gray-500 text-xs">Administrator</div>
            </div>
          </div>
          <button onClick={handleSignOut} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-950/20 text-sm transition-colors">
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-40 bg-black/60 lg:hidden" />
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center px-4 lg:px-6 gap-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-gray-800">
            <Menu size={20} />
          </button>
          <div className="flex-1" />
          <a href="/" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-orange-400 transition-colors">
            View Website ↗
          </a>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
