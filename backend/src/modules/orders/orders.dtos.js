import { extendedZod as z } from "../../common/docs/extend-zod.js";
import { mongooseId } from "../../common/schema/schema.field.js";
import { PaymentMethod } from "../payments/payment.model.js";
import { OrderStatus } from "./orders.model.js";

const addressSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Email is required"),
    addressLine: z.string().min(5, "Address line is required"),
    city: z.string().min(2, "City is required"),
    postalCode: z.string().min(2, "Postal code is required"),
    country: z.string().length(2, "Country must be ISO-2 code (e.g. BD)")
})

export const OrderSchema = z.object({
    cartId: mongooseId,
    address: addressSchema,
    paymentMethod: z.enum(PaymentMethod),
    saveAddress: z.boolean().optional().default(false)
});

export const OrderUpdateSchema = z.object({
    status: z.enum(OrderStatus)
})