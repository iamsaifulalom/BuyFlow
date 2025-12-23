import { authService } from "./auth.service.js";


export const authController = {
    userDetails: async (req, res, next) => {
        try {
            console.log(req)
            res.status(200).json({ name: "saiful", role: "admin" })
        } catch (error) {
            next(error)
        }
    },

    signUp: async (req, res, next) => {
        try {
            const user = await authService.createUser(req.body);
            
            res.status(201).json({
                success: true,
                message: "Signed up succesfully",
                data: user
            })
        } catch (error) {
            next(error)
        }
    }
}