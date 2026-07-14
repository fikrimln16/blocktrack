"use client";

import { useEffect, useRef, useState, useMemo } from "react";

import { AttachmentListResponse } from "@/types/attachment";

import { AttachmentFilter } from "./attachment-filter";
import { AttachmentHeader } from "./attachment-header";
import { AttachmentPagination } from "./attachment-pagination";
import { AttachmentResultInfo } from "./attachment-result-info";
import { AttachmentTable } from "./attachment-table";

interface AttachmentStatistics {
  totalAttachments: number;
  totalVisits: number;
  totalSize: number;
  totalUploaders: number;
}

interface AttachmentPageResponse extends AttachmentListResponse {
  statistics: AttachmentStatistics;
}

interface Props {
  initialData: AttachmentPageResponse;
}

interface Ama {
  id: number;
  code: string;
  name: string;
}

interface Estate {
  id: number;
  ama_id: number;
  name: string;
}

interface Uploader {
  id: number;
  name: string;
}

export function AttachmentPageClient({ initialData }: Props) {
  const [data, setData] = useState<AttachmentPageResponse>(initialData);

  const [loading, setLoading] = useState(false);

  const firstLoad = useRef(true);

  const [page, setPage] = useState(initialData.page);

  const [search, setSearch] = useState("");

  const [ama, setAma] = useState("");

  const [estate, setEstate] = useState("");

  const [extension, setExtension] = useState("");

  const [uploadedBy, setUploadedBy] = useState("");

  const [sort, setSort] = useState("created_at");

  const [amas, setAmas] = useState<Ama[]>([]);

  const [estates, setEstates] = useState<Estate[]>([]);

  const [uploaders, setUploaders] = useState<Uploader[]>([]);

  useEffect(() => {
    async function loadFilters() {
      const response = await fetch("/api/attachments?action=filter");

      if (!response.ok) return;

      const result = await response.json();

      setAmas(result.amas);
      setEstates(result.estates);
      setUploaders(result.uploaders);
    }

    loadFilters();
  }, []);

  const filteredEstates = useMemo(() => {
    if (!ama) return [];

    return estates.filter((estate) => estate.ama_id === Number(ama));
  }, [ama, estates]);

  useEffect(() => {
    setEstate("");
  }, [ama]);

  /**
   * Reset page ketika filter berubah
   */
  useEffect(() => {
    setPage(1);
  }, [search, ama, estate, extension, uploadedBy, sort]);

  /**
   * Skip request pertama
   * karena data sudah berasal dari Server Component.
   */
  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }

    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);

        const params = new URLSearchParams();

        params.set("page", String(page));
        params.set("limit", String(data.limit));

        if (search) {
          params.set("search", search);
        }

        if (ama) {
          params.set("ama", ama);
        }

        if (estate) {
          params.set("estate", estate);
        }

        if (extension) {
          params.set("extension", extension);
        }

        if (uploadedBy) {
          params.set("uploadedBy", uploadedBy);
        }

        params.set("sort", sort);

        const response = await fetch(`/api/attachments?${params.toString()}`, {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load attachments.");
        }

        const result: AttachmentPageResponse = await response.json();

        setData(result);
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    }

    load();

    return () => controller.abort();
  }, [page, search, ama, estate, extension, uploadedBy, sort, data.limit]);

  return (
    <div className="space-y-6">
      <AttachmentHeader
        totalAttachments={data.statistics.totalAttachments}
        totalVisits={data.statistics.totalVisits}
        totalSize={data.statistics.totalSize}
        totalUploaders={data.statistics.totalUploaders}
      />

      <AttachmentFilter
        amas={amas}
        estates={estates}
        uploaders={uploaders}
        search={search}
        setSearch={setSearch}
        ama={ama}
        setAma={setAma}
        estate={estate}
        setEstate={setEstate}
        extension={extension}
        setExtension={setExtension}
        uploadedBy={uploadedBy}
        setUploadedBy={setUploadedBy}
        sort={sort}
        setSort={setSort}
      />

      <AttachmentResultInfo
        total={data.total}
        page={data.page}
        limit={data.limit}
      />

      <AttachmentTable attachments={data.data} loading={loading} />

      <AttachmentPagination
        page={page}
        totalPages={data.totalPages}
        onChange={setPage}
      />
    </div>
  );
}
