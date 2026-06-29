import { DashboardLayout } from "@/components/layout/dashboard-layout";

import { DashboardSummary } from "@/components/dashboard/summary/dashboard-summary";
import { DashboardStatistics } from "@/components/dashboard/statistics/dashboard-statistic";
import { TopVisitors } from "@/components/dashboard/top-visitors/top-visitors";
import { RecentActivityFeed } from "@/components/dashboard/recent-activity/recent-activity";

import { getDashboardSummary } from "@/services/dashboard.service";
import { getDashboardStatistics } from "@/services/dashboard.service";
import { getTopVisitors } from "@/services/dashboard.service";
import { getRecentActivities } from "@/services/dashboard.service";

export default async function DashboardPage() {
  const summary = await getDashboardSummary();
  const statistics = await getDashboardStatistics();
  const topVisitors = await getTopVisitors();
  const recentActivities = await getRecentActivities();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <DashboardSummary summary={summary} />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RecentActivityFeed activities={recentActivities} />
          </div>

          <TopVisitors visitors={topVisitors} />
        </div>
      </div>
    </DashboardLayout>
  );
}
