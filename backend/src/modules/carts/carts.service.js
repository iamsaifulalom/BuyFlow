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
}