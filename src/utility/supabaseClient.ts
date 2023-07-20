import { createClient } from "@refinedev/supabase";

const SUPABASE_URL = "https://dyiawoaceshktxljetft.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5aWF3b2FjZXNoa3R4bGpldGZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk1OTYyNTksImV4cCI6MjAwNTE3MjI1OX0.InVhl1c4vYOVjNNhUH4HiPOtGRcIZGSbeWpEt7f7M6I";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
  },
});
