import { getVisitDetail } from "@/repositories/visit-detail.repository";

export async function findVisitDetail(id: number) {
  return await getVisitDetail(id);
}
