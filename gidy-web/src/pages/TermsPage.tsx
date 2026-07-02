import { motion } from 'framer-motion'
import { SEOHead } from '@/components/layout/SEOHead'

export function TermsPage() {
  return (
    <>
      <SEOHead title="Terms of Service — GIDY Technologies" description="Terms of Service for GIDY Technologies." />

      <div className="pt-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1.5 bg-orange-500/10 text-orange-400 text-sm font-medium rounded-full border border-orange-500/20 mb-4">Legal</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Terms of Service</h1>
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
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">1. Acceptance of Terms</h2>
              <p>By accessing or using the GIDY Technologies website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">2. Internship Programs</h2>
              <p>GIDY Technologies offers internship programs for students and recent graduates. By applying:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>You confirm that the information provided in your application is accurate and complete</li>
                <li>You understand that acceptance is at GIDY Technologies' sole discretion</li>
                <li>You agree to comply with program guidelines, timelines, and deliverables</li>
                <li>You acknowledge that internship certificates are issued upon successful completion of the program</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">3. Project & Business Services</h2>
              <p>For project inquiries and business services:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Submitting a project inquiry does not constitute a binding agreement</li>
                <li>Service terms, timelines, and pricing are agreed upon separately via a formal agreement</li>
                <li>GIDY Technologies reserves the right to decline any project or service request</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">4. Intellectual Property</h2>
              <p>All content on this website — including text, graphics, logos, and code — is the property of GIDY Technologies and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without explicit written permission.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">5. User Conduct</h2>
              <p>You agree not to:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Submit false or misleading information</li>
                <li>Attempt to gain unauthorized access to any part of our systems</li>
                <li>Use our services for any unlawful purpose</li>
                <li>Interfere with or disrupt the operation of our website</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">6. Disclaimer of Warranties</h2>
              <p>Our services are provided "as is" without any warranty of any kind, express or implied. GIDY Technologies does not guarantee uninterrupted or error-free operation of the website.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">7. Limitation of Liability</h2>
              <p>To the fullest extent permitted by law, GIDY Technologies shall not be liable for any indirect, incidental, special, or consequential damages arising out of your use of or inability to use our services.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">8. Governing Law</h2>
              <p>These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Tamil Nadu, India.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">9. Changes to Terms</h2>
              <p>We may update these Terms of Service at any time. Continued use of our services after changes constitutes acceptance of the updated terms.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">10. Contact Us</h2>
              <p>For questions about these Terms, contact us:</p>
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
