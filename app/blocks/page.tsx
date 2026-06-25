"use client";

import { useEffect, useState, useCallback, useRef } from "react";

import { DashboardLayout } from "@/components/layout/dashboard-layout";

import { BlockSummary } from "@/components/blocks/block-summary";
import { BlockFilter } from "@/components/blocks/block-filter";
import { BlockTable } from "@/components/blocks/block-table";
import { BlockMap } from "@/components/blocks/block-map";

import { Block } from "@/types/block";

import Link from "next/link";

import { ChevronRight, Download, Map } from "lucide-react";

import { BlockPagination } from "@/components/blocks/block-pagination";

interface Summary {
  totalAma: number;
  totalEstate: number;
  totalBlock: number;
  visitedBlock: number;
}

export default function BlocksPage() {
  const [loading, setLoading] = useState(false);
  const mapSectionRef = useRef<HTMLDivElement>(null);

  const [blocks, setBlocks] = useState<Block[]>([]);

  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);

  const [amaId, setAmaId] = useState("");
  const [estateId, setEstateId] = useState("");
  const [status, setStatus] = useState("");
  const [division, setDivision] = useState("");

  const [page, setPage] = useState(1);
  const limit = 100;

  const [summary, setSummary] = useState<Summary>({
    totalAma: 0,
    totalEstate: 0,
    totalBlock: 0,
    visitedBlock: 0,
  });

  const [amas, setAmas] = useState<any[]>([]);
  const [estates, setEstates] = useState<any[]>([]);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [total, setTotal] = useState(0);

  const [totalPages, setTotalPages] = useState(1);

  const handleSelectBlock = (block: Block) => {
    setSelectedBlock(block);

    mapSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const loadBlocks = useCallback(async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      if (search) params.set("search", search);
      if (amaId) params.set("ama", amaId);
      if (estateId) params.set("estate", estateId);
      if (division) params.set("division", division);
      if (status) params.set("status", status);

      params.set("page", String(page));
      params.set("limit", String(limit));

      const res = await fetch(`/api/blocks?${params.toString()}`, {
        cache: "no-store",
      });

      const json = await res.json();

      setBlocks(json.blocks);

      setTotal(json.total);

      setTotalPages(json.totalPages);

      if (json.blocks.length > 0) {
        if (
          !selectedBlock ||
          !json.blocks.some((b: Block) => b.id === selectedBlock.id)
        ) {
          setSelectedBlock(json.blocks[0]);
        }
      } else {
        setSelectedBlock(null);
      }

      setSummary(json.summary);
      setAmas(json.amas);
      setEstates(json.estates);
    } finally {
      setLoading(false);
    }
  }, [search, amaId, estateId, division, status, page]);

  useEffect(() => {
    loadBlocks();
  }, [loadBlocks]);

  useEffect(() => {
    setPage(1);
  }, [search, amaId, estateId, division, status]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchInput]);

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

              <span className="font-medium text-slate-900">Blocks</span>
            </div>

            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Block Monitoring
            </h1>

            <p className="mt-1 text-slate-500">
              Monitor all plantation blocks and their visit history.
            </p>
          </div>

          <button
            className="
            inline-flex
            items-center
            gap-2
            rounded-2xl
            bg-blue-600
            px-5
            py-3
            font-medium
            text-white
            transition
            hover:bg-blue-700
          "
          >
            <Download size={18} />
            Export
          </button>
        </div>

        {/* Summary */}
        <BlockSummary summary={summary} />

        {/* Filter */}
        <BlockFilter
          amas={amas}
          estates={estates}
          search={searchInput}
          amaId={amaId}
          estateId={estateId}
          status={status}
          division={division}
          onSearch={setSearchInput}
          onAma={setAmaId}
          onEstate={setEstateId}
          onStatus={setStatus}
          onDivision={setDivision}
          onReset={() => {
            setSearchInput("");
            setSearch("");
            setAmaId("");
            setEstateId("");
            setStatus("");
            setDivision("");
            setPage(1);
            setSelectedBlock(null);
          }}
        />

        {/* ========================= */}
        {/* MAP */}
        {/* ========================= */}

        <div
          ref={mapSectionRef}
          className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="h-[650px]">
            <BlockMap
              blocks={blocks}
              selectedBlock={selectedBlock}
              onSelect={handleSelectBlock}
            />
          </div>
        </div>

        {/* ========================= */}
        {/* TABLE */}
        {/* ========================= */}

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <BlockTable
            loading={loading}
            blocks={blocks}
            selectedBlock={selectedBlock}
            onSelect={handleSelectBlock}
          />

          <div className="border-t border-slate-200 bg-slate-50 p-4">
            <BlockPagination
              page={page}
              totalPages={totalPages}
              total={total}
              limit={limit}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
