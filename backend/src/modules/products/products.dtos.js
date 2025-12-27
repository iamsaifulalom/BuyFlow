// src/modules/products/products.dtos.js

import { extendedZod as z } from "../../common/docs/extend-zod.js";
import { mongooseId } from "../../common/schema/schema.field.js";

// Zod validator for Product
export const productValidator = z.object({
    name: z.string("Product name is required"),
    slug: z.string("Slug is required"),
    description: z.string(),
    price: z.number(),
    discountPrice: z.number(),
    stock: z.number("Stock is required"),
    images: z.array(mongooseId).min(1, "At least one image is required"),
    isFeatured: z.boolean().optional(),
    category: mongooseId
});
