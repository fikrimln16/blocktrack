"use client";

import { useMemo, useState } from "react";

import { GalleryFilterData, GalleryPhoto } from "@/types/gallery";

import { GalleryFilter } from "./gallery-filter";
import { GalleryGrid } from "./gallery-grid";
import { GalleryGroup } from "./gallery-group";
import { GalleryGroupSection } from "./gallery-group-section";
import { GalleryHeader } from "./gallery-header";
import { GalleryAccordion } from "./gallery-accordion";

interface Props {
  photos: GalleryPhoto[];
  filters: GalleryFilterData;
}

export function GalleryPageClient({ photos, filters }: Props) {
  // ==========================
  // Filters
  // ==========================

  const [search, setSearch] = useState("");

  const [ama, setAma] = useState("");

  const [estate, setEstate] = useState("");

  const [block, setBlock] = useState("");

  const [weather, setWeather] = useState("");

  const [inspector, setInspector] = useState("");

  // ==========================
  // View
  // ==========================

  const [groupBy, setGroupBy] = useState<"all" | "ama" | "estate" | "block">(
    "all",
  );

  // ==========================
  // Filter Result
  // ==========================

  const filtered = useMemo(() => {
    return photos.filter((photo) => {
      return (
        (!ama || photo.ama_id === Number(ama)) &&
        (!estate || photo.estate_id === Number(estate)) &&
        (!block || photo.block_id === Number(block)) &&
        (!weather || photo.weather === weather) &&
        (!inspector || photo.inspector === inspector) &&
        (search === "" ||
          photo.block_code.toLowerCase().includes(search.toLowerCase()) ||
          photo.block_name?.toLowerCase().includes(search.toLowerCase()))
      );
    });
  }, [photos, search, ama, estate, block, weather, inspector]);

  // ==========================
  // Group Result
  // ==========================

  const grouped = useMemo(() => {
    if (groupBy === "all") {
      return {
        "All Documentation": filtered,
      };
    }

    return filtered.reduce(
      (acc, photo) => {
        let key = "";

        switch (groupBy) {
          case "ama":
            key = photo.ama;
            break;

          case "estate":
            key = photo.estate;
            break;

          case "block":
            key = `${photo.block_code}${
              photo.block_name ? ` • ${photo.block_name}` : ""
            }`;
            break;
        }

        if (!acc[key]) {
          acc[key] = [];
        }

        acc[key].push(photo);

        return acc;
      },
      {} as Record<string, GalleryPhoto[]>,
    );
  }, [filtered, groupBy]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <GalleryHeader photos={filtered} />

      {/* Filter */}
      <GalleryFilter
        filters={filters}
        search={search}
        setSearch={setSearch}
        ama={ama}
        setAma={setAma}
        estate={estate}
        setEstate={setEstate}
        block={block}
        setBlock={setBlock}
        inspector={inspector}
        setInspector={setInspector}
      />

      {/* Group Selector */}
      <GalleryGroup value={groupBy} onChange={setGroupBy} />

      {/* Gallery */}
      {groupBy === "all" ? (
        <GalleryGrid photos={filtered} />
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([title, photos]) => (
            <GalleryAccordion key={title} title={title} photos={photos} />
          ))}
        </div>
      )}
    </div>
  );
}
