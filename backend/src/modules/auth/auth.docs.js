//src/modules/auth/auth.docs.js

import { extendedZod } from "../../common/docs/extend-zod.js";
import { registry } from "../../common/docs/openapi-registry.js";
import { signInSchema } from "./auth.dtos.js";


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
    200: {
      description: "Sign in successfully",
      content: {
        "application/json": {
          schema: extendedZod.object({
            accessToken: extendedZod.string(),
            refreshToken: extendedZod.string(),
          }),
        },
      },
    },

    401: {
      description: "Invalid email or password",
    },
  },
});
