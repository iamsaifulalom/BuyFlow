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
    }
}