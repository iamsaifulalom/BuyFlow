import { productsService } from "./products.service.js"


export const productsController = {
    createProduct: async (req, res, next) => {
        try {
            const product = await productsService.createProduct(req.body);

            res.status(201).json({
                success: true,
                description: "Product created succesfully",
                data: product
            })

        } catch (error) {
            next(error)
        }
    },

    update: async (req, res, next) => {
        try {
            const productId = req.params.id;
            const body = req.body;
            const updatedCategory = await productsService.updateById(productId, body);

            res.status(200).json({
                message: "Product updated succesfully",
                success: true,
                data: updatedCategory
            })
        } catch (error) {
            next(error)
        }
    },

    delete: async (req, res, next) => {
        try {
            const productId = req.params.id;
            const deletedProduct = await productsService.deleteById(productId);

            res.status(200).json({
                message: "Product Deleted succesfully",
                success: true,
                data: deletedProduct
            })
        } catch (error) {
            next(error)
        }
    },

    getProducts: async (_, res, next) => {
        try {
            const products = await productsService.getProducts();

            res.status(200).json({
                message: "Products list.",
                success: true,
                data: products
            })
        } catch (error) {
            next(error)
        }
    },
}