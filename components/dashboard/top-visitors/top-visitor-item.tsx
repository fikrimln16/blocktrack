import Image from "next/image";

import { TopVisitor } from "@/types/dashboard";

interface Props {
  visitor: TopVisitor;
  rank: number;
  maxVisit: number;
}

export function TopVisitorItem({ visitor, rank, maxVisit }: Props) {
  const percentage =
    maxVisit === 0 ? 0 : (visitor.totalVisits / maxVisit) * 100;

  const badge =
    rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : `#${rank}`;

  return (
    <div className="flex items-center gap-4 rounded-2xl p-3 transition hover:bg-slate-50">
      <div className="w-8 text-center text-lg">{badge}</div>

      <Image
        src={visitor.photo}
        alt={visitor.name}
        width={48}
        height={48}
        className="rounded-full border object-cover"
      />

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">{visitor.name}</p>

            <p className="text-xs text-slate-500">{visitor.role}</p>
          </div>

          <p className="font-semibold text-blue-600">{visitor.totalVisits}</p>
        </div>

        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-blue-600"
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
