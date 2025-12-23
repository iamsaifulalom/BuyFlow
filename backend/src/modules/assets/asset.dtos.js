import { z } from "zod";

export const FileUploadSchema = z.object({
  fileName: z.string().min(1),
  contentType: z.string().min(1),
  fileSize: z.number().positive().optional(),
});
