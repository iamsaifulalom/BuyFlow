import { AppError } from "../../common/utils/app-error.js";
import { Category } from "./category.model.js";

export const categoryRepo = {
    createCategory: async (body) => {
        const newCategory = new Category(body);
        const category = await newCategory.save();
        return category.toObject()
    },

    findById: async (id) => {
        const category = await Category.findById(id)
            .populate("image", "url id")
            .select("-createdAt -updatedAt -products");

        if (!category) throw new AppError("Category does not exist.", 409);

        return category.toObject();
    },

    updateById: async (id, body) => {
        const updatedCat = await Category.findByIdAndUpdate(id, body, { new: true });
        if (!updatedCat) throw new AppError("Category does not exist.", 409);
        return updatedCat.toObject()
    },

    deleteById: async (id) => {
        const category = await Category.findByIdAndDelete(id);
        if (!category) throw new AppError("Category does not exist.", 409);
    },
    
    getCategories: async () => {
        const categories = await Category
        .find()
        .populate("image");
        if (!categories) throw new AppError("Category does not exist.", 409);
        return categories
    },
}