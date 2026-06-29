import {
  getDashboardSummaryRepository,
  getDashboardStatisticsRepository,
  getTopVisitorsRepository,
  getRecentActivitiesRepository,
} from "@/repositories/dashboard.repository";

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
