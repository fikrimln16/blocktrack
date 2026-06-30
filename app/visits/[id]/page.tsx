import { DashboardLayout } from "@/components/layout/dashboard-layout";

import { VisitHeader } from "@/components/visit-detail/visit-header";
import { VisitSummary } from "@/components/visit-detail/visit-summary";
import { VisitInspector } from "@/components/visit-detail/visit-inspector";
import { VisitOverview } from "@/components/visit-detail/visit-overview";
import { VisitLocation } from "@/components/visit-detail/visit-location";
import { VisitMap } from "@/components/visit-detail/visit-map";
import { VisitDocumentation } from "@/components/visit-detail/documentation/visit-documentation";
import { VisitAttachments } from "@/components/visit-detail/attachments/visit-attachments";

import { findVisitDetail } from "@/services/visit-detail.service";
import { VisitMapWrapper } from "@/components/visit-detail/visit-map-wrapper";
interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function VisitDetailPage({ params }: Props) {
  const { id } = await params;

  const visit = await findVisitDetail(Number(id));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <VisitHeader visit={visit} />

        <VisitSummary visit={visit} />

        <div className="grid items-stretch gap-6 xl:grid-cols-12">
          <div className="xl:col-span-4">
            <VisitInspector visit={visit} />
          </div>

          <div className="xl:col-span-8">
            <VisitOverview visit={visit} />
          </div>
        </div>

        <div className="grid items-stretch gap-6 xl:grid-cols-12">
          <div className="xl:col-span-4">
            <VisitLocation visit={visit} />
          </div>

          <div className="xl:col-span-8">
            <VisitMapWrapper
              latitude={visit.latitude}
              longitude={visit.longitude}
              polygon={visit.polygon}
            />
          </div>
        </div>

        <div className="space-y-8">
          <VisitDocumentation visit={visit} />

          <VisitAttachments visit={visit} />
        </div>
      </div>
    </DashboardLayout>
  );
}
