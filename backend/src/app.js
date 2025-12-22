import express from 'express';
import authRoutes from './modules/auth/auth.routes.js';

const app = express()


// routes
app.use("/auth" , authRoutes)

export default app