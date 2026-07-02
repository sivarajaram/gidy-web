# GIDY Technologies Website - Setup Guide

## Quick Start

### 1. Clone & Install
```bash
cd gidy-web
npm install
```

### 2. Set Up Supabase

1. Create a free project at https://supabase.com
2. Go to **SQL Editor** in your Supabase dashboard
3. Run the migration files in order:
   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/migrations/002_seed_data.sql`
4. Go to **Authentication > Users** and create an admin user
5. Copy your **Project URL** and **anon/public API key** from **Settings > API**

### 3. Configure Environment Variables

Create `.env.local` in the project root:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Start Development Server
```bash
npm run dev
```

Visit http://localhost:5173

### 5. Admin Access
- URL: http://localhost:5173/admin
- Login with the email/password of the admin user you created in Supabase Auth

---

## Deployment to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy!

The `vercel.json` file handles SPA routing automatically.

---

## Supabase Storage Buckets

After running migrations, verify these buckets exist in **Storage**:
- `resumes` — private (for student resume uploads)
- `logos` — public (for partner logos)
- `avatars` — public (for testimonial avatars)

---

## Project Structure

```
src/
├── components/
│   ├── admin/          # Admin layout & auth guard
│   ├── home/           # Homepage sections (Hero, Stats, etc.)
│   └── layout/         # Navbar, Footer, SEO Head
├── lib/
│   ├── supabase.ts     # Supabase client
│   └── utils.ts        # Utility functions
├── pages/
│   ├── admin/          # Admin panel pages
│   └── *.tsx           # Public pages
├── store/
│   ├── authStore.ts    # Admin auth (Zustand)
│   └── themeStore.ts   # Theme (light/dark/system)
└── types/
    └── database.ts     # TypeScript type definitions

supabase/
└── migrations/
    ├── 001_initial_schema.sql  # Tables, RLS, storage
    └── 002_seed_data.sql       # Sample data
```

---

## Features

### Public Website
- Home page with Three.js animated hero
- Internship listings with search & filters
- Online application form with resume upload
- Services showcase
- About page
- Contact form
- Project enquiry form

### Admin Panel (`/admin`)
- Dashboard with statistics
- Manage applications (view, download resume, change status)
- Manage internships (create, edit, publish/archive)
- Manage domains
- Manage services
- View project inquiries
- Manage testimonials
- Manage partner logos
- View contact messages
- Site settings (company info, hero content, stats)

### Technical
- Light / Dark / System theme
- Fully responsive (mobile, tablet, desktop)
- Code splitting & lazy loading
- SEO meta tags per page
- Row Level Security on all tables
- Secure admin routes
