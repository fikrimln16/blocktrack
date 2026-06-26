"use client";

import dynamic from "next/dynamic";

import { Map, LocateFixed } from "lucide-react";

import { Block } from "@/types/block";

const VisitMapLeaflet = dynamic(
  () => import("./visit-map-leaflet").then((mod) => mod.VisitMapLeaflet),
  {
    ssr: false,
  },
);

interface Props {
  block: Block;

  latitude?: number;

  longitude?: number;

  accuracy?: number;
}

export function VisitMap({ block, latitude, longitude, accuracy }: Props) {
  return (
    <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
        <div>
          <div className="flex items-center gap-2">
            <Map size={20} className="text-blue-600" />

            <h3 className="font-semibold">Visit Map Preview</h3>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Current GPS compared with block boundary.
          </p>
        </div>

        <div className="rounded-xl bg-slate-100 px-4 py-2 text-sm">
          Accuracy
          <span className="ml-2 font-semibold">
            {accuracy ? `${accuracy} m` : "-"}
          </span>
        </div>
      </div>

      <div className="h-[500px]">
        <VisitMapLeaflet
          block={block}
          latitude={latitude}
          longitude={longitude}
        />
      </div>
    </div>
  );
}
