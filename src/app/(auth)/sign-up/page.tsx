"use client";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthContainer from "../_components/auth-container";
import AuthHeader from "../_components/auth-header";
import AuthLayout from "../_components/auth-layout";
import { SignUpSchema, signUpSchema } from "../_components/schemas";
import Button from "../../_components/common/button";
import Link from "../../_components/common/link";
import FormPasswordField from "../../_components/form/form-password-field";
import FormTextField from "../../_components/form/form-text-field";

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

  const onSubmit = (data: SignUpSchema) => {
    console.log(data);
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
              <FormTextField control={control} name="firstName" label="First Name" fullWidth />
              <FormTextField control={control} name="lastName" label="Last Name" fullWidth />
            </Stack>
            <FormTextField control={control} name="email" label="Email" type="email" fullWidth />
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
            <FormPasswordField control={control} name="password" label="Password" fullWidth />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Sign Up
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
    </AuthLayout>
  );
};

export default SignUpPage;
