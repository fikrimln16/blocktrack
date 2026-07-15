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
import { VisitInspection } from "./sections/visit-inspection";

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

      planting_type: undefined,

      notes: "",
    },
  });

  const [photos, setPhotos] = useState<File[]>([]);

  const onSubmit = async (data: VisitFormValues) => {
    try {
      setSaving(true);

      setErrorMessage("");
      setSuccessMessage("");

      // Validation
      if (!data.user_id) {
        throw new Error("Please select an inspector.");
      }

      if (data.latitude == null || data.longitude == null) {
        throw new Error("Please capture the GPS location.");
      }

      if (!data.planting_type) {
        throw new Error("Please select TM or TBM.");
      }

      if (photos.length === 0) {
        throw new Error("Please upload at least one photo.");
      }

      const visitPayload = {
        user_id: Number(data.user_id),
        block_id: Number(block.id),

        visit_date: data.visit_date,
        visit_time: data.visit_time,

        weather: data.weather,
        duration: Number(data.duration),

        latitude: Number(data.latitude),
        longitude: Number(data.longitude),
        accuracy: data.accuracy != null ? Number(data.accuracy) : null,

        planting_type: data.planting_type,

        // ===========================
        // TM
        // ===========================
        produksi: data.planting_type === "TM" ? (data.produksi ?? null) : null,

        populasi_pokok: data.populasi_pokok ?? null,

        kuantitas_sisipan_3_5_tahun:
          data.planting_type === "TM"
            ? (data.kuantitas_sisipan_3_5_tahun ?? null)
            : null,

        ganoderma:
          data.planting_type === "TM" ? (data.ganoderma ?? null) : null,

        pasar_panen:
          data.planting_type === "TM" ? (data.pasar_panen ?? null) : null,

        tunas_pokok:
          data.planting_type === "TM" ? (data.tunas_pokok ?? null) : null,

        nomor_dan_kebersihan_tph:
          data.planting_type === "TM"
            ? (data.nomor_dan_kebersihan_tph ?? null)
            : null,

        titi_panen:
          data.planting_type === "TM" ? (data.titi_panen ?? null) : null,

        pencurian:
          data.planting_type === "TM" ? (data.pencurian ?? null) : null,

        // ===========================
        // TBM
        // ===========================
        kuantitas_sisipan:
          data.planting_type === "TBM"
            ? (data.kuantitas_sisipan ?? null)
            : null,

        pasar_rintis:
          data.planting_type === "TBM" ? (data.pasar_rintis ?? null) : null,

        tph: data.planting_type === "TBM" ? (data.tph ?? null) : null,

        sanitasi_kastrasi:
          data.planting_type === "TBM"
            ? (data.sanitasi_kastrasi ?? null)
            : null,

        perawatan_kacangan:
          data.planting_type === "TBM"
            ? (data.perawatan_kacangan ?? null)
            : null,

        titi_rintis:
          data.planting_type === "TBM" ? (data.titi_rintis ?? null) : null,

        // ===========================
        // Digunakan TM & TBM
        // ===========================
        rayap: data.rayap ?? null,

        hama_oryctes: data.hama_oryctes ?? null,

        tikus_babi_other_pest: data.tikus_babi_other_pest ?? null,

        ulat_pemakan_daun: data.ulat_pemakan_daun ?? null,

        beneficial_weed: data.beneficial_weed ?? null,

        piringan: data.piringan ?? null,

        gawangan_mineral_gambut: data.gawangan_mineral_gambut ?? null,

        jalan: data.jalan ?? null,

        jembatan: data.jembatan ?? null,

        kondisi_drainase_blok: data.kondisi_drainase_blok ?? null,

        parit: data.parit ?? null,

        sumur_pantau: data.sumur_pantau ?? null,

        pemupukan: data.pemupukan ?? null,

        notes: data.notes ?? "",
      };

      const formData = new FormData();

      formData.append("visit", JSON.stringify(visitPayload));

      for (const file of photos) {
        if (!(file instanceof File)) continue;

        if (file.size === 0) continue;

        let uploadFile = file;

        /**
         * Safari/iPhone kadang mengirim file tanpa nama.
         */
        if (!file.name || file.name.trim() === "") {
          const ext =
            file.type === "image/png"
              ? ".png"
              : file.type === "image/webp"
                ? ".webp"
                : file.type === "image/heic"
                  ? ".heic"
                  : file.type === "image/heif"
                    ? ".heif"
                    : ".jpg";

          uploadFile = new File([file], `photo_${Date.now()}${ext}`, {
            type: file.type || "image/jpeg",
            lastModified: Date.now(),
          });
        }

        formData.append("photos", uploadFile);
      }

      const response = await fetch("/api/visits", {
        method: "POST",
        body: formData,
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to save visit.");
      }

      setSuccessMessage("Visit created successfully.");

      setTimeout(() => {
        router.replace(`/blocks/${block.id}`);
        router.refresh();
      }, 1000);
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

            <VisitInspection register={register} watch={watch} />

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
