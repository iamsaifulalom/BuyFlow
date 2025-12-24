import express from 'express';
import { errorHandler } from './common/middleware/error-handler.js';
import { connectDB } from './common/utils/connect-db.js';
import authRoutes from './modules/auth/auth.routes.js';
import assetsRoutes from './modules/assets/asset.routes.js';
import categoriesRoutes from './modules/categories/category.routes.js';
import { notFoundHandler } from './common/middleware/not-found.js';

const app = express();

(await connectDB());

// Remove X-Powered-By header
app.disable("x-powered-by");

// midleware
app.use(express.json());

// routes
app.use("/auth", authRoutes)
app.use("/assets", assetsRoutes)
app.use("/categories", categoriesRoutes)


app.use(errorHandler)
app.use(notFoundHandler)

export default app