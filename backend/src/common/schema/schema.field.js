// src/schema/auth.fields.ts
import { extendedZod } from '../docs/extend-zod.js'

export const nameField = extendedZod
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long")
    .trim()
    .openapi({ example: "Saiful Alom" });

export const emailField = extendedZod
    .string()
    .email("Please enter a valid email address")
    .transform((v) => v.toLowerCase())
    .openapi({ example: "test@user.com" });

export const passwordField = extendedZod
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[A-Za-z])(?=.*\d)/, {
        message: "Password must contain at least one letter and one number",
    })
    .openapi({ example: "my password 12345" });

export const agreeField = extendedZod
    .literal(true, { message: "You must agree to the Privacy Policy and Terms", })
    .openapi({ example: true });

export const tokenField = extendedZod.string().min(1, "Token is required");