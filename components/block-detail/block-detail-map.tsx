"use client";

import { useRef } from "react";

import dynamic from "next/dynamic";

import L from "leaflet";

import { Map, Maximize2, LocateFixed, Info } from "lucide-react";

import { Block } from "@/types/block";

import type { Feature, Geometry } from "geojson";

const BlockDetailLeaflet = dynamic(
  () =>
    import("./block-detail-map-leaflet").then((mod) => mod.BlockDetailLeaflet),
  {
    ssr: false,
  },
);

interface Props {
  block: Block;
}

export function BlockDetailMap({ block }: Props) {
  const mapRef = useRef<L.Map | null>(null);

  const mapWrapperRef = useRef<HTMLDivElement>(null);

  const zoomToBlock = () => {
    if (!mapRef.current) return;

    const feature: Feature<Geometry> = {
      type: "Feature",
      geometry: block.geometry as Geometry,
      properties: {},
    };

    const layer = L.geoJSON(feature);

    mapRef.current.fitBounds(layer.getBounds(), {
      padding: [40, 40],
      animate: true,
      maxZoom: 18,
    });
  };

  const toggleFullscreen = async () => {
    if (!mapWrapperRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await mapWrapperRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }

      setTimeout(() => {
        mapRef.current?.invalidateSize();
        zoomToBlock();
      }, 400);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-slate-200 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Map size={20} className="text-blue-600" />

            <h2 className="text-lg font-semibold">Block Location</h2>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Interactive plantation map with satellite imagery.
          </p>
        </div>

        <div className="flex gap-2">
          <span className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-medium">
            {Number(block.area_ha).toFixed(2)} Ha
          </span>

          <span className="rounded-xl bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700">
            {block.status}
          </span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-6 py-3">
        <div className="flex gap-2">
          <button
            onClick={zoomToBlock}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm transition hover:bg-slate-100"
          >
            <LocateFixed size={16} />
            Zoom to Block
          </button>

          <button
            onClick={toggleFullscreen}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm transition hover:bg-slate-100"
          >
            <Maximize2 size={16} />
            Fullscreen
          </button>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Info size={16} />

          <span>
            Gunakan menu <strong>Layers</strong> di kiri atas untuk mengganti
            basemap.
          </span>
        </div>
      </div>

      {/* Map */}
      <div ref={mapWrapperRef} className="h-[650px] bg-white">
        <BlockDetailLeaflet block={block} mapRef={mapRef} />
      </div>
    </div>
  );
}
