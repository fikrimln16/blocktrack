import { getAttentionSummaryRepository } from "@/repositories/attention-summary.repository";
import { getAttentionAmaRepository } from "@/repositories/attention-ama.repository";
import { getAttentionEstateRepository } from "@/repositories/attention-estate.repository";
import { getAttentionBlockRepository } from "@/repositories/attention-block.repository";

export async function getAttentionSummary() {
  return await getAttentionSummaryRepository();
}

export async function getAttentionAma() {
  return await getAttentionAmaRepository();
}

export async function getAttentionEstate(amaId: number) {
  return await getAttentionEstateRepository(amaId);
}

export async function getAttentionBlock(estateId: number) {
  return await getAttentionBlockRepository(estateId);
}

import { getAttentionFilterRepository } from "@/repositories/attention.repository";

export async function getAttentionFilter() {
  return await getAttentionFilterRepository();
}
