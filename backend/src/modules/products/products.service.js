import { productsRepo } from "./products.repo.js"

export const productsService = {
    createProduct: async (productData) => {
        const newProduct = await productsRepo
            .createProduct(productData);

        const { _id, createdAt, updatedAt, ...restData } = newProduct;

        return { id: _id, ...restData }
    },

    updateById: async (id, data) => {
        const updatedProducts = await productsRepo.updateById(id, data)
        // Fetch the full category object from the database using its _id
        const { _id, ...restData } = await productsRepo.findById(updatedProducts._id);

        // Rename _id to id for consistency in API responses and return the rest of the data
        return { id: _id, ...restData }
    },

    deleteById: async (id, data) => {
        await productsRepo.deleteById(id, data)
        return { id }
    },

    getProducts: async () => {
        const products = await productsRepo.getProducts();

        const structuredProducts = products
            .map(({ name,
                slug,
                image,
                _id,
                description,
                price,
                discountPrice,
                stock,
                images,
                isFeatured,
                category
            }) => ({
                id: _id,
                name,
                slug,
                image,
                description,
                price,
                discountPrice,
                stock,
                images,
                isFeatured,
                category
            }));

        return [...structuredProducts]
    },
}