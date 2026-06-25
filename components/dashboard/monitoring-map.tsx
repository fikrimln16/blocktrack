"use client";

import dynamic from "next/dynamic";

const LeafletMap = dynamic(
  () => import("@/components/maps/leafleat-map").then((mod) => mod.LeafletMap),
  {
    ssr: false,
  },
);

export function MonitoringMap() {
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
      {/* HEADER */}

      <div className="border-b border-slate-200 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Live Monitoring Map
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Monitoring AMA, Estate, Block & Visit
            </p>
          </div>

          <div className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
            3 Active Visits
          </div>
        </div>
      </div>

      {/* MAP */}

      <div className="relative h-[350px] md:h-[500px] xl:h-[650px]">
        <LeafletMap />

        {/* LAYER CONTROL */}

        <div
          className="
            absolute
            right-4
            top-4
            z-[999]
            rounded-2xl
            bg-white
            p-4
            shadow-xl
          "
        >
          <div className="space-y-2 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked />
              AMA
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked />
              Estate
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked />
              Block
            </label>
          </div>
        </div>

        {/* LEGEND */}

        <div
          className="
            absolute
            bottom-3
            right-3
            z-[999]
            rounded-2xl
            bg-white/95
            p-3
            shadow-xl
            backdrop-blur
          "
        >
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded bg-blue-600" />
              AMA
            </div>

            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded bg-sky-500" />
              Estate
            </div>

            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded bg-green-500" />
              Block
            </div>

            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              Visit
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
