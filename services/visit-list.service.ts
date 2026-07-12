import { getVisitListRepository } from "@/repositories/visit-list.repository";

import { VisitListQuery } from "@/types/visit-list";

export async function getVisitList(query: VisitListQuery) {
  return getVisitListRepository(query);
}
