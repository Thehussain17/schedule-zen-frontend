export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      machines: {
        Row: {
          Health: string | null
          Image_URL: string | null
          Last_Check: string | null
          Location: string | null
          Machine_ID: string
          Machine_Name: string | null
          Status: string | null
          Type: string | null
        }
        Insert: {
          Health?: string | null
          Image_URL?: string | null
          Last_Check?: string | null
          Location?: string | null
          Machine_ID: string
          Machine_Name?: string | null
          Status?: string | null
          Type?: string | null
        }
        Update: {
          Health?: string | null
          Image_URL?: string | null
          Last_Check?: string | null
          Location?: string | null
          Machine_ID?: string
          Machine_Name?: string | null
          Status?: string | null
          Type?: string | null
        }
        Relationships: []
      }
      "Maintenance Scheduler": {
        Row: {
          "Assigned Technician": string | null
          Date: string | null
          "Machine ID": string | null
          "Overloaded Day": boolean | null
          Priority: string | null
          "Task ID": number
          "Task Name": string | null
          "Time Slot": string | null
        }
        Insert: {
          "Assigned Technician"?: string | null
          Date?: string | null
          "Machine ID"?: string | null
          "Overloaded Day"?: boolean | null
          Priority?: string | null
          "Task ID": number
          "Task Name"?: string | null
          "Time Slot"?: string | null
        }
        Update: {
          "Assigned Technician"?: string | null
          Date?: string | null
          "Machine ID"?: string | null
          "Overloaded Day"?: boolean | null
          Priority?: string | null
          "Task ID"?: number
          "Task Name"?: string | null
          "Time Slot"?: string | null
        }
        Relationships: []
      }
      maintenance_log: {
        Row: {
          Action_Taken: string | null
          Date: string | null
          Issue: string | null
          Log_ID: string
          Machine_ID: string | null
          Status: string | null
          Technician: string | null
          Type: string | null
        }
        Insert: {
          Action_Taken?: string | null
          Date?: string | null
          Issue?: string | null
          Log_ID: string
          Machine_ID?: string | null
          Status?: string | null
          Technician?: string | null
          Type?: string | null
        }
        Update: {
          Action_Taken?: string | null
          Date?: string | null
          Issue?: string | null
          Log_ID?: string
          Machine_ID?: string | null
          Status?: string | null
          Technician?: string | null
          Type?: string | null
        }
        Relationships: []
      }
      Sensor_data: {
        Row: {
          Machine_ID: string
          Oil_Level: string | null
          Temperature_C: number | null
          Timestamp: string | null
          Vibration: number | null
        }
        Insert: {
          Machine_ID: string
          Oil_Level?: string | null
          Temperature_C?: number | null
          Timestamp?: string | null
          Vibration?: number | null
        }
        Update: {
          Machine_ID?: string
          Oil_Level?: string | null
          Temperature_C?: number | null
          Timestamp?: string | null
          Vibration?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Sensor_data_Machine_ID_fkey"
            columns: ["Machine_ID"]
            isOneToOne: false
            referencedRelation: "machines"
            referencedColumns: ["Machine_ID"]
          },
        ]
      }
      technichians: {
        Row: {
          Action_Taken: string | null
          Date: string | null
          Issue: string | null
          Log_ID: string
          Machine_ID: string | null
          Status: string | null
          Technician: string | null
          Type: string | null
        }
        Insert: {
          Action_Taken?: string | null
          Date?: string | null
          Issue?: string | null
          Log_ID: string
          Machine_ID?: string | null
          Status?: string | null
          Technician?: string | null
          Type?: string | null
        }
        Update: {
          Action_Taken?: string | null
          Date?: string | null
          Issue?: string | null
          Log_ID?: string
          Machine_ID?: string | null
          Status?: string | null
          Technician?: string | null
          Type?: string | null
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
