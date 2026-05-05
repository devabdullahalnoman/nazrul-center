import { createClient } from "./client";
const supabase = createClient();

export const authService = {
  // 1. Registration with Profile Creation
  async register(email, password, fullName) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    if (error) throw error;
    return data;
  },

  // 2. Login
  async login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },

  // 3. Get Full User Data (Auth + Role + Profile)
  async getCurrentUser() {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return null;

    const { data: profile, error: profError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profError) console.error("Profile fetch error:", profError);

    return {
      ...user,
      role: profile?.role || "user",
      full_name: profile?.full_name,
      avatar_url: profile?.avatar_url,
    };
  },

  // 4. Update Profile
  async updateProfile(updates) {
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", user.id);
    if (error) throw error;
    return true;
  },

  async logout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }
};