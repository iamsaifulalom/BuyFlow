import { Cart } from "./carts.model.js"

export const cartsRepo = {
    createCart: (payload) => {
        return Cart.create(payload)
    },

    findByUserId: (userId) => {
        return Cart.findOne({ user: userId })
    },

    save: (cart) => {
        return cart.save()
    },

    getCarBytId: async (cartId) => {
        return Cart.findById(cartId)
            .populate({
                path: "items.product",
                select: "name price discountPrice slug images",
                populate: {
                    path: "images"
                }
            })
    }
}