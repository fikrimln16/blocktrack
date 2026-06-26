import { DashboardLayout } from "@/components/layout/dashboard-layout";

import { VisitForm } from "@/components/visit/visit-form";

import { getBlockDetail } from "@/services/block-detail.service";

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

  const blockDetail = await getBlockDetail(Number(block));

  return (
    <DashboardLayout>
      <VisitForm block={blockDetail} />
    </DashboardLayout>
  );
}
