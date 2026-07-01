"use client";

import Link from "next/link";
import Image from "next/image";

import {
  CalendarDays,
  Camera,
  TriangleAlert,
  UserRound,
  ChevronRight,
  CloudSun,
  Paperclip,
  Timer,
} from "lucide-react";

import { Visit } from "@/types/visit";

import { VisitStatusBadge } from "./visit-status-badge";
import { VisitPhoto } from "@/services/block-detail.service";

interface Props {
  visit: Visit;
  photos: VisitPhoto[];
}

export function VisitHistoryItem({ visit, photos }: Props) {
  return (
    <Link
      href={`/visits/${visit.id}`}
      className="
    group
    flex
    items-start
    justify-between
    gap-6
    border-b
    border-slate-100
    p-6
    transition
    hover:bg-slate-50
  "
    >
      <div className="flex flex-1 gap-5">
        {/* Inspector Avatar */}
        <div className="shrink-0">
          <Image
            src={visit.inspector_photo || "/images/default-avatar.jpg"}
            alt={visit.inspector}
            width={56}
            height={56}
            className="
          h-14
          w-14
          rounded-full
          border-2
          border-white
          object-cover
          shadow-md
        "
          />
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <CalendarDays size={16} />
              {new Date(visit.visit_date).toLocaleDateString("id-ID")}
            </div>

            <VisitStatusBadge status={visit.status} />
          </div>

          {/* Visit Code */}
          <h3 className="mt-2 text-lg font-semibold text-slate-900">
            {visit.visit_code}
          </h3>

          {/* Inspector */}
          <div className="mt-2 flex items-center gap-3">
            <div>
              <p className="font-medium text-slate-800">{visit.inspector}</p>

              {visit.role && (
                <p className="text-xs text-slate-500">{visit.role}</p>
              )}
            </div>
          </div>

          {/* Information */}
          <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <Camera size={16} className="text-blue-500" />
              <span>{visit.total_photos ?? 0} Photos</span>
            </div>

            <div className="flex items-center gap-2">
              <Paperclip size={16} className="text-orange-500" />
              <span>{visit.total_attachments ?? 0} Attachments</span>
            </div>

            <div className="flex items-center gap-2">
              <CloudSun size={16} className="text-sky-500" />
              <span>{visit.weather || "-"}</span>
            </div>

            <div className="flex items-center gap-2">
              <Timer size={16} className="text-violet-500" />
              <span>{visit.duration ?? 0} menit</span>
            </div>
          </div>

          {/* Photo Gallery */}
          {photos.length > 0 && (
            <div className="mt-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Documentation
              </p>

              <div className="flex flex-wrap gap-3">
                {photos.slice(0, 4).map((photo) => (
                  <Image
                    key={photo.id}
                    src={photo.photo_url}
                    alt="Visit Documentation"
                    width={80}
                    height={80}
                    unoptimized
                    className="
            h-20
            w-20
            rounded-xl
            border
            border-slate-200
            object-cover
            shadow-sm
            transition
            duration-200
            hover:scale-105
            group-hover:shadow-md
          "
                  />
                ))}

                {photos.length > 4 && (
                  <div
                    className="
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-xl
            border
            border-dashed
            border-slate-300
            bg-slate-100
            text-sm
            font-semibold
            text-slate-600
          "
                  >
                    +{photos.length - 4}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Notes */}
          {visit.notes && (
            <p className="mt-5 line-clamp-2 text-sm text-slate-500">
              {visit.notes}
            </p>
          )}
        </div>
      </div>

      <ChevronRight
        size={22}
        className="
      mt-2
      text-slate-400
      transition
      group-hover:translate-x-1
    "
      />
    </Link>
  );
}
