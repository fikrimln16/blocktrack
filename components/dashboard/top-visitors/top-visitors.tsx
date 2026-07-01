import { Trophy } from "lucide-react";

import { TopVisitor } from "@/types/dashboard";

import { TopVisitorItem } from "./top-visitor-item";

interface Props {
  visitors: TopVisitor[];
}

export function TopVisitors({ visitors }: Props) {
  const maxVisit = visitors.length > 0 ? visitors[0].totalVisits : 0;

  return (
    <div className="flex h-[420px] flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-100">
          <Trophy className="text-yellow-600" size={22} />
        </div>

        <div>
          <h2 className="text-lg font-semibold">Top Visitors</h2>

          <p className="text-sm text-slate-500">
            Visitors with the highest number of visits.
          </p>
        </div>
      </div>

      <div className="max-h-[300px] space-y-3 overflow-y-auto pr-2">
        {visitors.map((visitor, index) => (
          <TopVisitorItem
            key={visitor.id}
            visitor={visitor}
            rank={index + 1}
            maxVisit={maxVisit}
          />
        ))}
      </div>
    </div>
  );
}
