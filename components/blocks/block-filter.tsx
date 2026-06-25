"use client";

import { Search, RotateCcw } from "lucide-react";

interface Option {
  id: number;
  name: string;
}

interface Props {
  amas: Option[];
  estates: Option[];

  search: string;
  amaId: string;
  estateId: string;
  status: string;
  division: string;

  onSearch: (v: string) => void;
  onAma: (v: string) => void;
  onEstate: (v: string) => void;
  onStatus: (v: string) => void;
  onDivision: (v: string) => void;
  onReset: () => void;
}

export function BlockFilter({
  amas,
  estates,
  search,
  amaId,
  estateId,
  status,
  division,
  onSearch,
  onAma,
  onEstate,
  onStatus,
  onDivision,
  onReset,
}: Props) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        <div className="relative xl:col-span-2">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search block..."
            className="h-11 w-full rounded-xl border border-slate-200 pl-10 pr-3 outline-none focus:border-blue-500"
          />
        </div>

        <select
          value={amaId}
          onChange={(e) => {
            console.log(e.target.value);
            onAma(e.target.value);
          }}
        >
          <option value="">All AMA</option>

          {amas.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        <select
          value={estateId}
          onChange={(e) => onEstate(e.target.value)}
          className="h-11 rounded-xl border border-slate-200 px-3"
        >
          <option value="">All Estate</option>

          {estates.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        <select
          value={division}
          onChange={(e) => onDivision(e.target.value)}
          className="h-11 rounded-xl border border-slate-200 px-3"
        >
          <option value="">Division</option>

          <option value="1">Division 1</option>
          <option value="2">Division 2</option>
          <option value="3">Division 3</option>
          <option value="4">Division 4</option>
        </select>

        <div className="flex gap-2">
          <select
            value={status}
            onChange={(e) => onStatus(e.target.value)}
            className="h-11 flex-1 rounded-xl border border-slate-200 px-3"
          >
            <option value="">Status</option>
            <option value="HCV">HCV</option>
            <option value="Bangunan">Bangunan</option>
            <option value="Tanam">Tanam</option>
          </select>

          <button
            onClick={onReset}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-50"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
