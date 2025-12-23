import { ZodError } from "zod";

export const validateResource = (schema) =>
    (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {

            if (error instanceof ZodError) {
                
                const { path, message } = error.issues[0];

                return res.status(400).json({
                    success: false,
                    message: "Validation failed",
                    error: `${String(path[0])}: ${message}`,
                });
            }

            return res.status(500).json({
                success: false,
                message: "Internal server error during validation",
            });
        }
    };