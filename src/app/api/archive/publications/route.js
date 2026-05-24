import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const revalidate = 60;

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const isFeatured = searchParams.get("featured") === "true";

    // 1. Dual-Tier credential validation parsing logic
    // 1. Dual-Tier strict server credential validation
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SERVICE_ROLE_KEY; // Ensure the variable name exactly matches your .env path

    if (!supabaseUrl || !supabaseKey) {
      console.error(
        "❌ CRITICAL: Server-to-server connection credentials missing in environment variables.",
      );
      return NextResponse.json(
        { error: "Internal server authentication misconfiguration." },
        { status: 500 },
      );
    }

    // 2. Initialize private server-to-server connection
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false },
    });

    let query = supabase
      .from("publications")
      .select("id, title, category, cover_url, year, is_featured, author");

    if (isFeatured) {
      query = query.eq("is_featured", true);
    }

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (err) {
    console.error("❌ Publications Backend Proxy Exception:", err.message);
    return NextResponse.json(
      { error: "Failed to read database archive catalogs." },
      { status: 500 },
    );
  }
}
