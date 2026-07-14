"use client";

import { useMemo } from "react";

import {
  ArrowUpDown,
  FileText,
  Search,
  User,
  Building2,
  MapPinned,
} from "lucide-react";

interface Ama {
  id: number;
  code: string;
  name: string;
}

interface Estate {
  id: number;
  ama_id: number;
  name: string;
}

interface Uploader {
  id: number;
  name: string;
}

interface Props {
  amas: Ama[];
  estates: Estate[];
  uploaders: Uploader[];

  search: string;
  setSearch: (value: string) => void;

  ama: string;
  setAma: (value: string) => void;

  estate: string;
  setEstate: (value: string) => void;

  extension: string;
  setExtension: (value: string) => void;

  uploadedBy: string;
  setUploadedBy: (value: string) => void;

  sort: string;
  setSort: (value: string) => void;
}

export function AttachmentFilter({
  amas,
  estates,
  uploaders,

  search,
  setSearch,

  ama,
  setAma,

  estate,
  setEstate,

  extension,
  setExtension,

  uploadedBy,
  setUploadedBy,

  sort,
  setSort,
}: Props) {
  const filteredEstates = useMemo(() => {
    if (!ama) return [];

    return estates.filter((item) => item.ama_id === Number(ama));
  }, [ama, estates]);

  function handleAmaChange(value: string) {
    setAma(value);
    setEstate("");
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        {/* Search */}
        <div className="relative md:col-span-2">
          <Search size={18} className="absolute left-3 top-3 text-slate-400" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search title or file..."
            className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 outline-none transition focus:border-blue-500"
          />
        </div>

        {/* AMA */}
        <div className="relative">
          <Building2
            size={18}
            className="absolute left-3 top-3 text-slate-400"
          />

          <select
            value={ama}
            onChange={(e) => handleAmaChange(e.target.value)}
            className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 outline-none transition focus:border-blue-500"
          >
            <option value="">All AMA</option>

            {amas.map((item) => (
              <option key={item.id} value={item.id}>
                {item.code} - {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* Estate */}
        <div className="relative">
          <MapPinned
            size={18}
            className="absolute left-3 top-3 text-slate-400"
          />

          <select
            value={estate}
            onChange={(e) => setEstate(e.target.value)}
            disabled={!ama}
            className="
              w-full
              rounded-xl
              border
              border-slate-200
              py-2.5
              pl-10
              pr-4
              outline-none
              transition
              focus:border-blue-500
              disabled:cursor-not-allowed
              disabled:bg-slate-100
              disabled:text-slate-400
            "
          >
            <option value="">{ama ? "All Estates" : "Select AMA first"}</option>

            {filteredEstates.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* Extension */}
        <div className="relative">
          <FileText
            size={18}
            className="absolute left-3 top-3 text-slate-400"
          />

          <select
            value={extension}
            onChange={(e) => setExtension(e.target.value)}
            className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 outline-none transition focus:border-blue-500"
          >
            <option value="">All Files</option>
            <option value="pdf">PDF</option>
            <option value="doc">DOC</option>
            <option value="docx">DOCX</option>
            <option value="xls">XLS</option>
            <option value="xlsx">XLSX</option>
            <option value="ppt">PPT</option>
            <option value="pptx">PPTX</option>
            <option value="zip">ZIP</option>
            <option value="rar">RAR</option>
          </select>
        </div>

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
            <option value="created_at_desc">Latest Upload</option>
            <option value="created_at_asc">Oldest Upload</option>
            <option value="title_asc">Title (A-Z)</option>
            <option value="title_desc">Title (Z-A)</option>
            <option value="file_size_desc">Largest File</option>
            <option value="file_size_asc">Smallest File</option>
            <option value="extension_asc">File Type</option>
          </select>
        </div>
      </div>

      {/* Uploaded By */}
      <div className="mt-4">
        <div className="relative">
          <User size={18} className="absolute left-3 top-3 text-slate-400" />

          <select
            value={uploadedBy}
            onChange={(e) => setUploadedBy(e.target.value)}
            className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 outline-none transition focus:border-blue-500"
          >
            <option value="">All Uploaders</option>

            {uploaders.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
