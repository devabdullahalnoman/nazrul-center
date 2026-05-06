// "use client";
// import { useState, useEffect, useRef } from "react";
// import { authService } from "@/lib/supabase/auth-service";
// import { createClient } from "@/lib/supabase/client";

// export function useAuth() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const supabase = createClient();
//   const isInitialMount = useRef(true);

//   const fetchUserData = async () => {
//     setLoading(true);
//     const data = await authService.getCurrentUser();
//     setUser(data);
//     setLoading(false);
//   };

//   useEffect(() => {
//     if (isInitialMount.current) {
//       fetchUserData();
//       isInitialMount.current = false;
//     }

//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange(async (event) => {
//       if (["SIGNED_IN", "TOKEN_REFRESHED", "USER_UPDATED"].includes(event)) {
//         await fetchUserData();
//       } else if (event === "SIGNED_OUT") {
//         setUser(null);
//         setLoading(false);
//       }
//     });

//     return () => subscription.unsubscribe();
//   }, []);

//   return { user, loading, refreshUser: fetchUserData };
// }

"use client";
import { useState, useEffect, useRef } from "react";
import { authService } from "@/lib/supabase/auth-service";
import { createClient } from "@/lib/supabase/client";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const isInitialMount = useRef(true);

  const fetchUserData = async () => {
    try {
      const data = await authService.getCurrentUser();
      setUser(data);
    } catch (error) {
      console.error("Auth error:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      // 1. Check for an existing session in local storage/cookies
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        await fetchUserData();
      } else {
        setLoading(false);
      }
    };

    if (isInitialMount.current) {
      initializeAuth();
      isInitialMount.current = false;
    }

    // 2. Listen for Auth changes (Login, Logout, Token Refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        await fetchUserData();
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  return { user, loading, refreshUser: fetchUserData };
}
