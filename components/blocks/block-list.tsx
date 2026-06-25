"use client";

import { Block } from "@/types/block";
import { BlockCard } from "./block-card";
import { useEffect, useRef } from "react";

interface Props {
  loading: boolean;

  blocks: Block[];

  selectedBlock: Block | null;

  onSelect: (block: Block) => void;
}

export function BlockList({ loading, blocks, selectedBlock, onSelect }: Props) {
  const refs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    if (!selectedBlock) return;

    refs.current[selectedBlock.id]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [selectedBlock]);

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
        <div
          key={block.id}
          ref={(el) => {
            refs.current[block.id] = el;
          }}
        >
          <BlockCard
            block={block}
            active={selectedBlock?.id === block.id}
            onClick={() => onSelect(block)}
          />
        </div>
      ))}
    </div>
  );
}
