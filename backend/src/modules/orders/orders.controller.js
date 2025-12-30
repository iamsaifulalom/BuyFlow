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
    },

    updateOrder: async (req, res, next) => {
        try {
            const orderId = req.params.id;
            const body = req.body;

            const updatedOrder = await orderService.updateOrder({
                orderId,
                orderStatus: body.status
            });

            sendResponse({
                res,
                success: true,
                statusCode: 200,
                message: "Order updated succesfully.",
                data: updatedOrder
            })
        } catch (error) {
            next(error)
        }
    },

    deleteOrder: async (req, res, next) => {
        try {
            const orderData = await orderService
                .deleteOrder(req.params.id)
            sendResponse({
                res,
                success: true,
                statusCode: 200,
                message: "Order deleted succesfully.",
                data: orderData
            })
        } catch (error) {
            next(error)
        }
    },

    getOrders: async (req, res, next) => {
        try {
            const orderData = await orderService
                .getOrders()
            sendResponse({
                res,
                success: true,
                statusCode: 200,
                message: "Order list.",
                data: orderData
            })
        } catch (error) {
            next(error)
        }
    },
}