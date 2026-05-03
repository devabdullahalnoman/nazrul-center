// import { createClient } from "./client";

// const supabase = createClient();

// export const authService = {
//   // SIGN UP
//   async register(email, password, fullName) {
//     const { data, error } = await supabase.auth.signUp({
//       email,
//       password,
//       options: {
//         data: { full_name: fullName },
//       },
//     });
//     if (error) throw error;
//     return data;
//   },

//   // SIGN IN
//   async login(email, password) {
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });
//     if (error) throw error;
//     return data;
//   },

//   // LOGOUT
//   async logout() {
//     const { error } = await supabase.auth.signOut();
//     if (error) throw error;
//     // Hard refresh to clear all server/client syncs
//     window.location.href = "/";
//   },

//   // UPDATE PROFILE
//   async updateProfile(updates) {
//     const { data: { user } } = await supabase.auth.getUser();
//     if (!user) throw new Error("No user logged in");

//     const { data, error } = await supabase.from("profiles").update(updates).eq("id", user.id);
//     if (error) throw error;
//     return data;
//   },

//   // GET CURRENT SESSION
//   async getCurrentUser() {
//     const { data: { user }, error } = await supabase.auth.getUser();
//     if (error) return null;
//     return user;
//   }
// };

import { createClient } from "./client";

const supabase = createClient();

export const authService = {
  async login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  async register(email, password, fullName) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    if (error) throw error;
    return data;
  },

  async logout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  },

  async getCurrentUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  },
};
