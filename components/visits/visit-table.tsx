import Link from "next/link";
import Image from "next/image";

import {
  CalendarDays,
  Camera,
  Clock3,
  Cloud,
  Eye,
  FileText,
  ImageIcon,
  MapPinned,
  UserRound,
  Paperclip,
} from "lucide-react";

import { VisitListItem } from "@/types/visit-list";

import { VisitEmpty } from "./visit-empty";

interface Props {
  visits: VisitListItem[];
  loading?: boolean;
}

export function VisitTable({ visits, loading = false }: Props) {
  if (loading) {
    return (
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="animate-pulse divide-y divide-slate-100">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-center gap-6 px-6 py-5">
              <div className="h-12 w-12 rounded-full bg-slate-200" />

              <div className="flex-1 space-y-2">
                <div className="h-4 w-44 rounded bg-slate-200" />
                <div className="h-3 w-28 rounded bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (visits.length === 0) {
    return <VisitEmpty />;
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Inspection Records
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Complete history of all inspection visits.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[1200px] w-full">
          <thead className="sticky top-0 z-10 bg-slate-50">
            <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              <th className="px-6 py-4">Visit</th>

              <th className="px-4 py-4">Date</th>

              <th className="px-4 py-4">Inspector</th>

              <th className="px-4 py-4">Location</th>

              <th className="px-4 py-4 text-center">Weather</th>

              <th className="px-4 py-4 text-center">Duration</th>

              <th className="px-4 py-4 text-center">Photos</th>

              <th className="px-4 py-4 text-center">Attachments</th>

              <th className="sticky right-0 bg-slate-50 px-6 py-4 text-right">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {visits.map((visit) => (
              <tr
                key={visit.id}
                className="border-b border-slate-100 transition hover:bg-blue-50/40"
              >
                {/* Visit */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                      <FileText size={20} className="text-blue-600" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {visit.visit_code}
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        Inspection Record
                      </p>
                    </div>
                  </div>
                </td>
                {/* Date */}
                <td className="px-4 py-5">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-slate-100 p-2">
                      <CalendarDays size={16} className="text-slate-600" />
                    </div>

                    <div>
                      <p className="font-medium">{visit.visit_date}</p>

                      <p className="text-xs text-slate-500">
                        {visit.visit_time}
                      </p>
                    </div>
                  </div>
                </td>
                {/* Inspector */}
                <td className="px-4 py-5">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
                      <Image
                        src={
                          visit.inspector_photo ?? "/images/default-avatar.jpg"
                        }
                        alt={visit.inspector}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>

                    <div>
                      <p className="font-medium text-slate-900">
                        {visit.inspector}
                      </p>

                      <span className="mt-1 inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                        {visit.inspector_role}
                      </span>
                    </div>
                  </div>
                </td>
                {/* Location */}
                <td className="px-4 py-5">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-purple-100 p-2">
                      <MapPinned size={16} className="text-purple-600" />
                    </div>

                    <div>
                      <p className="font-semibold">{visit.block_code}</p>

                      <p className="text-xs text-slate-500">{visit.estate}</p>

                      <p className="text-xs text-slate-400">{visit.ama}</p>
                    </div>
                  </div>
                </td>
                {/* Weather */}
                <td className="px-4 py-5 text-center">
                  <span className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-2 text-sm font-medium text-sky-700">
                    <Cloud size={15} />

                    {visit.weather}
                  </span>
                </td>
                {/* Duration */}
                <td className="px-4 py-5 text-center">
                  <span className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-2 text-sm font-medium text-orange-700">
                    <Clock3 size={15} />
                    {visit.duration} min
                  </span>
                </td>
                {/* Photos */}
                <td className="px-4 py-5 text-center">
                  <span className="inline-flex items-center gap-2 rounded-full bg-pink-50 px-3 py-2 text-sm font-medium text-pink-700">
                    <Camera size={15} />

                    {visit.total_photos}
                  </span>
                </td>
                {/* Attachments */}
                <td className="px-4 py-5 text-center">
                  <div className="inline-flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                      <Paperclip size={16} />
                    </div>

                    <span className="font-semibold text-slate-700">
                      {visit.total_attachments}
                    </span>
                  </div>
                </td>
                {/* Action */}
                <td className="sticky right-0 bg-white px-6 py-5 text-right">
                  <Link
                    href={`/visits/${visit.id}`}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 transition hover:border-blue-500 hover:bg-blue-50"
                  >
                    <Eye size={18} className="text-slate-600" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
