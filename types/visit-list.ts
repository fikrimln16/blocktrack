export interface VisitListItem {
  id: number;

  visit_code: string;

  visit_date: string;
  visit_time: string;

  weather: string;
  duration: number;

  status: string;

  inspector: string;
  inspector_photo: string | null;
  inspector_role: string;

  ama: string;
  estate: string;

  block_code: string;
  block_name: string;

  total_photos: number;
  total_attachments: number;
}

export interface VisitListResponse {
  data: VisitListItem[];

  total: number;

  page: number;

  limit: number;

  totalPages: number;
}

export interface VisitListQuery {
  page?: number;
  limit?: number;

  search?: string;

  ama?: number;
  estate?: number;
  block?: number;

  inspector?: number;

  weather?: string;
  status?: string;

  startDate?: string;
  endDate?: string;

  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
}
