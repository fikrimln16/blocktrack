const visits = [
  {
    id: 1,
    employee: "Fikri Maulana",
    ama: "AMA-001",
    estate: "Estate Timur",
    block: "B12",
    time: "08:15 WIB",
    status: "Completed",

    avatar: "https://randomuser.me/api/portraits/men/32.jpg",

    photo: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
  },
  {
    id: 2,
    employee: "Aldi Kurniawan",
    ama: "AMA-002",
    estate: "Estate Barat",
    block: "D04",
    time: "08:40 WIB",
    status: "On Progress",

    avatar: "https://randomuser.me/api/portraits/men/44.jpg",

    photo: "https://images.unsplash.com/photo-1464226184884-fa280b87c399",
  },
  {
    id: 3,
    employee: "Denis Saputra",
    ama: "AMA-003",
    estate: "Estate Selatan",
    block: "A07",
    time: "09:10 WIB",
    status: "Completed",

    avatar: "https://randomuser.me/api/portraits/men/68.jpg",

    photo: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
  },
];

export function RecentVisits() {
  return (
    <div
      className="
        rounded-[28px]
        border border-slate-200
        bg-white
        shadow-sm
      "
    >
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Recent Activity
          </h3>

          <p className="text-sm text-slate-500">Latest field visits</p>
        </div>

        <button className="text-sm font-medium text-blue-600">View All</button>
      </div>

      <div className="divide-y divide-slate-100">
        {visits.map((visit) => (
          <div
            key={visit.id}
            className="
              px-6 py-5
              transition-colors
              hover:bg-slate-50
            "
          >
            <div className="flex items-center gap-4">
              {/* Avatar */}

              <img
                src={visit.avatar}
                alt={visit.employee}
                className="
                  h-12
                  w-12
                  flex-shrink-0
                  rounded-full
                  object-cover
                  border-2
                  border-white
                  shadow-sm
                "
              />

              {/* Content */}

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold leading-none text-slate-900">
                      {visit.employee}
                    </h4>

                    <p className="mt-1 text-sm text-slate-500">
                      {visit.ama} • {visit.estate} • Block {visit.block}
                    </p>
                  </div>

                  {/* Visit Photo */}

                  <img
                    src={visit.photo}
                    alt="Visit"
                    className="
                      h-12
                      w-12
                      rounded-lg
                      object-cover
                      border
                      border-slate-200
                    "
                  />
                </div>

                <div className="mt-1 flex items-center gap-2">
                  <span className="text-xs text-slate-500">{visit.time}</span>

                  <span
                    className={`
                      rounded-full
                      px-2 py-0.5
                      text-[11px]
                      font-medium
                      ${
                        visit.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }
                    `}
                  >
                    {visit.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
