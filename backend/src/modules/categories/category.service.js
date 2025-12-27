import { categoryRepo } from "./category.repo.js";

export const categoryService = {
    create: async (body) => {
        const newCategory = await categoryRepo.createCategory(body);

        // Fetch the full category object from the database using its _id
        const { _id, ...restData } = await categoryRepo.findById(newCategory._id);

        // Rename _id to id for consistency in API responses and return the rest of the data
        return { id: _id, ...restData }
    },

    updateById: async (id, data) => {
        const updatedCategory = await categoryRepo.updateById(id, data)
        // Fetch the full category object from the database using its _id
        const { _id, ...restData } = await categoryRepo.findById(updatedCategory._id);

        // Rename _id to id for consistency in API responses and return the rest of the data
        return { id: _id, ...restData }
    },

    deleteById: async (id, data) => {
        await categoryRepo.deleteById(id, data)
        return { id }
    },

    getCategories: async () => {
        const categories = await categoryRepo.getCategories();

        const structuredCategories = categories
            .map(({ name, slug, image, _id }) => ({
                name, slug, image, id: _id
            }));

        return [...structuredCategories]
    },
}