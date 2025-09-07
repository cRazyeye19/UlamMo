import { z } from "zod";

export const signInSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  remember: z.boolean().optional(),
});

export type SignInSchema = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.email("Invalid email address"),
  birthDate: z.string().min(1, "Date of birth is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
