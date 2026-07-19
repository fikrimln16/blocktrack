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
                href="/blocks"
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
            </div>
          </div>
        </div>

        {/* Bottom Information */}

        {/* ================= Block Information ================= */}

        <div className="border-t border-slate-200 bg-slate-50 px-8 py-7">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <MapPinned size={20} />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Block Information
              </h3>

              <p className="text-sm text-slate-500">
                General information about this plantation block.
              </p>
            </div>
          </div>

          <div className="grid gap-x-12 gap-y-6 md:grid-cols-2 xl:grid-cols-3">
            <InfoItem
              icon={<Landmark size={18} />}
              label="AMA"
              value={block.ama}
            />

            <InfoItem
              icon={<Building2 size={18} />}
              label="Estate"
              value={block.estate}
            />

            <InfoItem
              icon={<Map size={18} />}
              label="Division"
              value={block.division ? `Division ${block.division}` : "-"}
            />

            <InfoItem
              icon={<Calendar size={18} />}
              label="Planting Year"
              value={block.planting_year ?? "-"}
            />

            <InfoItem
              icon={<MapPinned size={18} />}
              label="Topography"
              value={block.topography ?? "-"}
            />

            <InfoItem
              icon={<MapPinned size={18} />}
              label="Soil Type"
              value={block.soil_type ?? "-"}
            />

            <InfoItem
              icon={<Trees size={18} />}
              label="Area"
              value={
                block.area_ha ? `${Number(block.area_ha).toFixed(2)} Ha` : "-"
              }
            />

            <InfoItem
              icon={<Trees size={18} />}
              label="SPH"
              value={block.sph ? Number(block.sph).toLocaleString() : "-"}
            />

            <InfoItem
              icon={<BadgeCheck size={18} />}
              label="YTD"
              value={
                block.ytd_yield
                  ? `${Number(block.ytd_yield).toFixed(2)} Ton/Ha`
                  : "-"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm ring-1 ring-slate-200">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </p>

        <p className="mt-1 text-base font-semibold text-slate-900 break-words">
          {value}
        </p>
      </div>
    </div>
  );
}
