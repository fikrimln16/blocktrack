export const dynamic = "force-dynamic";
export const revalidate = 0;

import { DashboardLayout } from "@/components/layout/dashboard-layout";

import { DashboardSummary } from "@/components/dashboard/summary/dashboard-summary";
import { RecentActivityFeed } from "@/components/dashboard/recent-visits";
import { RecentPhotosCard } from "@/components/dashboard/recent-photos-card";
import { RecentNotesCard } from "@/components/dashboard/recent-notes-card";

import {
  getDashboardSummary,
  getRecentActivities,
  getDashboardRecentPhotos,
  getDashboardRecentNotes,
} from "@/services/dashboard.service";

export default async function DashboardPage() {
  const [summary, recentActivities, recentPhotos, recentNotes] =
    await Promise.all([
      getDashboardSummary(),
      getRecentActivities(),
      getDashboardRecentPhotos(),
      getDashboardRecentNotes(),
    ]);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Summary */}
        <DashboardSummary summary={summary} />

        {/* Notes & Activity */}
        <div className="grid gap-6 lg:grid-cols-2">
          <RecentNotesCard notes={recentNotes} />

          <RecentActivityFeed activities={recentActivities} />
        </div>

        {/* Recent Photos */}
        <RecentPhotosCard photos={recentPhotos} />

        {/* Top Visitors (Coming Next) */}
      </div>
    </DashboardLayout>
  );
}
