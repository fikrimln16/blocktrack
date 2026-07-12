"use client";

import { useEffect, useMemo, useState } from "react";

import { VisitFilterData } from "@/types/visit-filter";
import { VisitListQuery, VisitListResponse } from "@/types/visit-list";

import { VisitFilter } from "./visit-filter";
import { VisitPagination } from "./visit-pagination";
import { VisitResultInfo } from "./visit-result-info";
import { VisitTable } from "./visit-table";

interface Props {
  initialData: VisitListResponse;
  filters: VisitFilterData;
}

export function VisitPageClient({ initialData, filters }: Props) {
  const [data, setData] = useState(initialData);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [page, setPage] = useState(initialData.page);

  const [query, setQuery] = useState<VisitListQuery>({
    search: "",
    ama: undefined,
    estate: undefined,
    block: undefined,
    inspector: undefined,
    weather: "",
    status: "",
    sortBy: "visit_date",
    sortOrder: "DESC",
  });

  // Debounce search
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(query.search ?? "");
    }, 400);

    return () => clearTimeout(timer);
  }, [query.search]);

  // Reset page ketika filter berubah
  useEffect(() => {
    setPage(1);
  }, [
    debouncedSearch,
    query.ama,
    query.estate,
    query.block,
    query.inspector,
    query.weather,
    query.status,
    query.sortBy,
    query.sortOrder,
  ]);

  const params = useMemo(() => {
    const searchParams = new URLSearchParams();

    searchParams.set("page", String(page));
    searchParams.set("limit", String(initialData.limit));

    if (debouncedSearch) searchParams.set("search", debouncedSearch);

    if (query.ama) searchParams.set("ama", String(query.ama));

    if (query.estate) searchParams.set("estate", String(query.estate));

    if (query.block) searchParams.set("block", String(query.block));

    if (query.inspector) searchParams.set("inspector", String(query.inspector));

    if (query.weather) searchParams.set("weather", query.weather);

    if (query.status) searchParams.set("status", query.status);

    if (query.sortBy) searchParams.set("sortBy", query.sortBy);

    if (query.sortOrder) searchParams.set("sortOrder", query.sortOrder);

    return searchParams.toString();
  }, [page, debouncedSearch, query, initialData.limit]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchVisits() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`/api/visits?${params}`, {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch visits");
        }

        const result: VisitListResponse = await response.json();

        setData(result);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error(err);
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchVisits();

    return () => controller.abort();
  }, [params]);

  return (
    <div className="space-y-6">
      <VisitFilter
        filters={filters}
        search={query.search ?? ""}
        setSearch={(value) =>
          setQuery((prev) => ({
            ...prev,
            search: value,
          }))
        }
        ama={query.ama ? String(query.ama) : ""}
        setAma={(value) =>
          setQuery((prev) => ({
            ...prev,
            ama: value ? Number(value) : undefined,
            estate: undefined,
            block: undefined,
          }))
        }
        estate={query.estate ? String(query.estate) : ""}
        setEstate={(value) =>
          setQuery((prev) => ({
            ...prev,
            estate: value ? Number(value) : undefined,
            block: undefined,
          }))
        }
        block={query.block ? String(query.block) : ""}
        setBlock={(value) =>
          setQuery((prev) => ({
            ...prev,
            block: value ? Number(value) : undefined,
          }))
        }
        inspector={query.inspector ? String(query.inspector) : ""}
        setInspector={(value) =>
          setQuery((prev) => ({
            ...prev,
            inspector: value ? Number(value) : undefined,
          }))
        }
        weather={query.weather ?? ""}
        setWeather={(value) =>
          setQuery((prev) => ({
            ...prev,
            weather: value,
          }))
        }
        status={query.status ?? ""}
        setStatus={(value) =>
          setQuery((prev) => ({
            ...prev,
            status: value,
          }))
        }
        sort={query.sortBy ?? "visit_date"}
        setSort={(value) =>
          setQuery((prev) => ({
            ...prev,
            sortBy: value,
          }))
        }
      />

      <VisitResultInfo total={data.total} page={data.page} limit={data.limit} />

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <VisitTable visits={data.data} loading={loading} />

      <VisitPagination
        page={data.page}
        totalPages={data.totalPages}
        onChange={setPage}
      />
    </div>
  );
}
