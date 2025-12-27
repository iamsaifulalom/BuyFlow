import { Product } from "./product.model.js"


export const productsRepo = {
    createProduct: async (productData) => {
        const newProduct = new Product(productData)
        await newProduct.save();

        const product = await Product.findById(newProduct._id)
            .populate("images");

        return product.toObject();
    }
}