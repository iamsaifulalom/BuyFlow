import mongoose from "mongoose"
import { Order } from "./orders.model.js";
import { Cart } from "../carts/carts.model.js";
import { Payment } from "../payments/payment.model.js";
import { AppError } from "../../common/utils/app-error.js";

export const orderService = {

    createOrder: async ({ cartId, address, paymentMethod }) => {
        const session = await mongoose.startSession();

        try {
            session.startTransaction();

            const cart = await Cart.findById(cartId)
                .session(session)
                .populate({
                    path: "items.product",
                    select: "name price discountPrice images",
                    populate: {
                        path: "images",
                        select: "url filePath"
                    }
                });

            if (!cart) throw new AppError("Cart not found", 404);
            if (!cart.items.length) throw new AppError("Cart is empty", 400);

            const total = cart.items.reduce((acc, item) => {
                const { price, discountPrice } = item.product;
                const sellPrice =
                    discountPrice != null && discountPrice > 0
                        ? discountPrice
                        : price;

                return acc + sellPrice * item.quantity;
            }, 0);

            const orderItems = cart.items.toObject().map(({ product, quantity }) => {
                const { images, _id, ...rest } = product;
                return {
                    productId: _id.toString(),
                    quantity,
                    image: images?.[0]?.url || null,
                    ...rest
                };
            });

            const [order] = await Order.create([{
                deliveryAddress: address,
                total,
                items: orderItems
            }], { session });

            const [payment] = await Payment.create([{
                amount: total,
                method: paymentMethod,
                order: order._id,
                status: "PENDING"
            }], { session });

            order.payment = payment._id;
            await order.save({ session });

            await session.commitTransaction();
            return order;
        } catch (err) {
            await session.abortTransaction();
            throw err;
        } finally {
            session.endSession();
        }
    },

    
}