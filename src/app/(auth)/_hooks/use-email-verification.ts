import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { useSupabase } from "@/app/_components/supabase/supabase-provider";

export const useEmailVerification = () => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const supabase = useSupabase();

  const verifyEmailMutation = useMutation({
    mutationFn: async ({
      accessToken,
      refreshToken,
    }: {
      accessToken: string;
      refreshToken: string;
    }) => {
      const { error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      router.replace("/");
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");
    const type = params.get("type");

    if (accessToken && refreshToken && type === "signup") {
      verifyEmailMutation.mutate({ accessToken, refreshToken });
    } else {
      setLoading(false);
    }
  }, [verifyEmailMutation]);

  const handleCloseSnackbar = () => {
    setErrorMessage(null);
    verifyEmailMutation.reset();
  };

  return {
    isLoading: loading || verifyEmailMutation.isPending,
    errorMessage: errorMessage || verifyEmailMutation.error?.message || null,
    handleCloseSnackbar,
  };
};
