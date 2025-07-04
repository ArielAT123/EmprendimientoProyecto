import { createClient } from '@supabase/supabase-js';
import { EXPO_PUBLIC_SUPABASE_URL,EXPO_PUBLIC_SUPABASE_ANON_KEY }from "./constans.ts"


export const supabase = createClient(EXPO_PUBLIC_SUPABASE_URL, EXPO_PUBLIC_SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // Necesario en Expo (evita redirecciones)
  },
});