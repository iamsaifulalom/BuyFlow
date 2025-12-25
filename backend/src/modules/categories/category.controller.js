import { categoryService } from "./category.service.js"

export const categoryController = {
    create: async (req, res, next) => {
        try {
            const newCategory = await categoryService.create(req.body)
            res.status(201).json({
                message: "Category created succesfully",
                success: true,
                data: newCategory
            })
        } catch (error) {
            next(error)
        }
    },

    update: async (req, res, next) => {
        try {
            const categoryId = req.params.id;
            const body = req.body;
            const updatedCategory = await categoryService.updateById(categoryId, body);

            res.status(200).json({
                message: "Category updated succesfully",
                success: true,
                data: updatedCategory
            })
        } catch (error) {
            next(error)
        }
    },

    delete: async (req, res, next) => {
        try {
            const categoryId = req.params.id;
            const deleteCategory = await categoryService.deleteById(categoryId);

            res.status(200).json({
                message: "Category Deleted succesfully",
                success: true,
                data: deleteCategory
            })
        } catch (error) {
            next(error)
        }
    },
    getCategories: async (_, res, next) => {
        try {
            const categories = await categoryService.getCategories();

            res.status(200).json({
                message: "Category list.",
                success: true,
                data: categories
            })
        } catch (error) {
            next(error)
        }
    },
}