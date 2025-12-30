import { model, Schema } from "mongoose";

const PaymentStatus = ['PENDING', 'PAID', 'FAILED', 'REFUNDED'];
export const PaymentMethod = ['CASH_ON_DELIVERY', 'PAYPAL', 'STRIPE'];

const PaymentSchema = new Schema({
    order: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    method: { type: String, enum: PaymentMethod, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: PaymentStatus, default: 'PENDING' },
    transactionId: String
}, { timestamps: true , versionKey: false});

export const Payment = model("Payment", PaymentSchema)
