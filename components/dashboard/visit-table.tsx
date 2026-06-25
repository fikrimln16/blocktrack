import { Eye } from "lucide-react";

const visits = [
  {
    employee: "Fikri Maulana",
    ama: "AMA-001",
    estate: "Estate Timur",
    block: "B12",
    time: "08:15",
    status: "Completed",
    photos: 12,
    files: 3,
  },
  {
    employee: "Aldi Kurniawan",
    ama: "AMA-001",
    estate: "Estate Timur",
    block: "B14",
    time: "08:32",
    status: "On Progress",
    photos: 8,
    files: 2,
  },
  {
    employee: "Denis Saputra",
    ama: "AMA-003",
    estate: "Estate Selatan",
    block: "A07",
    time: "09:10",
    status: "Completed",
    photos: 10,
    files: 4,
  },
];

export function VisitTable() {
  return (
    <div
      className="
        overflow-hidden
        rounded-[28px]
        border border-slate-200
        bg-white
        shadow-sm
      "
    >
      <div className="flex items-center justify-between border-b border-slate-200 p-5">
        <h3 className="font-semibold text-slate-900">Latest Visits</h3>

        <button className="text-sm font-medium text-blue-600">View All</button>
      </div>

      {/* Desktop Table */}

      <div className="hidden xl:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-slate-50">
              <th className="p-4 text-left text-sm">Employee</th>

              <th className="p-4 text-left text-sm">AMA</th>

              <th className="p-4 text-left text-sm">Estate</th>

              <th className="p-4 text-left text-sm">Block</th>

              <th className="p-4 text-left text-sm">Time</th>

              <th className="p-4 text-left text-sm">Status</th>

              <th className="p-4 text-left text-sm">Photos</th>

              <th className="p-4 text-left text-sm">Files</th>

              <th className="p-4 text-center text-sm">Action</th>
            </tr>
          </thead>

          <tbody>
            {visits.map((visit) => (
              <tr key={visit.employee} className="border-b hover:bg-slate-50">
                <td className="p-4">{visit.employee}</td>

                <td className="p-4">{visit.ama}</td>

                <td className="p-4">{visit.estate}</td>

                <td className="p-4">{visit.block}</td>

                <td className="p-4">{visit.time}</td>

                <td className="p-4">
                  <StatusBadge status={visit.status} />
                </td>

                <td className="p-4">{visit.photos}</td>

                <td className="p-4">{visit.files}</td>

                <td className="p-4">
                  <div className="flex justify-center">
                    <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-50">
                      <Eye size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}

      <div className="xl:hidden p-4 space-y-4">
        {visits.map((visit) => (
          <div
            key={visit.employee}
            className="
              rounded-2xl
              border border-slate-200
              bg-slate-50
              p-4
            "
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold text-slate-900">
                  {visit.employee}
                </h4>

                <p className="mt-2 text-sm text-slate-500">{visit.ama}</p>

                <p className="text-sm text-slate-500">{visit.estate}</p>

                <p className="text-sm text-slate-500">Block {visit.block}</p>
              </div>

              <span className="text-sm text-slate-400">{visit.time}</span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <StatusBadge status={visit.status} />

              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                📸 {visit.photos}
              </span>

              <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-medium text-slate-700">
                📄 {visit.files}
              </span>
            </div>

            <button
              className="
                mt-4
                flex w-full items-center justify-center
                gap-2
                rounded-xl
                border border-slate-200
                bg-white
                py-2
              "
            >
              <Eye size={16} />
              View Detail
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`
        rounded-full
        px-3 py-1
        text-xs font-medium
        ${
          status === "Completed"
            ? "bg-green-100 text-green-700"
            : "bg-orange-100 text-orange-700"
        }
      `}
    >
      {status}
    </span>
  );
}
