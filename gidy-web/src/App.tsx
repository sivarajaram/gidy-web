import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Layout } from '@/components/layout/Layout'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { ProtectedRoute } from '@/components/admin/ProtectedRoute'
import { useAuthStore } from '@/store/authStore'
import { useThemeStore } from '@/store/themeStore'

// Lazy-load pages for code splitting
const HomePage = lazy(() => import('@/pages/HomePage').then(m => ({ default: m.HomePage })))
const InternshipsPage = lazy(() => import('@/pages/InternshipsPage').then(m => ({ default: m.InternshipsPage })))
const ApplyPage = lazy(() => import('@/pages/ApplyPage').then(m => ({ default: m.ApplyPage })))
const ServicesPage = lazy(() => import('@/pages/ServicesPage').then(m => ({ default: m.ServicesPage })))
const AboutPage = lazy(() => import('@/pages/AboutPage').then(m => ({ default: m.AboutPage })))
const ContactPage = lazy(() => import('@/pages/ContactPage').then(m => ({ default: m.ContactPage })))
const ProjectEnquiryPage = lazy(() => import('@/pages/ProjectEnquiryPage').then(m => ({ default: m.ProjectEnquiryPage })))
const PrivacyPage = lazy(() => import('@/pages/PrivacyPage').then(m => ({ default: m.PrivacyPage })))
const TermsPage = lazy(() => import('@/pages/TermsPage').then(m => ({ default: m.TermsPage })))

// Admin pages
const AdminLoginPage = lazy(() => import('@/pages/admin/AdminLoginPage').then(m => ({ default: m.AdminLoginPage })))
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })))
const AdminApplications = lazy(() => import('@/pages/admin/AdminApplications').then(m => ({ default: m.AdminApplications })))
const AdminDomains = lazy(() => import('@/pages/admin/AdminDomains').then(m => ({ default: m.AdminDomains })))
const AdminInternships = lazy(() => import('@/pages/admin/AdminInternships').then(m => ({ default: m.AdminInternships })))
const AdminServices = lazy(() => import('@/pages/admin/AdminServices').then(m => ({ default: m.AdminServices })))
const AdminInquiries = lazy(() => import('@/pages/admin/AdminInquiries').then(m => ({ default: m.AdminInquiries })))
const AdminTestimonials = lazy(() => import('@/pages/admin/AdminTestimonials').then(m => ({ default: m.AdminTestimonials })))
const AdminPartners = lazy(() => import('@/pages/admin/AdminPartners').then(m => ({ default: m.AdminPartners })))
const AdminMessages = lazy(() => import('@/pages/admin/AdminMessages').then(m => ({ default: m.AdminMessages })))
const AdminSettings = lazy(() => import('@/pages/admin/AdminSettings').then(m => ({ default: m.AdminSettings })))

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default function App() {
  const { initialize } = useAuthStore()
  const { theme, setTheme } = useThemeStore()

  useEffect(() => {
    initialize()
    setTheme(theme)
  }, [])

  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: '#1f2937', color: '#f9fafb', border: '1px solid #374151' },
          success: { iconTheme: { primary: '#f97316', secondary: '#fff' } },
        }}
      />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public routes */}
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="internships" element={<InternshipsPage />} />
            <Route path="apply" element={<ApplyPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="project-enquiry" element={<ProjectEnquiryPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="terms" element={<TermsPage />} />
          </Route>

          {/* Admin routes */}
          <Route path="admin" element={<AdminLoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="admin/dashboard" element={<AdminDashboard />} />
              <Route path="admin/applications" element={<AdminApplications />} />
              <Route path="admin/internships" element={<AdminInternships />} />
              <Route path="admin/domains" element={<AdminDomains />} />
              <Route path="admin/services" element={<AdminServices />} />
              <Route path="admin/inquiries" element={<AdminInquiries />} />
              <Route path="admin/testimonials" element={<AdminTestimonials />} />
              <Route path="admin/partners" element={<AdminPartners />} />
              <Route path="admin/messages" element={<AdminMessages />} />
              <Route path="admin/settings" element={<AdminSettings />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
