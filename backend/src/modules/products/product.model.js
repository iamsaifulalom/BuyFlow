import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String },
    price: { type: Number , default: 0},
    discountPrice: { type: Number , default: 0},
    stock: { type: Number, required: true },
    images: [{ type: Schema.Types.ObjectId, ref: "Asset" }],
    isFeatured: { type: Boolean, default: false },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
}, { timestamps: true , versionKey: false});

export const Product = model('Product', ProductSchema);