import { Router } from 'express';
import { uploadController } from './asset.controller.js';
import { allowRole } from '../../common/middleware/allow-role.js';
import { validateResource } from '../../common/middleware/resource-validator.js';
import { FileUploadSchema } from './asset.dtos.js';

const routes = Router();

routes.post(
    "/sign-url",
    allowRole(["ADMIN"]),
    validateResource(FileUploadSchema),
    uploadController.signUrl
)

export default routes