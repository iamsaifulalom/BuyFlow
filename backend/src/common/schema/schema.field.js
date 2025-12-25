// src/schema/auth.fields.ts
import { extendedZod as z } from '../docs/extend-zod.js'

export const nameField = z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long")
    .trim()
    .openapi({ example: "Saiful Alom" });

export const emailField = z
    .string()
    .email("Please enter a valid email address")
    .transform((v) => v.toLowerCase())
    .openapi({ example: "test@user.com" });

export const passwordField = z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[A-Za-z])(?=.*\d)/, {
        message: "Password must contain at least one letter and one number",
    })
    .openapi({ example: "my password 12345" });

export const agreeField = z
    .literal(true, { message: "You must agree to the Privacy Policy and Terms", })
    .openapi({ example: true });

export const tokenField = z.string().min(1, "Token is required");

// Reusable schema for route param `id` (MongoDB ObjectId style)
export const idParam = z.object({
    id: z.string()
        .length(24, "Invalid ID")  // typical length for MongoDB ObjectId
        .nonempty("ID is required")
})