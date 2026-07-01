"use client";

import { Block } from "@/types/block";
import { BlockStatusBadge } from "./block-status-badge";
import Link from "next/link";
import { Eye } from "lucide-react";

interface Props {
  index: number;
  block: Block;
  active: boolean;
  onClick: () => void;
}

export function BlockTableRow({ index, block, active, onClick }: Props) {
  return (
    <>
      {/* No */}
      <td onClick={onClick} className="cursor-pointer px-4 py-4 text-center">
        <span
          className={`
          inline-flex h-8 w-8 items-center justify-center rounded-full
          text-xs font-semibold
          ${active ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"}
        `}
        >
          {index + 1}
        </span>
      </td>

      {/* Block */}
      <td onClick={onClick} className="cursor-pointer px-4 py-4">
        <div className="space-y-1">
          <p
            className={`font-semibold transition-colors ${
              active ? "text-blue-600" : "text-slate-900"
            }`}
          >
            {block.block_code}
          </p>

          <p className="text-xs text-slate-500">{block.block_name || "-"}</p>
        </div>
      </td>

      {/* Estate */}
      <td onClick={onClick} className="cursor-pointer px-4 py-4">
        <div className="space-y-1">
          <p className="font-medium text-slate-800">{block.estate}</p>

          <p className="text-xs text-slate-500">{block.ama}</p>
        </div>
      </td>

      {/* Division */}
      <td onClick={onClick} className="cursor-pointer px-4 py-4 text-center">
        <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
          D{block.division}
        </span>
      </td>

      {/* Area */}
      <td onClick={onClick} className="cursor-pointer px-4 py-4 text-center">
        <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
          {Number(block.area_ha).toFixed(2)} Ha
        </span>
      </td>

      {/* Year */}
      <td onClick={onClick} className="cursor-pointer px-4 py-4 text-center">
        <span className="inline-flex items-center rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
          {block.planting_year || "-"}
        </span>
      </td>

      {/* Visit */}
      <td onClick={onClick} className="cursor-pointer px-4 py-4 text-center">
        <span
          className="
          inline-flex
          h-9
          w-9
          items-center
          justify-center
          rounded-full
          bg-orange-100
          text-xs
          font-bold
          text-orange-700
        "
        >
          {block.total_visit > 99 ? "99+" : block.total_visit}
        </span>
      </td>

      {/* Status */}
      <td onClick={onClick} className="cursor-pointer px-4 py-4">
        <BlockStatusBadge status={block.status} />
      </td>

      {/* Detail */}
      {/* Detail */}
      <td className="px-4 py-4 text-center">
        <Link
          href={`/blocks/${block.id}`}
          className="
            inline-flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-slate-200
            bg-white
            text-slate-600
            transition-all
            duration-200
            hover:border-blue-500
            hover:bg-blue-50
            hover:text-blue-600
          "
          title="View Detail"
        >
          <Eye size={18} />
        </Link>
      </td>
    </>
  );
}
