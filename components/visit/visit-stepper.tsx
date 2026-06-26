"use client";

import {
  ClipboardList,
  MapPinned,
  Camera,
  FileText,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    title: "Information",
    icon: ClipboardList,
  },
  {
    title: "Location",
    icon: MapPinned,
  },
  {
    title: "Photos",
    icon: Camera,
  },
  {
    title: "Notes",
    icon: FileText,
  },
  {
    title: "Submit",
    icon: CheckCircle2,
  },
];

export function VisitStepper() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap justify-between gap-5">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div key={step.title} className="flex flex-1 items-center gap-4">
              <div
                className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-blue-600
                text-white
              "
              >
                <Icon size={20} />
              </div>

              <div>
                <p className="text-xs uppercase text-slate-400">
                  Step {index + 1}
                </p>

                <p className="font-semibold">{step.title}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
