"use client";

interface Props {
  status?: string | null;
}

export function BlockStatusBadge({ status }: Props) {
  const value = (status ?? "-").toLowerCase();

  let color = "bg-slate-100 text-slate-700 border-slate-200";

  switch (value) {
    case "tanam":
      color = "bg-green-100 text-green-700 border-green-200";
      break;

    case "pond":
      color = "bg-blue-100 text-blue-700 border-blue-200";
      break;

    case "bangunan":
      color = "bg-orange-100 text-orange-700 border-orange-200";
      break;

    case "hcv":
      color = "bg-purple-100 text-purple-700 border-purple-200";
      break;
  }

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        border
        px-2.5
        py-1
        text-xs
        font-semibold
        ${color}
      `}
    >
      {status || "-"}
    </span>
  );
}
