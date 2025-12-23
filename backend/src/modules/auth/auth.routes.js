import { Router } from 'express';
import { authController } from './auth.controller.js';
import { validateResource } from '../../common/midleware/resource-validator.js';
import { signInSchema, signUpSchema } from './auth.schema.js';


const routes = Router();

routes.get("/me", authController.userDetails)
routes.post("/sign-up", validateResource(signUpSchema), authController.signUp)
routes.post("/sign-in", validateResource(signInSchema), authController.signIn)

export default routes