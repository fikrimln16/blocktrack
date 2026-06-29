import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  ClipboardCheck,
  Mail,
  Phone,
  CalendarClock,
} from "lucide-react";

import { VisitDetail } from "@/types/visit-detail";

interface Props {
  visit: VisitDetail;
}

export function VisitInspector({ visit }: Props) {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">Inspector</h2>

        <p className="mt-1 text-sm text-slate-500">
          Inspector information and contact.
        </p>
      </div>

      {/* Profile + Contact */}
      {/* Profile */}
      <div className="flex items-start gap-5">
        <Image
          src={visit.photo || "/images/default-avatar.jpg"}
          alt={visit.inspector}
          width={72}
          height={72}
          className="h-[72px] w-[72px] rounded-full border-2 border-slate-100 object-cover"
        />

        <div className="flex flex-1 items-start justify-between gap-6">
          {/* Left */}
          <div className="min-w-0">
            <h3 className="truncate text-xl font-semibold text-slate-900">
              {visit.inspector}
            </h3>

            <span className="mt-2 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              {visit.role}
            </span>
          </div>

          {/* Right */}
          <div className="space-y-2 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Mail size={15} className="text-blue-600" />
              <span>{visit.email || "-"}</span>
            </div>

            <div className="flex items-center gap-2">
              <Phone size={15} className="text-blue-600" />
              <span>{visit.phone || "-"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="mt-6 flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
        <div>
          <p className="text-2xl font-bold text-slate-900">
            {visit.total_visits}
          </p>

          <p className="text-xs text-slate-500">Total Visits</p>
        </div>

        <div className="h-10 w-px bg-slate-200" />

        <div className="text-right">
          <p className="font-semibold text-slate-900">
            {new Date(visit.visit_date).toLocaleDateString("id-ID")}
          </p>

          <p className="text-xs text-slate-500">Last Visit</p>
        </div>
      </div>

      {/* Button */}
      <div className="mt-auto pt-6">
        <Link
          href={`/dashboard/users/${visit.user_id}`}
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-2xl
            border
            border-slate-200
            px-4
            py-3
            text-sm
            font-medium
            text-slate-700
            transition
            hover:border-blue-200
            hover:bg-blue-50
            hover:text-blue-700
          "
        >
          View Profile
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
