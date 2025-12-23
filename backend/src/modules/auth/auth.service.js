import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken'
import 'dotenv/config';
import { authRepo } from "./auth.repo.js";
import { AppError } from '../../common/utils/app-error.js';

export const authService = {

    createUser: async (body) => {
        const hashedPassword = await bcrypt.hash(body.password, 10);

        const user = await authRepo.findByEmail(body.email);
        if (user) throw new AppError("Email is alredy registerd!", 409)

        const newUser = await authRepo.createUser({
            ...body,
            password: hashedPassword,
            isVerified: true,
        });

        // Remove  extra fleilds
        const {
            password,
            orders,
            address,
            chats,
            ...restData
        } = newUser;
        return restData
    },

    signInUser: async (body) => {
        const { email, password } = body;

        const user = await authRepo.findByEmail(email);
        if (!user) throw new AppError("Email is not register yet!", 404);

        const match = await bcrypt.compare(password, user?.password);
        if (!match) throw new AppError("Wrong credentials", 401);

        const { _id, name, role } = user;
        const token = JWT.sign(
            { _id, name, role, email },
            process.env.JWT_SECRET || "JWT_SECRET",
            { expiresIn: "7d" }
        );

        return {
            authToken: token,
            user: { name, email, role }
        }
    },
}