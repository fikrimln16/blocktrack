export interface AttentionSummary {
  priorityScore: number;

  poor: number;

  warning: number;

  good: number;

  totalVisits: number;

  totalAma: number;

  totalEstate: number;

  totalBlock: number;
}

export interface AttentionAma {
  amaId: number;

  ama: string;

  priorityScore: number;

  poor: number;

  warning: number;

  good: number;

  totalVisits: number;

  totalEstates: number;

  totalBlocks: number;

  lastVisit: string;
}

export interface AttentionEstate {
  estateId: number;

  estate: string;

  amaId: number;

  ama: string;

  priorityScore: number;

  poor: number;

  warning: number;

  good: number;

  totalBlocks: number;

  totalVisits: number;

  lastVisit: string;
}

export interface AttentionBlock {
  blockId: number;

  blockCode: string;

  blockName: string | null;

  estateId: number;

  estate: string;

  amaId: number;

  ama: string;

  priorityScore: number;

  poor: number;

  warning: number;

  good: number;

  totalVisits: number;

  lastVisit: string;
}

export type AttentionPriority = "Poor" | "Warning" | "Good";

export interface AttentionValue {
  poor: number;
  warning: number;
  good: number;
}

export interface AttentionVisit {
  visitId: number;

  visitCode: string;

  inspector: string;

  role: string;

  photo: string | null;

  ama: string;

  estate: string;

  block: string;

  value: AttentionValue;

  priority: AttentionPriority;

  priorityScore: number;

  visitDate: string;

  visitTime: string;

  status: string;
}

export interface AttentionDetail {
  id: number;

  name: string;

  level: "ama" | "estate" | "block";

  priorityScore: number;

  poor: number;

  warning: number;

  good: number;

  totalVisits: number;

  totalEstates?: number;

  totalBlocks?: number;

  lastVisit: string | null;
}

export interface AttentionRankingItem {
  level: "ama" | "estate" | "block";

  name: string;

  amaId?: number;

  estateId?: number;

  blockId?: number;

  totalVisits: number;

  totalEstates?: number;

  totalBlocks?: number;

  poor: number;

  warning: number;

  good: number;

  priorityScore: number;

  lastVisit: string;
}
