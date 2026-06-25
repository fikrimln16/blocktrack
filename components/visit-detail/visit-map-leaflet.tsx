"use client";

import { GeoJSON, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

interface VisitLeafletMapProps {
  visit: any;
  block: any;
}

const markerIcon = new L.DivIcon({
  html: `
    <div
      style="
        width:18px;
        height:18px;
        background:#2563EB;
        border:4px solid #FFFFFF;
        border-radius:9999px;
        box-shadow:0 4px 12px rgba(37,99,235,.4);
      "
    ></div>
  `,
  className: "",
  iconSize: [18, 18],
});

export function VisitLeafletMap({ visit, block }: VisitLeafletMapProps) {
  const center: [number, number] = [
    visit.location.latitude,
    visit.location.longitude,
  ];

  return (
    <MapContainer
      center={center}
      zoom={17}
      scrollWheelZoom
      className="h-full w-full"
    >
      {/* Satellite */}

      <TileLayer
        attribution="Google Satellite"
        url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
      />

      {/* Polygon Block */}

      <GeoJSON
        data={block.polygon}
        style={() => ({
          color: "#16A34A",
          weight: 2,
          fillColor: "#22C55E",
          fillOpacity: 0.25,
        })}
        onEachFeature={(feature, layer) => {
          layer.bindTooltip(
            `
            <strong>${feature.properties.blockCode}</strong><br/>
            ${feature.properties.estate}<br/>
            ${feature.properties.ama}
            `,
            {
              sticky: true,
            },
          );
        }}
      />

      {/* Visit Marker */}

      <Marker position={center} icon={markerIcon}>
        <Popup>
          <div className="space-y-1">
            <strong>{visit.employee.name}</strong>

            <br />

            {visit.visitDate}

            <br />

            {block.blockCode}
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
