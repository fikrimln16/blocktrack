import Image from "next/image";
import Link from "next/link";

import {
  CalendarDays,
  MapPinned,
  ClipboardCheck,
  ArrowRight,
} from "lucide-react";

import { RecentActivity } from "@/types/dashboard";

interface Props {
  activity: RecentActivity;
}

export function ActivityItem({ activity }: Props) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-100
        bg-white
        p-5
        transition-all
        hover:border-blue-200
        hover:bg-slate-50
      "
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        {/* LEFT */}
        <div className="flex min-w-0 flex-1 gap-4">
          <Image
            src={activity.photo || "/images/default-avatar.jpg"}
            alt={activity.inspector}
            width={56}
            height={56}
            className="h-14 w-14 shrink-0 rounded-full border border-slate-200 object-cover"
          />

          <div className="min-w-0 flex-1">
            {/* Inspector */}
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate text-lg font-semibold text-slate-900">
                {activity.inspector}
              </h3>

              <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-500">
                {activity.role}
              </span>
            </div>

            {/* Visit */}
            <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
              <ClipboardCheck size={15} className="shrink-0 text-blue-600" />

              <span>
                Completed{" "}
                <span className="font-semibold text-blue-600">
                  {activity.visit_code}
                </span>
              </span>
            </div>

            {/* Location */}
            <div className="mt-3 flex items-start gap-2 text-sm text-slate-500">
              <MapPinned size={15} className="mt-0.5 shrink-0 text-slate-400" />

              <span className="break-words">
                {activity.ama} • {activity.estate} • {activity.block}
              </span>
            </div>

            {/* Date */}
            <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
              <CalendarDays size={14} />

              <span>
                {new Date(activity.visit_date).toLocaleDateString("id-ID")}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="grid w-full grid-cols-2 gap-3 lg:w-auto lg:grid-cols-1 lg:gap-2">
          <Link
            href={`/blocks/${activity.block_id}`}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-slate-200
              px-4
              py-2.5
              text-sm
              font-medium
              text-slate-700
              transition
              hover:bg-slate-100
            "
          >
            <MapPinned size={16} />
            Block
          </Link>

          <Link
            href={`/visits/${activity.id}`}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-blue-600
              px-4
              py-2.5
              text-sm
              font-medium
              text-white
              transition
              hover:bg-blue-700
            "
          >
            Visit
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
