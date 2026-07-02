-- =============================================
-- GIDY Technologies - Seed Data
-- =============================================

-- Domains
INSERT INTO public.domains (name, description, icon, is_active, sort_order) VALUES
  ('AI & Machine Learning', 'Build intelligent systems with Python, TensorFlow, and PyTorch', 'Brain', true, 1),
  ('Full Stack Development', 'Master React, Node.js, and modern web development', 'Code2', true, 2),
  ('Cloud & AWS', 'Deploy scalable applications on AWS, GCP, and Azure', 'Cloud', true, 3),
  ('Cyber Security', 'Protect systems with ethical hacking and security analysis', 'Shield', true, 4),
  ('Data Science', 'Analyze data and build predictive models', 'BarChart3', true, 5),
  ('DevOps & CI/CD', 'Automate deployment pipelines with Docker and Kubernetes', 'GitBranch', true, 6),
  ('Mobile Development', 'Build cross-platform apps with React Native & Flutter', 'Smartphone', true, 7),
  ('UI/UX Design', 'Design stunning interfaces with Figma and design systems', 'Palette', true, 8),
  ('Software Testing', 'Master QA, automation testing with Selenium & Cypress', 'TestTube', true, 9),
  ('Database Management', 'Design and optimize databases with SQL and NoSQL', 'Database', true, 10)
ON CONFLICT DO NOTHING;

-- Services
INSERT INTO public.services (title, description, features, technologies, benefits, icon, is_active, sort_order) VALUES
  ('Software Development', 'Custom software solutions tailored to your specific business needs.',
   ARRAY['Custom Application Development', 'Legacy System Modernization', 'API Development & Integration', 'Software Architecture Design', 'Quality Assurance & Testing'],
   ARRAY['React', 'Node.js', 'Python', 'Java', 'PostgreSQL'],
   ARRAY['Scalable solutions', 'On-time delivery', 'Post-launch support', 'Agile methodology'],
   'Code', true, 1),
  ('Web Development', 'Modern, responsive web applications that deliver exceptional user experiences.',
   ARRAY['Frontend Development', 'Backend Development', 'E-Commerce Solutions', 'CMS Development', 'Performance Optimization'],
   ARRAY['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'],
   ARRAY['Mobile-first design', 'SEO optimized', 'Fast load times', 'Secure & reliable'],
   'Globe', true, 2),
  ('Mobile Applications', 'Native and cross-platform mobile applications for iOS and Android.',
   ARRAY['iOS App Development', 'Android App Development', 'Cross-Platform Apps', 'App UI/UX Design', 'App Store Deployment'],
   ARRAY['React Native', 'Flutter', 'Swift', 'Kotlin'],
   ARRAY['Cross-platform support', 'Offline functionality', 'Push notifications', 'Analytics integration'],
   'Smartphone', true, 3),
  ('Cloud Solutions', 'Scalable cloud infrastructure, migration services, and managed cloud solutions.',
   ARRAY['Cloud Migration', 'Infrastructure as Code', 'Serverless Architecture', 'Cost Optimization', 'DevOps Implementation'],
   ARRAY['AWS', 'GCP', 'Azure', 'Terraform', 'Docker', 'Kubernetes'],
   ARRAY['99.9% uptime', 'Auto-scaling', 'Cost efficient', 'Disaster recovery'],
   'Cloud', true, 4),
  ('Industrial Automation', 'Smart automation systems for manufacturing and industrial processes.',
   ARRAY['PLC Programming', 'SCADA Systems', 'IoT Integration', 'Process Automation', 'Predictive Maintenance'],
   ARRAY['PLC', 'SCADA', 'IoT', 'Python', 'MQTT'],
   ARRAY['Reduced downtime', 'Higher efficiency', 'Real-time monitoring', 'Predictive analytics'],
   'Settings', true, 5),
  ('AI Solutions', 'Intelligent AI-powered solutions that automate complex tasks.',
   ARRAY['Machine Learning Models', 'Natural Language Processing', 'Computer Vision', 'AI Chatbots', 'Predictive Analytics'],
   ARRAY['Python', 'TensorFlow', 'PyTorch', 'OpenAI API', 'LangChain'],
   ARRAY['Automated workflows', 'Data-driven insights', 'Competitive advantage', 'Scalable AI'],
   'Brain', true, 6),
  ('Enterprise Solutions', 'End-to-end enterprise software implementations.',
   ARRAY['ERP Implementation', 'CRM Solutions', 'Business Intelligence', 'Data Warehousing', 'System Integration'],
   ARRAY['SAP', 'Salesforce', 'Power BI', 'Tableau', 'REST APIs'],
   ARRAY['Unified operations', 'Real-time reporting', 'Process automation', 'Scalable architecture'],
   'Building', true, 7)
ON CONFLICT DO NOTHING;

-- Internships
INSERT INTO public.internships (title, description, skills_covered, duration, mode, certificate_details, benefits, is_published) VALUES
  ('AI & Machine Learning Internship',
   'Master deep learning, neural networks, and AI model deployment with hands-on projects using Python, TensorFlow, and real datasets.',
   ARRAY['Python', 'TensorFlow', 'PyTorch', 'Data Analysis', 'Model Deployment'],
   '3 months', 'online', 'Industry-recognized certificate upon completion',
   ARRAY['Mentorship', 'Real Projects', 'Certificate', 'Placement Support'], true),
  ('Full Stack Web Development Internship',
   'Build complete web applications from front to back using React, Node.js, and PostgreSQL. Work on real client projects.',
   ARRAY['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'REST APIs'],
   '3 months', 'hybrid', 'Industry-recognized certificate upon completion',
   ARRAY['Mentorship', 'Real Projects', 'Certificate', 'Job Assistance'], true),
  ('Cyber Security Internship',
   'Learn ethical hacking, penetration testing, and security analysis. Work with industry-grade tools to protect systems.',
   ARRAY['Ethical Hacking', 'Network Security', 'OWASP', 'Kali Linux', 'SOC'],
   '2 months', 'online', 'Industry-recognized certificate upon completion',
   ARRAY['Mentorship', 'Lab Access', 'Certificate', 'Career Guidance'], true),
  ('Data Science & Analytics Internship',
   'Analyze large datasets, build predictive models, and create dashboards.',
   ARRAY['Python', 'SQL', 'Pandas', 'Matplotlib', 'Machine Learning'],
   '3 months', 'online', 'Industry-recognized certificate upon completion',
   ARRAY['Mentorship', 'Real Datasets', 'Certificate', 'Portfolio Projects'], true),
  ('DevOps & Cloud Internship',
   'Master CI/CD pipelines, Docker, Kubernetes, and deploy applications on AWS and GCP.',
   ARRAY['Docker', 'Kubernetes', 'AWS', 'GitHub Actions', 'Terraform'],
   '2 months', 'online', 'Industry-recognized certificate upon completion',
   ARRAY['Cloud Credits', 'Real Projects', 'Certificate', 'Mentorship'], true),
  ('Mobile App Development Internship',
   'Build cross-platform mobile applications using React Native and Flutter for both iOS and Android platforms.',
   ARRAY['React Native', 'Flutter', 'Dart', 'API Integration', 'App Store Deployment'],
   '3 months', 'hybrid', 'Industry-recognized certificate upon completion',
   ARRAY['Mentorship', 'App Projects', 'Certificate', 'Portfolio'], true)
ON CONFLICT DO NOTHING;

-- Testimonials
INSERT INTO public.testimonials (name, role, company, content, rating, is_active, sort_order) VALUES
  ('Priya Sharma', 'Software Engineer', 'TCS', 'GIDY Technologies gave me the perfect platform to apply my theoretical knowledge in real projects. The mentorship was exceptional and helped me land my dream job.', 5, true, 1),
  ('Rahul Kumar', 'Data Analyst', 'Wipro', 'The Data Science internship at GIDY was incredibly comprehensive. I learned industry tools and gained confidence in presenting data-driven insights.', 5, true, 2),
  ('Ananya Patel', 'Full Stack Developer', 'Infosys', 'From zero coding experience to a full-stack developer role in 6 months — GIDY made it possible with their structured internship program.', 5, true, 3),
  ('Vijay Krishnan', 'DevOps Engineer', 'HCL', 'The Cloud & DevOps internship was exactly what I needed. Hands-on experience with real AWS deployments gave me the confidence to crack my first job.', 5, true, 4),
  ('Deepa Nair', 'UI/UX Designer', 'Cognizant', 'Excellent learning environment. The mentors are industry professionals who give practical insights beyond what you learn in college.', 5, true, 5),
  ('Karthik Suresh', 'Cyber Security Analyst', 'Tech Mahindra', 'The Cyber Security internship was challenging and fun. Real-world attack simulations and defenses that prepared me for actual job scenarios.', 5, true, 6)
ON CONFLICT DO NOTHING;

-- Partners
INSERT INTO public.partners (name, is_active, sort_order) VALUES
  ('TCS', true, 1), ('Infosys', true, 2), ('Wipro', true, 3),
  ('HCL', true, 4), ('Tech Mahindra', true, 5), ('Cognizant', true, 6)
ON CONFLICT DO NOTHING;

-- Statistics
INSERT INTO public.statistics (label, value, icon, sort_order) VALUES
  ('Students Trained', '2500+', 'Users', 1),
  ('Projects Completed', '180+', 'FolderOpen', 2),
  ('Internship Domains', '15+', 'Layers', 3),
  ('Industry Partners', '40+', 'Building2', 4)
ON CONFLICT DO NOTHING;

-- Website Settings
INSERT INTO public.website_settings (key, value) VALUES
  ('company_name', '"GIDY Technologies"'),
  ('company_tagline', '"Transform Learning Into Real Industry Experience"'),
  ('company_email', '"info@gidytech.com"'),
  ('company_phone', '"+91 99999 99999"'),
  ('company_address', '"Tamil Nadu, India"'),
  ('hero_headline', '"Transform Learning Into Real Industry Experience"'),
  ('hero_subheadline', '"Gain practical experience through internships, real-world projects, mentorship, and technology training."')
ON CONFLICT (key) DO NOTHING;
