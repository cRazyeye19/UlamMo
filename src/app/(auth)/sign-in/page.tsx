"use client";

import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Facebook from "@mui/icons-material/Facebook";
import Google from "@mui/icons-material/Google";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { useSupabase } from "@/app/_components/supabase/supabase-provider";
import SnackbarAlert from "@/app/_components/common/snackbar-alert";

import AuthContainer from "../_components/auth-container";
import AuthHeader from "../_components/auth-header";
import AuthLayout from "../_components/auth-layout";
import { SignInSchema, signInSchema } from "../_components/schemas";
import Button from "../../_components/common/button";
import Link from "../../_components/common/link";
import FormPasswordField from "../../_components/form/form-password-field";
import FormTextField from "../../_components/form/form-text-field";

const SignInPage = () => {
  const supabase = useSupabase();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { control, handleSubmit } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (data: SignInSchema) => {
    setErrorMessage(null); // Clear previous errors
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      router.push("/");
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    }
  };

  const handleFacebookSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "facebook",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <AuthLayout>
      <AuthHeader
        title="Welcome Back"
        subtitle="Login to access your account"
      />

      <AuthContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <FormTextField control={control} name="email" label="Email" fullWidth />
            <FormPasswordField control={control} name="password" label="Password" fullWidth />
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <FormControlLabel
                control={
                  <Checkbox
                    {...control.register("remember")}
                    name="remember"
                  />
                }
                label="Remember me"
              />
              <Typography variant="body2" color="text.secondary">
                <Link href="/forgot-password">Forgot password?</Link>
              </Typography>
            </Stack>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Log In
            </Button>
          </Stack>
        </form>

        <Divider>
          <Typography variant="body2" color="text.secondary">
            Or Sign In With
          </Typography>
        </Divider>

        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<Google />}
            fullWidth
            onClick={handleGoogleSignIn}
          >
            Google
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<Facebook />}
            fullWidth
            onClick={handleFacebookSignIn}
          >
            Facebook
          </Button>
        </Stack>

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body1">
            Don&apos;t have an account? <Link href="/sign-up">Sign Up</Link>
          </Typography>
        </Box>
      </AuthContainer>

      <SnackbarAlert
        message={errorMessage}
        severity="error"
        onClose={() => setErrorMessage(null)}
      />
    </AuthLayout>
  );
};

export default SignInPage;
