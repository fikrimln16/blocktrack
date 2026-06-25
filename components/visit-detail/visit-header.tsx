"use client";

import Image from "next/image";
import {
  BadgeCheck,
  CalendarDays,
  Clock3,
  MapPinned,
  Building2,
  SquareStack,
  UserRound,
} from "lucide-react";

interface VisitHeaderProps {
  visit: any;
  ama: any;
  estate: any;
  block: any;
}

export function VisitHeader({ visit, ama, estate, block }: VisitHeaderProps) {
  const statusColor = {
    completed: "bg-green-100 text-green-700 border-green-200",
    ongoing: "bg-amber-100 text-amber-700 border-amber-200",
    pending: "bg-slate-100 text-slate-700 border-slate-200",
  };

  const status =
    statusColor[visit.status?.toLowerCase() as keyof typeof statusColor] ??
    statusColor.pending;

  function getInitials(name: string) {
    if (!name) return "?";

    return name
      .trim()
      .split(" ")
      .slice(0, 2)
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase();
  }

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
      <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 p-6 text-white">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
          {/* Avatar */}

          <div className="flex items-center gap-5">
            <div className="relative h-20 w-20 overflow-hidden rounded-full border-4 border-white/30 bg-white">
              {visit.employee.photo ? (
                <img
                  src={visit.employee.photo}
                  alt={visit.employee.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div
                  className="
                    flex
                    h-full
                    w-full
                    items-center
                    justify-center
                    bg-gradient-to-br
                    from-blue-600
                    via-sky-500
                    to-cyan-400
                    text-2xl
                    font-bold
                    uppercase
                    text-white
                  "
                >
                  {getInitials(visit.employee.name)}
                </div>
              )}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-bold">{visit.employee.name}</h2>

                <span
                  className={`
                    rounded-full
                    border
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    backdrop-blur
                    ${status}
                  `}
                >
                  {visit.status}
                </span>
              </div>

              <div className="mt-2 flex items-center gap-2 text-blue-100">
                <UserRound size={16} />
                <span>{visit.employee.role}</span>
              </div>
            </div>
          </div>

          {/* Visit Code */}

          <div className="lg:ml-auto">
            <div className="rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">
              <p className="text-xs uppercase tracking-widest text-blue-100">
                Visit Code
              </p>

              <h3 className="mt-1 text-xl font-bold">{visit.visitCode}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Information */}

      <div className="grid gap-5 p-6 sm:grid-cols-2 xl:grid-cols-4">
        <InfoCard
          icon={<MapPinned size={20} />}
          label="AMA"
          value={ama?.name}
        />

        <InfoCard
          icon={<Building2 size={20} />}
          label="Estate"
          value={estate?.name}
        />

        <InfoCard
          icon={<SquareStack size={20} />}
          label="Block"
          value={block?.blockCode}
        />

        <InfoCard
          icon={<BadgeCheck size={20} />}
          label="Status"
          value={visit.status}
        />

        <InfoCard
          icon={<CalendarDays size={20} />}
          label="Visit Date"
          value={visit.visitDate}
        />

        <InfoCard
          icon={<Clock3 size={20} />}
          label="Visit Time"
          value={visit.visitTime}
        />

        <InfoCard
          icon={<Clock3 size={20} />}
          label="Duration"
          value={`${visit.duration} Minutes`}
        />

        <InfoCard
          icon={<MapPinned size={20} />}
          label="Coordinates"
          value={`${visit.location.latitude.toFixed(
            5,
          )}, ${visit.location.longitude.toFixed(5)}`}
        />
      </div>
    </div>
  );
}

interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function InfoCard({ icon, label, value }: InfoCardProps) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-slate-50
        p-4
        transition
        hover:border-blue-300
        hover:bg-blue-50
      "
    >
      <div className="flex items-center gap-2 text-blue-600">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>

      <p className="mt-3 break-words text-base font-semibold text-slate-900">
        {value}
      </p>
    </div>
  );
}
