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
        const cartDoc = await Cart.findById(cartId)
            .populate({
                path: "items.product",
                select: "name price discountPrice slug images",
                populate: {
                    path: "images",
                    select: "filePath originalName altText _id"
                }
            })
        if (!cartDoc) return null;

        return cartDoc.toObject()

    },
    deleteById: async (cartId) => {
        return await Cart.findByIdAndDelete(cartId)
    }
}