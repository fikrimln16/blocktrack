export interface DashboardSummary {
  totalVisits: number;
  totalAma: number;
  totalEstates: number;
  totalBlocks: number;
  totalPhotos: number;
  totalUsers: number;
}

export interface DashboardStatistics {
  todayVisits: number;
  todayPhotos: number;
  activeInspectors: number;
  averageDuration: number;
}

export interface TopVisitor {
  id: number;
  name: string;
  role: string;
  photo: string;
  totalVisits: number;
}

export interface RecentActivity {
  id: number;
  visit_code: string;
  visit_date: string;

  inspector: string;
  role: string;
  photo: string;

  block_id: number;
  block: string;

  estate: string;
  ama: string;
}
