import { SEOHead } from '@/components/layout/SEOHead'
import { HeroSection } from '@/components/home/HeroSection'
import { StatsSection } from '@/components/home/StatsSection'
import { DomainsSection } from '@/components/home/DomainsSection'
import { WhyChooseUs } from '@/components/home/WhyChooseUs'
import { ServicesPreview } from '@/components/home/ServicesPreview'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { PartnersSection } from '@/components/home/PartnersSection'
import { CTASection } from '@/components/home/CTASection'

export function HomePage() {
  return (
    <>
      <SEOHead
        title="GIDY Technologies - Internships & Technology Solutions"
        description="Transform learning into real industry experience. Join GIDY Technologies for practical internships, real-world projects, mentorship, and technology training."
      />
      <HeroSection />
      <StatsSection />
      <DomainsSection />
      <WhyChooseUs />
      <ServicesPreview />
      <TestimonialsSection />
      <PartnersSection />
      <CTASection />
    </>
  )
}
