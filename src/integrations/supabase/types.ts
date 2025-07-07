export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      analytics_events: {
        Row: {
          created_at: string | null
          event_category: string
          event_data: Json | null
          event_type: string
          id: string
          ip_address: unknown | null
          page_url: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_category: string
          event_data?: Json | null
          event_type: string
          id?: string
          ip_address?: unknown | null
          page_url?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_category?: string
          event_data?: Json | null
          event_type?: string
          id?: string
          ip_address?: unknown | null
          page_url?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      club_b2b_performance: {
        Row: {
          created_at: string
          id: number
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          user_id?: string | null
        }
        Relationships: []
      }
      customer_communications: {
        Row: {
          communication_type: string
          content: string
          created_at: string
          created_by: string | null
          customer_id: string
          direction: string
          follow_up_date: string | null
          follow_up_required: boolean | null
          id: string
          status: string | null
          subject: string | null
        }
        Insert: {
          communication_type: string
          content: string
          created_at?: string
          created_by?: string | null
          customer_id: string
          direction: string
          follow_up_date?: string | null
          follow_up_required?: boolean | null
          id?: string
          status?: string | null
          subject?: string | null
        }
        Update: {
          communication_type?: string
          content?: string
          created_at?: string
          created_by?: string | null
          customer_id?: string
          direction?: string
          follow_up_date?: string | null
          follow_up_required?: boolean | null
          id?: string
          status?: string | null
          subject?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_communications_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          address: string | null
          company: string | null
          country: string | null
          created_at: string
          customer_type: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          notes: string | null
          phone: string | null
          preferred_currency: string | null
          status: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          address?: string | null
          company?: string | null
          country?: string | null
          created_at?: string
          customer_type?: string | null
          email: string
          first_name: string
          id?: string
          last_name: string
          notes?: string | null
          phone?: string | null
          preferred_currency?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          address?: string | null
          company?: string | null
          country?: string | null
          created_at?: string
          customer_type?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          notes?: string | null
          phone?: string | null
          preferred_currency?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      documents: {
        Row: {
          created_at: string
          customer_id: string | null
          document_type: string
          file_name: string
          file_size: number | null
          file_url: string
          id: string
          mime_type: string | null
          notes: string | null
          order_id: string | null
          quote_id: string | null
          signature_date: string | null
          signature_required: boolean | null
          status: string | null
          updated_at: string
          uploaded_by: string | null
        }
        Insert: {
          created_at?: string
          customer_id?: string | null
          document_type: string
          file_name: string
          file_size?: number | null
          file_url: string
          id?: string
          mime_type?: string | null
          notes?: string | null
          order_id?: string | null
          quote_id?: string | null
          signature_date?: string | null
          signature_required?: boolean | null
          status?: string | null
          updated_at?: string
          uploaded_by?: string | null
        }
        Update: {
          created_at?: string
          customer_id?: string | null
          document_type?: string
          file_name?: string
          file_size?: number | null
          file_url?: string
          id?: string
          mime_type?: string | null
          notes?: string | null
          order_id?: string | null
          quote_id?: string | null
          signature_date?: string | null
          signature_required?: boolean | null
          status?: string | null
          updated_at?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      enhanced_payments: {
        Row: {
          amount: number
          created_at: string | null
          crypto_address: string | null
          crypto_currency: string | null
          currency: string
          id: string
          membership_id: string | null
          metadata: Json | null
          order_id: string | null
          payment_method: string
          status: string | null
          stripe_payment_intent_id: string | null
          transaction_hash: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          crypto_address?: string | null
          crypto_currency?: string | null
          currency?: string
          id?: string
          membership_id?: string | null
          metadata?: Json | null
          order_id?: string | null
          payment_method: string
          status?: string | null
          stripe_payment_intent_id?: string | null
          transaction_hash?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          crypto_address?: string | null
          crypto_currency?: string | null
          currency?: string
          id?: string
          membership_id?: string | null
          metadata?: Json | null
          order_id?: string | null
          payment_method?: string
          status?: string | null
          stripe_payment_intent_id?: string | null
          transaction_hash?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "enhanced_payments_membership_id_fkey"
            columns: ["membership_id"]
            isOneToOne: false
            referencedRelation: "vip_memberships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enhanced_payments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          assigned_to: string | null
          budget_range: string | null
          company: string | null
          conversion_probability: number | null
          country: string | null
          created_at: string
          email: string
          first_name: string
          id: string
          interest_type: string | null
          last_contact_date: string | null
          last_name: string
          next_follow_up: string | null
          notes: string | null
          phone: string | null
          source: string | null
          status: string | null
          timeline: string | null
          updated_at: string
          vehicle_interest: string | null
        }
        Insert: {
          assigned_to?: string | null
          budget_range?: string | null
          company?: string | null
          conversion_probability?: number | null
          country?: string | null
          created_at?: string
          email: string
          first_name: string
          id?: string
          interest_type?: string | null
          last_contact_date?: string | null
          last_name: string
          next_follow_up?: string | null
          notes?: string | null
          phone?: string | null
          source?: string | null
          status?: string | null
          timeline?: string | null
          updated_at?: string
          vehicle_interest?: string | null
        }
        Update: {
          assigned_to?: string | null
          budget_range?: string | null
          company?: string | null
          conversion_probability?: number | null
          country?: string | null
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          interest_type?: string | null
          last_contact_date?: string | null
          last_name?: string
          next_follow_up?: string | null
          notes?: string | null
          phone?: string | null
          source?: string | null
          status?: string | null
          timeline?: string | null
          updated_at?: string
          vehicle_interest?: string | null
        }
        Relationships: []
      }
      membership_benefits: {
        Row: {
          benefit_description: string | null
          benefit_name: string
          created_at: string | null
          id: string
          is_active: boolean | null
          tier: Database["public"]["Enums"]["membership_tier"]
        }
        Insert: {
          benefit_description?: string | null
          benefit_name: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          tier: Database["public"]["Enums"]["membership_tier"]
        }
        Update: {
          benefit_description?: string | null
          benefit_name?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          tier?: Database["public"]["Enums"]["membership_tier"]
        }
        Relationships: []
      }
      order_payments: {
        Row: {
          amount: number
          created_at: string
          currency: string | null
          id: string
          notes: string | null
          order_id: string
          payment_date: string | null
          payment_method: string
          payment_type: string
          status: string | null
          transaction_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string | null
          id?: string
          notes?: string | null
          order_id: string
          payment_date?: string | null
          payment_method: string
          payment_type: string
          status?: string | null
          transaction_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string | null
          id?: string
          notes?: string | null
          order_id?: string
          payment_date?: string | null
          payment_method?: string
          payment_type?: string
          status?: string | null
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_payments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          currency: string | null
          customer_id: string
          estimated_delivery: string | null
          id: string
          notes: string | null
          order_number: string
          order_status: string | null
          order_type: string
          payment_method: string | null
          payment_status: string | null
          shipping_address: string | null
          shipping_method: string | null
          total_amount: number
          updated_at: string
          vehicle_id: string | null
        }
        Insert: {
          created_at?: string
          currency?: string | null
          customer_id: string
          estimated_delivery?: string | null
          id?: string
          notes?: string | null
          order_number: string
          order_status?: string | null
          order_type: string
          payment_method?: string | null
          payment_status?: string | null
          shipping_address?: string | null
          shipping_method?: string | null
          total_amount: number
          updated_at?: string
          vehicle_id?: string | null
        }
        Update: {
          created_at?: string
          currency?: string | null
          customer_id?: string
          estimated_delivery?: string | null
          id?: string
          notes?: string | null
          order_number?: string
          order_status?: string | null
          order_type?: string
          payment_method?: string | null
          payment_status?: string | null
          shipping_address?: string | null
          shipping_method?: string | null
          total_amount?: number
          updated_at?: string
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          company: string | null
          created_at: string | null
          first_name: string | null
          id: string
          last_name: string | null
          membership_tier: string | null
          phone: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          membership_tier?: string | null
          phone?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          membership_tier?: string | null
          phone?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      quotes: {
        Row: {
          created_at: string
          currency: string | null
          customer_email: string
          customer_id: string | null
          customer_name: string
          customs_duties: number | null
          documentation_fee: number | null
          estimated_timeline: string | null
          expedited_service: boolean | null
          from_country: string | null
          id: string
          inspection_cost: number | null
          insurance_cost: number | null
          insurance_included: boolean | null
          notes: string | null
          quote_number: string
          shipping_cost: number | null
          shipping_method: string
          status: string | null
          to_country: string
          total_cost: number
          updated_at: string
          valid_until: string | null
          vehicle_type: string | null
          vehicle_value: number | null
        }
        Insert: {
          created_at?: string
          currency?: string | null
          customer_email: string
          customer_id?: string | null
          customer_name: string
          customs_duties?: number | null
          documentation_fee?: number | null
          estimated_timeline?: string | null
          expedited_service?: boolean | null
          from_country?: string | null
          id?: string
          inspection_cost?: number | null
          insurance_cost?: number | null
          insurance_included?: boolean | null
          notes?: string | null
          quote_number: string
          shipping_cost?: number | null
          shipping_method: string
          status?: string | null
          to_country: string
          total_cost: number
          updated_at?: string
          valid_until?: string | null
          vehicle_type?: string | null
          vehicle_value?: number | null
        }
        Update: {
          created_at?: string
          currency?: string | null
          customer_email?: string
          customer_id?: string | null
          customer_name?: string
          customs_duties?: number | null
          documentation_fee?: number | null
          estimated_timeline?: string | null
          expedited_service?: boolean | null
          from_country?: string | null
          id?: string
          inspection_cost?: number | null
          insurance_cost?: number | null
          insurance_included?: boolean | null
          notes?: string | null
          quote_number?: string
          shipping_cost?: number | null
          shipping_method?: string
          status?: string | null
          to_country?: string
          total_cost?: number
          updated_at?: string
          valid_until?: string | null
          vehicle_type?: string | null
          vehicle_value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "quotes_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      role_changes: {
        Row: {
          changed_at: string | null
          changed_by: string | null
          id: string
          new_role: string
          old_role: string | null
          reason: string | null
          user_id: string
        }
        Insert: {
          changed_at?: string | null
          changed_by?: string | null
          id?: string
          new_role: string
          old_role?: string | null
          reason?: string | null
          user_id: string
        }
        Update: {
          changed_at?: string | null
          changed_by?: string | null
          id?: string
          new_role?: string
          old_role?: string | null
          reason?: string | null
          user_id?: string
        }
        Relationships: []
      }
      transaction_fees: {
        Row: {
          created_at: string | null
          currency: string | null
          fee_percentage: number
          id: string
          max_fee: number | null
          membership_tier: Database["public"]["Enums"]["membership_tier"]
          min_fee: number | null
          service_type: string
        }
        Insert: {
          created_at?: string | null
          currency?: string | null
          fee_percentage: number
          id?: string
          max_fee?: number | null
          membership_tier: Database["public"]["Enums"]["membership_tier"]
          min_fee?: number | null
          service_type: string
        }
        Update: {
          created_at?: string | null
          currency?: string | null
          fee_percentage?: number
          id?: string
          max_fee?: number | null
          membership_tier?: Database["public"]["Enums"]["membership_tier"]
          min_fee?: number | null
          service_type?: string
        }
        Relationships: []
      }
      vehicle_images: {
        Row: {
          caption: string | null
          created_at: string
          display_order: number | null
          id: string
          image_url: string
          is_primary: boolean | null
          vehicle_id: string
        }
        Insert: {
          caption?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          image_url: string
          is_primary?: boolean | null
          vehicle_id: string
        }
        Update: {
          caption?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          image_url?: string
          is_primary?: boolean | null
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_images_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicles: {
        Row: {
          condition: string | null
          created_at: string
          currency: string | null
          description: string | null
          engine_details: string | null
          exterior_color: string | null
          features: string[] | null
          fuel_type: string | null
          id: string
          interior_color: string | null
          location: string | null
          make: string
          mileage: number | null
          model: string
          price: number | null
          status: string | null
          transmission: string | null
          updated_at: string
          vin: string | null
          year: number
        }
        Insert: {
          condition?: string | null
          created_at?: string
          currency?: string | null
          description?: string | null
          engine_details?: string | null
          exterior_color?: string | null
          features?: string[] | null
          fuel_type?: string | null
          id?: string
          interior_color?: string | null
          location?: string | null
          make: string
          mileage?: number | null
          model: string
          price?: number | null
          status?: string | null
          transmission?: string | null
          updated_at?: string
          vin?: string | null
          year: number
        }
        Update: {
          condition?: string | null
          created_at?: string
          currency?: string | null
          description?: string | null
          engine_details?: string | null
          exterior_color?: string | null
          features?: string[] | null
          fuel_type?: string | null
          id?: string
          interior_color?: string | null
          location?: string | null
          make?: string
          mileage?: number | null
          model?: string
          price?: number | null
          status?: string | null
          transmission?: string | null
          updated_at?: string
          vin?: string | null
          year?: number
        }
        Relationships: []
      }
      vip_access: {
        Row: {
          created_at: string
          id: number
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          user_id?: string | null
        }
        Relationships: []
      }
      vip_memberships: {
        Row: {
          auto_renew: boolean | null
          created_at: string | null
          end_date: string | null
          id: string
          monthly_price: number
          payment_frequency: Database["public"]["Enums"]["payment_frequency"]
          start_date: string
          status: Database["public"]["Enums"]["subscription_status"]
          tier: Database["public"]["Enums"]["membership_tier"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          auto_renew?: boolean | null
          created_at?: string | null
          end_date?: string | null
          id?: string
          monthly_price: number
          payment_frequency?: Database["public"]["Enums"]["payment_frequency"]
          start_date?: string
          status?: Database["public"]["Enums"]["subscription_status"]
          tier?: Database["public"]["Enums"]["membership_tier"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          auto_renew?: boolean | null
          created_at?: string | null
          end_date?: string | null
          id?: string
          monthly_price?: number
          payment_frequency?: Database["public"]["Enums"]["payment_frequency"]
          start_date?: string
          status?: Database["public"]["Enums"]["subscription_status"]
          tier?: Database["public"]["Enums"]["membership_tier"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_order_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_quote_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_user_role: {
        Args: { user_id?: string }
        Returns: string
      }
    }
    Enums: {
      membership_tier: "basic" | "premium" | "vip" | "ultra_vip" | "platinum"
      payment_frequency: "monthly" | "quarterly" | "yearly"
      subscription_status: "active" | "cancelled" | "expired" | "pending"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      membership_tier: ["basic", "premium", "vip", "ultra_vip", "platinum"],
      payment_frequency: ["monthly", "quarterly", "yearly"],
      subscription_status: ["active", "cancelled", "expired", "pending"],
    },
  },
} as const
