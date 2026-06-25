"use client";

import Link from "next/link";

import {
  MapPinned,
  Building2,
  Trees,
  SquareStack,
  ArrowRight,
} from "lucide-react";

import { Block } from "@/types/block";

interface Props {
  block: Block;
}

export function BlockPopup({ block }: Props) {
  return (
    <div className="w-[260px]">
      <div className="border-b pb-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">{block.block_code}</h3>

          <span
            className="
              rounded-lg
              bg-green-100
              px-2
              py-1
              text-xs
              font-medium
              text-green-700
            "
          >
            {block.status}
          </span>
        </div>

        <p className="mt-1 text-sm text-slate-500">{block.block_name || "-"}</p>
      </div>

      <div className="mt-4 space-y-3 text-sm">
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

        <div className="flex items-center gap-2">
          <SquareStack size={15} />
          {block.area_ha} Ha
        </div>
      </div>

      <div className="mt-5">
        <Link
          href={`/blocks/${block.id}`}
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-blue-600
            py-3
            text-sm
            font-medium
            text-white
            transition
            hover:bg-blue-700
          "
        >
          View Detail
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
