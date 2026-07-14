export interface Attachment {
  id: number;

  ama_id: number;
  estate_id: number;

  ama: string;
  estate: string;

  title: string;
  description: string | null;

  file_name: string;
  file_url: string;

  mime_type: string;
  extension: string;
  file_size: number;

  uploaded_by: number;
  uploader: string;

  total_visits: number;

  created_at: string;
  updated_at: string;
}

export interface AttachmentListResponse {
  data: Attachment[];

  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AttachmentListQuery {
  page?: number;
  limit?: number;

  search?: string;

  ama?: number;
  estate?: number;

  extension?: string;

  uploadedBy?: number;
}

export interface CreateAttachmentPayload {
  ama_id: number;
  estate_id: number;

  title: string;
  description?: string;

  file_name: string;
  file_url: string;

  mime_type: string;
  extension: string;
  file_size: number;

  uploaded_by: number;

  visit_ids: number[];
}
