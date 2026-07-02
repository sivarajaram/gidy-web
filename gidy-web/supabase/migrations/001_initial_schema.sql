-- =============================================
-- GIDY Technologies - Complete Database Schema
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- DOMAINS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.domains (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT DEFAULT 'Code2',
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- INTERNSHIPS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.internships (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  domain_id UUID REFERENCES public.domains(id) ON DELETE SET NULL,
  description TEXT NOT NULL,
  skills_covered TEXT[] DEFAULT '{}',
  duration TEXT NOT NULL DEFAULT '3 months',
  mode TEXT CHECK (mode IN ('online', 'offline', 'hybrid')) DEFAULT 'online',
  certificate_details TEXT,
  benefits TEXT[] DEFAULT '{}',
  is_published BOOLEAN DEFAULT false,
  is_archived BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- INTERNSHIP APPLICATIONS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.internship_applications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  internship_id UUID REFERENCES public.internships(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  college_name TEXT NOT NULL,
  degree TEXT NOT NULL,
  department TEXT NOT NULL,
  year_of_study TEXT NOT NULL,
  domain TEXT NOT NULL,
  resume_url TEXT,
  message TEXT,
  status TEXT CHECK (status IN ('NEW', 'REVIEWING', 'SHORTLISTED', 'CONTACTED', 'SELECTED', 'REJECTED', 'COMPLETED')) DEFAULT 'NEW',
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- SERVICES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.services (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  features TEXT[] DEFAULT '{}',
  technologies TEXT[] DEFAULT '{}',
  benefits TEXT[] DEFAULT '{}',
  icon TEXT DEFAULT 'Code',
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- PROJECT INQUIRIES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.project_inquiries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  project_category TEXT NOT NULL,
  estimated_budget TEXT,
  project_description TEXT NOT NULL,
  status TEXT CHECK (status IN ('NEW', 'CONTACTED', 'DISCUSSION', 'PROPOSAL_SENT', 'CLOSED')) DEFAULT 'NEW',
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- CONTACT MESSAGES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- TESTIMONIALS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) DEFAULT 5,
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- PARTNERS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.partners (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  website_url TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- WEBSITE SETTINGS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.website_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- STATISTICS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.statistics (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- ACTIVITY LOGS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  action TEXT NOT NULL,
  entity TEXT NOT NULL,
  entity_id TEXT,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- UPDATED_AT TRIGGER FUNCTION
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with updated_at
DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOREACH tbl IN ARRAY ARRAY['domains', 'internships', 'internship_applications', 'services', 'project_inquiries', 'testimonials', 'partners', 'website_settings', 'statistics'] LOOP
    EXECUTE format('CREATE OR REPLACE TRIGGER %I_updated_at BEFORE UPDATE ON public.%I FOR EACH ROW EXECUTE FUNCTION update_updated_at()', tbl, tbl);
  END LOOP;
END;
$$;

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================
ALTER TABLE public.domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.internships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.internship_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Public READ access (website visitors)
CREATE POLICY "Public read domains" ON public.domains FOR SELECT USING (is_active = true);
CREATE POLICY "Public read internships" ON public.internships FOR SELECT USING (is_published = true AND is_archived = false);
CREATE POLICY "Public read services" ON public.services FOR SELECT USING (is_active = true);
CREATE POLICY "Public read testimonials" ON public.testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Public read partners" ON public.partners FOR SELECT USING (is_active = true);
CREATE POLICY "Public read settings" ON public.website_settings FOR SELECT USING (true);
CREATE POLICY "Public read statistics" ON public.statistics FOR SELECT USING (true);

-- Public INSERT (form submissions)
CREATE POLICY "Public insert applications" ON public.internship_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert inquiries" ON public.project_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert messages" ON public.contact_messages FOR INSERT WITH CHECK (true);

-- Admin full access (authenticated users)
CREATE POLICY "Admin all domains" ON public.domains FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all internships" ON public.internships FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin read/update applications" ON public.internship_applications FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all services" ON public.services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all inquiries" ON public.project_inquiries FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all messages" ON public.contact_messages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all testimonials" ON public.testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all partners" ON public.partners FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all settings" ON public.website_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all statistics" ON public.statistics FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all logs" ON public.activity_logs FOR ALL USING (auth.role() = 'authenticated');

-- =============================================
-- STORAGE BUCKETS
-- =============================================
INSERT INTO storage.buckets (id, name, public) VALUES ('resumes', 'resumes', false) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('logos', 'logos', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true) ON CONFLICT DO NOTHING;

-- Storage policies
CREATE POLICY "Public upload resumes" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'resumes');
CREATE POLICY "Admin read resumes" ON storage.objects FOR SELECT USING (bucket_id = 'resumes' AND auth.role() = 'authenticated');
CREATE POLICY "Public logos" ON storage.objects FOR SELECT USING (bucket_id = 'logos');
CREATE POLICY "Admin upload logos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'logos' AND auth.role() = 'authenticated');
CREATE POLICY "Public avatars" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Admin upload avatars" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');
