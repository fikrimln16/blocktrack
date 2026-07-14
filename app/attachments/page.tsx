import { DashboardLayout } from "@/components/layout/dashboard-layout";

import {
  getAttachmentListRepository,
  getAttachmentStatisticsRepository,
} from "@/repositories/attachment.repository";

import { AttachmentPageClient } from "../../components/attachments/attachment-page-client";

export default async function AttachmentPage() {
  const [attachments, statistics] = await Promise.all([
    getAttachmentListRepository({
      page: 1,
      limit: 20,
    }),

    getAttachmentStatisticsRepository(),
  ]);

  return (
    <DashboardLayout>
      <AttachmentPageClient
        initialData={{
          ...attachments,
          statistics,
        }}
      />
    </DashboardLayout>
  );
}
