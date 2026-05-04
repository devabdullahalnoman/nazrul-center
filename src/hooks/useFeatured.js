import { useQuery } from "@tanstack/react-query";
import { getFeaturedBooksData } from "@/api/featured";

export function useFeaturedBooks() {
  return useQuery({
    queryKey: ["publications", "featured"],
    queryFn: getFeaturedBooksData,
    staleTime: 1000 * 60 * 15,
  });
}
