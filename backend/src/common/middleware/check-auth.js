import JWT from 'jsonwebtoken';
import { AppError } from '../utils/app-error.js';

export function checkAuth() {
    return (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader) {
                throw new AppError("You need to be signed in to continue.", 401);
            }

            const [scheme, token] = authHeader.split(" ");

            if (scheme !== "Bearer" || !token) {
                throw new AppError("Invalid authorization format", 401);
            }

            const decodedData = JWT.verify(token, process.env.JWT_SECRET);
            req.user = decodedData;

            next()
        } catch (error) {
            if (error.name === "JsonWebTokenError") {
                throw new AppError("Invalid token. Please sign in again.", 401);
            }
            if (err.name === "JsonWebTokenError") {
                throw new AppError("Invalid token. Please sign in again.", 401);
            }
            next(error)
        }
    }
}