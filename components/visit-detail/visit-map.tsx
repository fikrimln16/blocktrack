"use client";

import dynamic from "next/dynamic";
import { MapPinned, Map, Navigation } from "lucide-react";

const VisitLeafletMap = dynamic(
  () => import("./visit-map-leaflet").then((mod) => mod.VisitLeafletMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-slate-500">Loading map...</p>
      </div>
    ),
  },
);

interface VisitMapProps {
  visit: any;
  block: any;
}

export function VisitMap({ visit, block }: VisitMapProps) {
  return (
    <div
      className="
        overflow-hidden
        rounded-[28px]
        border border-slate-200
        bg-white
        shadow-sm
      "
    >
      {/* Header */}

      <div className="border-b border-slate-200 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <MapPinned size={20} className="text-blue-600" />

              <h3 className="text-lg font-semibold text-slate-900">
                Visit Location
              </h3>
            </div>

            <p className="mt-1 text-sm text-slate-500">
              Current visit location inside plantation block
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-blue-50
                px-3
                py-2
                text-sm
                font-medium
                text-blue-700
              "
            >
              <Map size={16} />
              {block.blockCode}
            </span>

            <span
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-green-50
                px-3
                py-2
                text-sm
                font-medium
                text-green-700
              "
            >
              <Navigation size={16} />
              GPS Active
            </span>
          </div>
        </div>
      </div>

      {/* Map */}

      <div className="relative">
        <div className="h-[380px] md:h-[520px]">
          <VisitLeafletMap visit={visit} block={block} />
        </div>

        {/* Floating Info */}

        <div
          className="
            absolute
            bottom-4
            left-4
            z-[500]
            rounded-2xl
            bg-white/95
            p-4
            shadow-lg
            backdrop-blur
          "
        >
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-blue-600"></span>
              <span className="text-slate-600">Current Visit</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-green-500"></span>
              <span className="text-slate-600">Block Polygon</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}

      <div className="grid grid-cols-1 gap-4 border-t border-slate-200 p-6 md:grid-cols-3">
        <InfoCard title="Latitude" value={visit.location.latitude.toFixed(6)} />

        <InfoCard
          title="Longitude"
          value={visit.location.longitude.toFixed(6)}
        />

        <InfoCard title="Block" value={block.blockCode} />
      </div>
    </div>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div
      className="
        rounded-2xl
        bg-slate-50
        p-4
      "
    >
      <p className="text-xs uppercase tracking-wide text-slate-500">{title}</p>

      <p className="mt-1 font-mono text-sm font-semibold text-slate-900">
        {value}
      </p>
    </div>
  );
}
