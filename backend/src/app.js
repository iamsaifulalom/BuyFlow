// src/app.js
import express from 'express';

// error handling
import { errorHandler } from './common/middleware/error-handler.js';
import { notFoundHandler } from './common/middleware/not-found.js';

// swagger api documetaion
import './load-docs.js'
import swaggerUI from 'swagger-ui-express'
import { generateOpenApiSpec } from './common/docs/generate-openapi.js';

// database
import { connectDB } from './common/utils/connect-db.js';

// routes
import authRoutes from './modules/auth/auth.routes.js';
import assetsRoutes from './modules/assets/asset.routes.js';
import categoriesRoutes from './modules/categories/category.routes.js';
import productsRoutes from './modules/products/products.routes.js';

const app = express();

(await connectDB());

// Remove X-Powered-By header
app.disable("x-powered-by");

// midleware
app.use(express.json());

// routes
app.use("/auth", authRoutes);
app.use("/assets", assetsRoutes);
app.use("/categories", categoriesRoutes);
app.use("/products", productsRoutes);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(generateOpenApiSpec()));

// error handler 
app.use(errorHandler)
app.use(notFoundHandler)

export default app