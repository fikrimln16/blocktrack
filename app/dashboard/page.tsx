export const dynamic = "force-dynamic";
export const revalidate = 0;

import { DashboardLayout } from "@/components/layout/dashboard-layout";

import { DashboardSummary } from "@/components/dashboard/summary/dashboard-summary";
import { RecentActivityFeed } from "@/components/dashboard/recent-visits";
import { RecentPhotosCard } from "@/components/dashboard/recent-photos-card";
import { RecentNotesCard } from "@/components/dashboard/recent-notes-card";
import { TopVisitors } from "@/components/dashboard/top-visitors/top-visitors";
import NeedAttentionAmaCard from "@/components/dashboard/need-attention-ama-card";

import {
  getDashboardSummary,
  getRecentActivities,
  getDashboardRecentPhotos,
  getDashboardRecentNotes,
  getTopVisitors,
  getNeedAttentionByAma,
} from "@/services/dashboard.service";

export default async function DashboardPage() {
  const [
    summary,
    recentActivities,
    recentPhotos,
    recentNotes,
    topVisitors,
    needAttentionAma,
  ] = await Promise.all([
    getDashboardSummary(),
    getRecentActivities(),
    getDashboardRecentPhotos(),
    getDashboardRecentNotes(),
    getTopVisitors(),
    getNeedAttentionByAma(),
  ]);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Summary */}
        <DashboardSummary summary={summary} />

        {/* Priority Section */}
        <div className="grid gap-6 xl:grid-cols-12">
          <div className="xl:col-span-8">
            <NeedAttentionAmaCard items={needAttentionAma} />
          </div>

          <div className="xl:col-span-4">
            <TopVisitors visitors={topVisitors} />
          </div>
        </div>

        {/* Operational */}
        <div className="grid gap-6 xl:grid-cols-2">
          <RecentNotesCard notes={recentNotes} />

          <RecentActivityFeed activities={recentActivities} />
        </div>

        {/* Documentation */}
        <RecentPhotosCard photos={recentPhotos} />
      </div>
    </DashboardLayout>
  );
}
