import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { VisitForm } from "@/components/visit/visit-form";

import { getBlockDetail } from "@/services/block-detail.service";
import { getUsers } from "@/services/user.service";

interface Props {
  searchParams: Promise<{
    block?: string;
  }>;
}

export default async function NewVisitPage({ searchParams }: Props) {
  const { block } = await searchParams;

  if (!block) {
    return (
      <DashboardLayout>
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          Block ID is required.
        </div>
      </DashboardLayout>
    );
  }

  const [blockDetail, users] = await Promise.all([
    getBlockDetail(Number(block)),
    getUsers(),
  ]);

  if (!blockDetail) {
    return (
      <DashboardLayout>
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          Block not found.
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <VisitForm block={blockDetail} users={users} />
    </DashboardLayout>
  );
}
