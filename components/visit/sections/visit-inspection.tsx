"use client";

import { useState } from "react";
import { ClipboardCheck, ChevronDown } from "lucide-react";
import { UseFormRegister, UseFormWatch } from "react-hook-form";

import { VisitFormValues } from "@/types/visit-form";

interface Props {
  register: UseFormRegister<VisitFormValues>;
  watch: UseFormWatch<VisitFormValues>;
}

const SECTIONS = [
  {
    title: "🌴 Plant Condition",
    fields: [
      ["plant_population", "Plant Population"],
      ["plant_infill", "Infill Quantity"],
      ["termite", "Termite"],
      ["orcytes", "Oryctes Pest"],
      ["pest", "Rat / Wild Boar / Other Pest"],
      ["leaf_caterpillar", "Leaf Eating Caterpillar"],
      ["beneficial_weed", "Beneficial Weed"],
    ],
  },
  {
    title: "🌱 Field Condition",
    fields: [
      ["circle_condition", "Circle"],
      ["harvesting_path", "Harvesting Path"],
      ["interrow", "Interrow"],
      ["tph_condition", "TPH"],
      ["sanitation", "Sanitation / Castration"],
      ["cover_crop", "Cover Crop Maintenance"],
    ],
  },
  {
    title: "🛣 Infrastructure",
    fields: [
      ["road_condition", "Road"],
      ["bridge_condition", "Bridge"],
      ["footbridge_condition", "Footbridge"],
    ],
  },
  {
    title: "🌧 Environmental",
    fields: [
      ["drainage_condition", "Block Drainage"],
      ["ditch_condition", "Ditch"],
      ["monitoring_well", "Monitoring Well"],
    ],
  },
  {
    title: "👷 Plantation Management",
    fields: [["fertilizing", "Fertilizing"]],
  },
];

function getCategory(value: number) {
  if (value >= 90) {
    return {
      label: "Excellent",
      color: "bg-green-100 text-green-700",
    };
  }

  if (value >= 70) {
    return {
      label: "Good",
      color: "bg-emerald-100 text-emerald-700",
    };
  }

  if (value >= 50) {
    return {
      label: "Fair",
      color: "bg-yellow-100 text-yellow-700",
    };
  }

  if (value >= 30) {
    return {
      label: "Poor",
      color: "bg-orange-100 text-orange-700",
    };
  }

  if (value > 0) {
    return {
      label: "Very Poor",
      color: "bg-red-100 text-red-700",
    };
  }

  return {
    label: "Not Assessed",
    color: "bg-slate-100 text-slate-500",
  };
}

export function VisitInspection({ register, watch }: Props) {
  // Section pertama otomatis terbuka
  const [openSection, setOpenSection] = useState(0);

  return (
    <section className="mt-10 border-t border-slate-200 pt-10">
      <div className="mb-8 flex items-center gap-3">
        <ClipboardCheck size={24} className="text-blue-600" />

        <div>
          <h2 className="text-xl font-semibold">Inspection Assessment</h2>

          <p className="text-sm text-slate-500">
            Evaluate each inspection item by giving a score between 0 and 100.
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="mb-8 flex flex-wrap gap-2">
        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
          0-29 Very Poor
        </span>

        <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
          30-49 Poor
        </span>

        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
          50-69 Fair
        </span>

        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
          70-89 Good
        </span>

        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
          90-100 Excellent
        </span>
      </div>

      <div className="space-y-5">
        {SECTIONS.map((section, index) => {
          const completed = section.fields.filter(([field]) => {
            return Number(watch(field as keyof VisitFormValues) || 0) > 0;
          }).length;

          return (
            <div
              key={section.title}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
            >
              <button
                type="button"
                onClick={() =>
                  setOpenSection((prev) => (prev === index ? -1 : index))
                }
                className="flex w-full items-center justify-between px-6 py-5 transition hover:bg-slate-50"
              >
                <div className="text-left">
                  <h3 className="text-lg font-semibold">{section.title}</h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {completed} / {section.fields.length} assessed
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                    {Math.round((completed / section.fields.length) * 100)}%
                  </span>

                  <ChevronDown
                    size={22}
                    className={`transition duration-300 ${
                      openSection === index ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              {openSection === index && (
                <div className="border-t border-slate-200 p-6">
                  <div className="grid gap-5 lg:grid-cols-2">
                    {section.fields.map(([field, label]) => {
                      const value =
                        Number(watch(field as keyof VisitFormValues)) || 0;

                      const category = getCategory(value);

                      return (
                        <div
                          key={field}
                          className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-blue-300"
                        >
                          <div className="mb-4 flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold text-slate-800">
                                {label}
                              </h4>

                              <p className="mt-1 text-sm font-medium text-blue-600">
                                {value}%
                              </p>
                            </div>

                            <span
                              className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${category.color}`}
                            >
                              {category.label}
                            </span>
                          </div>

                          <input
                            type="range"
                            min={0}
                            max={100}
                            step={1}
                            defaultValue={0}
                            {...register(field as keyof VisitFormValues, {
                              valueAsNumber: true,
                            })}
                            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-blue-600"
                          />

                          <div className="mt-2 flex justify-between text-xs text-slate-400">
                            <span>0</span>
                            <span>25</span>
                            <span>50</span>
                            <span>75</span>
                            <span>100</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
