import { z } from "zod";

export const createAttachmentSchema = z.object({
  ama_id: z.number(),

  estate_id: z.number(),

  title: z.string().min(1),

  description: z.string().optional().default(""),

  file_name: z.string(),

  file_url: z.string(),

  mime_type: z.string(),

  extension: z.string(),

  file_size: z.number(),

  uploaded_by: z.number(),

  visit_ids: z.array(z.number()).min(1),
});

export type CreateAttachmentRequest = z.infer<typeof createAttachmentSchema>;

export interface AttachmentListQuery {
  page?: number;
  limit?: number;

  search?: string;

  ama?: number;

  estate?: number;

  extension?: string;

  uploadedBy?: number;
}
