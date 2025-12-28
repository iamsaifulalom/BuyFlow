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

// routes.put(
//     "/:id",
//     checkAuth(),
//     allowRole(["ADMIN"]),
//     validateResource(idParam, "params"),
// )

// routes.delete(
//     "/:id",
//     checkAuth(),
//     allowRole(["ADMIN"])
// )

// routes.get("/",)

export default routes