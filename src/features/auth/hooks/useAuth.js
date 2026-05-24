"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { useRouter } from "next/navigation";

export function useAuth() {
  const queryClient = useQueryClient();
  const router = useRouter();

  // Fetches current session cache parameters dynamically
  const { data: user, isLoading } = useQuery({
    queryKey: ["auth-user"],
    queryFn: authApi.getSession,
    staleTime: 1000 * 60 * 10, // 10 minutes cache freshness configuration window
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth-user"] });
      router.push("/dashboard");
    },
  });

  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth-user"] });
      router.push("/dashboard");
    },
  });

  const googleMutation = useMutation({
    mutationFn: authApi.signInWithGoogle,
  });

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.setQueryData(["auth-user"], null);
      router.push("/login");
    },
  });

  return {
    user,
    isLoading,
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    register: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    signInWithGoogle: googleMutation.mutateAsync,
    isGoogleLoading: googleMutation.isPending,
    logout: logoutMutation.mutateAsync,
  };
}
