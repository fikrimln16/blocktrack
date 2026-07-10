export interface VisitFormValues {
  user_id: number;
  visit_date: string;
  visit_time: string;
  weather: string;
  duration: number;

  latitude?: number;
  longitude?: number;
  accuracy?: number;

  plant_population?: number;
  plant_infill?: number;
  termite?: number;
  orcytes?: number;
  pest?: number;
  leaf_caterpillar?: number;
  beneficial_weed?: number;

  circle_condition?: number;
  harvesting_path?: number;
  interrow?: number;
  tph_condition?: number;
  sanitation?: number;
  cover_crop?: number;

  road_condition?: number;
  bridge_condition?: number;
  footbridge_condition?: number;

  drainage_condition?: number;
  ditch_condition?: number;
  monitoring_well?: number;

  fertilizing?: number;

  notes: string;
}
