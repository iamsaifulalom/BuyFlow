import { User } from '../users/user.model.js';

export const authRepo = {

    createUser: async (userData) => {
        const user = new User(userData);
        const savedUser = await user.save();
        return savedUser.toObject();
    },

    findByEmail: async (email) => {
        return User.findOne({ email }).lean()
    },
}