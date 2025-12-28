import { Schema, model } from "mongoose";

const cartItemSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, default: 1, min: 1 }
});

const cartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    items: [cartItemSchema],
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true , versionKey: false});

export const Cart = model("Cart", cartSchema);
