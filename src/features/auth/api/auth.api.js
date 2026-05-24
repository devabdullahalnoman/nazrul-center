import { createClient } from "@/lib/supabase/client";
import { InputEngine } from "@/lib/validation/inputEngine";

const supabase = createClient();

export const authApi = {
  /**
   * Validates and executes standard email/password authentication.
   */
  async login({ email, password }) {
    const emailCheck = InputEngine.validateAndCleanseEmail(email);
    if (!emailCheck.isValid) {
      throw new Error("Please enter a structurally valid email address.");
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailCheck.cleaned,
      password: password,
    });

    if (error) throw error;
    return data;
  },

  /**
   * Sanitizes registration fields and uploads avatar assets.
   * Crucially strips any role assignments from client payloads to prevent escalation.
   */
  async register({ email, password, fullName, phone, address, photoFile }) {
    const emailCheck = InputEngine.validateAndCleanseEmail(email);
    if (!emailCheck.isValid) {
      throw new Error("Invalid email format encountered.");
    }
    if (!InputEngine.validatePasswordStrength(password)) {
      throw new Error("Password must be at least 6 characters in length.");
    }

    const cleanName = InputEngine.sanitizeString(fullName);
    const cleanPhone = InputEngine.sanitizeString(phone);
    const cleanAddress = InputEngine.sanitizeString(address);

    if (!cleanName) {
      throw new Error("Full name is a required field.");
    }

    let avatarUrl = null;

    if (photoFile) {
      const fileExt = photoFile.name.split(".").pop();
      const allowedExtensions = ["jpg", "jpeg", "png", "webp"];
      if (!allowedExtensions.includes(fileExt.toLowerCase())) {
        throw new Error(
          "Invalid file extension format for profile image asset.",
        );
      }

      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, photoFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (!uploadError) {
        const { data: publicUrlData } = supabase.storage
          .from("avatars")
          .getPublicUrl(fileName);
        avatarUrl = publicUrlData.publicUrl;
      }
    }

    // Role omitted entirely from client options metadata object.
    // Role status defaults securely via database schema default constraints.
    const { data, error } = await supabase.auth.signUp({
      email: emailCheck.cleaned,
      password,
      options: {
        data: {
          full_name: cleanName,
          phone: cleanPhone || null,
          address: cleanAddress || null,
          avatar_url: avatarUrl || null,
        },
      },
    });

    if (error) throw error;
    return data;
  },

  async signInWithGoogle() {
    const host = window.location.origin;
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${host}/dashboard`,
        queryParams: { access_type: "offline", prompt: "select_account" },
      },
    });
    if (error) throw error;
    return data;
  },

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getSession() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("id, full_name, email, role, avatar_url, phone, address")
      .eq("id", user.id)
      .single();

    if (error) return user;
    return { ...user, profile };
  },
};
