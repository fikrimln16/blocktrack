"use client";

import { useMemo } from "react";

import Image from "next/image";

import { Camera, ClipboardCheck, Clock3, Paperclip, Users } from "lucide-react";

import { Visit } from "@/types/visit";

import { VisitEmpty } from "./visit-empty";
import { VisitHistoryItem } from "./visit-history-item";
import { VisitPhoto } from "@/services/block-detail.service";

interface Props {
  visits: Visit[];
  photos: VisitPhoto[];
}
export function VisitHistory({ visits, photos }: Props) {
  const totalPhotos = useMemo(() => photos.length, [photos]);

  const totalAttachments = useMemo(
    () =>
      visits.reduce(
        (sum, visit) => sum + Number(visit.total_attachments ?? 0),
        0,
      ),
    [visits],
  );

  const inspectors = useMemo(
    () =>
      visits.filter(
        (visit, index, self) =>
          self.findIndex((v) => v.inspector === visit.inspector) === index,
      ),
    [visits],
  );

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 bg-gradient-to-r from-blue-50 via-white to-white px-6 py-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1 space-y-5">
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

            {inspectors.length > 0 && (
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {inspectors.slice(0, 5).map((visit) => (
                    <Image
                      key={visit.id}
                      src={
                        visit.inspector_photo || "/images/default-avatar.jpg"
                      }
                      alt={visit.inspector}
                      width={36}
                      height={36}
                      className="rounded-full border-2 border-white object-cover shadow"
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Users size={15} />

                  <span>
                    {inspectors.length} Inspector
                    {inspectors.length > 1 && "s"}
                  </span>
                </div>
              </div>
            )}

            {/* Gallery */}
            {photos.length > 0 && (
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Documentation
                </p>

                <div className="flex flex-wrap gap-3">
                  {photos.slice(0, 8).map((photo) => (
                    <Image
                      key={photo.id}
                      src={photo.photo_url}
                      alt="Documentation"
                      width={90}
                      height={90}
                      className="h-20 w-20 rounded-xl border border-slate-200 object-cover transition hover:scale-105"
                    />
                  ))}

                  {photos.length > 8 && (
                    <div className="flex h-20 w-20 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-100 text-sm font-semibold text-slate-600">
                      +{photos.length - 8}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <SummaryCard
              icon={<Clock3 size={18} className="text-blue-600" />}
              label="Visits"
              value={visits.length}
            />

            <SummaryCard
              icon={<Camera size={18} className="text-green-600" />}
              label="Photos"
              value={totalPhotos}
            />

            <SummaryCard
              icon={<Paperclip size={18} className="text-orange-600" />}
              label="Attachments"
              value={totalAttachments}
            />
          </div>
        </div>
      </div>

      {/* Visit List */}
      {visits.length === 0 ? (
        <VisitEmpty />
      ) : (
        <div className="divide-y divide-slate-200">
          {visits.map((visit) => {
            const visitPhotos = photos.filter(
              (photo) => photo.visit_id === visit.id,
            );

            return (
              <VisitHistoryItem
                key={visit.id}
                visit={visit}
                photos={visitPhotos}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

interface SummaryCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
}

function SummaryCard({ icon, label, value }: SummaryCardProps) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:shadow-md">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
        {icon}
      </div>

      <div>
        <p className="text-xs text-slate-400">{label}</p>

        <p className="text-lg font-semibold text-slate-900">{value}</p>
      </div>
    </div>
  );
}
