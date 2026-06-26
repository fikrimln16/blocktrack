interface Props {
  status: string;
}

export function VisitStatusBadge({ status }: Props) {
  const color =
    status === "Completed"
      ? "bg-green-100 text-green-700"
      : status === "Progress"
        ? "bg-blue-100 text-blue-700"
        : "bg-amber-100 text-amber-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${color}`}>
      {status}
    </span>
  );
}
