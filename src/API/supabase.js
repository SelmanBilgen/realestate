import { createClient } from "@supabase/supabase-js";

// IMPORTANT: Replace with your actual Supabase project URL and anon key.
// It is recommended to use environment variables for these values.
const supabaseUrl = "YOUR_SUPABASE_URL";
const supabaseAnonKey = "YOUR_SUPABASE_ANON_KEY";

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;