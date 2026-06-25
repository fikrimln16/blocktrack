"use client";

import { Block } from "@/types/block";

import { Building2, MapPinned, Trees, ArrowRight } from "lucide-react";

interface Props {
  block: Block;
  active: boolean;
  onClick: () => void;
}

export function BlockCard({ block, active, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full
        rounded-2xl
        border
        p-5
        text-left
        transition-all
        hover:-translate-y-1
        hover:shadow-lg

        ${active ? "border-blue-600 bg-blue-50" : "border-slate-200 bg-white"}
      `}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">{block.block_code}</h3>

          <p className="mt-1 text-sm text-slate-500">
            {block.block_name || "-"}
          </p>
        </div>

        <span
          className={`
            rounded-xl
            px-3
            py-1
            text-xs
            font-semibold

            ${
              block.status === "HCV"
                ? "bg-green-100 text-green-700"
                : "bg-slate-100 text-slate-700"
            }
          `}
        >
          {block.status}
        </span>
      </div>

      <div className="mt-5 space-y-3 text-sm">
        <div className="flex items-center gap-2">
          <MapPinned size={15} />
          {block.ama}
        </div>

        <div className="flex items-center gap-2">
          <Building2 size={15} />
          {block.estate}
        </div>

        <div className="flex items-center gap-2">
          <Trees size={15} />
          Division {block.division}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-500">Area</p>

          <p className="font-semibold">{block.area_ha} Ha</p>
        </div>

        <div className="flex items-center gap-2 text-blue-600">
          View
          <ArrowRight size={16} />
        </div>
      </div>
    </button>
  );
}
