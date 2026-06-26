"use client";

import { FileText } from "lucide-react";
import { UseFormRegister, UseFormWatch, FieldErrors } from "react-hook-form";

import { VisitFormValues } from "@/types/visit-form";
interface Props {
  register: UseFormRegister<VisitFormValues>;
  watch: UseFormWatch<VisitFormValues>;
  errors: FieldErrors<VisitFormValues>;
}

export function VisitNotes({ register, watch }: Props) {
  const notes = watch("notes") || "";

  return (
    <div className="mt-10 border-t border-slate-200 pt-10">
      <div className="mb-6 flex items-center gap-2">
        <FileText size={22} className="text-blue-600" />

        <div>
          <h2 className="text-xl font-semibold">Inspection Notes</h2>

          <p className="text-sm text-slate-500">
            Write your observation during inspection.
          </p>
        </div>
      </div>

      <textarea
        {...register("notes")}
        rows={8}
        maxLength={1000}
        placeholder="Example:
         - Harvest condition
         - Pest attack
         - Road condition
         - Drainage
         - Recommendation..."
        className="
          w-full
          rounded-2xl
          border
          border-slate-200
          p-5
          outline-none
          transition
          focus:border-blue-500
          focus:ring-4
          focus:ring-blue-100
        "
      />

      <div className="mt-3 text-right text-sm text-slate-500">
        {notes.length} / 1000
      </div>
    </div>
  );
}
