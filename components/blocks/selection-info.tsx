"use client";

import { Block } from "@/types/block";

interface Props {
  block: Block | null;
}

export function SelectionInfo({ block }: Props) {
  if (!block) return null;

  return (
    <div
      className="
            absolute
            right-4
            top-4
            z-[1000]
            w-72
            rounded-2xl
            bg-white
            p-5
            shadow-xl
            "
    >
      <p
        className="
                text-xs
                uppercase
                tracking-wide
                text-slate-500
                "
      >
        Selected Block
      </p>

      <h3
        className="
                mt-2
                text-xl
                font-bold
                "
      >
        {block.block_code}
      </h3>

      <div
        className="
                mt-4
                space-y-2
                text-sm
                "
      >
        <Row title="AMA" value={block.ama} />

        <Row title="Estate" value={block.estate} />

        <Row title="Division" value={String(block.division)} />

        <Row title="Status" value={block.status ?? "-"} />

        <Row title="Area" value={`${block.area_ha} Ha`} />
      </div>
    </div>
  );
}

function Row({ title, value }: { title: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-slate-500">{title}</span>

      <span className="font-medium">{value}</span>
    </div>
  );
}
