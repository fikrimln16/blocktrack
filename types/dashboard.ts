export interface DashboardSummary {
  totalVisits: number;

  totalAma: number;

  totalEstates: number;

  totalBlocks: number;

  visitedBlocks: number;

  unvisitedBlocks: number;

  coveragePercentage: number;

  todayVisits: number;

  monthlyVisits: number;

  totalPhotos: number;

  totalAttachments: number;

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
  role: string;
  photo: string;
  inspector: string;

  ama: string;
  estate: string;

  block: string;
  block_code: string;

  visit_date: string;
  visit_time: string;

  status: string;
}

export interface NeedAttention {
  category: string;
  section: string;

  poor: number;
  warning: number;
  good: number;

  priority_score: number;
}
