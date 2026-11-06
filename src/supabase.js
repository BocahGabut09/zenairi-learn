import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.119.0';

// Publishable key memang ditujukan untuk aplikasi browser. Akses data tetap
// dibatasi oleh Row Level Security (RLS) di Supabase.
const SUPABASE_URL = import.meta?.env?.VITE_SUPABASE_URL || 'https://fbrtzbojkmvachywwcno.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = import.meta?.env?.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_brrQPDfLl2-_L7mkEugp2g_Z06zaKJ2';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: { autoRefreshToken: true, persistSession: true, detectSessionInUrl: true }
});
