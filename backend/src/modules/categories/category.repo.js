import { Category } from "./category.model.js";

export const categoryRepo = {
    createCategory: async (body) => {
        const newCategory = new Category(body);
        const category = await newCategory.save();
        return category.toObject()
    },

    findById: async (id) => {
        const category = await Category.findById(id)
            .populate("image" ,"url id")
            .select("-createdAt -updatedAt -products");
        return category.toObject();
    },
}