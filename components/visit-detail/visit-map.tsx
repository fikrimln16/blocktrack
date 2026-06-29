"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

import {
  GeoJSON,
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";

import buffer from "@turf/buffer";

import { CircleCheckBig, CircleX, TriangleAlert } from "lucide-react";

import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { point } from "@turf/helpers";

import { FitPolygon } from "./fit-polygon";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface GeoJsonGeometry {
  type: "Polygon" | "MultiPolygon";
  coordinates: any;
}

interface Props {
  latitude: number;
  longitude: number;
  polygon: GeoJsonGeometry | null;
}

export function VisitMap({ latitude, longitude, polygon }: Props) {
  const visitPoint = point([longitude, latitude]);

  const inside =
    polygon != null ? booleanPointInPolygon(visitPoint, polygon as any) : false;

  // Buffer 20 meter di sekitar polygon
  const bufferedPolygon =
    polygon != null
      ? buffer(polygon as any, 20, {
          units: "meters",
        })
      : null;

  const near =
    !inside && bufferedPolygon
      ? booleanPointInPolygon(visitPoint, bufferedPolygon as any)
      : false;

  const status = inside
    ? {
        label: "Inside Block",
        className: "bg-emerald-100 text-emerald-700",
        Icon: CircleCheckBig,
      }
    : near
      ? {
          label: "Near Block",
          className: "bg-amber-100 text-amber-700",
          Icon: TriangleAlert,
        }
      : {
          label: "Outside Block",
          className: "bg-red-100 text-red-700",
          Icon: CircleX,
        };

  const StatusIcon = status.Icon;

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 p-6">
        <div>
          <h2 className="text-xl font-semibold">Block Location</h2>

          <p className="mt-1 text-sm text-slate-500">
            Visit position compared with block boundary.
          </p>
        </div>

        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${status.className}`}
        >
          <StatusIcon size={16} />

          {status.label}
        </span>
      </div>

      <div className="h-[600px]">
        <MapContainer
          center={[latitude, longitude]}
          zoom={18}
          className="h-full w-full"
        >
          <FitPolygon polygon={polygon} />

          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="Satellite">
              <TileLayer
                attribution="Esri"
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              />
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer name="Street">
              <TileLayer
                attribution="OpenStreetMap"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>
          </LayersControl>

          {/* Polygon Block */}
          {polygon && (
            <GeoJSON
              data={polygon as any}
              style={{
                color: "#16a34a",
                weight: 3,
                fillColor: "#22c55e",
                fillOpacity: 0.25,
              }}
            />
          )}

          {/* Visit Marker */}
          <Marker position={[latitude, longitude]}>
            <Popup>
              <div className="space-y-1">
                <p className="font-semibold">Visit Location</p>

                <p className="text-xs">Lat: {latitude}</p>

                <p className="text-xs">Lng: {longitude}</p>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}
