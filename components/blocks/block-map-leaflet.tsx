"use client";

import { useEffect, useMemo, useRef } from "react";

import { GeoJSON, MapContainer, Popup, TileLayer, useMap } from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

import { Feature, MultiPolygon } from "geojson";

import { Block } from "@/types/block";

import { BlockPopup } from "./block-popup";

import { BlockLabel } from "./block-label";

interface Props {
  blocks: Block[];
  selectedBlock: Block | null;
  onSelect: (block: Block) => void;
}

function FitSelectedBlock({
  selectedBlock,
  geoJsonRefs,
}: {
  selectedBlock: Block | null;
  geoJsonRefs: React.MutableRefObject<Record<number, L.GeoJSON | null>>;
}) {
  const map = useMap();

  useEffect(() => {
    if (!selectedBlock) return;

    const layer = geoJsonRefs.current[selectedBlock.id];

    if (!layer) return;

    map.fitBounds(layer.getBounds(), {
      padding: [60, 60],
      maxZoom: 18,
      animate: true,
    });

    layer.openPopup();
  }, [selectedBlock, map, geoJsonRefs]);

  return null;
}

export function BlockLeafletMap({ blocks, selectedBlock, onSelect }: Props) {
  const geoJsonRefs = useRef<Record<number, L.GeoJSON | null>>({});

  const center = useMemo<[number, number]>(() => {
    if (!blocks.length) {
      return [-2.24, 111.61];
    }

    const first = blocks[0].geometry.coordinates[0][0][0];

    return [first[1], first[0]];
  }, [blocks]);

  function FitAllBlocks({ blocks }: { blocks: Block[] }) {
    const map = useMap();

    useEffect(() => {
      if (blocks.length === 0) return;

      const group = L.featureGroup();

      blocks.forEach((block) => {
        const feature: Feature<MultiPolygon> = {
          type: "Feature",
          geometry: block.geometry,
          properties: {},
        };

        const layer = L.geoJSON(feature);

        group.addLayer(layer);
      });

      map.fitBounds(group.getBounds(), {
        padding: [40, 40],
      });
    }, [blocks]);

    return null;
  }

  return (
    <MapContainer
      center={center}
      zoom={15}
      scrollWheelZoom
      className="h-full w-full"
    >
      {/* <FitAllBlocks blocks={blocks} /> */}
      <FitSelectedBlock
        selectedBlock={selectedBlock}
        geoJsonRefs={geoJsonRefs}
      />

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

        const active = selectedBlock?.id === block.id;

        return (
          <GeoJSON
            ref={(layer) => {
              geoJsonRefs.current[block.id] = layer;
            }}
            key={block.id}
            data={feature}
            style={{
              color: active ? "#2563EB" : "#16A34A",

              weight: active ? 5 : 2,

              fillColor: active ? "#3B82F6" : "#22C55E",

              fillOpacity: active ? 0.45 : 0.15,

              dashArray: active ? "" : "4 4",
            }}
            eventHandlers={{
              click(e) {
                onSelect(block);

                e.target.openPopup();
              },

              mouseover(e) {
                e.target.setStyle({
                  weight: 5,
                  fillOpacity: 0.45,
                });

                e.target.bringToFront();
              },

              mouseout(e) {
                const isSelected = selectedBlock?.id === block.id;

                e.target.setStyle({
                  color: isSelected ? "#2563EB" : "#16A34A",

                  weight: isSelected ? 4 : 2,

                  fillColor: isSelected ? "#3B82F6" : "#22C55E",

                  fillOpacity: isSelected ? 0.4 : 0.15,
                });
              },
            }}
          >
            {/* <BlockLabel blockCode={block.block_code} /> */}

            <Popup maxWidth={320}>
              <BlockPopup block={block} />
            </Popup>
          </GeoJSON>
        );
      })}
    </MapContainer>
  );
}
