import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { useSupabase } from "@/app/_components/providers/supabase-provider";
import { SignInSchema } from "@/app/(auth)/_components/schemas";

export const useSignIn = () => {
  const supabase = useSupabase();
  const router = useRouter();

  const signInMutation = useMutation({
    mutationFn: async (data: SignInSchema) => {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      router.push("/");
    },
  });

  const googleSignInMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) {
        throw new Error(error.message);
      }
    },
  });

  const facebookSignInMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "facebook",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) {
        throw new Error(error.message);
      }
    },
  });

  const isLoading =
    signInMutation.isPending ||
    googleSignInMutation.isPending ||
    facebookSignInMutation.isPending;

  const errorMessage =
    signInMutation.error?.message ||
    googleSignInMutation.error?.message ||
    facebookSignInMutation.error?.message ||
    null;

  const handleCloseSnackbar = () => {
    signInMutation.reset();
    googleSignInMutation.reset();
    facebookSignInMutation.reset();
  };

  return {
    signInMutation,
    googleSignInMutation,
    facebookSignInMutation,
    isLoading,
    errorMessage,
    handleCloseSnackbar,
  };
};