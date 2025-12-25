// src/common/docs/generate-openapi.js
import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { registry } from "./openapi-registry.js";

export function generateOpenApiSpec() {
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      title: "Buy Flow",
      version: "1.0.0",
      description: "BuyFlow REST API documentation",
    },
    servers: [
      { url: "http://localhost:5000" },
      { url: "https://buyflow-0gs4.onrender.com" },
    ],
  });
}
