import { Router } from 'express';
import { productsController } from './products.controller.js';
import { validateResource } from '../../common/middleware/resource-validator.js';
import { productValidator } from './products.dtos.js';
import { allowRole } from '../../common/middleware/allow-role.js';

const routes = Router();

routes.post(
    "/",
    allowRole(["ADMIN"]),
    validateResource(productValidator),
    productsController.createProduct
)

export default routes