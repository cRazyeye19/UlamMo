import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { useSupabase } from "@/app/_components/providers/supabase-provider";
import { SignUpSchema } from "@/app/(auth)/_components/schemas";

export const useSignUp = () => {
  const supabase = useSupabase();
  const router = useRouter();

  const signUpMutation = useMutation({
    mutationFn: async (data: SignUpSchema) => {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            birth_date: data.birthDate,
          },
        },
      });

      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      router.push("/verification");
    },
  });

  const isLoading = signUpMutation.isPending;
  const errorMessage = signUpMutation.error?.message || null;

  const handleCloseSnackbar = () => {
    signUpMutation.reset();
  };

  return {
    signUpMutation,
    isLoading,
    errorMessage,
    handleCloseSnackbar,
  };
};
