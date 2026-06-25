import { CheckCircle2, Users, Clock3, TrendingUp } from "lucide-react";

export function SummaryChart() {
  return (
    <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-1">
      {/* Visit Completion */}

      <div
        className="
          rounded-[28px]
          border border-slate-200
          bg-white
          p-6
          shadow-sm
        "
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Visit Completion</p>

            <h3 className="mt-2 text-4xl font-bold text-slate-900">84%</h3>
          </div>

          <div className="rounded-2xl bg-green-100 p-3">
            <CheckCircle2 size={22} className="text-green-600" />
          </div>
        </div>

        <div className="mt-6">
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-blue-600"
              style={{
                width: "84%",
              }}
            />
          </div>

          <div className="mt-3 flex justify-between text-sm text-slate-500">
            <span>142 Visits</span>
            <span>169 Target</span>
          </div>
        </div>
      </div>

      {/* Quick Summary */}

      <div
        className="
          rounded-[28px]
          border border-slate-200
          bg-white
          p-6
          shadow-sm
        "
      >
        <h3 className="mb-5 text-lg font-semibold text-slate-900">
          Quick Summary
        </h3>

        <div className="space-y-4">
          <SummaryItem
            icon={<Users size={18} className="text-blue-600" />}
            title="Active Employee"
            value="18"
            bg="bg-blue-100"
          />

          <SummaryItem
            icon={<Clock3 size={18} className="text-orange-600" />}
            title="Ongoing Visit"
            value="7"
            bg="bg-orange-100"
          />

          <SummaryItem
            icon={<TrendingUp size={18} className="text-green-600" />}
            title="Daily Average"
            value="24"
            bg="bg-green-100"
          />
        </div>
      </div>

      {/* Top Estate */}

      <div
        className="
          rounded-[28px]
          border border-slate-200
          bg-white
          p-6
          shadow-sm
          md:col-span-2
          2xl:col-span-1
        "
      >
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Top Estate</h3>

          <span className="text-sm text-slate-400">Monthly</span>
        </div>

        <div className="space-y-5">
          {[
            {
              estate: "Estate Timur",
              progress: 95,
            },
            {
              estate: "Estate Barat",
              progress: 88,
            },
            {
              estate: "Estate Selatan",
              progress: 76,
            },
          ].map((estate) => (
            <div key={estate.estate}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">
                  {estate.estate}
                </span>

                <span className="text-sm font-semibold text-slate-500">
                  {estate.progress}%
                </span>
              </div>

              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-blue-600"
                  style={{
                    width: `${estate.progress}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface SummaryItemProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  bg: string;
}

function SummaryItem({ icon, title, value, bg }: SummaryItemProps) {
  return (
    <div
      className="
        flex items-center justify-between
        rounded-2xl
        bg-slate-50
        p-4
      "
    >
      <div className="flex items-center gap-3">
        <div
          className={`
            rounded-xl
            p-2
            ${bg}
          `}
        >
          {icon}
        </div>

        <span className="font-medium text-slate-700">{title}</span>
      </div>

      <span className="text-lg font-bold text-slate-900">{value}</span>
    </div>
  );
}
