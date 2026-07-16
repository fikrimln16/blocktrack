"use client";

import { Filter, RotateCcw, Search } from "lucide-react";

interface Option {
  id: number;
  name: string;
}

interface Props {
  search: string;

  amaId: string;
  estateId: string;
  blockId: string;

  category: string;
  priority: string;

  dateFrom: string;
  dateTo: string;

  amas: Option[];
  estates: Option[];
  blocks: Option[];

  onSearch: (value: string) => void;

  onAma: (value: string) => void;
  onEstate: (value: string) => void;
  onBlock: (value: string) => void;

  onCategory: (value: string) => void;
  onPriority: (value: string) => void;

  onDateFrom: (value: string) => void;
  onDateTo: (value: string) => void;

  onReset: () => void;
}

const categories = [
  "Produksi",
  "Populasi Pokok",
  "Kuantitas Sisipan",
  "Kuantitas Sisipan 3-5 Tahun",
  "Ganoderma",
  "Rayap",
  "Hama Oryctes",
  "Tikus / Babi / Hama Lain",
  "Ulat Pemakan Daun",
  "Beneficial Weed",
  "Piringan",
  "Pasar Panen",
  "Pasar Rintis",
  "Tunas Pokok",
  "Gawangan Mineral / Gambut",
  "Nomor dan Kebersihan TPH",
  "TPH",
  "Sanitasi Kastrasi",
  "Perawatan Kacangan",
  "Jalan",
  "Jembatan",
  "Titi Panen",
  "Titi Rintis",
  "Kondisi Drainase Blok",
  "Parit",
  "Sumur Pantau",
  "Pencurian",
  "Klaim",
  "Pemupukan",
];

export function AttentionFilter({
  search,

  amaId,
  estateId,
  blockId,

  category,
  priority,

  dateFrom,
  dateTo,

  amas,
  estates,
  blocks,

  onSearch,

  onAma,
  onEstate,
  onBlock,

  onCategory,
  onPriority,

  onDateFrom,
  onDateTo,

  onReset,
}: Props) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-slate-200 px-6 py-5">
        <div className="rounded-2xl bg-blue-100 p-3">
          <Filter className="h-6 w-6 text-blue-600" />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Filter Inspection
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Filter operational inspection findings.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="space-y-5 p-6">
        {/* Search */}
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />

          <input
            type="text"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search visit, inspector, AMA, estate or block..."
            className="
              w-full
              rounded-2xl
              border
              border-slate-200
              py-3
              pl-11
              pr-4
              text-sm
              outline-none
              transition
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-100
            "
          />
        </div>

        {/* Filters */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <select
            value={amaId}
            onChange={(e) => onAma(e.target.value)}
            className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
          >
            <option value="">All AMA</option>

            {amas.map((ama) => (
              <option key={ama.id} value={ama.id}>
                {ama.name}
              </option>
            ))}
          </select>

          <select
            value={estateId}
            onChange={(e) => onEstate(e.target.value)}
            className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
          >
            <option value="">All Estate</option>

            {estates.map((estate) => (
              <option key={estate.id} value={estate.id}>
                {estate.name}
              </option>
            ))}
          </select>

          <select
            value={blockId}
            onChange={(e) => onBlock(e.target.value)}
            className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
          >
            <option value="">All Block</option>

            {blocks.map((block) => (
              <option key={block.id} value={block.id}>
                {block.name}
              </option>
            ))}
          </select>

          <select
            value={category}
            onChange={(e) => onCategory(e.target.value)}
            className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
          >
            <option value="">All Category</option>

            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={priority}
            onChange={(e) => onPriority(e.target.value)}
            className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
          >
            <option value="">All Priority</option>

            <option value="1">Poor</option>

            <option value="2">Warning</option>
          </select>

          <input
            type="date"
            value={dateFrom}
            onChange={(e) => onDateFrom(e.target.value)}
            className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
          />

          <input
            type="date"
            value={dateTo}
            onChange={(e) => onDateTo(e.target.value)}
            className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
          />

          <button
            onClick={onReset}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-2xl
              border
              border-slate-200
              px-4
              py-3
              font-medium
              text-slate-700
              transition
              hover:bg-slate-50
            "
          >
            <RotateCcw size={18} />
            Reset
          </button>
        </div>
      </div>
    </section>
  );
}
