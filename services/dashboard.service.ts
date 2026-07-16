import {
  getDashboardSummaryRepository,
  getDashboardStatisticsRepository,
  getTopVisitorsRepository,
  getRecentActivitiesRepository,
} from "@/repositories/dashboard.repository";
import { getRecentPhotos } from "@/repositories/dashboard-recent-photos.repository";
import { getRecentNotes } from "@/repositories/dashboard-recent-notes.repository";
import { getNeedAttentionRepository } from "@/repositories/dashboard-need-attention.repository";

export async function getDashboardSummary() {
  return await getDashboardSummaryRepository();
}

export async function getDashboardStatistics() {
  return await getDashboardStatisticsRepository();
}

export async function getTopVisitors() {
  return await getTopVisitorsRepository();
}

export async function getRecentActivities() {
  return await getRecentActivitiesRepository();
}

export async function getDashboardRecentPhotos() {
  return await getRecentPhotos();
}

export async function getDashboardRecentNotes() {
  return await getRecentNotes();
}

export async function getNeedAttention() {
  return await getNeedAttentionRepository();
}
