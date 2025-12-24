import { model, Schema } from 'mongoose';

const CategorySchema = new Schema({
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    image: { type: Schema.Types.ObjectId, ref: "Asset" },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
}, { timestamps: true, versionKey: false });

export const Category = model('Category', CategorySchema);
