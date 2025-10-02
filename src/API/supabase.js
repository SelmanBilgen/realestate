import { createClient } from "@supabase/supabase-js";

// IMPORTANT: Replace with your actual Supabase project URL and anon key.
// It is recommended to use environment variables for these values.
const supabaseUrl = "https://pctolucevcpcqllmzwjj.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjdG9sdWNldmNwY3FsbG16d2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzNjk0MjQsImV4cCI6MjA3NDk0NTQyNH0._qdt3igA7-uRiV_a6GxCEWMY3ZS9iTFqQbO7jdGh7X4";

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
