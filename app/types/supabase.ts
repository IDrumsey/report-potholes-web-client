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
      reported_potholes: {
        Row: {
          created_at: string | null
          id: number
          location_lat: number
          location_lng: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          location_lat: number
          location_lng?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          location_lat?: number
          location_lng?: number | null
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
