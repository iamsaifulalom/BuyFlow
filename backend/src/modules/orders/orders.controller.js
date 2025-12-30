import { sendResponse } from "../../common/utils/send-response.js"
import { orderService } from "./orders.service.js"

export const ordersController = {
    createAnOrder: async (req, res, next) => {
        try {
            const orderData = await orderService.createOrder(req.body)
            sendResponse({
                res,
                success: true,
                statusCode: 201,
                message: "Order placed succesfully.",
                data: orderData
            })
        } catch (error) {
            next(error)
        }
    }
}