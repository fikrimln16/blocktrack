export const dynamic = "force-dynamic";

import { DashboardLayout } from "@/components/layout/dashboard-layout";

import { VisitHeader } from "@/components/visits/visit-header";
import { VisitSummary } from "@/components/visits/visit-summary";
import { VisitPageClient } from "@/components/visits/visit-page-client";

import { getVisitList } from "@/services/visit-list.service";
import { getVisitFilters } from "@/services/visit-filter.service";

export default async function VisitsPage() {
  const result = await getVisitList({
    page: 1,
    limit: 20,
  });

  const [visits, filters] = await Promise.all([
    getVisitList({
      page: 1,
      limit: 20,
    }),
    getVisitFilters(),
  ]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <VisitHeader />

        <VisitSummary total={result.total} visits={result.data} />

        <VisitPageClient initialData={visits} filters={filters} />
      </div>
    </DashboardLayout>
  );
}
