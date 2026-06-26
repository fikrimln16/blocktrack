"use client";

import Link from "next/link";

import { ChevronRight, ArrowLeft, ClipboardPlus } from "lucide-react";

export function VisitHeader() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/dashboard">Dashboard</Link>

        <ChevronRight size={15} />

        <Link href="/dashboard/blocks">Blocks</Link>

        <ChevronRight size={15} />

        <span className="font-medium text-slate-900">New Visit</span>
      </div>

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-blue-100 p-3">
              <ClipboardPlus size={24} className="text-blue-600" />
            </div>

            <div>
              <h1 className="text-3xl font-bold">Create Visit</h1>

              <p className="text-slate-500">
                Record field inspection for this block.
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/dashboard/blocks"
          className="
          inline-flex
          items-center
          gap-2
          rounded-xl
          border
          border-slate-200
          px-5
          py-3
          hover:bg-slate-50
        "
        >
          <ArrowLeft size={18} />
          Back
        </Link>
      </div>
    </div>
  );
}
