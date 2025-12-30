import { Router } from 'express';
import { validateResource } from '../../common/middleware/resource-validator.js'
import { idParam } from '../../common/schema/schema.field.js';
import { checkAuth } from '../../common/middleware/check-auth.js';
import { allowRole } from '../../common/middleware/allow-role.js';
import { ordersController } from './orders.controller.js';
import { OrderSchema, OrderUpdateSchema } from './orders.dtos.js';

const routes = Router();

routes.post(
    "/",
    checkAuth(),
    validateResource(OrderSchema),
    ordersController.createAnOrder
)

routes.put(
    "/:id",
    checkAuth(),
    allowRole(["ADMIN"]),
    validateResource(idParam, "params"),
    validateResource(OrderUpdateSchema),
    ordersController.updateOrder
)

routes.delete(
    "/:id",
    checkAuth(),
    allowRole(["ADMIN"]),
    validateResource(idParam, "params"),
    ordersController.deleteOrder
)

routes.get(
    "/",
    checkAuth(),
    ordersController.getOrders
)

// routes.get(
//     "/",
//     checkAuth(),
// )

export default routes