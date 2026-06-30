export interface MultiPolygon {
  type: "MultiPolygon";
  coordinates: number[][][][]; // lng, lat
}

export interface Polygon {
  type: "Polygon";
  coordinates: number[][][];
}

export type BlockGeometry = Polygon | MultiPolygon;
