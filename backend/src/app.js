import express from 'express';
import authRoutes from './modules/auth/auth.routes.js';
import { errorHandler } from './common/midleware/error-handler.js';
import { connectDB } from './common/utils/connect-db.js';

const app = express();

connectDB()
// midleware
app.use(express.json());

// routes
app.use("/auth" , authRoutes)
app.use(errorHandler)

export default app