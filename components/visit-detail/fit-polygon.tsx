"use client";

import { useEffect } from "react";

import L from "leaflet";
import { useMap } from "react-leaflet";

interface Props {
  polygon: any;
}

export function FitPolygon({ polygon }: Props) {
  const map = useMap();

  useEffect(() => {
    if (!polygon) return;

    const layer = L.geoJSON(polygon);

    const bounds = layer.getBounds();

    if (bounds.isValid()) {
      map.fitBounds(bounds, {
        padding: [40, 40],
      });
    }
  }, [polygon, map]);

  return null;
}
