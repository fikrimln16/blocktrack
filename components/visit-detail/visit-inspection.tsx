import {
  ClipboardCheck,
  Leaf,
  Trees,
  Construction,
  CloudRain,
  Briefcase,
} from "lucide-react";

import { VisitDetail } from "@/types/visit-detail";

interface Props {
  visit: VisitDetail;
}

const sections = [
  {
    title: "Plant Condition",
    icon: Leaf,
    items: [
      ["Plant Population", "plant_population"],
      ["Infill Quantity", "plant_infill"],
      ["Termite", "termite"],
      ["Oryctes Pest", "orcytes"],
      ["Rat / Other Pest", "pest"],
      ["Leaf Caterpillar", "leaf_caterpillar"],
      ["Beneficial Weed", "beneficial_weed"],
    ],
  },
  {
    title: "Field Condition",
    icon: Trees,
    items: [
      ["Circle", "circle_condition"],
      ["Harvesting Path", "harvesting_path"],
      ["Interrow", "interrow"],
      ["TPH", "tph_condition"],
      ["Sanitation", "sanitation"],
      ["Cover Crop", "cover_crop"],
    ],
  },
  {
    title: "Infrastructure",
    icon: Construction,
    items: [
      ["Road", "road_condition"],
      ["Bridge", "bridge_condition"],
      ["Footbridge", "footbridge_condition"],
    ],
  },
  {
    title: "Environment",
    icon: CloudRain,
    items: [
      ["Drainage", "drainage_condition"],
      ["Ditch", "ditch_condition"],
      ["Monitoring Well", "monitoring_well"],
    ],
  },
  {
    title: "Management",
    icon: Briefcase,
    items: [["Fertilizing", "fertilizing"]],
  },
];

function getBadge(score: number | null) {
  if (score == null || score === 0) {
    return {
      label: "Not Assessed",
      className: "bg-slate-100 text-slate-500",
    };
  }

  if (score >= 90)
    return {
      label: "Excellent",
      className: "bg-green-100 text-green-700",
    };

  if (score >= 70)
    return {
      label: "Good",
      className: "bg-emerald-100 text-emerald-700",
    };

  if (score >= 50)
    return {
      label: "Fair",
      className: "bg-yellow-100 text-yellow-700",
    };

  if (score >= 30)
    return {
      label: "Poor",
      className: "bg-orange-100 text-orange-700",
    };

  return {
    label: "Very Poor",
    className: "bg-red-100 text-red-700",
  };
}

export function VisitInspection({ visit }: Props) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 px-8 py-6">
        <div className="flex items-center gap-3">
          <ClipboardCheck size={22} className="text-blue-600" />

          <div>
            <h2 className="text-xl font-semibold">Inspection Assessment</h2>

            <p className="text-sm text-slate-500">
              Plantation condition assessment during inspection.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6 p-8">
        {sections.map((section) => {
          const Icon = section.icon;

          const scores = section.items.map(
            ([, key]) => Number((visit as any)[key]) || 0,
          );

          const average = scores.reduce((a, b) => a + b, 0) / scores.length;

          return (
            <div
              key={section.title}
              className="rounded-2xl border border-slate-200"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-blue-100 p-2">
                    <Icon size={18} className="text-blue-600" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {section.title}
                    </h3>

                    <p className="text-xs text-slate-500">
                      {section.items.length} Items
                    </p>
                  </div>
                </div>

                <div className="rounded-xl bg-blue-50 px-4 py-2 text-center">
                  <p className="text-lg font-bold text-blue-600">
                    {Math.round(average)}%
                  </p>

                  <p className="text-[10px] uppercase tracking-wide text-slate-500">
                    Average
                  </p>
                </div>
              </div>

              {/* Items */}
              <div className="grid gap-x-8 gap-y-4 p-6 md:grid-cols-2 xl:grid-cols-3">
                {section.items.map(([label, key]) => {
                  const score = Number((visit as any)[key]) || 0;

                  const badge = getBadge(score);

                  return (
                    <div
                      key={key}
                      className="flex items-center justify-between border-b border-dashed border-slate-200 pb-3 last:border-0"
                    >
                      <div>
                        <p className="text-sm font-medium text-slate-700">
                          {label}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-blue-600">
                          {score}%
                        </span>

                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${badge.className}`}
                        >
                          {badge.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
