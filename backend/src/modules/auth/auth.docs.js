//src/modules/auth/auth.docs.js
import { registry } from "../../common/docs/generate-openapi.js";
import { signInSchema, signUpSchema } from "./auth.dtos.js";

registry.registerPath({
    path: "/auth/sign-up",
    method: "post",
    tags: ["Auth"],
    description: "Reggiester user account",

    request: {
        body: {
            content: {
                "application/json": {
                    schema: signUpSchema,
                },
            },
        },
    },

    responses: {
        201: { description: "Sign up successfully" },
        401: { description: "Invalid email or password" }
    },
});


registry.registerPath({
    path: "/auth/sign-in",
    method: "post",
    tags: ["Auth"],
    description: "Sign in a user",

    request: {
        body: {
            content: {
                "application/json": {
                    schema: signInSchema,
                },
            },
        },
    },

    responses: {
        200: { description: "Sign in successfully" },
        401: { description: "Invalid email or password" },
    },
});
