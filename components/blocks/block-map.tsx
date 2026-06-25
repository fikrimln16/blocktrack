"use client";

import dynamic from "next/dynamic";
import { Map } from "lucide-react";

import { Block } from "@/types/block";
import { SelectionInfo } from "./selection-info";

const BlockLeafletMap = dynamic(
  () => import("./block-map-leaflet").then((mod) => mod.BlockLeafletMap),
  {
    ssr: false,
  },
);

interface Props {
  blocks: Block[];
  selectedBlock: Block | null;
  onSelect: (block: Block) => void;
}

export function BlockMap({ blocks, selectedBlock, onSelect }: Props) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-6">
        <div className="flex items-center gap-2">
          <Map size={20} className="text-blue-600" />

          <h3 className="text-lg font-semibold">Plantation Map</h3>
        </div>

        <p className="mt-1 text-sm text-slate-500">
          Interactive block monitoring
        </p>
      </div>

      <div className="relative h-[650px]">
        <SelectionInfo block={selectedBlock} />

        <BlockLeafletMap
          blocks={blocks}
          selectedBlock={selectedBlock}
          onSelect={onSelect}
        />
      </div>
    </div>
  );
}
