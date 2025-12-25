import { registry } from "../../common/docs/generate-openapi.js";
import { createCategorySchema } from './category.dtos.js'

registry.registerPath({
    path: "/categories",
    method: "post",
    tags: ["Category"],
    description: "Create a new category",

    security: [
        {
            security: [{ bearerAuth: [] }]
        }
    ],

    request: {
        body: {
            content: {
                "application/json": {
                    schema: createCategorySchema
                }
            }
        }
    },
    responses: {
        201: {
            description: "Category created successfully",
        },
        400: {
            description: "Bad request",
        },
    }
})