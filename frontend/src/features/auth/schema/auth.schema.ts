// src/schema/auth.schema.ts
import { z } from "zod";
import {
  nameField,
  emailField,
  passwordField,
  agreeField,
  tokenField,
} from "./auth.fields";

/* ---------------- SIGN UP ---------------- */
export const signUpSchema = z.object({
  name: nameField,
  email: emailField,
  password: passwordField,
  termsAccepted: agreeField,
});

/* ---------------- SIGN IN ---------------- */
export const signInSchema = z.object({
  email: emailField,
  password: passwordField,
});

/* ---------------- EMAIL VERIFY ---------------- */
export const verifySchema = z.object({
  email: emailField,
  verify_token: tokenField,
});

/* ---------------- PASSWORD RESET ---------------- */
export const resetPasswordSchema = z.object({
  token: tokenField,
  new_password: passwordField,
});

export type SignUpBody = z.infer<typeof signUpSchema>;
export type SignInBody = z.infer<typeof signInSchema>;
export type VerifyBody = z.infer<typeof verifySchema>;
export type ResetPasswordBody = z.infer<typeof resetPasswordSchema>;