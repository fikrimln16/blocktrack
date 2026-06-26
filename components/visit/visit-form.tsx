"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

import { VisitHeader } from "./visit-header";
import { VisitStepper } from "./visit-stepper";

import { VisitInformation } from "./sections/visit-information";
import { VisitLocation } from "./sections/visit-location";
import { VisitMap } from "./sections/visit-map";
import { VisitPhotos } from "./sections/visit-photos";
import { VisitNotes } from "./sections/visit-notes";
import { VisitSummary } from "./sections/visit-summary";

import { Block } from "@/types/block";
import { VisitFormValues } from "@/types/visit-form";

interface Props {
  block: Block;
}

export function VisitForm({ block }: Props) {
  const [saving, setSaving] = useState(false);
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<VisitFormValues>({
    defaultValues: {
      visit_date: new Date().toISOString().slice(0, 10),
      visit_time: new Date().toTimeString().slice(0, 5),

      weather: "Sunny",
      duration: 30,

      latitude: undefined,
      longitude: undefined,
      accuracy: undefined,

      notes: "",
    },
  });

  const [photos, setPhotos] = useState<File[]>([]);

  const onSubmit = async (data: VisitFormValues) => {
    try {
      setSaving(true);

      // Validasi sederhana
      if (!data.latitude || !data.longitude) {
        alert("Please capture GPS location.");
        return;
      }

      if (photos.length === 0) {
        alert("Please upload at least one photo.");
        return;
      }

      // Payload visit
      const visitPayload = {
        block_id: block.id,
        visit_date: data.visit_date,
        visit_time: data.visit_time,
        weather: data.weather,
        duration: data.duration,
        latitude: data.latitude,
        longitude: data.longitude,
        accuracy: data.accuracy,
        notes: data.notes,
      };

      // ==========================
      // FormData
      // ==========================

      const formData = new FormData();

      formData.append("visit", JSON.stringify(visitPayload));

      photos.forEach((photo) => {
        formData.append("photos", photo);
      });

      // ==========================
      // DEBUG
      // ==========================

      console.log("========== VISIT ==========");
      console.log(visitPayload);

      console.log("========== PHOTOS ==========");
      console.log(photos);

      console.log("========== FORMDATA ==========");

      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      // ==========================
      // REQUEST
      // ==========================

      const response = await fetch("/api/visits", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      console.log(result);

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to save visit");
      }

      alert("Visit created successfully.");

      // nanti bisa diarahkan ke detail visit
      // router.push(`/dashboard/visits/${result.visitId}`);
    } catch (error) {
      console.error(error);

      alert("Failed to save visit.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <VisitHeader />

      <VisitStepper />

      <div className="grid gap-6 xl:grid-cols-12">
        {/* LEFT */}
        <div className="xl:col-span-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <VisitInformation register={register} errors={errors} />

            <VisitLocation watch={watch} setValue={setValue} errors={errors} />

            <VisitMap
              block={block}
              latitude={watch("latitude")}
              longitude={watch("longitude")}
              accuracy={watch("accuracy")}
            />

            <VisitPhotos photos={photos} setPhotos={setPhotos} />

            <VisitNotes register={register} watch={watch} errors={errors} />
          </div>
        </div>

        {/* RIGHT */}
        <div className="xl:col-span-4">
          <VisitSummary values={watch()} photos={photos} />
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-4 border-t border-slate-200 pt-8">
        <button
          type="button"
          className="
            rounded-xl
            border
            border-slate-300
            px-6
            py-3
            font-medium
            hover:bg-slate-50
          "
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={saving}
          className="
            rounded-xl
            bg-blue-600
            px-6
            py-3
            font-medium
            text-white
            transition
            hover:bg-blue-700
            disabled:cursor-not-allowed
            disabled:opacity-50
         "
        >
          {saving ? "Saving..." : "Save Visit"}
        </button>
      </div>
    </form>
  );
}
