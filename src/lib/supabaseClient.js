import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('supabaseUrl and supabaseAnonKey must be provided.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
