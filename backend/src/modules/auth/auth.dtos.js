// src/schema/auth.dto.js
import { z } from "zod";
import {
  nameField,
  emailField,
  passwordField,
  agreeField,
  tokenField
} from "../../common/schema/schema.field.js";

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
  verify_token: tokenField,
  email: emailField
});

/* ---------------- PASSWORD RESET ---------------- */
export const resetPasswordSchema = z.object({
  token: tokenField,
  new_password: passwordField,
});