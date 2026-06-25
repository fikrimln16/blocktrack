import { Map, Building2, Grid2x2, CircleCheckBig } from "lucide-react";

interface Props {
  summary: {
    totalAma: number;
    totalEstate: number;
    totalBlock: number;
    visitedBlock: number;
  };
}

export function BlockSummary({ summary }: Props) {
  return (
    <div
      className="
        grid
        gap-5
        sm:grid-cols-2
        xl:grid-cols-4
      "
    >
      <Card
        title="Total AMA"
        value={summary.totalAma}
        color="bg-blue-50 text-blue-600"
        icon={<Map size={22} />}
      />

      <Card
        title="Total Estate"
        value={summary.totalEstate}
        color="bg-green-50 text-green-600"
        icon={<Building2 size={22} />}
      />

      <Card
        title="Total Blocks"
        value={summary.totalBlock}
        color="bg-orange-50 text-orange-600"
        icon={<Grid2x2 size={22} />}
      />

      <Card
        title="Visited Block"
        value={summary.visitedBlock}
        color="bg-purple-50 text-purple-600"
        icon={<CircleCheckBig size={22} />}
      />
    </div>
  );
}

function Card({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div
      className="
        rounded-[26px]
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            {value.toLocaleString()}
          </h2>
        </div>

        <div
          className={`
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            ${color}
          `}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
