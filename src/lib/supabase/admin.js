import { createClient } from "@supabase/supabase-js";

// Moving this inside ensures it doesn't execute during the static 'next build' compilation phase
export const getSupabaseAdmin = () => {
  const serviceKey = process.env.SERVICE_ROLE_KEY;

  if (!serviceKey) {
    throw new Error(
      "CRITICAL SECURITY ERROR: Administrative service key access parameters are unmapped. " +
        "Ensure SUPABASE_SERVICE_ROLE_KEY is set in your environment variables.",
    );
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL,
    serviceKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );
};
