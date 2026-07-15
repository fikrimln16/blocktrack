"use client";

import { useState } from "react";
import {
  ClipboardCheck,
  Leaf,
  Trees,
  Construction,
  CloudRain,
  Briefcase,
  Pencil,
  ShieldAlert,
} from "lucide-react";

import { VisitDetail } from "@/types/visit-detail";

import { EditInspectionModal } from "./edit-inspection-modal";

interface Props {
  visit: VisitDetail;
}

const sections = [
  {
    title: "Kondisi Tanaman",
    icon: Leaf,
    items: [
      ["Produksi", "produksi"],
      ["Populasi Pokok", "populasi_pokok"],
      ["Kuantitas Sisipan", "kuantitas_sisipan"],
      ["Kuantitas Sisipan (3-5 Tahun)", "kuantitas_sisipan_3_5_tahun"],
      ["Ganoderma", "ganoderma"],
      ["Rayap", "rayap"],
      ["Hama Oryctes", "hama_oryctes"],
      ["Tikus / Babi / Hama Lain", "tikus_babi_other_pest"],
      ["Ulat Pemakan Daun", "ulat_pemakan_daun"],
      ["Beneficial Weed", "beneficial_weed"],
    ],
  },
  {
    title: "Kondisi Kebun",
    icon: Trees,
    items: [
      ["Piringan", "piringan"],
      ["Pasar Panen", "pasar_panen"],
      ["Pasar Rintis", "pasar_rintis"],
      ["Tunas Pokok", "tunas_pokok"],
      ["Gawangan Mineral / Gambut", "gawangan_mineral_gambut"],
      ["Nomor & Kebersihan TPH", "nomor_dan_kebersihan_tph"],
      ["TPH", "tph"],
      ["Sanitasi / Kastrasi", "sanitasi_kastrasi"],
      ["Perawatan Kacangan", "perawatan_kacangan"],
    ],
  },
  {
    title: "Infrastruktur",
    icon: Construction,
    items: [
      ["Jalan", "jalan"],
      ["Jembatan", "jembatan"],
      ["Titi Panen", "titi_panen"],
      ["Titi Rintis", "titi_rintis"],
    ],
  },
  {
    title: "Drainase",
    icon: CloudRain,
    items: [
      ["Drainase Blok", "kondisi_drainase_blok"],
      ["Parit", "parit"],
      ["Sumur Pantau", "sumur_pantau"],
    ],
  },
  {
    title: "Kondisi Sosial",
    icon: ShieldAlert,
    items: [["Pencurian", "pencurian"]],
  },
  {
    title: "Manajemen Kebun",
    icon: Briefcase,
    items: [["Pemupukan", "pemupukan"]],
  },
];

function getBadge(score: number | null) {
  switch (score) {
    case 1:
      return {
        label: "Buruk",
        className: "bg-red-100 text-red-700",
      };

    case 2:
      return {
        label: "Sedang",
        className: "bg-yellow-100 text-yellow-700",
      };

    case 3:
      return {
        label: "Baik",
        className: "bg-green-100 text-green-700",
      };

    default:
      return {
        label: "-",
        className: "bg-slate-100 text-slate-500",
      };
  }
}

export function VisitInspection({ visit }: Props) {
  const [open, setOpen] = useState(false);

  const visibleSections =
    visit.planting_type === "TM"
      ? sections.map((section) => {
          if (section.title === "Kondisi Tanaman") {
            return {
              ...section,
              items: section.items.filter(
                ([, key]) => key !== "kuantitas_sisipan",
              ),
            };
          }

          if (section.title === "Kondisi Kebun") {
            return {
              ...section,
              items: section.items.filter(
                ([, key]) =>
                  ![
                    "pasar_rintis",
                    "tph",
                    "sanitasi_kastrasi",
                    "perawatan_kacangan",
                  ].includes(key),
              ),
            };
          }

          if (section.title === "Infrastruktur") {
            return {
              ...section,
              items: section.items.filter(([, key]) => key !== "titi_rintis"),
            };
          }

          if (section.title === "Manajemen Kebun") {
            return {
              ...section,
              items: section.items,
            };
          }

          return section;
        })
      : sections.map((section) => {
          if (section.title === "Kondisi Tanaman") {
            return {
              ...section,
              items: section.items.filter(
                ([, key]) =>
                  ![
                    "produksi",
                    "ganoderma",
                    "kuantitas_sisipan_3_5_tahun",
                  ].includes(key),
              ),
            };
          }

          if (section.title === "Kondisi Kebun") {
            return {
              ...section,
              items: section.items.filter(
                ([, key]) =>
                  ![
                    "pasar_panen",
                    "tunas_pokok",
                    "nomor_dan_kebersihan_tph",
                  ].includes(key),
              ),
            };
          }

          if (section.title === "Infrastruktur") {
            return {
              ...section,
              items: section.items.filter(([, key]) => key !== "titi_panen"),
            };
          }

          if (section.title === "Manajemen Kebun") {
            return {
              ...section,
              items: section.items.filter(([, key]) => key !== "pencurian"),
            };
          }

          return section;
        });

  return (
    <>
      <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-8 py-6">
          <div className="flex items-center gap-3">
            <ClipboardCheck className="text-blue-600" size={22} />

            <div>
              <h2 className="text-xl font-semibold">Inspection Assessment</h2>

              <p className="text-sm text-slate-500">
                Plantation inspection result.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium transition hover:bg-slate-50"
          >
            <Pencil size={16} />
            Edit Inspection
          </button>
        </div>

        {/* Planting Type */}
        <div className="border-b border-slate-100 bg-blue-50 px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-blue-600">
                Planting Type
              </p>

              <h3 className="mt-1 text-lg font-semibold">
                {visit.planting_type === "TM"
                  ? "🌴 Tanaman Menghasilkan (TM)"
                  : "🌱 Tanaman Belum Menghasilkan (TBM)"}
              </h3>
            </div>

            <span className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
              {visit.planting_type}
            </span>
          </div>
        </div>

        {/* Section */}
        <div className="space-y-8 p-8">
          {visibleSections.map((section) => {
            const Icon = section.icon;

            const values = section.items
              .map(([, key]) => Number((visit as any)[key]))
              .filter((v) => v > 0);

            const average =
              values.length === 0
                ? "-"
                : (values.reduce((a, b) => a + b, 0) / values.length).toFixed(
                    1,
                  );

            return (
              <div key={section.title}>
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="text-blue-600" size={18} />

                    <div>
                      <h3 className="font-semibold">{section.title}</h3>

                      <p className="text-xs text-slate-500">
                        {values.length}/{section.items.length} indikator
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">
                    Avg {average}
                  </span>
                </div>

                <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
                  {section.items.map(([label, key]) => {
                    const score = Number((visit as any)[key]) || null;

                    const badge = getBadge(score);

                    return (
                      <div
                        key={key}
                        className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3"
                      >
                        <span className="text-sm text-slate-700">{label}</span>

                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{score ?? "-"}</span>

                          <span
                            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${badge.className}`}
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
        {open && (
          <EditInspectionModal
            visit={visit}
            onClose={() => setOpen(false)}
            onSuccess={() => window.location.reload()}
          />
        )}
      </section>
    </>
  );
}
