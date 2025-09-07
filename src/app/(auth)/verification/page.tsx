"use client";

import { Typography, Box, CircularProgress } from "@mui/material";
import AuthLayout from "@/app/(auth)/_components/auth-layout";
import AuthHeader from "@/app/(auth)/_components/auth-header";
import AuthContainer from "@/app/(auth)/_components/auth-container";
import SnackbarAlert from "@/app/_components/common/snackbar-alert";
import { useEmailVerification } from "@/app/(auth)/_hooks/use-email-verification";

const EmailVerificationInfo = () => {
  const { isLoading, errorMessage, handleCloseSnackbar } =
    useEmailVerification();

  if (isLoading) {
    return (
      <AuthLayout>
        <AuthContainer>
          <Box sx={{ textAlign: "center", py: 4 }}>
            <CircularProgress />
            <Typography variant="body1" sx={{ mt: 2 }}>
              Verifying your email...
            </Typography>
          </Box>
        </AuthContainer>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <AuthHeader
        title="Verify Your Email"
        subtitle="We've sent a confirmation link to your email address."
      />
      <AuthContainer>
        <Box sx={{ textAlign: "center" }}>
          {errorMessage ? (
            <SnackbarAlert
              message={errorMessage}
              severity="error"
              onClose={handleCloseSnackbar}
            />
          ) : (
            <>
              <Typography variant="body1" gutterBottom>
                Please check your inbox and click the confirmation link to
                activate your account.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Didn&apos;t receive the email? Check your spam folder or try
                signing up again.
              </Typography>
            </>
          )}
        </Box>
      </AuthContainer>
    </AuthLayout>
  );
};

export default EmailVerificationInfo;
