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
                message: "Sign up succesfully",
                data: user
            })
        } catch (error) {
            next(error)
        }
    },

    signIn: async (req, res, next) => {
        try {
            const credentials = await authService.signInUser(req.body);

            res.status(200).json({
                success: true,
                message: "Sign in succesfully",
                data: credentials
            })
        } catch (error) {
            next(error)
        }
    },
}