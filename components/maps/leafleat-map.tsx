"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  Tooltip,
} from "react-leaflet";

import L from "leaflet";

import {
  visitMarkers,
  amaPolygon,
  estatePolygon,
  blockPolygon,
} from "@/data/dashboard";

import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as any)._getIconUrl;

const completedIcon = new L.DivIcon({
  html: `
    <div class="visit-marker completed">
      <div class="pulse"></div>
    </div>
  `,
  className: "",
  iconSize: [22, 22],
});

const ongoingIcon = new L.DivIcon({
  html: `
    <div class="visit-marker ongoing">
      <div class="pulse"></div>
    </div>
  `,
  className: "",
  iconSize: [22, 22],
});

export function LeafletMap() {
  return (
    <MapContainer
      center={[-2.24, 111.612]}
      zoom={15}
      scrollWheelZoom
      className="h-full w-full"
    >
      {/* SATELLITE */}

      <TileLayer
        attribution="Google Satellite"
        url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
      />

      {/* AMA */}

      <Polygon
        positions={amaPolygon as any}
        pathOptions={{
          color: "#2563EB",
          weight: 3,
          fillOpacity: 0.05,
        }}
      >
        <Tooltip permanent>AMA-001</Tooltip>
      </Polygon>

      {/* ESTATE */}

      <Polygon
        positions={estatePolygon as any}
        pathOptions={{
          color: "#0EA5E9",
          weight: 2,
          fillOpacity: 0.08,
        }}
      >
        <Tooltip permanent>Estate Timur</Tooltip>
      </Polygon>

      {/* BLOCK */}

      <Polygon
        positions={blockPolygon as any}
        pathOptions={{
          color: "#22C55E",
          weight: 2,
          fillOpacity: 0.2,
        }}
      >
        <Tooltip permanent>Block B12</Tooltip>
      </Polygon>

      {/* VISITS */}

      {visitMarkers.map((visit) => (
        <Marker
          key={visit.id}
          position={[visit.lat, visit.lng]}
          icon={visit.status === "completed" ? completedIcon : ongoingIcon}
        >
          <Popup>
            <div className="min-w-[220px]">
              <h3 className="font-semibold text-slate-900">{visit.employee}</h3>

              <div className="mt-2 space-y-1 text-sm text-slate-500">
                <p>{visit.ama}</p>
                <p>{visit.estate}</p>
                <p>{visit.block}</p>
              </div>

              <button
                className="
                  mt-4
                  w-full
                  rounded-xl
                  bg-blue-600
                  py-2
                  text-sm
                  font-medium
                  text-white
                "
              >
                View Detail
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
