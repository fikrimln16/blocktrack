import { getVisitFilterRepository } from "@/repositories/visit-filter.repository";

export async function getVisitFilters() {
  return getVisitFilterRepository();
}
