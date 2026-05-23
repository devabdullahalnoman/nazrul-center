// import { createClient } from "@/lib/supabase/client";
// import { InputEngine } from "@/lib/validation/inputEngine";

// const supabase = createClient();

// export const authApi = {
//   /**
//    * Validates and executes standard email/password authentication.
//    */
//   async login({ email, password }) {
//     const { isValid, cleaned } = InputEngine.validateAndCleanseEmail(email);
//     if (!isValid)
//       throw new Error("Please enter a structurally valid email address.");

//     const { data, error } = await supabase.auth.signInWithPassword({
//       email: cleaned,
//       password: password,
//     });
//     if (error) throw error;
//     return data;
//   },

//   /**
//    * Sanitizes registration fields, locks roles to 'user', and uploads avatar assets.
//    */
//   async register({ email, password, fullName, phone, address, photoFile }) {
//     // 1. Rigorous Data Validation Gate
//     const emailCheck = InputEngine.validateAndCleanseEmail(email);
//     if (!emailCheck.isValid)
//       throw new Error("Invalid email format encountered.");
//     if (!InputEngine.validatePasswordStrength(password)) {
//       throw new Error("Password must be at least 6 characters in length.");
//     }

//     const cleanName = InputEngine.sanitizeString(fullName);
//     const cleanPhone = InputEngine.sanitizeString(phone);
//     const cleanAddress = InputEngine.sanitizeString(address);

//     if (!cleanName)
//       throw new Error("Full name is a required programmatic field.");

//     let avatarUrl = null;

//     // 2. Secure Profile Asset Upload Processing
//     if (photoFile) {
//       const fileExt = photoFile.name.split(".").pop();
//       const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
//       const { error: uploadError } = await supabase.storage
//         .from("avatars")
//         .upload(fileName, photoFile);

//       if (!uploadError) {
//         const { data: publicUrlData } = supabase.storage
//           .from("avatars")
//           .getPublicUrl(fileName);
//         avatarUrl = publicUrlData.publicUrl;
//       }
//     }

//     // 3. Register user safely with metadata anchors
//     const { data, error } = await supabase.auth.signUp({
//       email: emailCheck.cleaned,
//       password,
//       options: {
//         data: {
//           full_name: cleanName,
//           phone: cleanPhone || null,
//           address: cleanAddress || null,
//           avatar_url: avatarUrl || null,
//           role: "user", // STRICT BOUNDARY: Enforced by application layer and database triggers
//         },
//       },
//     });

//     if (error) throw error;
//     return data;
//   },

//   /**
//    * Triggers a cryptographically secure redirect flow using native Google OAuth2 parameters.
//    */
//   async signInWithGoogle() {
//     try {
//       const activePlatformHost = window.location.origin;
//       const { data, error } = await supabase.auth.signInWithOAuth({
//         provider: "google",
//         options: {
//           redirectTo: `${activePlatformHost}/dashboard`,
//           queryParams: {
//             access_type: "offline",
//             prompt: "select_account",
//           },
//         },
//       });
//       if (error) throw error;
//       return data;
//     } catch (err) {
//       console.error(
//         "SSO Core Module Error: Connection framework allocation exception:",
//         err.message,
//       );
//       throw err;
//     }
//   },

//   /**
//    * Standardizes safe user logout flows.
//    */
//   async logout() {
//     const { error } = await supabase.auth.signOut();
//     if (error) throw error;
//   },

//   /**
//    * Safe Session Verification Hook
//    */
//   async getSession() {
//     const {
//       data: { user },
//     } = await supabase.auth.getUser();
//     if (!user) return null;

//     const { data: profile, error } = await supabase
//       .from("profiles")
//       .select("role, full_name, avatar_url")
//       .eq("id", user.id)
//       .single();

//     if (error) return { ...user, role: "user" };
//     return { ...user, role: profile?.role, profileDetails: profile };
//   },
// };

// import { createClient } from "@/lib/supabase/client";

// const supabase = createClient();

// const SafeAuthValidator = {
//   cleanseEmail(email) {
//     if (!email || typeof email !== "string")
//       return { valid: false, output: "" };
//     const cleaned = email.trim().toLowerCase();
//     const isMatched = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
//       cleaned,
//     );
//     return { valid: isMatched, output: cleaned };
//   },
//   sanitize(text) {
//     if (!text || typeof text !== "string") return "";
//     return text
//       .replace(/&/g, "&amp;")
//       .replace(/</g, "&lt;")
//       .replace(/>/g, "&gt;")
//       .replace(/"/g, "&quot;")
//       .replace(/'/g, "&#x27;")
//       .replace(/\//g, "&#x2F;")
//       .trim();
//   },
// };

// export const authApi = {
//   async login({ email, password }) {
//     const emailCheck = SafeAuthValidator.cleanseEmail(email);
//     if (!emailCheck.valid) throw new Error("Invalid email profile syntax.");

//     const { data, error } = await supabase.auth.signInWithPassword({
//       email: emailCheck.output,
//       password,
//     });
//     if (error) throw error;
//     return data;
//   },

//   async register({ email, password, fullName, phone, address, photoFile }) {
//     const emailCheck = SafeAuthValidator.cleanseEmail(email);
//     if (!emailCheck.valid)
//       throw new Error("Please evaluate your registration formatting values.");
//     if (!password || password.length < 6)
//       throw new Error("Passwords must match safety threshold constraints.");

//     const sanitizedName = SafeAuthValidator.sanitize(fullName);
//     if (!sanitizedName)
//       throw new Error("Full identity naming fields are required.");

//     let avatarUrl = null;

//     if (photoFile) {
//       const fileExt = photoFile.name.split(".").pop();
//       const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
//       const { error: uploadError } = await supabase.storage
//         .from("avatars")
//         .upload(fileName, photoFile);

//       if (!uploadError) {
//         const { data: publicUrlData } = supabase.storage
//           .from("avatars")
//           .getPublicUrl(fileName);
//         avatarUrl = publicUrlData.publicUrl;
//       }
//     }

//     const { data, error } = await supabase.auth.signUp({
//       email: emailCheck.output,
//       password,
//       options: {
//         data: {
//           full_name: sanitizedName,
//           phone: SafeAuthValidator.sanitize(phone) || null,
//           address: SafeAuthValidator.sanitize(address) || null,
//           avatar_url: avatarUrl || null,
//           role: "user",
//         },
//       },
//     });

//     if (error) throw error;
//     return data;
//   },

//   async signInWithGoogle() {
//     const host = window.location.origin;
//     const { data, error } = await supabase.auth.signInWithOAuth({
//       provider: "google",
//       options: {
//         redirectTo: `${host}/dashboard`,
//         queryParams: { access_type: "offline", prompt: "select_account" },
//       },
//     });
//     if (error) throw error;
//     return data;
//   },

//   async logout() {
//     const { error } = await supabase.auth.signOut();
//     if (error) throw error;
//   },

//   async getSession() {
//     const {
//       data: { user },
//     } = await supabase.auth.getUser();
//     if (!user) return null;

//     const { data: profile } = await supabase
//       .from("profiles")
//       .select("*")
//       .eq("id", user.id)
//       .single();
//     return { ...user, ...profile };
//   },
// };

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
