"use client";

import { useCallback, useEffect, useState } from "react";

import Link from "next/link";

import { ChevronRight } from "lucide-react";

import { DashboardLayout } from "@/components/layout/dashboard-layout";

import { AttentionSummary } from "@/components/attention/attention-summary";
import { AttentionFilter } from "@/components/attention/attention-filter";
import { AttentionRanking } from "@/components/attention/attention-ranking";
import { AttentionDetail } from "@/components/attention/attention-detail";
import { AttentionTable } from "@/components/attention/attention-table";
import { AttentionPagination } from "@/components/attention/attention-pagination";

import {
  AttentionSummary as AttentionSummaryType,
  AttentionAma,
  AttentionEstate,
  AttentionBlock,
  AttentionVisit,
} from "@/types/attention";

import { AttentionRankingItem } from "@/types/attention";

interface Option {
  id: number;
  name: string;
}
interface FilterOption {
  id: number;
  name: string;
}

interface AttentionFilters {
  amas: FilterOption[];
  estates: FilterOption[];
  blocks: FilterOption[];
}

interface AttentionResponse {
  level: "ama" | "estate" | "block" | "visit";

  summary: AttentionSummaryType;

  ranking: AttentionRankingItem[];

  visits: AttentionVisit[];

  filters: AttentionFilters;

  total: number;

  totalPages: number;
}

export default function AttentionPage() {
  const [loading, setLoading] = useState(false);

  const [summary, setSummary] = useState<AttentionSummaryType | null>(null);

  const [ranking, setRanking] = useState<AttentionRankingItem[]>([]);

  const [selected, setSelected] = useState<AttentionRankingItem | null>(null);

  const [visits, setVisits] = useState<AttentionVisit[]>([]);

  const [level, setLevel] = useState<"ama" | "estate" | "block" | "visit">(
    "ama",
  );

  const [page, setPage] = useState(1);

  const [total, setTotal] = useState(0);

  const [totalPages, setTotalPages] = useState(1);

  /**
   * Filter
   */

  const [dateFrom, setDateFrom] = useState("");

  const [dateTo, setDateTo] = useState("");

  const [search, setSearch] = useState("");

  const [amaId, setAmaId] = useState("");

  const [estateId, setEstateId] = useState("");

  const [blockId, setBlockId] = useState("");

  const [category, setCategory] = useState("");

  const [priority, setPriority] = useState("");

  const [filters, setFilters] = useState<AttentionFilters>({
    amas: [],
    estates: [],
    blocks: [],
  });

  interface FilterOption {
    id: number;
    name: string;
  }

  const [amas, setAmas] = useState<FilterOption[]>([]);
  const [estates, setEstates] = useState<FilterOption[]>([]);
  const [blocks, setBlocks] = useState<FilterOption[]>([]);

  const loadAttention = useCallback(async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      if (amaId) params.set("amaId", amaId);

      if (estateId) params.set("estateId", estateId);

      if (blockId) params.set("blockId", blockId);

      if (category) params.set("category", category);

      if (priority) params.set("priority", priority);

      if (search) params.set("search", search);

      if (dateFrom) params.set("dateFrom", dateFrom);

      if (dateTo) params.set("dateTo", dateTo);

      params.set("page", String(page));

      params.set("limit", "20");

      const res = await fetch(`/api/attention?${params.toString()}`, {
        cache: "no-store",
      });

      const json: AttentionResponse = await res.json();

      setSummary(json.summary);

      setRanking(json.ranking);

      setRanking(json.ranking);

      setSelected((current) => {
        if (current) {
          const exists = json.ranking.find((item) => {
            switch (item.level) {
              case "ama":
                return item.amaId === current.amaId;

              case "estate":
                return item.estateId === current.estateId;

              case "block":
                return item.blockId === current.blockId;

              default:
                return false;
            }
          });

          if (exists) return exists;
        }

        return json.ranking[0] ?? null;
      });

      setSelected((current) => {
        if (current) return current;

        return json.ranking.length > 0 ? json.ranking[0] : null;
      });

      setVisits(json.visits ?? []);

      setLevel(json.level);

      setTotal(json.total ?? 0);

      setTotalPages(json.totalPages ?? 1);

      setFilters(
        json.filters ?? {
          amas: [],
          estates: [],
          blocks: [],
        },
      );
    } finally {
      setLoading(false);
    }
  }, [
    amaId,
    estateId,
    blockId,
    category,
    priority,
    search,
    page,
    dateFrom,
    dateTo,
  ]);

  const loadVisits = useCallback(async () => {
    if (!selected) {
      setVisits([]);
      return;
    }

    try {
      const params = new URLSearchParams();

      switch (selected.level) {
        case "ama":
          if (selected.amaId) {
            params.set("amaId", String(selected.amaId));
          }
          break;

        case "estate":
          if (selected.estateId) {
            params.set("estateId", String(selected.estateId));
          }
          break;

        case "block":
          if (selected.blockId) {
            params.set("blockId", String(selected.blockId));
          }
          break;
      }

      params.set("page", String(page));
      params.set("limit", "20");

      const res = await fetch(`/api/attention/visits?${params.toString()}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to load visits");
      }

      const json = await res.json();

      setVisits(json.visits ?? []);

      setTotal(json.total ?? 0);

      setTotalPages(json.totalPages ?? 1);
    } catch (error) {
      console.error(error);

      setVisits([]);

      setTotal(0);

      setTotalPages(1);
    }
  }, [selected, page]);

  useEffect(() => {
    loadVisits();
  }, [loadVisits]);

  const loadAmas = useCallback(async () => {
    const res = await fetch("/api/attention/filter", {
      cache: "no-store",
    });

    const json = await res.json();

    setAmas(json.amas ?? []);
  }, []);

  const loadEstates = useCallback(async (amaId: string) => {
    const res = await fetch(`/api/attention/filter?amaId=${amaId}`, {
      cache: "no-store",
    });

    const json = await res.json();

    setEstates(json.estates ?? []);
  }, []);

  const loadBlocks = useCallback(async (estateId: string) => {
    const res = await fetch(`/api/attention/filter?estateId=${estateId}`, {
      cache: "no-store",
    });

    const json = await res.json();

    setBlocks(json.blocks ?? []);
  }, []);

  useEffect(() => {
    loadAmas();
  }, [loadAmas]);

  useEffect(() => {
    if (!amaId) {
      setEstates([]);
      setBlocks([]);

      setEstateId("");
      setBlockId("");

      return;
    }

    loadEstates(amaId);
  }, [amaId, loadEstates]);

  useEffect(() => {
    if (!estateId) {
      setBlocks([]);

      setBlockId("");

      return;
    }

    loadBlocks(estateId);
  }, [estateId, loadBlocks]);

  useEffect(() => {
    loadAttention();
  }, [loadAttention]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Link href="/dashboard" className="hover:text-blue-600">
                Dashboard
              </Link>

              <ChevronRight size={15} />

              <span className="font-medium text-slate-900">Attention</span>
            </div>

            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Attention Monitoring
            </h1>

            <p className="mt-1 text-slate-500">
              Monitor operational inspection findings requiring immediate
              follow-up.
            </p>
          </div>
        </div>

        {/* Summary */}
        {summary && <AttentionSummary summary={summary} />}

        {/* Filter */}
        <AttentionFilter
          search={search}
          amaId={amaId}
          estateId={estateId}
          blockId={blockId}
          category={category}
          priority={priority}
          dateFrom={dateFrom}
          dateTo={dateTo}
          amas={amas}
          estates={estates}
          blocks={blocks}
          onSearch={setSearch}
          onAma={setAmaId}
          onEstate={setEstateId}
          onBlock={setBlockId}
          onCategory={setCategory}
          onPriority={setPriority}
          onDateFrom={setDateFrom}
          onDateTo={setDateTo}
          onReset={() => {
            setSearch("");

            setAmaId("");
            setEstateId("");
            setBlockId("");

            setCategory("");
            setPriority("");

            setDateFrom("");
            setDateTo("");

            setPage(1);
          }}
        />

        {/* Ranking & Detail */}
        <div className="grid gap-6 xl:grid-cols-12">
          <div className="xl:col-span-5">
            <AttentionRanking
              loading={loading}
              items={ranking}
              selected={selected}
              onSelect={setSelected}
            />
          </div>

          <div className="xl:col-span-7">
            <AttentionDetail selected={selected} />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <AttentionTable loading={loading} visits={visits} />

          <div className="border-t border-slate-200 bg-slate-50 p-4">
            <AttentionPagination
              page={page}
              total={total}
              totalPages={totalPages}
              limit={20}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
