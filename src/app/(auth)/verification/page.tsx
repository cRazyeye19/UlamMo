"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import SnackbarAlert from "@/app/_components/common/snackbar-alert";
import { useState } from "react";

import AuthContainer from "../_components/auth-container";
import AuthHeader from "../_components/auth-header";
import AuthLayout from "../_components/auth-layout";
import Button from "../../_components/common/button";
import Link from "../../_components/common/link";
import FormTextField from "../../_components/form/form-text-field";
import { OtpSchema, otpSchema } from "../_components/schemas";
import { useSupabase } from "@/app/_components/supabase/supabase-provider";

const VerificationPage = () => {
  const supabase = useSupabase();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { control, handleSubmit } = useForm<OtpSchema>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (data: OtpSchema) => {
    if (!email) {
      console.error("Email not found for OTP verification.");
      // TODO: Display error message to the user
      return;
    }

    const { error } = await supabase.auth.verifyOtp({
      email: email,
      token: data.otp,
      type: "signup",
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      setSuccessMessage("OTP verified successfully!");
      router.push("/");
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      console.error("Email not found for resending OTP.");
      // TODO: Display error message to the user
      return;
    }

    const { error } = await supabase.auth.resend({
      type: "signup",
      email: email,
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      setSuccessMessage("OTP resent successfully!");
    }
  };

  return (
    <AuthLayout>
      <AuthHeader
        title="Verification"
        subtitle="Enter the verification code we've sent to your email"
      />

      <AuthContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack alignItems="center" spacing={4}>
            <Typography variant="h6">Verification Code</Typography>

            <FormTextField
              control={control}
              name="otp"
              label="OTP"
              fullWidth
              slotProps={{
                input: {
                  inputProps: {
                    maxLength: 6,
                  },
                },
              }}
            />

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Confirm
            </Button>

            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body1">
                Didn&apos;t receive the code?{" "}
                <Link href="#" onClick={handleResendOtp}>
                  Resend
                </Link>
              </Typography>
            </Box>
          </Stack>
        </form>
      </AuthContainer>

      <SnackbarAlert
        message={errorMessage}
        severity="error"
        onClose={() => setErrorMessage(null)}
      />
      <SnackbarAlert
        message={successMessage}
        severity="success"
        onClose={() => setSuccessMessage(null)}
      />
    </AuthLayout>
  );
};

export default VerificationPage;
