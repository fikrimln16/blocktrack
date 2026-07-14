import {
  createAttachmentRepository,
  getAttachmentByIdRepository,
  getAttachmentFilterRepository,
  getAttachmentFormRepository,
  getAttachmentListRepository,
  getAttachmentStatisticsRepository,
  getVisitsByEstateRepository,
  deleteAttachmentRepository,
} from "@/repositories/attachment.repository";

import { AttachmentListQuery, CreateAttachmentRequest } from "./validation";

/**
 * ============================================
 * Get Attachment List
 * ============================================
 */
export async function getAttachmentListService(query: AttachmentListQuery) {
  return await getAttachmentListRepository(query);
}

/**
 * ============================================
 * Get Attachment Form Data
 * ============================================
 */
export async function getAttachmentFormService() {
  return await getAttachmentFormRepository();
}

/**
 * ============================================
 * Get Attachment Filter Data
 * ============================================
 */
export async function getAttachmentFilterService() {
  return await getAttachmentFilterRepository();
}

/**
 * ============================================
 * Get Visits by Estate
 * ============================================
 */
export async function getVisitsByEstateService(estateId: number) {
  return await getVisitsByEstateRepository(estateId);
}

/**
 * ============================================
 * Create Attachment
 * ============================================
 */
export async function createAttachmentService(
  payload: CreateAttachmentRequest,
) {
  return await createAttachmentRepository(payload);
}

/**
 * ============================================
 * Get Attachment Statistics
 * ============================================
 */
export async function getAttachmentStatisticsService() {
  return await getAttachmentStatisticsRepository();
}

/**
 * ============================================
 * Get Attachment Detail
 * ============================================
 */
export async function getAttachmentByIdService(id: number) {
  return await getAttachmentByIdRepository(id);
}

/**
 * ============================================
 * Delete Attachment
 * ============================================
 */
export async function deleteAttachmentService(id: number) {
  return await deleteAttachmentRepository(id);
}
