import { Router } from 'express';
import { productsController } from './products.controller.js';
import { validateResource } from '../../common/middleware/resource-validator.js';
import { productValidator } from './products.dtos.js';
import { allowRole } from '../../common/middleware/allow-role.js';
import { idParam } from '../../common/schema/schema.field.js';
import { checkAuth } from '../../common/middleware/check-auth.js';

const routes = Router();

routes.post(
    "/",
    checkAuth(),
    allowRole(["ADMIN"]),
    validateResource(productValidator),
    productsController.createProduct
)

routes.put(
    "/:id",
    checkAuth(),
    allowRole(["ADMIN"]),
    validateResource(idParam, "params"),
    validateResource(productValidator.partial()),
    productsController.update
)

routes.delete(
    "/:id",
    checkAuth(),
    allowRole(["ADMIN"]),
    validateResource(idParam, "params"),
    productsController.delete
)

routes.get("/", productsController.getProducts)
export default routes