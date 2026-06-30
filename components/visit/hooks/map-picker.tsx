"use client";

import { useEffect } from "react";

import L, { LatLngExpression } from "leaflet";

import {
  MapContainer,
  Marker,
  Polygon,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import { BlockGeometry } from "@/types/map";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface Props {
  latitude?: number;
  longitude?: number;

  blockGeometry: BlockGeometry;

  onSelect: (lat: number, lng: number) => void;
}

function getPolygon(geometry: BlockGeometry): LatLngExpression[] {
  if (geometry.type === "Polygon") {
    return geometry.coordinates[0].map(
      ([lng, lat]) => [lat, lng] as LatLngExpression,
    );
  }

  return geometry.coordinates[0][0].map(
    ([lng, lat]) => [lat, lng] as LatLngExpression,
  );
}

function FitBounds({ polygon }: { polygon: LatLngExpression[] }) {
  const map = useMap();

  useEffect(() => {
    const bounds = L.latLngBounds(polygon as L.LatLngTuple[]);

    map.fitBounds(bounds, {
      padding: [40, 40],
    });
  }, [map, polygon]);

  return null;
}

function ClickHandler({
  latitude,
  longitude,
  onSelect,
}: {
  latitude?: number;
  longitude?: number;
  onSelect: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      onSelect(e.latlng.lat, e.latlng.lng);
    },
  });

  if (latitude === undefined || longitude === undefined) {
    return null;
  }

  return <Marker position={[latitude, longitude]} />;
}

export function MapPicker({
  latitude,
  longitude,
  blockGeometry,
  onSelect,
}: Props) {
  const polygon = getPolygon(blockGeometry);

  return (
    <MapContainer
      center={polygon[0]}
      zoom={18}
      zoomControl
      scrollWheelZoom
      style={{
        width: "100%",
        height: "500px",
      }}
      className="rounded-2xl"
    >
      <TileLayer
        attribution="Esri"
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      />

      <FitBounds polygon={polygon} />

      <Polygon
        positions={polygon}
        pathOptions={{
          color: "#2563eb",
          weight: 2,
          fillColor: "#3b82f6",
          fillOpacity: 0.15,
        }}
      />

      <ClickHandler
        latitude={latitude}
        longitude={longitude}
        onSelect={onSelect}
      />
    </MapContainer>
  );
}
