"use client";

import { RotateCcw, Search } from "lucide-react";

import { GalleryFilterData } from "@/types/gallery";

interface Props {
  filters: GalleryFilterData;

  search: string;
  setSearch: (v: string) => void;

  ama: string;
  setAma: (v: string) => void;

  estate: string;
  setEstate: (v: string) => void;

  block: string;
  setBlock: (v: string) => void;

  inspector: string;
  setInspector: (v: string) => void;
}

export function GalleryFilter({
  filters,

  search,
  setSearch,

  ama,
  setAma,

  estate,
  setEstate,

  block,
  setBlock,

  inspector,
  setInspector,
}: Props) {
  const estates = filters.estates.filter(
    (item) => !ama || item.ama_id === Number(ama),
  );

  const blocks = filters.blocks.filter(
    (item) => !estate || item.estate_id === Number(estate),
  );

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 lg:grid-cols-6">
        {/* Search */}
        <div className="relative lg:col-span-2">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search block..."
            className="h-11 w-full rounded-xl border border-slate-200 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500"
          />
        </div>

        {/* AMA */}
        <select
          value={ama}
          onChange={(e) => {
            setAma(e.target.value);
            setEstate("");
            setBlock("");
          }}
          className="h-11 rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-blue-500"
        >
          <option value="">All AMA</option>

          {filters.amas.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        {/* Estate */}
        <select
          value={estate}
          onChange={(e) => {
            setEstate(e.target.value);
            setBlock("");
          }}
          className="h-11 rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-blue-500"
        >
          <option value="">All Estate</option>

          {estates.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        {/* Block */}
        <select
          value={block}
          onChange={(e) => setBlock(e.target.value)}
          className="h-11 rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-blue-500"
        >
          <option value="">All Block</option>

          {blocks.map((item) => (
            <option key={item.id} value={item.id}>
              {item.block_code}
              {item.block_name ? ` - ${item.block_name}` : ""}
            </option>
          ))}
        </select>

        {/* Inspector */}
        <select
          value={inspector}
          onChange={(e) => setInspector(e.target.value)}
          className="h-11 rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-blue-500"
        >
          <option value="">All Inspector</option>

          {filters.inspectors.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5 flex justify-end">
        <button
          onClick={() => {
            setSearch("");
            setAma("");
            setEstate("");
            setBlock("");
            setInspector("");
          }}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm transition hover:bg-slate-50"
        >
          <RotateCcw size={16} />
          Reset Filters
        </button>
      </div>
    </div>
  );
}
