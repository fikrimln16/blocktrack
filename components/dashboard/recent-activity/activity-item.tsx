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
        flex
        items-center
        justify-between
        rounded-2xl
        border
        border-slate-100
        p-4
        transition-all
        hover:border-blue-200
        hover:bg-slate-50
      "
    >
      {/* LEFT */}
      <div className="flex min-w-0 items-center gap-4">
        <Image
          src={activity.photo || "/images/default-avatar.jpg"}
          alt={activity.inspector}
          width={52}
          height={52}
          className="h-12 w-12 rounded-full border border-slate-200 object-cover"
        />

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-slate-900">
              {activity.inspector}
            </h3>

            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
              {activity.role}
            </span>
          </div>

          <div className="mt-1 flex items-center gap-2 text-sm text-slate-600">
            <ClipboardCheck size={15} className="text-blue-600" />

            <span>
              Completed{" "}
              <span className="font-semibold text-blue-600">
                {activity.visit_code}
              </span>
            </span>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1">
              <MapPinned size={14} />

              <span>
                {activity.ama} • {activity.estate} • {activity.block}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <CalendarDays size={14} />

              <span>
                {new Date(activity.visit_date).toLocaleDateString("id-ID")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="ml-6 flex flex-col gap-2">
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
            py-2
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
            py-2
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
  );
}
