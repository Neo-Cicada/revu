export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          email: string
          full_name: string | null
          avatar_url: string | null
          subscription_tier: 'free' | 'pro' | 'premium'
          subscription_status: 'active' | 'trialing' | 'past_due' | 'canceled' | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          subscription_tier?: 'free' | 'pro' | 'premium'
          subscription_status?: 'active' | 'trialing' | 'past_due' | 'canceled' | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          subscription_tier?: 'free' | 'pro' | 'premium'
          subscription_status?: 'active' | 'trialing' | 'past_due' | 'canceled' | null
        }
      }
      study_sets: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          description: string | null
          user_id: string
          is_public: boolean
          tags: string[] | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          description?: string | null
          user_id: string
          is_public?: boolean
          tags?: string[] | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          description?: string | null
          user_id?: string
          is_public?: boolean
          tags?: string[] | null
        }
      }
      flashcards: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          study_set_id: string
          front: string
          back: string
          position: number
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          study_set_id: string
          front: string
          back: string
          position?: number
          user_id: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          study_set_id?: string
          front?: string
          back?: string
          position?: number
          user_id?: string
        }
      }
      srs_progress: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string
          flashcard_id: string
          next_review_date: string
          difficulty_level: number
          times_reviewed: number
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id: string
          flashcard_id: string
          next_review_date: string
          difficulty_level?: number
          times_reviewed?: number
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          flashcard_id?: string
          next_review_date?: string
          difficulty_level?: number
          times_reviewed?: number
        }
      }
      study_sessions: {
        Row: {
          id: string
          created_at: string
          user_id: string
          study_set_id: string
          duration_seconds: number
          cards_reviewed: number
          correct_answers: number
          study_mode: 'flashcards' | 'quiz' | 'match'
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          study_set_id: string
          duration_seconds: number
          cards_reviewed: number
          correct_answers: number
          study_mode: 'flashcards' | 'quiz' | 'match'
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          study_set_id?: string
          duration_seconds?: number
          cards_reviewed?: number
          correct_answers?: number
          study_mode?: 'flashcards' | 'quiz' | 'match'
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}