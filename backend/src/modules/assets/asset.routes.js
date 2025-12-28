import { Router } from 'express';
import { uploadController } from './asset.controller.js';
import { allowRole } from '../../common/middleware/allow-role.js';
import { validateResource } from '../../common/middleware/resource-validator.js';
import { FileUploadSchema } from './asset.dtos.js';
import { checkAuth } from '../../common/middleware/check-auth.js';

const routes = Router();

routes.post(
    "/sign-url",
    checkAuth(),
    allowRole(["ADMIN"]),
    validateResource(FileUploadSchema),
    uploadController.signUrl
)

export default routes