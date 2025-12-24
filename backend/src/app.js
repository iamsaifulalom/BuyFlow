import express from 'express';
import authRoutes from './modules/auth/auth.routes.js';
import assetsRoutes from './modules/assets/asset.routes.js';
import { errorHandler } from './common/middleware/error-handler.js';
import { connectDB } from './common/utils/connect-db.js';

const app = express();

(await connectDB());

// midleware
app.use(express.json());

// routes
app.use("/auth", authRoutes)
app.use("/assets", assetsRoutes)


app.use(errorHandler)

export default app