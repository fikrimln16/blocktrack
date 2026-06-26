import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { BlockHeader } from "@/components/block-detail/block-header";
import { BlockSummary } from "@/components/block-detail/block-summary";
import { BlockInformation } from "@/components/block-detail/block-information";
import { OperationalSummary } from "@/components/block-detail/operational-summary";
import { getBlockDetail } from "@/services/block-detail.service";
import { BlockDetailMap } from "@/components/block-detail/block-detail-map";
import { VisitHistory } from "@/components/block-detail/visit-history";

import { getBlockVisits } from "@/services/visit.service";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function BlockDetailPage({ params }: Props) {
  const { id } = await params;

  const [block, visits] = await Promise.all([
    getBlockDetail(Number(id)),
    getBlockVisits(Number(id)),
  ]);

  if (!block) {
    return <div>Block not found</div>;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <BlockHeader block={block} />
        <div className="grid gap-6 xl:grid-cols-12">
          {/* Operational Summary */}
          <div className="xl:col-span-4">
            <OperationalSummary block={block} />
          </div>

          {/* Map */}
          <div className="xl:col-span-8">
            <BlockDetailMap block={block} />
          </div>
        </div>

        <div className="mt-6">
          <VisitHistory visits={visits} />
        </div>

        {/* <BlockSummary block={block} /> */}
        {/* <OperationalSummary block={block} /> */}
      </div>
    </DashboardLayout>
  );
}
