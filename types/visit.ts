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

  total_photos: number;

  total_findings: number;
}
