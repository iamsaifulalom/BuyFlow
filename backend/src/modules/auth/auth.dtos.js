// src/schema/auth.dto.js
import { extendedZod } from '../../common/docs/extend-zod.js'
import {
  nameField,
  emailField,
  passwordField,
  agreeField,
  tokenField
} from "../../common/schema/schema.field.js";

/* ---------------- SIGN UP ---------------- */
export const signUpSchema = extendedZod.object({
  name: nameField,
  email: emailField,
  password: passwordField,
  termsAccepted: agreeField,
}).openapi("Sign up body");

/* ---------------- SIGN IN ---------------- */
export const signInSchema = extendedZod.object({
  email: emailField,
  password: passwordField,
}).openapi("Sign in body");

/* ---------------- EMAIL VERIFY ---------------- */
export const verifySchema = extendedZod.object({
  verify_token: tokenField,
  email: emailField
});

/* ---------------- PASSWORD RESET ---------------- */
export const resetPasswordSchema = extendedZod.object({
  token: tokenField,
  new_password: passwordField,
});