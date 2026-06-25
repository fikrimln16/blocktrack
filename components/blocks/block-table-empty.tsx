"use client";

import { SearchX } from "lucide-react";

export function BlockTableEmpty() {
  return (
    <div className="flex h-72 flex-col items-center justify-center text-center">
      <SearchX size={42} className="text-slate-300" />

      <h3 className="mt-4 text-lg font-semibold">Block Tidak Ditemukan</h3>

      <p className="mt-1 text-sm text-slate-500">
        Coba ubah filter atau kata pencarian.
      </p>
    </div>
  );
}
