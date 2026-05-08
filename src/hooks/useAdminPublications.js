"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { createClient } from "@/lib/supabase/client";

export function useAdminPublications() {
  const supabase = createClient();
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFetched = useRef(false);

  const fetchAll = useCallback(async () => {
    const { data, error } = await supabase
      .from("publications")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setPublications(data || []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    if (!isFetched.current) {
      const init = async () => await fetchAll();
      init();
      isFetched.current = true;
    }

    const channel = supabase
      .channel("pub-admin-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "publications" },
        fetchAll,
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [fetchAll, supabase]);

  return { publications, loading, fetchAll };
}
