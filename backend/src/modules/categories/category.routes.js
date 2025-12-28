import { Router } from 'express';
import { validateResource } from '../../common/middleware/resource-validator.js'
import { allowRole } from '../../common/middleware/allow-role.js'
import { createCategorySchema, updateCategorySchema } from './category.dtos.js';
import { categoryController } from './category.controller.js';
import { idParam } from '../../common/schema/schema.field.js';
import { checkAuth } from '../../common/middleware/check-auth.js';

const routes = Router();

routes.post(
    "/",
    checkAuth(),
    allowRole(["ADMIN"]),
    validateResource(createCategorySchema),
    categoryController.create
)

routes.put(
    "/:id",
    checkAuth(),
    allowRole(["ADMIN"]),
    validateResource(idParam, "params"),
    validateResource(updateCategorySchema),
    categoryController.update
)

routes.delete(
    "/:id",
    checkAuth(),
    allowRole(["ADMIN"]),
    validateResource(idParam, "params"),
    categoryController.delete
)

routes.get("/", categoryController.getCategories)

export default routes