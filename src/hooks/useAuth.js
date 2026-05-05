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
    setLoading(true);
    const data = await authService.getCurrentUser();
    setUser(data);
    setLoading(false);
  };

  useEffect(() => {
    if (isInitialMount.current) {
      fetchUserData();
      isInitialMount.current = false;
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event) => {
      if (["SIGNED_IN", "TOKEN_REFRESHED", "USER_UPDATED"].includes(event)) {
        await fetchUserData();
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading, refreshUser: fetchUserData };
}
