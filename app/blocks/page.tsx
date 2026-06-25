"use client";

import { useEffect, useState } from "react";

import { DashboardLayout } from "@/components/layout/dashboard-layout";

import { BlockSummary } from "@/components/blocks/block-summary";
import { BlockFilter } from "@/components/blocks/block-filter";
import { BlockList } from "@/components/blocks/block-list";
import { BlockMap } from "@/components/blocks/block-map";

import { Block } from "@/types/block";

import Link from "next/link";

import { ChevronRight, Download, Map } from "lucide-react";

interface Summary {
  totalAma: number;
  totalEstate: number;
  totalBlock: number;
  visitedBlock: number;
}

export default function BlocksPage() {
  const [loading, setLoading] = useState(true);

  const [blocks, setBlocks] = useState<Block[]>([]);

  const [summary, setSummary] = useState<Summary>({
    totalAma: 0,
    totalEstate: 0,
    totalBlock: 0,
    visitedBlock: 0,
  });

  const [amas, setAmas] = useState<any[]>([]);

  const [estates, setEstates] = useState<any[]>([]);

  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);

  const [search, setSearch] = useState("");
  const [amaId, setAmaId] = useState("");
  const [estateId, setEstateId] = useState("");
  const [status, setStatus] = useState("");
  const [division, setDivision] = useState("");

  useEffect(() => {
    loadBlocks();
  }, []);

  async function loadBlocks() {
    try {
      const res = await fetch("/api/blocks");

      const json = await res.json();

      setBlocks(json.blocks);

      setSummary(json.summary);

      setAmas(json.amas);

      setEstates(json.estates);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const filteredBlocks = blocks.filter((block) => {
    const matchSearch =
      !search ||
      block.block_code.toLowerCase().includes(search.toLowerCase()) ||
      (block.block_name ?? "").toLowerCase().includes(search.toLowerCase());

    const matchAma = !amaId || block.ama_id === Number(amaId);

    const matchEstate = !estateId || block.estate_id === Number(estateId);

    const matchStatus = !status || block.status === status;

    const matchDivision = !division || block.division === Number(division);

    return (
      matchSearch && matchAma && matchEstate && matchStatus && matchDivision
    );
  });

  console.log(filteredBlocks);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Breadcrumb */}

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
          search={search}
          amaId={amaId}
          estateId={estateId}
          status={status}
          division={division}
          onSearch={setSearch}
          onAma={setAmaId}
          onEstate={setEstateId}
          onStatus={setStatus}
          onDivision={setDivision}
          onReset={() => {
            setSearch("");
            setAmaId("");
            setEstateId("");
            setStatus("");
            setDivision("");
          }}
        />

        {/* Content */}

        <div className="grid gap-6 xl:grid-cols-12">
          {/* List */}

          <div className="xl:col-span-4">
            <BlockList
              loading={loading}
              blocks={filteredBlocks}
              selectedBlock={selectedBlock}
              onSelect={setSelectedBlock}
            />
          </div>

          {/* Map */}

          <div className="xl:col-span-8">
            <BlockMap
              blocks={filteredBlocks}
              selectedBlock={selectedBlock}
              onSelect={setSelectedBlock}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
