import { categoryRepo } from "./category.repo.js";

export const categoryService = {
    createCategory: async (req, res, next) => {
        try {
            const newCategory = await categoryRepo.createCategory(req.body);
            const { _id, ...restData } = await categoryRepo.findById(newCategory._id);
            
            res.status(201).json({
                message: "Category created succesfully",
                success: true,
                data: { id: _id, ...restData }
            })
        } catch (error) {
            next(error)
        }
    }
}