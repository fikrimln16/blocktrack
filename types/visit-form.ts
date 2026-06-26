export interface VisitFormValues {
  visit_date: string;
  visit_time: string;
  weather: string;
  duration: number;

  latitude?: number;
  longitude?: number;
  accuracy?: number;

  notes: string;
}
