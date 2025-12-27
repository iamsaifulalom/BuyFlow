import { productsRepo } from "./products.repo.js"

export const productsService = {
    createProduct: async (productData) => {
        const newProduct = await productsRepo
            .createProduct(productData);

        const { _id, createdAt, updatedAt, ...restData } = newProduct;

        return { id: _id, ...restData }
    }
}