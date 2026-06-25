import {
  MapPinned,
  Building2,
  SquareStack,
  CalendarDays,
  Clock3,
  Timer,
  CloudSun,
  LocateFixed,
  FileText,
} from "lucide-react";

interface VisitInfoProps {
  visit: any;
  ama: any;
  estate: any;
  block: any;
}

export function VisitInfo({ visit, ama, estate, block }: VisitInfoProps) {
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
      {/* Header */}

      <div className="border-b border-slate-200 px-6 py-5">
        <h3 className="text-lg font-semibold text-slate-900">
          Visit Information
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Detailed information about this visit.
        </p>
      </div>

      <div className="divide-y divide-slate-100">
        {/* LOCATION */}

        <Section
          icon={<MapPinned size={18} className="text-blue-600" />}
          title="Location"
        >
          <InfoRow
            icon={<MapPinned size={16} />}
            label="AMA"
            value={<Badge color="blue">{ama?.code ?? ama?.name}</Badge>}
          />

          <InfoRow
            icon={<Building2 size={16} />}
            label="Estate"
            value={estate?.name}
          />

          <InfoRow
            icon={<SquareStack size={16} />}
            label="Block"
            value={<Badge color="green">{block?.blockCode}</Badge>}
          />
        </Section>

        {/* VISIT */}

        <Section
          icon={<Clock3 size={18} className="text-blue-600" />}
          title="Visit Schedule"
        >
          <InfoRow
            icon={<CalendarDays size={16} />}
            label="Date"
            value={visit.visitDate}
          />

          <InfoRow
            icon={<Clock3 size={16} />}
            label="Time"
            value={visit.visitTime}
          />

          <InfoRow
            icon={<Timer size={16} />}
            label="Duration"
            value={`${visit.duration} Minutes`}
          />
        </Section>

        {/* ENVIRONMENT */}

        <Section
          icon={<CloudSun size={18} className="text-amber-500" />}
          title="Environment"
        >
          <InfoRow
            icon={<CloudSun size={16} />}
            label="Weather"
            value={<Badge color="amber">{visit.weather}</Badge>}
          />
        </Section>

        {/* COORDINATES */}

        <Section
          icon={<LocateFixed size={18} className="text-blue-600" />}
          title="Coordinates"
        >
          <InfoRow
            icon={<LocateFixed size={16} />}
            label="Latitude"
            value={
              <span className="font-mono text-sm">
                {visit.location.latitude.toFixed(6)}
              </span>
            }
          />

          <InfoRow
            icon={<LocateFixed size={16} />}
            label="Longitude"
            value={
              <span className="font-mono text-sm">
                {visit.location.longitude.toFixed(6)}
              </span>
            }
          />
        </Section>

        {/* NOTES */}

        <Section
          icon={<FileText size={18} className="text-blue-600" />}
          title="Visit Notes"
        >
          <div
            className="
              rounded-2xl
              border
              border-slate-200
              bg-slate-50
              p-4
            "
          >
            <p className="text-sm leading-7 text-slate-600">{visit.notes}</p>
          </div>
        </Section>
      </div>
    </div>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-5 p-6">
      <div className="flex items-center gap-2">
        {icon}

        <h4 className="font-semibold text-slate-900">{title}</h4>
      </div>

      <div className="space-y-4">{children}</div>
    </section>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-5">
      <div className="flex items-center gap-3">
        <div className="text-slate-400">{icon}</div>

        <span className="text-sm text-slate-500">{label}</span>
      </div>

      <div className="text-right text-sm font-semibold text-slate-900">
        {value}
      </div>
    </div>
  );
}

function Badge({
  children,
  color,
}: {
  children: React.ReactNode;
  color: "blue" | "green" | "amber";
}) {
  const colors = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    amber: "bg-amber-50 text-amber-700",
  };

  return (
    <span
      className={`
        rounded-lg
        px-3
        py-1
        text-xs
        font-semibold
        ${colors[color]}
      `}
    >
      {children}
    </span>
  );
}
