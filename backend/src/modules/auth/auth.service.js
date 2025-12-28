import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken'
import 'dotenv/config';
import { userRepo } from "../users/user.repo.js";
import { AppError } from '../../common/utils/app-error.js';

export const authService = {

    createUser: async (body) => {
        const hashedPassword = await bcrypt.hash(body.password, 10);

        const user = await userRepo.findByEmail(body.email);
        if (user) throw new AppError("Email is alredy registerd!", 409)

        const newUser = await userRepo.createUser({
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
            _id,
            createdAt,
            updatedAt,
            ...restData
        } = newUser;
        
        return { id: _id, ...restData }
    },

    signInUser: async (body) => {
        const { email, password } = body;

        const user = await userRepo.findByEmail(email);
        if (!user) throw new AppError("Email is not register yet!", 404);

        const match = await bcrypt.compare(password, user?.password);
        if (!match) throw new AppError("Wrong credentials", 401);

        const { _id, name, role } = user;

        const token = JWT.sign(
            { id: _id, name, role, email },
            process.env.JWT_SECRET || "JWT_SECRET",
            { expiresIn: "7d" }
        );

        return {
            authToken: token,
            user: { name, email, role }
        }
    },
}