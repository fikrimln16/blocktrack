"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, Plus } from "lucide-react";

import { VisitDetail } from "@/types/visit-detail";

import { DocumentationHeader } from "./documentation-header";
import { EmptyState } from "./empty-state";
import { PhotoGallery } from "./photo-gallery";
import { AddDocumentationModal } from "./add-documentaion-modal";

interface Props {
  visit: VisitDetail;
}

export function VisitDocumentation({ visit }: Props) {
  const router = useRouter();

  const photos = visit.photos ?? [];

  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <AddDocumentationModal
          visitId={visit.id}
          onClose={() => setOpen(false)}
          onSuccess={() => router.refresh()}
        />
      )}

      <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        {/* Header */}
        <div className="border-b border-slate-200 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-blue-50 p-3">
                <Camera size={22} className="text-blue-600" />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Documentation
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Inspection photos collected during this visit.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-blue-600
                px-4
                py-2.5
                text-sm
                font-medium
                text-white
                transition
                hover:bg-blue-700
              "
            >
              <Plus size={18} />
              Add Photos
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6 p-6">
          <DocumentationHeader photos={photos} />

          {photos.length === 0 ? (
            <EmptyState />
          ) : (
            <PhotoGallery photos={photos} />
          )}
        </div>
      </section>
    </>
  );
}
