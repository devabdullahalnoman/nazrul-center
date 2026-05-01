import { useQuery } from "@tanstack/react-query";
import { getPublications } from "@/api/publications";

export function usePublications() {
  return useQuery({
    queryKey: ["publications"],
    queryFn: getPublications,
  });
}
