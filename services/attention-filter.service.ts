import {
  FilterOption,
  getAttentionAmaOptionsRepository,
  getAttentionEstateOptionsRepository,
  getAttentionBlockOptionsRepository,
} from "@/repositories/attention-filter.repository";

/**
 * Get all AMA options
 */
export async function getAttentionAmaOptions(): Promise<FilterOption[]> {
  return await getAttentionAmaOptionsRepository();
}

/**
 * Get estates by AMA
 */
export async function getAttentionEstateOptions(
  amaId: number,
): Promise<FilterOption[]> {
  return await getAttentionEstateOptionsRepository(amaId);
}

/**
 * Get blocks by Estate
 */
export async function getAttentionBlockOptions(
  estateId: number,
): Promise<FilterOption[]> {
  return await getAttentionBlockOptionsRepository(estateId);
}
