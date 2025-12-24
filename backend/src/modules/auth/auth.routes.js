import { Router } from 'express';
import { authController } from './auth.controller.js';
import { validateResource } from '../../common/middleware/resource-validator.js';
import { signInSchema, signUpSchema } from './auth.dtos.js';


const routes = Router();

/**
 * @openapi
 * /auth/sign-in:
 *   post:
 *     tags: [Auth]
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: OK
 */

routes.get("/me", authController.userDetails)
routes.post("/sign-up", validateResource(signUpSchema), authController.signUp)
routes.post("/sign-in", validateResource(signInSchema), authController.signIn)

export default routes