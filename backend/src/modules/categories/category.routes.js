import { Router } from 'express';
import { validateResource } from '../../common/middleware/resource-validator.js'
import { allowRole } from '../../common/middleware/allow-role.js'
import { createCategorySchema } from './category.dtos.js';
import { categoryService } from './category.service.js';

const routes = Router();

routes.post(
    "/",
    allowRole(["ADMIN"]),
    validateResource(createCategorySchema),
    categoryService.createCategory
)

export default routes