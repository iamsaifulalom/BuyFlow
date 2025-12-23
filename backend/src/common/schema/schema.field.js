// src/schema/auth.fields.ts
import { z } from "zod";

export const nameField = z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long")
    .trim();

export const emailField = z
    .string()
    .email("Please enter a valid email address")
    .transform((v) => v.toLowerCase());

export const passwordField = z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[A-Za-z])(?=.*\d)/, {
        message: "Password must contain at least one letter and one number",
    });

export const agreeField = z.literal(true, { message: "You must agree to the Privacy Policy and Terms", });

export const tokenField = z.string().min(1, "Token is required");