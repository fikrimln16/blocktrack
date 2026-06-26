"use client";

import { useMemo, useState } from "react";
import { ArrowDownAZ, ArrowUpAZ } from "lucide-react";

import { Block } from "@/types/block";
import { BlockTableEmpty } from "./block-table-empty";
import { BlockTableRow } from "./block-table-row";

interface Props {
  loading: boolean;
  blocks: Block[];
  selectedBlock: Block | null;
  onSelect: (block: Block) => void;
}

type SortField =
  | "block_code"
  | "estate"
  | "division"
  | "area_ha"
  | "planting_year"
  | "total_visit"
  | "status"
  | "detail";

type SortDirection = "asc" | "desc";

export function BlockTable({
  loading,
  blocks,
  selectedBlock,
  onSelect,
}: Props) {
  const [sortField, setSortField] = useState<SortField>("block_code");

  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  function handleSort(field: SortField) {
    if (field === sortField) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
      return;
    }

    setSortField(field);
    setSortDirection("asc");
  }

  const sortedBlocks = useMemo(() => {
    const data = [...blocks];

    data.sort((a: any, b: any) => {
      let left = a[sortField];
      let right = b[sortField];

      if (typeof left === "string") left = left.toLowerCase();

      if (typeof right === "string") right = right.toLowerCase();

      if (left < right) return sortDirection === "asc" ? -1 : 1;

      if (left > right) return sortDirection === "asc" ? 1 : -1;

      return 0;
    });

    return data;
  }, [blocks, sortField, sortDirection]);

  function Header({
    title,
    field,
    align = "left",
  }: {
    title: string;
    field: SortField;
    align?: "left" | "center" | "right";
  }) {
    const active = sortField === field;

    return (
      <th
        className={`
          px-4 py-3
          text-xs
          font-semibold
          uppercase
          tracking-wide
          text-slate-500
          ${
            align === "center"
              ? "text-center"
              : align === "right"
                ? "text-right"
                : "text-left"
          }
        `}
      >
        <button
          onClick={() => handleSort(field)}
          className="inline-flex items-center gap-1 hover:text-blue-600"
        >
          {title}

          {active ? (
            sortDirection === "asc" ? (
              <ArrowUpAZ size={14} />
            ) : (
              <ArrowDownAZ size={14} />
            )
          ) : (
            <ArrowUpAZ size={14} className="opacity-30" />
          )}
        </button>
      </th>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-slate-200 bg-white px-6 py-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Block List</h2>

          <p className="mt-1 text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-blue-600">{blocks.length}</span>{" "}
            blocks
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            {blocks.length} Total Blocks
          </span>

          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
            Server Side
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="max-h-[500px] overflow-auto">
        <table className="min-w-[1200px] w-full border-separate border-spacing-0">
          <thead className="sticky top-0 z-20 bg-white shadow-sm">
            <tr>
              <Header title="No" field="block_code" align="center" />

              <Header title="Block" field="block_code" />

              <Header title="Estate" field="estate" />

              <Header title="Division" field="division" align="center" />

              <Header title="Area" field="area_ha" align="center" />

              <Header title="Year" field="planting_year" align="center" />

              <Header title="Visit" field="total_visit" align="center" />

              <Header title="Status" field="status" />

              <Header title="detail" field="detail" />
            </tr>
          </thead>

          <tbody className="[&>tr]:border-b [&>tr]:border-slate-100">
            {/* Loading */}
            {loading &&
              Array.from({ length: 8 }).map((_, row) => (
                <tr key={row}>
                  {Array.from({ length: 8 }).map((_, col) => (
                    <td key={col} className="px-5 py-4">
                      <div className="h-5 animate-pulse rounded-full bg-slate-200" />
                    </td>
                  ))}
                </tr>
              ))}

            {/* Empty */}

            {!loading && sortedBlocks.length === 0 && (
              <tr>
                <td colSpan={8} className="py-16">
                  <BlockTableEmpty />
                </td>
              </tr>
            )}

            {/* Data */}

            {!loading &&
              sortedBlocks.map((block, index) => (
                <tr
                  key={block.id}
                  onClick={() => onSelect(block)}
                  className={`
                  cursor-pointer
                  transition-all
                  duration-200

                  ${
                    selectedBlock?.id === block.id
                      ? "bg-blue-50"
                      : "hover:bg-slate-50"
                  }
                `}
                >
                  <BlockTableRow
                    index={index}
                    block={block}
                    active={selectedBlock?.id === block.id}
                    onClick={() => onSelect(block)}
                  />
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}

      <div className="border-t border-slate-200 bg-slate-50 px-6 py-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-700">
              Showing{" "}
              <span className="font-bold text-blue-600">{blocks.length}</span>{" "}
              of <span className="font-bold">{blocks.length}</span> Blocks
            </p>

            <p className="text-xs text-slate-500">
              Click a row to automatically move to the map.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              Live Data
            </span>

            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              Server Side
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
