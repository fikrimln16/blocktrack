export interface VisitListItem {
  id: number;

  visit_code: string;

  visit_date: string;
  visit_time: string;

  inspector: string;

  ama: string;
  estate: string;

  block_code: string;
  block_name: string;

  weather: string;

  duration: number;

  total_photos: number;
  total_attachments: number;

  status: string;
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
