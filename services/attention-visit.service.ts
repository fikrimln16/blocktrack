import { getAttentionVisitsRepository } from "@/repositories/attention-visit.repository";

interface Filter {
  amaId?: number;
  estateId?: number;
  blockId?: number;

  page?: number;
  limit?: number;
}

export async function getAttentionVisits(filter: Filter) {
  return await getAttentionVisitsRepository(filter);
}
