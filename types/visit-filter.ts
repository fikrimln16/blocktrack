export interface VisitFilterData {
  amas: {
    id: number;
    name: string;
  }[];

  estates: {
    id: number;
    ama_id: number;
    name: string;
  }[];

  blocks: {
    id: number;
    estate_id: number;
    block_code: string;
    block_name: string;
  }[];

  inspectors: {
    id: number;
    name: string;
  }[];

  weathers: string[];

  statuses: string[];
}
