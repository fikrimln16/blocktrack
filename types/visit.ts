export interface VisitPhoto {
  id: number;
  photo_url: string;
}

export interface Visit {
  id: number;

  visit_code: string;

  visit_date: string;

  visit_time: string;

  duration: number;

  weather: string;

  notes: string;

  status: string;

  inspector: string;

  role?: string;

  inspector_photo?: string;

  total_photos: number;

  total_findings: number;

  photos?: VisitPhoto[];

  thumbnail?: string;
}
