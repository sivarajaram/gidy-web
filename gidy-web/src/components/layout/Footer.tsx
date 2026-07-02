import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin } from 'lucide-react'

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Contact', to: '/contact' },
  { label: 'Project Enquiry', to: '/project-enquiry' },
]

const internshipLinks = [
  { label: 'AI & Machine Learning', to: '/internships?domain=AI' },
  { label: 'Full Stack Development', to: '/internships?domain=Full+Stack' },
  { label: 'Cloud & DevOps', to: '/internships?domain=DevOps' },
  { label: 'Cyber Security', to: '/internships?domain=Cyber+Security' },
  { label: 'Data Science', to: '/internships?domain=Data+Science' },
  { label: 'View All Internships', to: '/internships' },
]

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src="/footer-logo.png" alt="GIDY" className="h-9 w-auto object-contain" />
              <span className="font-bold text-lg text-white">
                <span className="text-orange-400">Technologies</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Empowering students and businesses through cutting-edge technology solutions, practical internship programs, and expert mentorship.
            </p>
            <div className="flex items-center gap-3">
              {[
                { href: 'https://linkedin.com', label: 'in', title: 'LinkedIn' },
                { href: 'https://twitter.com', label: '𝕏', title: 'Twitter' },
                { href: 'https://instagram.com', label: '◎', title: 'Instagram' },
                { href: 'https://youtube.com', label: '▶', title: 'YouTube' },
              ].map(s => (
                <a key={s.title} href={s.href} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-gray-800 hover:bg-orange-500 text-gray-400 hover:text-white transition-colors text-xs font-bold" aria-label={s.title}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-gray-400 hover:text-orange-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Internships */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Internships</h3>
            <ul className="space-y-2.5">
              {internshipLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-gray-400 hover:text-orange-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-orange-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-400">4/46, Yellama Kothur, Gandhi Nagar, Hosur - 635109</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-orange-500 flex-shrink-0" />
                <a href="tel:+917010122535" className="text-sm text-gray-400 hover:text-orange-400 transition-colors">
                  +91 70101 22535
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-orange-500 flex-shrink-0" />
                <a href="mailto:contactgidytech@gmail.com" className="text-sm text-gray-400 hover:text-orange-400 transition-colors">
                  contactgidytech@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} GIDY Technologies. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link to="/privacy" className="hover:text-orange-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-orange-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
