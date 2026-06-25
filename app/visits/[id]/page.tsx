import Link from "next/link";
import { ChevronLeft, Download } from "lucide-react";

import { DashboardLayout } from "@/components/layout/dashboard-layout";

import { VisitHeader } from "@/components/visit-detail/visit-header";
import { VisitInfo } from "@/components/visit-detail/visit-info";
import { VisitMap } from "@/components/visit-detail/visit-map";
import { VisitGallery } from "@/components/visit-detail/visit-gallery";
import { VisitAttachments } from "@/components/visit-detail/visit-attachments";

import { visits } from "@/data/visits";
import { blocks } from "@/data/blocks";
import { estates } from "@/data/estates";
import { amas } from "@/data/amas";

export default function VisitDetailPage() {
  // Dummy visit pertama
  const visit = visits[0];

  // Cari block
  const block = blocks.find((item) => item.id === visit.blockId);

  // Cari estate
  const estate = estates.find((item) => item.id === block?.estateId);

  // Cari AMA
  const ama = amas.find((item) => item.id === estate?.amaId);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Link href="/dashboard">Dashboard</Link>

              <span>/</span>

              <Link href="/visits">Visit History</Link>

              <span>/</span>

              <span>{visit.visitCode}</span>
            </div>

            <h1 className="mt-2 text-3xl font-bold">Visit Detail</h1>

            <p className="mt-1 text-slate-500">Detailed visit information</p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/visits"
              className="flex items-center gap-2 rounded-2xl border px-4 py-3"
            >
              <ChevronLeft size={18} />
              Back
            </Link>

            <button className="flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-white">
              <Download size={18} />
              Download
            </button>
          </div>
        </div>

        {/* Visit Header */}

        <VisitHeader visit={visit} ama={ama} estate={estate} block={block} />

        {/* Info */}

        <div className="grid gap-6 xl:grid-cols-12">
          <div className="xl:col-span-4">
            <VisitInfo visit={visit} ama={ama} estate={estate} block={block} />
          </div>

          <div className="xl:col-span-8">
            <VisitMap visit={visit} block={block} />
          </div>
        </div>

        {/* Gallery */}

        <div className="grid gap-6 xl:grid-cols-12">
          <div className="xl:col-span-8">
            {/* <VisitGallery photos={visit.photos} /> */}
          </div>

          <div className="xl:col-span-4">
            {/* <VisitAttachments attachments={visit.attachments} /> */}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
