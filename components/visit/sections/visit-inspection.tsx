"use client";

import { useState } from "react";
import { ClipboardCheck, ChevronDown } from "lucide-react";
import { UseFormRegister, UseFormWatch } from "react-hook-form";

import { VisitFormValues } from "@/types/visit-form";

interface Props {
  register: UseFormRegister<VisitFormValues>;
  watch: UseFormWatch<VisitFormValues>;
}

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
    title: "🌧 Drainase",
    fields: [
      ["kondisi_drainase_blok", "Drainase Blok"],
      ["parit", "Parit"],
      ["sumur_pantau", "Sumur Pantau"],
    ],
  },
  {
    title: "👷 Manajemen Kebun",
    fields: [
      ["pencurian", "Pencurian"],
      ["pemupukan", "Pemupukan"],
    ],
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

function getCategory(value: number) {
  switch (value) {
    case 1:
      return {
        label: "Buruk",
        color: "bg-red-100 text-red-700",
      };

    case 2:
      return {
        label: "Sedang",
        color: "bg-yellow-100 text-yellow-700",
      };

    case 3:
      return {
        label: "Baik",
        color: "bg-green-100 text-green-700",
      };

    default:
      return {
        label: "Belum Dinilai",
        color: "bg-slate-100 text-slate-500",
      };
  }
}

export function VisitInspection({ register, watch }: Props) {
  // Section pertama otomatis terbuka
  const [openSection, setOpenSection] = useState(0);

  const plantingType = watch("planting_type");

  const sections =
    plantingType === "TM"
      ? TM_SECTIONS
      : plantingType === "TBM"
        ? TBM_SECTIONS
        : [];

  return (
    <section className="mt-10 border-t border-slate-200 pt-10">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <ClipboardCheck size={24} className="text-blue-600" />

        <div>
          <h2 className="text-xl font-semibold">Inspection Assessment</h2>

          <p className="text-sm text-slate-500">
            Pilih jenis tanaman terlebih dahulu, kemudian lakukan penilaian
            inspeksi.
          </p>
        </div>
      </div>

      {/* Planting Type */}
      <div className="mb-8">
        <h3 className="mb-4 text-sm font-semibold text-slate-700">
          Jenis Tanaman
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          <label
            className={`cursor-pointer rounded-2xl border p-5 transition ${
              plantingType === "TM"
                ? "border-blue-600 bg-blue-50"
                : "border-slate-200 hover:border-blue-300"
            }`}
          >
            <input
              type="radio"
              value="TM"
              className="hidden"
              {...register("planting_type")}
            />

            <h4 className="text-lg font-semibold">TM</h4>

            <p className="mt-1 text-sm text-slate-500">Tanaman Menghasilkan</p>
          </label>

          <label
            className={`cursor-pointer rounded-2xl border p-5 transition ${
              plantingType === "TBM"
                ? "border-blue-600 bg-blue-50"
                : "border-slate-200 hover:border-blue-300"
            }`}
          >
            <input
              type="radio"
              value="TBM"
              className="hidden"
              {...register("planting_type")}
            />

            <h4 className="text-lg font-semibold">TBM</h4>

            <p className="mt-1 text-sm text-slate-500">
              Tanaman Belum Menghasilkan
            </p>
          </label>
        </div>
      </div>

      {/* Belum memilih */}
      {!plantingType && (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 py-16 text-center">
          <ClipboardCheck size={48} className="mx-auto mb-4 text-slate-400" />

          <h3 className="text-lg font-semibold text-slate-700">
            Pilih Jenis Tanaman
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Pilih TM atau TBM untuk menampilkan form inspeksi.
          </p>
        </div>
      )}

      {/* Form Inspection */}
      {plantingType && (
        <>
          {/* Legend */}
          <div className="mb-8 flex flex-wrap gap-3">
            <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">
              1 • Buruk
            </span>

            <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
              2 • Sedang
            </span>

            <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
              3 • Baik
            </span>
          </div>

          <div className="space-y-5">
            {sections.map((section, index) => {
              const completed = section.fields.filter(([field]) => {
                const value = Number(watch(field as keyof VisitFormValues));

                return value >= 1 && value <= 3;
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
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                          {completed}/{section.fields.length}
                        </span>
                      </span>

                      <ChevronDown
                        size={22}
                        className={`transition ${
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
                              className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-4 hover:border-blue-300"
                            >
                              <div className="min-w-0">
                                <h4 className="font-medium text-slate-800">
                                  {label}
                                </h4>

                                <span
                                  className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${category.color}`}
                                >
                                  {category.label}
                                </span>
                              </div>

                              <div className="flex overflow-hidden rounded-xl border border-slate-200">
                                {[
                                  {
                                    score: 1,
                                    color: "bg-red-500",
                                    active: "bg-red-500 text-white",
                                    hover: "hover:bg-red-50",
                                  },
                                  {
                                    score: 2,
                                    color: "bg-yellow-500",
                                    active: "bg-yellow-500 text-white",
                                    hover: "hover:bg-yellow-50",
                                  },
                                  {
                                    score: 3,
                                    color: "bg-green-500",
                                    active: "bg-green-500 text-white",
                                    hover: "hover:bg-green-50",
                                  },
                                ].map((item) => (
                                  <label
                                    key={item.score}
                                    className={`
                                      relative flex h-11 w-14 cursor-pointer items-center justify-center
                                      border-l first:border-l-0
                                      transition
                                      ${
                                        value === item.score
                                          ? item.active
                                          : `bg-white text-slate-600 ${item.hover}`
                                      }
                                    `}
                                  >
                                    <input
                                      type="radio"
                                      value={item.score}
                                      className="sr-only"
                                      {...register(
                                        field as keyof VisitFormValues,
                                        {
                                          valueAsNumber: true,
                                        },
                                      )}
                                    />

                                    <span className="font-semibold">
                                      {item.score}
                                    </span>
                                  </label>
                                ))}
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
        </>
      )}
    </section>
  );
}
