import { MapPinned, Trees, Building2, Camera, TrendingUp } from "lucide-react";

const stats = [
  {
    title: "Total Visit",
    value: "142",
    growth: "+18%",
    icon: MapPinned,
    color: "blue",
  },
  {
    title: "Total AMA",
    value: "23",
    growth: "+3",
    icon: Trees,
    color: "green",
  },
  {
    title: "Total Estate",
    value: "12",
    growth: "+2",
    icon: Building2,
    color: "indigo",
  },
  {
    title: "Photos Uploaded",
    value: "534",
    growth: "+22%",
    icon: Camera,
    color: "orange",
  },
];

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="
              rounded-[28px]
              border border-slate-200
              bg-white
              p-6
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-lg
            "
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {item.title}
                </p>

                <h3 className="mt-3 text-3xl lg:text-4xl font-bold text-slate-900">
                  {item.value}
                </h3>

                <div className="mt-3 flex items-center gap-1">
                  <TrendingUp size={16} className="text-green-500" />

                  <span className="text-sm font-medium text-green-600">
                    {item.growth}
                  </span>

                  <span className="text-sm text-slate-400">this month</span>
                </div>
              </div>

              <div className="rounded-2xl bg-blue-50 p-4">
                <Icon size={24} className="text-blue-600" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
