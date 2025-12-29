import { sendResponse } from "../../common/utils/send-response.js"
import { cartsService } from "./carts.service.js"

export const cartsController = {
    addItem: async (req, res, next) => {
        try {
            const cartItem = await cartsService.addItem({
                userId: req.user.id,
                cartItem: req.body
            });

            sendResponse({
                res,
                success: true,
                statusCode: 201,
                message: "Item added to your cart.",
                data: cartItem
            })
        } catch (error) {
            next(error)
        }
    },

    updateCart: async (req, res, next) => {
        try {
            const userId = req.user.id;
            const updatedCart = await cartsService
                .updateCartById({
                    userId,
                    cartBody: req.body
                })

            sendResponse({
                res,
                message: "Cart updated succefully",
                success: true,
                statusCode: 200,
                data: updatedCart
            })
        } catch (error) {
            next(error)
        }
    },

    deleteCart: async (req, res, next) => {
        try {
            const cartId = req.params.id;
            await cartsService
                .deleteCart(cartId)

            sendResponse({
                res,
                message: "Cart Deleted succefully",
                success: true,
                statusCode: 200,
            })
        } catch (error) {
            next(error)
        }
    },

    getCart: async (req, res, next) => {
        try {
            const userId = req.user.id;
            const cart = await cartsService
                .getCarByUserId(userId)

            sendResponse({
                res,
                message: "Cart retrive succefully",
                success: true,
                statusCode: 200,
                data: cart
            })
        } catch (error) {
            next(error)
        }
    },
}