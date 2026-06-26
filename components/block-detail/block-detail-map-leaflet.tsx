"use client";

import { useEffect } from "react";

import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Popup,
  LayersControl,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import L from "leaflet";

import type { Feature, Geometry } from "geojson";

import { Block } from "@/types/block";

interface Props {
  block: Block;
  mapRef: React.MutableRefObject<L.Map | null>;
}

function MapInstance({
  mapRef,
}: {
  mapRef: React.MutableRefObject<L.Map | null>;
}) {
  const map = useMap();

  useEffect(() => {
    mapRef.current = map;
  }, [map, mapRef]);

  return null;
}

function FitBounds({ feature }: { feature: Feature<Geometry> }) {
  const map = useMap();

  useEffect(() => {
    const layer = L.geoJSON(feature);

    map.fitBounds(layer.getBounds(), {
      padding: [40, 40],
      animate: true,
      maxZoom: 18,
    });
  }, [feature, map]);

  return null;
}

export function BlockDetailLeaflet({ block, mapRef }: Props) {
  const feature: Feature<Geometry> = {
    type: "Feature",
    geometry: block.geometry as Geometry,
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
      {/* Simpan instance map ke parent */}
      <MapInstance mapRef={mapRef} />

      {/* Auto Zoom */}
      <FitBounds feature={feature} />

      {/* Basemap */}
      <LayersControl position="topleft">
        <LayersControl.BaseLayer checked name="Satellite">
          <TileLayer
            attribution="Google Satellite"
            url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="Street">
          <TileLayer
            attribution="© OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="Hybrid">
          <TileLayer
            attribution="Google Hybrid"
            url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
          />
        </LayersControl.BaseLayer>
      </LayersControl>

      {/* Polygon */}
      <GeoJSON
        data={feature}
        style={{
          color: "#2563EB",
          weight: 4,
          fillColor: "#3B82F6",
          fillOpacity: 0.35,
        }}
      >
        <Popup>
          <div className="space-y-2">
            <h3 className="font-semibold">{block.block_code}</h3>

            <p>
              <strong>Estate:</strong> {block.estate}
            </p>

            <p>
              <strong>Area:</strong> {Number(block.area_ha).toFixed(2)} Ha
            </p>
          </div>
        </Popup>
      </GeoJSON>
    </MapContainer>
  );
}
