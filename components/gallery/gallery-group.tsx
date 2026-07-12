"use client";

import { Building2, FolderKanban, Images, Map } from "lucide-react";

interface Props {
  value: "all" | "ama" | "estate" | "block";
  onChange: (value: "all" | "ama" | "estate" | "block") => void;
}

const groups = [
  {
    value: "all",
    label: "All Photos",
    description: "Show all documentation",
    icon: Images,
  },
  {
    value: "ama",
    label: "AMA",
    description: "Group by AMA",
    icon: FolderKanban,
  },
  {
    value: "estate",
    label: "Estate",
    description: "Group by Estate",
    icon: Building2,
  },
  {
    value: "block",
    label: "Block",
    description: "Group by Block",
    icon: Map,
  },
] as const;

export function GalleryGroup({ value, onChange }: Props) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">View Mode</h2>

        <p className="mt-1 text-sm text-slate-500">
          Organize inspection documentation based on plantation hierarchy.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {groups.map((group) => {
          const Icon = group.icon;

          const active = value === group.value;

          return (
            <button
              key={group.value}
              type="button"
              onClick={() => onChange(group.value)}
              className={`
                flex items-start gap-4 rounded-2xl border p-4 text-left transition-all
                ${
                  active
                    ? "border-blue-600 bg-blue-50 shadow-sm"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }
              `}
            >
              <div
                className={`
                  flex h-11 w-11 items-center justify-center rounded-xl
                  ${
                    active
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600"
                  }
                `}
              >
                <Icon size={20} />
              </div>

              <div className="min-w-0">
                <h3
                  className={`font-semibold ${
                    active ? "text-blue-700" : "text-slate-900"
                  }`}
                >
                  {group.label}
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {group.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
