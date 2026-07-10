"use client";

import { useEffect } from "react";

import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Popup,
  LayersControl,
  useMap,
  Marker,
  Polyline,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import L from "leaflet";

import type { Feature, Geometry } from "geojson";

import { Block } from "@/types/block";

interface Props {
  block: Block;
  mapRef: React.MutableRefObject<L.Map | null>;
}

/* ===========================================
 * Marker Icons
 * =========================================== */

const visitIcon = L.divIcon({
  html: `
    <div
      style="
        width:14px;
        height:14px;
        border-radius:50%;
        background:#ef4444;
        border:3px solid #fff;
        box-shadow:0 2px 8px rgba(0,0,0,.35);
      ">
    </div>
  `,
  className: "",
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

const latestVisitIcon = L.divIcon({
  html: `
    <div
      style="
        width:18px;
        height:18px;
        border-radius:50%;
        background:#22c55e;
        border:4px solid #fff;
        box-shadow:0 3px 10px rgba(0,0,0,.4);
      ">
    </div>
  `,
  className: "",
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

/* ===========================================
 * Save Map Instance
 * =========================================== */

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

/* ===========================================
 * Auto Fit Polygon
 * =========================================== */

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

function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}
/* ===========================================
 * Component
 * =========================================== */

export function BlockDetailLeaflet({ block, mapRef }: Props) {
  const feature: Feature<Geometry> = {
    type: "Feature",
    geometry: block.geometry as Geometry,
    properties: {},
  };

  const first = block.geometry.coordinates[0][0][0];

  const visits = block.visits ?? [];

  const latestVisitId = visits.length > 0 ? visits[visits.length - 1].id : null;

  const visitPath = visits.map(
    (visit) => [visit.latitude, visit.longitude] as [number, number],
  );

  return (
    <MapContainer
      center={[first[1], first[0]]}
      zoom={17}
      scrollWheelZoom
      className="h-full w-full"
    >
      <MapInstance mapRef={mapRef} />

      <FitBounds feature={feature} />

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

      {/* Block Polygon */}
      <GeoJSON
        data={feature}
        style={{
          color: "#2563EB",
          weight: 3,
          fillColor: "#3B82F6",
          fillOpacity: 0.25,
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

            <p>
              <strong>Total Visit:</strong> {visits.length}
            </p>
          </div>
        </Popup>
      </GeoJSON>

      {/* Visit Route */}
      {visitPath.length > 1 && (
        <Polyline
          positions={visitPath}
          pathOptions={{
            color: "#2563EB",
            weight: 3,
            opacity: 0.75,
            dashArray: "8 6",
          }}
        />
      )}

      {/* Visit Markers */}
      {visits.map((visit, index) => {
        const latest = visit.id === latestVisitId;

        return (
          <Marker
            key={visit.id}
            position={[visit.latitude, visit.longitude]}
            icon={latest ? latestVisitIcon : visitIcon}
          >
            <Popup maxWidth={330}>
              <div className="min-w-[290px]">
                {/* Header */}
                <div className="border-b pb-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Visit #{index + 1}</h3>

                    {latest && (
                      <span className="rounded-full bg-green-100 px-2 py-1 text-[10px] font-semibold text-green-700">
                        Latest
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-xs text-slate-500">
                    {formatDate(visit.visit_date)} • {visit.visit_time}
                  </p>
                </div>

                {/* Inspector */}
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Inspector</span>
                    <span className="font-medium">{visit.inspector}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">Weather</span>
                    <span>{visit.weather}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">Duration</span>
                    <span>{visit.duration} min</span>
                  </div>
                </div>

                {/* Overall */}
                <div className="mt-5 rounded-xl bg-blue-50 p-4 text-center">
                  <p className="text-xs uppercase text-slate-500">
                    Overall Score
                  </p>

                  <div className="mt-1 text-3xl font-bold text-blue-600">
                    {Math.round(visit.overall_score)}%
                  </div>
                </div>

                {/* Summary */}
                <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    🌴 Plant
                    <div className="font-semibold">
                      {Math.round(visit.plant_score)}%
                    </div>
                  </div>

                  <div>
                    🌱 Field
                    <div className="font-semibold">
                      {Math.round(visit.field_score)}%
                    </div>
                  </div>

                  <div>
                    🛣 Infrastructure
                    <div className="font-semibold">
                      {Math.round(visit.infrastructure_score)}%
                    </div>
                  </div>

                  <div>
                    🌧 Environment
                    <div className="font-semibold">
                      {Math.round(visit.environment_score)}%
                    </div>
                  </div>

                  <div>
                    👷 Management
                    <div className="font-semibold">
                      {Math.round(visit.management_score)}%
                    </div>
                  </div>
                </div>

                {/* Documentation */}
                <div className="mt-5 flex justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm">
                  <span>📷 {visit.total_photos} Photos</span>

                  <span>📎 {visit.total_attachments} Files</span>
                </div>

                {/* Notes */}
                {visit.notes && (
                  <div className="mt-4 rounded-xl border border-slate-200 p-3">
                    <p className="mb-1 text-xs font-semibold uppercase text-slate-500">
                      Notes
                    </p>

                    <p className="line-clamp-3 text-sm text-slate-700">
                      {visit.notes}
                    </p>
                  </div>
                )}

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    window.open(`/visits/${visit.id}`, "_blank");
                  }}
                  className="mt-5 w-full rounded-xl bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
                >
                  View Visit Detail
                </button>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
