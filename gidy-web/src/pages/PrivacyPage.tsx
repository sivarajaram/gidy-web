import { motion } from 'framer-motion'
import { SEOHead } from '@/components/layout/SEOHead'

export function PrivacyPage() {
  return (
    <>
      <SEOHead title="Privacy Policy — GIDY Technologies" description="Privacy Policy for GIDY Technologies." />

      <div className="pt-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1.5 bg-orange-500/10 text-orange-400 text-sm font-medium rounded-full border border-orange-500/20 mb-4">Legal</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">Last updated: June 2026</p>
          </motion.div>
        </div>
      </div>

      <div className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="prose prose-gray dark:prose-invert max-w-none space-y-8 text-gray-700 dark:text-gray-300 text-sm leading-relaxed"
          >
            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">1. Information We Collect</h2>
              <p>We collect information you provide directly to us when you apply for internships, submit project inquiries, or contact us. This includes your name, email address, phone number, educational background, and any documents (such as resumes) you upload.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Process internship applications and match candidates with suitable programs</li>
                <li>Respond to project inquiries and business service requests</li>
                <li>Send you updates about your application status</li>
                <li>Improve our services and website experience</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">3. Information Sharing</h2>
              <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>With your consent</li>
                <li>To comply with legal requirements or respond to lawful requests</li>
                <li>To protect the rights, property, or safety of GIDY Technologies, our users, or others</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">4. Data Security</h2>
              <p>We implement industry-standard security measures to protect your personal information. Your data is stored securely using Supabase infrastructure with row-level security controls. However, no method of transmission over the internet is 100% secure.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">5. Cookies</h2>
              <p>Our website uses cookies solely to maintain your session and preferences (such as dark/light mode). We do not use tracking or advertising cookies.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">6. Your Rights</h2>
              <p>You have the right to access, correct, or delete your personal data. To exercise these rights, contact us at <a href="mailto:contactgidytech@gmail.com" className="text-orange-500 hover:underline">contactgidytech@gmail.com</a>.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">7. Changes to This Policy</h2>
              <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by updating the date at the top of this page.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">8. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us:</p>
              <div className="mt-3 space-y-1">
                <p><strong className="text-gray-900 dark:text-white">GIDY Technologies</strong></p>
                <p>4/46, Yellama Kothur, Gandhi Nagar, Hosur - 635109</p>
                <p>Email: <a href="mailto:contactgidytech@gmail.com" className="text-orange-500 hover:underline">contactgidytech@gmail.com</a></p>
              </div>
            </section>
          </motion.div>
        </div>
      </div>
    </>
  )
}
