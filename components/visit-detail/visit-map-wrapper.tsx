"use client";

import dynamic from "next/dynamic";

interface GeoJsonGeometry {
  type: "Polygon" | "MultiPolygon";
  coordinates: any;
}

const VisitMap = dynamic(
  () => import("./visit-map").then((mod) => mod.VisitMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[600px] items-center justify-center rounded-3xl border border-slate-200 bg-white shadow-sm">
        Loading satellite map...
      </div>
    ),
  },
);

interface Props {
  latitude: number;
  longitude: number;
  polygon: GeoJsonGeometry | null;
}

export function VisitMapWrapper({ latitude, longitude, polygon }: Props) {
  return (
    <VisitMap latitude={latitude} longitude={longitude} polygon={polygon} />
  );
}
