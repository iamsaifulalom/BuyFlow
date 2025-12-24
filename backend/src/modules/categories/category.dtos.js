import { z } from "zod";

// Regex to validate MongoDB ObjectId (24 hex characters)
const objectIdRegex = /^[0-9a-fA-F]{24}$/;

// Create Category (all required except optional fields)
export const createCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  image: z
    .string()
    .regex(objectIdRegex, "Invalid ObjectId")
    .optional()
    .nullable(),
  products: z
    .array(z.string().regex(objectIdRegex, "Invalid ObjectId"))
    .optional()
});

// Update Category (all optional)
export const updateCategorySchema = z.object({
  name: z.string().min(1, "Name cannot be empty").optional(),
  slug: z.string().min(1, "Slug cannot be empty").optional(),
  image: z
    .string()
    .regex(objectIdRegex, "Invalid ObjectId")
    .optional()
    .nullable(),
  products: z
    .array(z.string().regex(objectIdRegex, "Invalid ObjectId"))
    .optional()
});
