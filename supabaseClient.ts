
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project-id.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key-here';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      messages: {
        Row: {
          id: string;
          name: string;
          message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          message: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          message?: string;
          created_at?: string;
        };
      };
    };
  };
};
