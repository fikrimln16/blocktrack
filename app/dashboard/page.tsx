export const dynamic = "force-dynamic";
export const revalidate = 0;

import { DashboardLayout } from "@/components/layout/dashboard-layout";

import { DashboardSummary } from "@/components/dashboard/summary/dashboard-summary";
import { RecentActivityFeed } from "@/components/dashboard/recent-visits";
import { RecentPhotosCard } from "@/components/dashboard/recent-photos-card";
import { RecentNotesCard } from "@/components/dashboard/recent-notes-card";
import { TopVisitors } from "@/components/dashboard/top-visitors/top-visitors";
import { NeedAttentionCard } from "@/components/dashboard/need-attention-card";

import {
  getDashboardSummary,
  getRecentActivities,
  getDashboardRecentPhotos,
  getDashboardRecentNotes,
  getTopVisitors,
  getNeedAttention,
} from "@/services/dashboard.service";

export default async function DashboardPage() {
  const [
    summary,
    recentActivities,
    recentPhotos,
    recentNotes,
    topVisitors,
    needAttention,
  ] = await Promise.all([
    getDashboardSummary(),
    getRecentActivities(),
    getDashboardRecentPhotos(),
    getDashboardRecentNotes(),
    getTopVisitors(),
    getNeedAttention(),
  ]);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Summary */}
        <DashboardSummary summary={summary} />

        {/* Recent Notes & Activity */}
        <div className="grid gap-6 xl:grid-cols-2">
          <RecentNotesCard notes={recentNotes} />

          <RecentActivityFeed activities={recentActivities} />
        </div>

        {/* Recent Photos */}
        <RecentPhotosCard photos={recentPhotos} />

        {/* Need Attention & Top Visitors */}
        <div className="grid gap-6 xl:grid-cols-12">
          <div className="xl:col-span-8">
            <NeedAttentionCard items={needAttention} />
          </div>

          <div className="xl:col-span-4">
            <TopVisitors visitors={topVisitors} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
