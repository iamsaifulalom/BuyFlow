import bcrypt from 'bcrypt';
import { authRepo } from "./auth.repo.js";
import { User } from '../users/user.model.js';
import { AppError } from '../../common/utils/app-error.js';

export const authService = {

    createUser: async (body) => {
        const hashedPassword = await bcrypt.hash(body.password, 10);

        const user = await User.findOne({ email: body.email });
        if (user) throw new AppError("Email is alredy registerd!", 400)

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
    }
}