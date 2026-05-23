// import { createClient } from "@supabase/supabase-js";

// if (!process.env.SERVICE_ROLE_KEY) {
//   throw new Error(
//     "CRITICAL SECURITY ERROR: Administrative service key access parameters are unmapped.",
//   );
// }

// // Strictly instantiated on the server side; never import this into user-facing views or hooks
// export const getSupabaseAdmin = () => {
//   return createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL,
//     process.env.SERVICE_ROLE_KEY,
//     {
//       auth: {
//         persistSession: false,
//         autoRefreshToken: false,
//       },
//     },
//   );
// };

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
