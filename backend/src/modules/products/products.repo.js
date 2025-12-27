import { AppError } from "../../common/utils/app-error.js";
import { Product } from "./product.model.js"


export const productsRepo = {
    createProduct: async (productData) => {
        const newProduct = new Product(productData)
        await newProduct.save();

        const product = await Product
            .findById(newProduct._id)
            .populate("images")
            .populate("category");

        return product.toObject();
    },

    findById: async (id) => {
        const product = await Product
            .findById(id)
            .populate("images", "url id originalName altText filePath")
            .select("-createdAt -updatedAt");

        if (!product) throw new AppError("Product does not exist.", 404);

        return product.toObject();
    },

    updateById: async (id, body) => {
        const updatedProduct = await Product.findByIdAndUpdate(id, body, { new: true });
        if (!updatedProduct) throw new AppError("Product does not exist.", 404);
        return updatedProduct.toObject()
    },

    deleteById: async (id) => {
        const product = await Product.findByIdAndDelete(id);
        if (!product) throw new AppError("Product does not exist.", 404);
    },

    getProducts: async () => {
        const products = await Product
            .find()
            .populate("images", "originalName url altText filePath -_id")
            .populate("category");

        return products
    },
}