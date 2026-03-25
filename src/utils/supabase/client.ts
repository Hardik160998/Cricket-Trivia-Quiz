import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = typeof window === 'undefined' 
  ? process.env.NEXT_PUBLIC_SUPABASE_URL 
  : '/base';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export const createClient = () =>
  createBrowserClient(
    supabaseUrl!,
    supabaseKey!,
  );
