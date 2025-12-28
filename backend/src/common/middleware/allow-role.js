import { AppError } from "../utils/app-error.js";

export function allowRole(roles = []) {
    return (req, res, next) => {
        try {
            const allowedRole = roles.includes(req.user.role);
            if(!allowedRole) throw new AppError("You don’t have permission to access this resource." , 403)
            next();
        } catch (error) {
            next(error);
        }
    };
}
