// src/common/docs/extend-zod.js

/**
 * @description Extend Zod with OpenAPI support (run once)
 */

import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export { z as extendedZod};
