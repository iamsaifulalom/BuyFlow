import { Schema, model } from "mongoose";

const OrderStatus = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

const AddressSchema = new Schema({
    name: String,
    phone: String,
    addressLine: String,
    city: String,
    postalCode: String,
    country: String
}, { _id: false });

// Snapshot of a product in an order
const OrderItemSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    discountPrice: { type: Number, default: 0 },
    quantity: { type: Number, required: true },
}, { _id: false })

const OrderSchema = new Schema({
    items: { type: [OrderItemSchema], required: true },
    status: { type: String, enum: OrderStatus, default: 'PENDING' },
    total: { type: Number, required: true },
    deliveryAddress: { type: AddressSchema, required: true },
    payment: { type: Schema.Types.ObjectId, ref: 'Payment' },
}, { timestamps: true , versionKey: false});

export const Order = model('Order', OrderSchema);
