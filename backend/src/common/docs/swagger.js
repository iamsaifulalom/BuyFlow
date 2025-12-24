import swaggerJSDocs from 'swagger-jsdoc';

export const swaggerSpec = swaggerJSDocs({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Buy flow api",
            version: "1.0.0"
        }
    },
    apis: ["./src/modules/**/*.routes.js"],
})