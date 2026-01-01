import { Router } from 'express';
import { authController } from './auth.controller.js';
import { validateResource } from '../../common/middleware/resource-validator.js';
import { signInSchema, signUpSchema } from './auth.dtos.js';
import { checkAuth } from '../../common/middleware/check-auth.js';


const routes = Router();

routes.get("/me", checkAuth(),authController.userDetails)
routes.post("/sign-up", validateResource(signUpSchema), authController.signUp)
routes.post("/sign-in", validateResource(signInSchema), authController.signIn)

export default routes