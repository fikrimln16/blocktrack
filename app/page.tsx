import Link from "next/link";
import { notFound } from "next/navigation";
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

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function VisitDetailPage({ params }: PageProps) {
  const { id } = await params;

  const visit = visits.find((item) => item.id === Number(id));

  if (!visit) {
    notFound();
  }

  const block = blocks.find((item) => item.id === visit.blockId);

  const estate = estates.find((item) => item.id === block?.estateId);

  const ama = amas.find((item) => item.id === estate?.amaId);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Breadcrumb */}

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Link href="/dashboard" className="hover:text-blue-600">
                Dashboard
              </Link>

              <span>/</span>

              <Link href="/visits" className="hover:text-blue-600">
                Visit History
              </Link>

              <span>/</span>

              <span className="text-slate-900">{visit.visitCode}</span>
            </div>

            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Visit Detail
            </h1>

            <p className="mt-1 text-slate-500">
              Detail visit, location, gallery, and attachments.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/visits"
              className="
                flex items-center gap-2
                rounded-2xl
                border border-slate-200
                bg-white
                px-4 py-3
                text-sm
                font-medium
                hover:bg-slate-50
              "
            >
              <ChevronLeft size={18} />
              Back
            </Link>

            <button
              className="
                flex items-center gap-2
                rounded-2xl
                bg-blue-600
                px-4 py-3
                text-sm
                font-medium
                text-white
                hover:bg-blue-700
              "
            >
              <Download size={18} />
              Download Report
            </button>
          </div>
        </div>

        <VisitHeader visit={visit} ama={ama} estate={estate} block={block} />

        <div className="grid gap-6 xl:grid-cols-12">
          <div className="xl:col-span-4">
            <VisitInfo visit={visit} ama={ama} estate={estate} block={block} />
          </div>

          <div className="xl:col-span-8">
            <VisitMap visit={visit} block={block} />
          </div>
        </div>

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
