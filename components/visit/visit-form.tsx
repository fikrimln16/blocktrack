"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { VisitHeader } from "./visit-header";
import { VisitStepper } from "./visit-stepper";

import { VisitInformation } from "./sections/visit-information";
import { VisitLocation } from "./sections/visit-location";
import { VisitMap } from "./sections/visit-map";
import { VisitPhotos } from "./sections/visit-photos";
import { VisitNotes } from "./sections/visit-notes";
import { VisitSummary } from "./sections/visit-summary";
import { VisitInspector } from "./sections/visit-inspector";

import { Block } from "@/types/block";
import { VisitFormValues } from "@/types/visit-form";
import { UserOption } from "@/types/user";

interface Props {
  block: Block;
  users: UserOption[];
}

export function VisitForm({ block, users }: Props) {
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<VisitFormValues>({
    defaultValues: {
      user_id: undefined,
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

      setErrorMessage("");
      setSuccessMessage("");

      // ==========================
      // VALIDATION
      // ==========================

      if (!data.user_id) {
        setErrorMessage("Please select an inspector.");
        return;
      }

      if (!data.latitude || !data.longitude) {
        setErrorMessage("Please capture the GPS location.");
        return;
      }

      if (photos.length === 0) {
        setErrorMessage("Please upload at least one photo.");
        return;
      }

      // ==========================
      // PAYLOAD
      // ==========================

      const visitPayload = {
        user_id: data.user_id,
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

      const formData = new FormData();

      formData.append("visit", JSON.stringify(visitPayload));

      photos.forEach((photo) => {
        formData.append("photos", photo);
      });

      const response = await fetch("/api/visits", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message ?? "Failed to save visit.");
      }

      setSuccessMessage("Visit created successfully.");

      console.log(result);

      setTimeout(() => {
        router.replace(`/blocks/${block.id}`);
        router.refresh();
      }, 1500);

      // TODO
      // router.push(`/dashboard/visits/${result.visitId}`);
    } catch (err) {
      console.error(err);

      setErrorMessage(
        err instanceof Error ? err.message : "Failed to save visit.",
      );
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
            <VisitInspector
              users={users}
              register={register}
              watch={watch}
              setValue={setValue}
              errors={errors}
            />

            <VisitInformation
              register={register}
              errors={errors}
              users={users}
            />

            <VisitLocation
              watch={watch}
              setValue={setValue}
              errors={errors}
              blockGeometry={block.geometry}
            />

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

      {errorMessage && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4">
          <p className="text-sm font-medium text-red-600">{errorMessage}</p>
        </div>
      )}

      {successMessage && (
        <div className="rounded-2xl border border-green-200 bg-green-50 px-5 py-4">
          <p className="text-sm font-medium text-green-700">{successMessage}</p>
        </div>
      )}

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
            disabled:pointer-events-none
            disabled:opacity-60
          "
        >
          {saving ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Saving Visit...
            </div>
          ) : (
            "Save Visit"
          )}
        </button>
      </div>
    </form>
  );
}
