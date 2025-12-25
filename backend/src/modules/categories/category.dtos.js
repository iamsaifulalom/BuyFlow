import { extendedZod as z } from "../../common/docs/extend-zod.js";

// Regex to validate MongoDB ObjectId (24 hex characters)
const objectIdRegex = /^[0-9a-fA-F]{24}$/;

// Create Category (all required except optional fields)
export const createCategorySchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .openapi({ example: "Electronics" }),
  slug: z
    .string()
    .min(1, "Slug is required")
    .openapi({ example: "electronics" }),
  image: z
    .string()
    .regex(objectIdRegex, "Invalid ObjectId")
    .optional()
    .nullable()
    .openapi({
      example: "694b9c8bac90ca3483dcb6cd",
      description: "Sign an url then you will get an image id inclued it here"
    }),
  products: z
    .array(z.string()
      .regex(objectIdRegex, "Invalid ObjectId"))
    .optional()
    .openapi({ example: ["694b9c8bac90ca3483dcb6cd"] })
})

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
