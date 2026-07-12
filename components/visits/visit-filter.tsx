"use client";

import { ArrowUpDown, RotateCcw, Search } from "lucide-react";

import { VisitFilterData } from "@/types/visit-filter";

interface Props {
  filters: VisitFilterData;

  search: string;
  setSearch: (value: string) => void;

  ama: string;
  setAma: (value: string) => void;

  estate: string;
  setEstate: (value: string) => void;

  block: string;
  setBlock: (value: string) => void;

  inspector: string;
  setInspector: (value: string) => void;

  weather: string;
  setWeather: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;

  sort: string;
  setSort: (value: string) => void;
}

export function VisitFilter({
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

  weather,
  setWeather,

  status,
  setStatus,

  sort,
  setSort,
}: Props) {
  const estates = filters.estates.filter(
    (item) => !ama || item.ama_id === Number(ama),
  );

  const blocks = filters.blocks.filter(
    (item) => !estate || item.estate_id === Number(estate),
  );

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 lg:grid-cols-4 xl:grid-cols-5">
        {/* Search */}
        <div className="relative xl:col-span-2">
          <Search size={18} className="absolute left-3 top-3 text-slate-400" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search visit, block..."
            className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 outline-none transition focus:border-blue-500"
          />
        </div>

        {/* AMA */}
        <Select
          value={ama}
          onChange={(value) => {
            setAma(value);
            setEstate("");
            setBlock("");
          }}
          placeholder="AMA"
          options={filters.amas.map((item) => ({
            value: String(item.id),
            label: item.name,
          }))}
        />

        {/* Estate */}
        <Select
          value={estate}
          onChange={(value) => {
            setEstate(value);
            setBlock("");
          }}
          placeholder="Estate"
          options={estates.map((item) => ({
            value: String(item.id),
            label: item.name,
          }))}
        />

        {/* Block */}
        <Select
          value={block}
          onChange={setBlock}
          placeholder="Block"
          options={blocks.map((item) => ({
            value: String(item.id),
            label: item.block_code,
          }))}
        ></Select>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-4 xl:grid-cols-5">
        {/* Inspector */}
        <Select
          value={inspector}
          onChange={setInspector}
          placeholder="Inspector"
          options={filters.inspectors.map((item) => ({
            value: String(item.id),
            label: item.name,
          }))}
        />

        {/* Weather */}
        <Select
          value={weather}
          onChange={setWeather}
          placeholder="Weather"
          options={filters.weathers.map((item) => ({
            value: item,
            label: item,
          }))}
        />

        {/* Status */}
        <Select
          value={status}
          onChange={setStatus}
          placeholder="Status"
          options={filters.statuses.map((item) => ({
            value: item,
            label: item,
          }))}
        />

        {/* Sort */}
        <div className="relative">
          <ArrowUpDown
            size={18}
            className="absolute left-3 top-3 text-slate-400"
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 outline-none transition focus:border-blue-500"
          >
            <option value="visit_date">Latest Visit</option>

            <option value="visit_code">Visit Code</option>

            <option value="duration">Duration</option>

            <option value="total_photos">Most Photos</option>
          </select>
        </div>

        {/* Reset */}
        <button
          onClick={() => {
            setSearch("");

            setAma("");

            setEstate("");

            setBlock("");

            setInspector("");

            setWeather("");

            setStatus("");

            setSort("visit_date");
          }}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 transition hover:bg-slate-50"
        >
          <RotateCcw size={16} />
          Reset Filters
        </button>
      </div>
    </div>
  );
}

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: SelectOption[];
}

function Select({ value, onChange, placeholder, options }: SelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 outline-none transition focus:border-blue-500"
    >
      <option value="">All {placeholder}</option>

      {options.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
}
