"use client";

import Link from "next/link";

import {
  ArrowLeft,
  ChevronRight,
  Pencil,
  Download,
  ClipboardPlus,
  MapPinned,
  Calendar,
  Trees,
  Map,
  Building2,
  Landmark,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";
interface Props {
  block: any;
}

export function BlockHeader({ block }: Props) {
  return (
    <div className="space-y-6">
      {/* ================= Breadcrumb ================= */}

      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/dashboard" className="hover:text-blue-600 transition">
          Dashboard
        </Link>

        <ChevronRight size={15} />

        <Link href="/blocks" className="hover:text-blue-600 transition">
          Blocks
        </Link>

        <ChevronRight size={15} />

        <span className="font-medium text-slate-900">{block.block_code}</span>
      </div>

      {/* ================= Header Card ================= */}

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        {/* Top */}

        <div className="border-b border-slate-200 p-8">
          <div className="flex flex-col gap-8 xl:flex-row xl:justify-between">
            {/* LEFT */}

            <div className="space-y-6">
              <Link
                href="/dashboard/blocks"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-4
                  py-2
                  text-sm
                  font-medium
                  transition
                  hover:bg-slate-50
                "
              >
                <ArrowLeft size={16} />
                Back to Blocks
              </Link>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-4xl font-bold text-slate-900">
                    {block.block_code}
                  </h1>

                  <span
                    className={`
                      rounded-full
                      px-4
                      py-1.5
                      text-xs
                      font-semibold

                      ${
                        block.status === "Tanam"
                          ? "bg-green-100 text-green-700"
                          : block.status === "HCV"
                            ? "bg-emerald-100 text-emerald-700"
                            : block.status === "Bangunan"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-slate-100 text-slate-700"
                      }
                    `}
                  >
                    <BadgeCheck className="mr-1 inline" size={14} />
                    {block.status}
                  </span>
                </div>

                <p className="mt-3 max-w-2xl text-slate-500">
                  {block.block_name ||
                    "Plantation block monitoring and operational information."}
                </p>
              </div>
            </div>

            {/* ACTION */}

            <div className="flex flex-wrap items-start gap-3">
              <button
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-5
                  py-3
                  font-medium
                  transition
                  hover:bg-slate-50
                "
              >
                <Pencil size={18} />
                Edit
              </button>

              <Link
                href={`/dashboard/visits/new?block=${block.id}`}
                className="
    group
    inline-flex
    items-center
    gap-2
    rounded-xl
    bg-green-600
    px-5
    py-3
    font-medium
    text-white
    shadow-sm
    transition-all
    duration-200
    hover:bg-green-700
    hover:shadow-lg
    active:scale-[0.98]
  "
              >
                <ClipboardPlus size={18} />

                <span>Create Visit</span>

                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <button
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-blue-600
                  px-5
                  py-3
                  font-medium
                  text-white
                  transition
                  hover:bg-blue-700
                "
              >
                <Download size={18} />
                Export
              </button>

              <button
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-5
                  py-3
                  font-medium
                  transition
                  hover:bg-slate-50
                "
              >
                <MapPinned size={18} />
                Open Map
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Information */}

        <div className="grid gap-6 bg-slate-50 p-8 md:grid-cols-2 xl:grid-cols-6">
          <InfoCard
            icon={<Landmark size={18} />}
            title="AMA"
            value={block.ama}
          />

          <InfoCard
            icon={<Building2 size={18} />}
            title="Estate"
            value={block.estate}
          />

          <InfoCard
            icon={<Map size={18} />}
            title="Division"
            value={`Division ${block.division}`}
          />

          <InfoCard
            icon={<Trees size={18} />}
            title="Area"
            value={`${Number(block.area_ha).toFixed(2)} Ha`}
          />

          <InfoCard
            icon={<Calendar size={18} />}
            title="Planting Year"
            value={block.planting_year || "-"}
          />

          <InfoCard
            icon={<BadgeCheck size={18} />}
            title="BA Code"
            value={block.ba_code || "-"}
          />
        </div>
      </div>
    </div>
  );
}

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
}

function InfoCard({ icon, title, value }: InfoCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:shadow-md">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        {icon}
      </div>

      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        {title}
      </p>

      <p className="mt-2 text-lg font-bold text-slate-900">{value}</p>
    </div>
  );
}
