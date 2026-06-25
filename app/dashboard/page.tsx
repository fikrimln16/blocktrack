import { DashboardLayout } from "@/components/layout/dashboard-layout";

import { StatsCards } from "@/components/dashboard/stats-card";
import { MonitoringMap } from "@/components/dashboard/monitoring-map";
import { RecentVisits } from "@/components/dashboard/recent-visits";
import { VisitTable } from "@/components/dashboard/visit-table";
import { SummaryChart } from "@/components/dashboard/summary-charts";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <StatsCards />

        {/* MAP + ACTIVITY */}

        <div className="grid gap-6 2xl:grid-cols-12">
          <div className="2xl:col-span-8">
            <MonitoringMap />
          </div>

          <div className="2xl:col-span-4">
            <RecentVisits />
          </div>
        </div>

        {/* TABLE + SUMMARY */}

        <div className="grid gap-6 2xl:grid-cols-12">
          <div className="2xl:col-span-8">
            <VisitTable />
          </div>

          <div className="2xl:col-span-4">
            <SummaryChart />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
