export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      domains: {
        Row: {
          id: string
          name: string
          description: string | null
          icon: string | null
          is_active: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['domains']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['domains']['Insert']>
      }
      internships: {
        Row: {
          id: string
          title: string
          domain_id: string | null
          description: string
          skills_covered: string[]
          duration: string
          mode: 'online' | 'offline' | 'hybrid'
          certificate_details: string | null
          benefits: string[]
          is_published: boolean
          is_archived: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['internships']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['internships']['Insert']>
      }
      internship_applications: {
        Row: {
          id: string
          internship_id: string | null
          full_name: string
          email: string
          phone: string
          college_name: string
          degree: string
          department: string
          year_of_study: string
          domain: string
          resume_url: string | null
          message: string | null
          status: 'NEW' | 'REVIEWING' | 'SHORTLISTED' | 'CONTACTED' | 'SELECTED' | 'REJECTED' | 'COMPLETED'
          admin_notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['internship_applications']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['internship_applications']['Insert']>
      }
      services: {
        Row: {
          id: string
          title: string
          description: string
          features: string[]
          technologies: string[]
          benefits: string[]
          icon: string | null
          is_active: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['services']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['services']['Insert']>
      }
      project_inquiries: {
        Row: {
          id: string
          company_name: string
          contact_person: string
          email: string
          phone: string
          project_category: string
          estimated_budget: string | null
          project_description: string
          status: 'NEW' | 'CONTACTED' | 'DISCUSSION' | 'PROPOSAL_SENT' | 'CLOSED'
          admin_notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['project_inquiries']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['project_inquiries']['Insert']>
      }
      contact_messages: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          subject: string
          message: string
          is_read: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['contact_messages']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['contact_messages']['Insert']>
      }
      testimonials: {
        Row: {
          id: string
          name: string
          role: string
          company: string | null
          content: string
          rating: number
          avatar_url: string | null
          is_active: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['testimonials']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['testimonials']['Insert']>
      }
      partners: {
        Row: {
          id: string
          name: string
          logo_url: string | null
          website_url: string | null
          is_active: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['partners']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['partners']['Insert']>
      }
      website_settings: {
        Row: {
          id: string
          key: string
          value: Json
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['website_settings']['Row'], 'id' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['website_settings']['Insert']>
      }
      statistics: {
        Row: {
          id: string
          label: string
          value: string
          icon: string | null
          sort_order: number
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['statistics']['Row'], 'id' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['statistics']['Insert']>
      }
    }
  }
}

export type Domain = Database['public']['Tables']['domains']['Row']
export type Internship = Database['public']['Tables']['internships']['Row']
export type InternshipApplication = Database['public']['Tables']['internship_applications']['Row']
export type Service = Database['public']['Tables']['services']['Row']
export type ProjectInquiry = Database['public']['Tables']['project_inquiries']['Row']
export type ContactMessage = Database['public']['Tables']['contact_messages']['Row']
export type Testimonial = Database['public']['Tables']['testimonials']['Row']
export type Partner = Database['public']['Tables']['partners']['Row']
export type Statistic = Database['public']['Tables']['statistics']['Row']
