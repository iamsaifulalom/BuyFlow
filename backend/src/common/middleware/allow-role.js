import JWT from "jsonwebtoken";
import { AppError } from "../utils/app-error.js";

export function allowRole(roles = []) {
    return (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader) {
                throw new AppError("Please sign in agin", 401);
            }

            const [scheme, token] = authHeader.split(" ");

            if (scheme !== "Bearer" || !token) {
                throw new AppError("Invalid authorization format", 401);
            }

            let decoded;
            try {
                decoded = JWT.verify(token, process.env.JWT_SECRET);
            } catch (err) {
                if (err.name === "TokenExpiredError") {
                    throw new AppError("Session expired. Please sign in again.", 401);
                }

                if (err.name === "JsonWebTokenError") {
                    throw new AppError("Invalid token. Please sign in again.", 401);
                }

                throw err; // unknown error
            }

            // optional role check
            if (roles.length && !roles.includes(decoded.role)) {
                throw new AppError("You are not allowed to access this resource", 403);
            }

            req.user = decoded; // attach user safely
            next();
        } catch (error) {
            next(error);
        }
    };
}
