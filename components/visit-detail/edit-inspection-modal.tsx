"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { toast } from "sonner";

import { VisitDetail } from "@/types/visit-detail";

interface Props {
  visit: VisitDetail;
  onClose: () => void;
  onSuccess: () => void;
}

type FormValues = {
  planting_type: "TM" | "TBM";

  produksi?: number;
  populasi_pokok?: number;
  kuantitas_sisipan?: number;
  kuantitas_sisipan_3_5_tahun?: number;
  ganoderma?: number;
  rayap?: number;
  hama_oryctes?: number;
  tikus_babi_other_pest?: number;
  ulat_pemakan_daun?: number;
  beneficial_weed?: number;

  piringan?: number;
  pasar_panen?: number;
  pasar_rintis?: number;
  tunas_pokok?: number;
  gawangan_mineral_gambut?: number;
  tph?: number;
  sanitasi_kastrasi?: number;
  perawatan_kacangan?: number;
  nomor_dan_kebersihan_tph?: number;

  jalan?: number;
  jembatan?: number;
  titi_panen?: number;
  titi_rintis?: number;

  kondisi_drainase_blok?: number;
  parit?: number;
  sumur_pantau?: number;

  pencurian?: number;
  pemupukan?: number;
};

const TM_SECTIONS = [
  {
    title: "🌴 Kondisi Tanaman",
    fields: [
      ["produksi", "Produksi"],
      ["populasi_pokok", "Populasi Pokok"],
      ["kuantitas_sisipan_3_5_tahun", "Kuantitas Sisipan (3-5 Tahun)"],
      ["ganoderma", "Ganoderma"],
      ["rayap", "Rayap"],
      ["hama_oryctes", "Hama Oryctes"],
      ["tikus_babi_other_pest", "Tikus / Babi / Hama Lain"],
      ["ulat_pemakan_daun", "Ulat Pemakan Daun"],
      ["beneficial_weed", "Beneficial Weed"],
    ],
  },
  {
    title: "🌱 Kondisi Kebun",
    fields: [
      ["piringan", "Piringan"],
      ["pasar_panen", "Pasar Panen"],
      ["tunas_pokok", "Tunas Pokok"],
      ["gawangan_mineral_gambut", "Gawangan Mineral / Gambut"],
      ["nomor_dan_kebersihan_tph", "Nomor & Kebersihan TPH"],
    ],
  },
  {
    title: "🛣 Infrastruktur",
    fields: [
      ["jalan", "Jalan"],
      ["jembatan", "Jembatan"],
      ["titi_panen", "Titi Panen"],
    ],
  },
  {
    title: "🌧 Kondisi Alam",
    fields: [
      ["kondisi_drainase_blok", "Drainase Blok"],
      ["parit", "Parit"],
      ["sumur_pantau", "Sumur Pantau"],
    ],
  },
  {
    title: "🤝 Kondisi Sosial",
    fields: [
      ["pencurian", "Pencurian"],
      ["klaim_lahan", "Klaim Lahan"],
    ],
  },
  {
    title: "📋 Manajemen Kebun",
    fields: [["pemupukan", "Pemupukan"]],
  },
];

const TBM_SECTIONS = [
  {
    title: "🌴 Kondisi Tanaman",
    fields: [
      ["populasi_pokok", "Populasi Pokok"],
      ["kuantitas_sisipan", "Kuantitas Sisipan"],
      ["rayap", "Rayap"],
      ["hama_oryctes", "Hama Oryctes"],
      ["tikus_babi_other_pest", "Tikus / Babi / Hama Lain"],
      ["ulat_pemakan_daun", "Ulat Pemakan Daun"],
      ["beneficial_weed", "Beneficial Weed"],
    ],
  },
  {
    title: "🌱 Kondisi Kebun",
    fields: [
      ["piringan", "Piringan"],
      ["pasar_rintis", "Pasar Rintis"],
      ["gawangan_mineral_gambut", "Gawangan Mineral / Gambut"],
      ["tph", "TPH"],
      ["sanitasi_kastrasi", "Sanitasi / Kastrasi"],
      ["perawatan_kacangan", "Perawatan Kacangan"],
    ],
  },
  {
    title: "🛣 Infrastruktur",
    fields: [
      ["jalan", "Jalan"],
      ["jembatan", "Jembatan"],
      ["titi_rintis", "Titi Rintis"],
    ],
  },
  {
    title: "🌧 Drainase",
    fields: [
      ["kondisi_drainase_blok", "Drainase Blok"],
      ["parit", "Parit"],
      ["sumur_pantau", "Sumur Pantau"],
    ],
  },
  {
    title: "👷 Manajemen Kebun",
    fields: [["pemupukan", "Pemupukan"]],
  },
];

export function EditInspectionModal({ visit, onClose, onSuccess }: Props) {
  const [saving, setSaving] = useState(false);

  const { register, watch, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      planting_type: visit.planting_type,

      produksi: visit.produksi ?? undefined,
      populasi_pokok: visit.populasi_pokok ?? undefined,
      kuantitas_sisipan: visit.kuantitas_sisipan ?? undefined,
      kuantitas_sisipan_3_5_tahun:
        visit.kuantitas_sisipan_3_5_tahun ?? undefined,
      ganoderma: visit.ganoderma ?? undefined,
      rayap: visit.rayap ?? undefined,
      hama_oryctes: visit.hama_oryctes ?? undefined,
      tikus_babi_other_pest: visit.tikus_babi_other_pest ?? undefined,
      ulat_pemakan_daun: visit.ulat_pemakan_daun ?? undefined,
      beneficial_weed: visit.beneficial_weed ?? undefined,

      piringan: visit.piringan ?? undefined,
      pasar_panen: visit.pasar_panen ?? undefined,
      pasar_rintis: visit.pasar_rintis ?? undefined,
      tunas_pokok: visit.tunas_pokok ?? undefined,
      gawangan_mineral_gambut: visit.gawangan_mineral_gambut ?? undefined,
      tph: visit.tph ?? undefined,
      sanitasi_kastrasi: visit.sanitasi_kastrasi ?? undefined,
      perawatan_kacangan: visit.perawatan_kacangan ?? undefined,
      nomor_dan_kebersihan_tph: visit.nomor_dan_kebersihan_tph ?? undefined,

      jalan: visit.jalan ?? undefined,
      jembatan: visit.jembatan ?? undefined,
      titi_panen: visit.titi_panen ?? undefined,
      titi_rintis: visit.titi_rintis ?? undefined,

      kondisi_drainase_blok: visit.kondisi_drainase_blok ?? undefined,
      parit: visit.parit ?? undefined,
      sumur_pantau: visit.sumur_pantau ?? undefined,

      pencurian: visit.pencurian ?? undefined,
      pemupukan: visit.pemupukan ?? undefined,
    },
  });

  const plantingType = watch("planting_type");

  const sections = useMemo(() => {
    return plantingType === "TM" ? TM_SECTIONS : TBM_SECTIONS;
  }, [plantingType]);

  const onSubmit = async (data: FormValues) => {
    try {
      setSaving(true);

      const response = await fetch(`/api/visits/${visit.id}/inspection`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to update inspection.");
      }

      // Tutup modal terlebih dahulu
      onClose();

      // Tampilkan toast
      toast.success("Inspection berhasil diperbarui.", {
        description: "Data inspection berhasil disimpan.",
        duration: 2000,
      });

      // Tunggu toast selesai tampil
      setTimeout(() => {
        onSuccess(); // router.refresh()
      }, 2000);
    } catch (error) {
      toast.error("Gagal memperbarui inspection.", {
        description:
          error instanceof Error ? error.message : "Terjadi kesalahan.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="flex h-full items-center justify-center p-3 md:p-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="
          flex
          h-[95vh]
          w-full
          max-w-5xl
          flex-col
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-2xl
        "
        >
          {/* ================= Header ================= */}
          <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Edit Inspection
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Update inspection assessment for this visit.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 transition hover:bg-slate-100"
            >
              <X size={20} />
            </button>
          </div>

          {/* ================= Planting Type ================= */}
          <div className="border-b border-slate-200 bg-slate-50 px-6 py-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                    Planting Type
                  </p>

                  <h3 className="mt-1 text-lg font-semibold text-slate-900">
                    {plantingType === "TM"
                      ? "🌴 Tanaman Menghasilkan (TM)"
                      : "🌱 Tanaman Belum Menghasilkan (TBM)"}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Pilih jenis tanaman sesuai kondisi blok yang diinspeksi.
                  </p>
                </div>

                <div className="inline-flex rounded-xl bg-slate-100 p-1">
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      value="TM"
                      className="hidden"
                      {...register("planting_type")}
                    />

                    <span
                      className={`
                      flex h-11 min-w-[110px] items-center justify-center rounded-lg
                      px-5 text-sm font-semibold transition
                      ${
                        plantingType === "TM"
                          ? "bg-blue-600 text-white shadow"
                          : "text-slate-600 hover:bg-white"
                      }
                    `}
                    >
                      🌴 TM
                    </span>
                  </label>

                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      value="TBM"
                      className="hidden"
                      {...register("planting_type")}
                    />

                    <span
                      className={`
                      flex h-11 min-w-[110px] items-center justify-center rounded-lg
                      px-5 text-sm font-semibold transition
                      ${
                        plantingType === "TBM"
                          ? "bg-blue-600 text-white shadow"
                          : "text-slate-600 hover:bg-white"
                      }
                    `}
                    >
                      🌱 TBM
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* ================= Body ================= */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {sections.map((section) => {
              return (
                <section key={section.title} className="mb-8 last:mb-0">
                  {/* Section Header */}
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {section.title}
                    </h3>

                    <p className="text-xs text-slate-500">
                      {section.fields.length} indikator penilaian
                    </p>
                  </div>

                  {/* Items */}
                  <div className="space-y-3">
                    {section.fields.map(([field, label]) => {
                      const value =
                        Number(watch(field as keyof FormValues)) || 0;

                      return (
                        <div
                          key={field}
                          className="
                           flex
                           flex-col
                           gap-4
                           rounded-xl
                           border
                           border-slate-200
                           bg-white
                           p-4
                           transition
                           hover:border-blue-300
                           sm:flex-row
                           sm:items-center
                           sm:justify-between
                        "
                        >
                          {/* Label */}
                          <div className="min-w-0">
                            <h4 className="font-medium text-slate-800">
                              {label}
                            </h4>

                            <p className="mt-1 text-xs text-slate-500">
                              Pilih skor inspeksi
                            </p>
                          </div>

                          {/* Score */}
                          <div className="flex items-center gap-3">
                            {value > 0 && (
                              <span
                                className={`
                                 rounded-full px-3 py-1 text-xs font-semibold
                                 ${
                                   value === 1
                                     ? "bg-red-100 text-red-700"
                                     : value === 2
                                       ? "bg-yellow-100 text-yellow-700"
                                       : "bg-green-100 text-green-700"
                                 }
                              `}
                              >
                                {value === 1
                                  ? "Buruk"
                                  : value === 2
                                    ? "Sedang"
                                    : "Baik"}
                              </span>
                            )}

                            <div className="flex overflow-hidden rounded-xl border border-slate-200">
                              {[
                                {
                                  score: 1,
                                  active:
                                    "bg-red-500 text-white border-red-500",
                                  hover: "hover:bg-red-50",
                                },
                                {
                                  score: 2,
                                  active:
                                    "bg-yellow-500 text-white border-yellow-500",
                                  hover: "hover:bg-yellow-50",
                                },
                                {
                                  score: 3,
                                  active:
                                    "bg-green-500 text-white border-green-500",
                                  hover: "hover:bg-green-50",
                                },
                              ].map((item) => (
                                <label
                                  key={item.score}
                                  className={`
                                    cursor-pointer
                                    border-l
                                    first:border-l-0
                                    transition
                                    ${
                                      value === item.score
                                        ? item.active
                                        : `bg-white text-slate-700 ${item.hover}`
                                    }
                                 `}
                                >
                                  <input
                                    type="radio"
                                    value={item.score}
                                    className="hidden"
                                    {...register(field as keyof FormValues, {
                                      valueAsNumber: true,
                                    })}
                                  />

                                  <div className="flex h-11 w-14 items-center justify-center font-semibold">
                                    {item.score}
                                  </div>
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>

          {/* ================= Footer ================= */}
          <div className="border-t border-slate-200 bg-white px-6 py-5">
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                className="
                w-full
                rounded-xl
                border
                border-slate-300
                px-5
                py-3
                font-medium
                text-slate-700
                transition
                hover:bg-slate-100
                sm:w-auto
              "
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="
                flex
                w-full
                items-center
                justify-center
                rounded-xl
                bg-blue-600
                px-6
                py-3
                font-medium
                text-white
                transition
                hover:bg-blue-700
                disabled:cursor-not-allowed
                disabled:opacity-60
                sm:w-auto
              "
              >
                {saving ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
