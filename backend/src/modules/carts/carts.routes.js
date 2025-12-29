import { Router } from 'express';
import { validateResource } from '../../common/middleware/resource-validator.js'
import { idParam } from '../../common/schema/schema.field.js';
import { checkAuth } from '../../common/middleware/check-auth.js';
import { cartsController } from './carts.controller.js';
import { cartItemSchema } from './carts.dtos.js';

const routes = Router();

routes.post(
    "/",
    checkAuth(),
    validateResource(cartItemSchema),
    cartsController.addItem,
)

routes.put(
    "/",
    checkAuth(),
    validateResource(cartItemSchema),
    cartsController.updateCart
)

routes.delete(
    "/:id",
    checkAuth(),
    validateResource(idParam, "params"),
    cartsController.deleteCart
)

routes.get(
    "/",
    checkAuth(),
    cartsController.getCart
)

export default routes