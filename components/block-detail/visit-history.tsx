"use client";

import Image from "next/image";
import { ClipboardCheck, Camera, Clock3, Users } from "lucide-react";

import { Visit } from "@/types/visit";

import { VisitHistoryItem } from "./visit-history-item";
import { VisitEmpty } from "./visit-empty";

interface Props {
  visits: Visit[];
}

export function VisitHistory({ visits }: Props) {
  const totalPhotos = visits.reduce(
    (sum, visit) => sum + (visit.total_photos || 0),
    0,
  );

  // Ambil inspector unik
  const inspectors = visits.filter(
    (visit, index, self) =>
      self.findIndex((v) => v.inspector === visit.inspector) === index,
  );

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-5 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-white px-6 py-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100">
              <ClipboardCheck size={22} className="text-blue-600" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Visit History
              </h2>

              <p className="text-sm text-slate-500">
                Inspection history and documentation for this block.
              </p>
            </div>
          </div>

          {/* Inspector Avatar */}
          {inspectors.length > 0 && (
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {inspectors.slice(0, 5).map((visit) => (
                  <Image
                    key={visit.id}
                    src={visit.inspector_photo ?? "/images/default-avatar.jpg"}
                    alt={visit.inspector}
                    width={36}
                    height={36}
                    className="rounded-full border-2 border-white object-cover shadow-sm"
                  />
                ))}
              </div>

              <div className="flex items-center gap-1 text-sm text-slate-500">
                <Users size={15} />

                <span>
                  {inspectors.length} Inspector
                  {inspectors.length > 1 ? "s" : ""}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200">
            <Clock3 size={18} className="text-blue-600" />

            <div>
              <p className="text-xs text-slate-400">Visits</p>

              <p className="font-semibold">{visits.length}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200">
            <Camera size={18} className="text-green-600" />

            <div>
              <p className="text-xs text-slate-400">Photos</p>

              <p className="font-semibold">{totalPhotos}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {visits.length === 0 ? (
        <VisitEmpty />
      ) : (
        <div className="divide-y divide-slate-200">
          {visits.map((visit) => (
            <VisitHistoryItem key={visit.id} visit={visit} />
          ))}
        </div>
      )}
    </div>
  );
}
