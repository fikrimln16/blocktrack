"use client";

import { useEffect } from "react";
import { GeoJSON, MapContainer, Popup, TileLayer, useMap } from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

import type { Feature, MultiPolygon } from "geojson";

import { Block } from "@/types/block";

interface Props {
  blocks: Block[];
  selectedBlock: Block | null;
  onSelect: (block: Block) => void;
}

function FitBounds({ selectedBlock }: { selectedBlock: Block | null }) {
  const map = useMap();

  useEffect(() => {
    if (!selectedBlock) return;

    const feature: Feature<MultiPolygon> = {
      type: "Feature",
      properties: {},
      geometry: selectedBlock.geometry,
    };

    const layer = L.geoJSON(feature);

    map.fitBounds(layer.getBounds(), {
      padding: [40, 40],
    });
  }, [selectedBlock, map]);

  return null;
}

export function BlockLeafletMap({ blocks, selectedBlock, onSelect }: Props) {
  return (
    <MapContainer
      center={[-2.24, 111.61]}
      zoom={14}
      scrollWheelZoom
      className="h-full w-full"
    >
      <FitBounds selectedBlock={selectedBlock} />

      <TileLayer
        attribution="Google Satellite"
        url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
      />

      {blocks.map((block) => {
        const feature: Feature<MultiPolygon> = {
          type: "Feature",
          properties: {},
          geometry: block.geometry,
        };

        return (
          <GeoJSON
            key={block.id}
            data={feature}
            eventHandlers={{
              click: () => {
                onSelect(block);
              },
            }}
            style={{
              color: selectedBlock?.id === block.id ? "#2563EB" : "#16A34A",

              weight: selectedBlock?.id === block.id ? 4 : 2,

              fillColor: selectedBlock?.id === block.id ? "#3B82F6" : "#22C55E",

              fillOpacity: selectedBlock?.id === block.id ? 0.35 : 0.15,
            }}
          >
            <Popup>
              <div className="min-w-[220px] space-y-2">
                <h3 className="text-lg font-bold">{block.block_code}</h3>

                <div className="space-y-1 text-sm text-slate-600">
                  <p>
                    <b>AMA:</b> {block.ama}
                  </p>

                  <p>
                    <b>Estate:</b> {block.estate}
                  </p>

                  <p>
                    <b>Division:</b> {block.division}
                  </p>

                  <p>
                    <b>Status:</b> {block.status}
                  </p>

                  <p>
                    <b>Area:</b> {block.area_ha} Ha
                  </p>

                  <p>
                    <b>Visit:</b> {block.total_visit}
                  </p>
                </div>
              </div>
            </Popup>
          </GeoJSON>
        );
      })}
    </MapContainer>
  );
}
