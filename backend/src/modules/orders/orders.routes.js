import { Router } from 'express';
import { validateResource } from '../../common/middleware/resource-validator.js'
import { idParam } from '../../common/schema/schema.field.js';
import { checkAuth } from '../../common/middleware/check-auth.js';
import { ordersController } from './orders.controller.js';
import { OrderSchema } from './orders.dtos.js';

const routes = Router();

routes.post(
    "/",
    checkAuth(),
    validateResource(OrderSchema),
    ordersController.createAnOrder
)

// routes.put(
//     "/",
//     checkAuth(),
//     validateResource(cartItemSchema),
// )

// routes.delete(
//     "/:id",
//     checkAuth(),
//     validateResource(idParam, "params"),
// )

// routes.get(
//     "/",
//     checkAuth(),
// )

export default routes