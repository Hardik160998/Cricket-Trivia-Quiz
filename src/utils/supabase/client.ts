import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = typeof window === 'undefined' 
  ? process.env.NEXT_PUBLIC_SUPABASE_URL 
  : `${window.location.origin}/cms`;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export const createClient = () => {
  if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase configuration is missing. Check your environment variables.");
  }
  
  return createBrowserClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseKey || 'placeholder-key',
  );
};
