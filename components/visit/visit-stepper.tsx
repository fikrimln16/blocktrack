"use client";

import {
  UserCheck,
  ClipboardList,
  MapPinned,
  Camera,
  ClipboardCheck,
  FileText,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    title: "Inspector",
    description: "Select inspector",
    icon: UserCheck,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Information",
    description: "Visit information",
    icon: ClipboardList,
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    title: "Location",
    description: "GPS & Map",
    icon: MapPinned,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Documentation",
    description: "Upload photos",
    icon: Camera,
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "Assessment",
    description: "Inspection score",
    icon: ClipboardCheck,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Notes",
    description: "Observation",
    icon: FileText,
    color: "bg-pink-100 text-pink-600",
  },
  {
    title: "Submit",
    description: "Review & Save",
    icon: CheckCircle2,
    color: "bg-emerald-100 text-emerald-600",
  },
];

export function VisitStepper() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-7">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div
              key={step.title}
              className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-5
                transition
                hover:-translate-y-1
                hover:border-blue-300
                hover:shadow-md
              "
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${step.color}`}
              >
                <Icon size={22} />
              </div>

              <div className="mt-4">
                <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Step {index + 1}
                </span>

                <h3 className="mt-1 font-semibold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
