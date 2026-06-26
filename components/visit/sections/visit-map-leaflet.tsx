"use client";

import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Marker,
  Popup,
  LayersControl,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import L from "leaflet";

import { Feature } from "geojson";

import { Block } from "@/types/block";

interface Props {
  block: Block;

  latitude?: number;

  longitude?: number;
}

const gpsIcon = L.divIcon({
  html: `
    <div
      style="
        width:18px;
        height:18px;
        background:#2563EB;
        border:3px solid white;
        border-radius:999px;
        box-shadow:0 0 10px rgba(37,99,235,.45);
      "
    ></div>
  `,
  className: "",
  iconSize: [18, 18],
});

export function VisitMapLeaflet({ block, latitude, longitude }: Props) {
  const feature: Feature = {
    type: "Feature",
    geometry: block.geometry,
    properties: {},
  };

  const first = block.geometry.coordinates[0][0][0];

  return (
    <MapContainer
      center={[first[1], first[0]]}
      zoom={17}
      scrollWheelZoom
      className="h-full w-full"
    >
      <LayersControl position="topleft">
        <LayersControl.BaseLayer checked name="Satellite">
          <TileLayer
            attribution="Google"
            url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="Street">
          <TileLayer
            attribution="OSM"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
      </LayersControl>

      <GeoJSON
        data={feature}
        style={{
          color: "#16A34A",
          weight: 3,
          fillColor: "#22C55E",
          fillOpacity: 0.18,
        }}
      />

      {latitude && longitude && (
        <Marker position={[latitude, longitude]} icon={gpsIcon}>
          <Popup>
            <div className="space-y-1">
              <strong>Your Position</strong>

              <div>{latitude}</div>

              <div>{longitude}</div>
            </div>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
