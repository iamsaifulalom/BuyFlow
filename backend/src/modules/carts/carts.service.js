import { AppError } from "../../common/utils/app-error.js";
import { cartsRepo } from "./carts.repo.js";

export const cartsService = {
    addItem: async ({ userId, cartItem }) => {

        let cart = await cartsRepo.findByUserId(userId)

        // Create cart if not exists
        if (!cart) {
            return cartsRepo.createCart({
                user: userId,
                items: [cartItem]
            })
        }

        const existingItem = cart.items.find(
            item => item.product.toString() === cartItem.product
        )

        if (existingItem) {
            existingItem.quantity += cartItem.quantity
        } else {
            cart.items.push(cartItem)
        }

        const newCart = await cartsRepo.save(cart);
        return await cartsRepo.getCarBytId(newCart._id);
    },

    updateCartById: async ({ userId, cartBody }) => {
        const cart = await cartsRepo.findByUserId(userId);

        // Find the item in the cart
        const existingItem = cart.items.find(
            item => item.product._id.toString() === cartBody.product
        );

        if (!existingItem) throw new AppError("Cart item doesn't exist", 404);

        // Update quantity
        if (cartBody.quantity <= 0) {
            // Remove item if quantity is 0 or less
            cart.items = cart.items.filter(
                item => item.product.toString() !== cartBody.product
            );
        } else {
            existingItem.quantity = cartBody.quantity; // set new quantity
        }

        // Save the cart
        const newCart = await cartsRepo.save(cart);

        // Return updated cart with populated fields
        return await cartsRepo.getCarBytId(newCart._id);
    },

    deleteCart: async (cartId) => {
        return cartsRepo.deleteById(cartId)
    },

    getCarByUserId: async (userId) => {

        return cartsRepo.findByUserId(userId)
    }
}