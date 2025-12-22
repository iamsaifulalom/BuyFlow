import { Router } from 'express';
import { authControllers } from './auth.controllers.js';


const routes = Router();

routes.get("/me" , authControllers.userDetails)

export default routes