"use client";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import SnackbarAlert from "@/app/_components/common/snackbar-alert";
import { AUTH_MESSAGES } from "@/app/(auth)/constants/auth-messages";
import { useSignUp } from "@/app/(auth)/_hooks/use-sign-up";

import AuthContainer from "@/app/(auth)/_components/auth-container";
import AuthHeader from "@/app/(auth)/_components/auth-header";
import AuthLayout from "@/app/(auth)/_components/auth-layout";
import { SignUpSchema, signUpSchema } from "@/app/(auth)/_components/schemas";
import Button from "@/app/_components/common/button";
import Link from "@/app/_components/common/link";
import FormPasswordField from "@/app/_components/form/form-password-field";
import FormTextField from "@/app/_components/form/form-text-field";

const SignUpPage = () => {
  const { control, handleSubmit } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      birthDate: "",
      password: "",
    },
  });

  const { signUpMutation, isLoading, errorMessage, handleCloseSnackbar } =
    useSignUp();

  const onSubmit = (data: SignUpSchema) => {
    signUpMutation.mutate(data);
  };

  return (
    <AuthLayout>
      <AuthHeader
        title="Get Started Now"
        subtitle="Create an account or log in to explore about our app"
      />

      <AuthContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <FormTextField
                control={control}
                name="firstName"
                label="First Name"
                fullWidth
              />
              <FormTextField
                control={control}
                name="lastName"
                label="Last Name"
                fullWidth
              />
            </Stack>
            <FormTextField
              control={control}
              name="email"
              label="Email"
              type="email"
              fullWidth
              autoComplete="username"
            />
            <FormTextField
              control={control}
              name="birthDate"
              label="Date of Birth"
              type="date"
              fullWidth
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
            <FormPasswordField
              control={control}
              name="password"
              label="Password"
              fullWidth
              autoComplete="current-password"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? AUTH_MESSAGES.SIGNING_UP : AUTH_MESSAGES.SIGN_UP}
            </Button>
          </Stack>
        </form>

        <Divider>
          <Typography variant="body2" color="text.secondary">
            OR
          </Typography>
        </Divider>

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body1">
            Already have an account? <Link href="/sign-in">Sign In</Link>
          </Typography>
        </Box>
      </AuthContainer>

      <SnackbarAlert
        message={errorMessage}
        severity="error"
        onClose={handleCloseSnackbar}
      />
    </AuthLayout>
  );
};

export default SignUpPage;
