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
    }
}