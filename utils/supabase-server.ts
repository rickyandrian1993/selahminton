import { createClient } from "@supabase/supabase-js";

// Define a type for your database if you want (optional, helps with intellisense)
// import type { Database } from "@/types/supabase"; 

export function createServerClient() {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_KEY in env");
  }

  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY, // use service_role key (⚠️ keep server-only!)
    {
      auth: {
        persistSession: false,
      },
    }
  );
}
