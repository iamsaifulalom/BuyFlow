import { z } from "zod";

export const FileUploadSchema = z.object({
  originalName: z.string().min(1),
  folderName: z.string().min(1),
  type: z.string().min(1),
  size: z.number().positive().optional(),
});
