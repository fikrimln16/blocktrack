"use client";

import { Block } from "@/types/block";
import { BlockCard } from "./block-card";

interface Props {
  loading: boolean;

  blocks: Block[];

  selectedBlock: Block | null;

  onSelect: (block: Block) => void;
}

export function BlockList({ loading, blocks, selectedBlock, onSelect }: Props) {
  if (loading) {
    return (
      <div className="rounded-[28px] border border-slate-200 bg-white p-10 text-center">
        Loading blocks...
      </div>
    );
  }

  if (blocks.length === 0) {
    return (
      <div className="rounded-[28px] border border-slate-200 bg-white p-10 text-center text-slate-500">
        No block found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {blocks.map((block) => (
        <BlockCard
          key={block.id}
          block={block}
          active={selectedBlock?.id === block.id}
          onClick={() => onSelect(block)}
        />
      ))}
    </div>
  );
}
