"use client";

import { useEffect, useState, useMemo } from "react";

import { useRouter } from "next/navigation";

import { AttachmentInformation } from "./form/attachment-information";

import { AttachmentVisitSelector } from "./form/attachment-visit-selector";

import { AttachmentUpload } from "./form/attachment-upload";

import { AttachmentSummary } from "./form/attachment-summary";

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

interface Visit {
  id: number;
  visit_code: string;
  visit_date: string;
  visit_time: string;
  inspector: string;
  estate_id: number;
}

export function CreateAttachmentForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [amas, setAmas] = useState<Ama[]>([]);
  const [estates, setEstates] = useState<Estate[]>([]);
  const [visits, setVisits] = useState<Visit[]>([]);

  const [amaId, setAmaId] = useState("");

  const [estateId, setEstateId] = useState("");

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [selectedVisits, setSelectedVisits] = useState<number[]>([]);

  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    async function loadFormData() {
      try {
        const response = await fetch("/api/attachments?action=form");

        if (!response.ok) return;

        const result = await response.json();

        setAmas(result.amas);
        setEstates(result.estates);
        setVisits(result.visits);
      } catch (error) {
        console.error(error);
      }
    }

    loadFormData();
  }, []);

  const filteredEstates = useMemo(() => {
    if (!amaId) return [];

    return estates.filter((estate) => estate.ama_id === Number(amaId));
  }, [amaId, estates]);

  useEffect(() => {
    setEstateId("");
    setSelectedVisits([]);
  }, [amaId]);

  const filteredVisits = useMemo(() => {
    if (!estateId) return [];

    return visits.filter((visit) => visit.estate_id === Number(estateId));
  }, [estateId, visits]);

  useEffect(() => {
    setSelectedVisits([]);
  }, [estateId]);

  function handleVisitToggle(id: number) {
    setSelectedVisits((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }

      return [...prev, id];
    });
  }

  function handleSelectAll() {
    setSelectedVisits(filteredVisits.map((visit) => visit.id));
  }

  function handleClearSelection() {
    setSelectedVisits([]);
  }

  // ======================================
  // Upload
  // ======================================

  function handleFileChange(file: File | null) {
    setFile(file);
  }

  // ======================================
  // Submit
  // ======================================

  async function handleSubmit() {
    try {
      if (!amaId) {
        alert("Please select AMA.");
        return;
      }

      if (!estateId) {
        alert("Please select Estate.");
        return;
      }

      if (!file) {
        alert("Please upload attachment.");
        return;
      }

      if (selectedVisits.length === 0) {
        alert("Please select at least one visit.");
        return;
      }

      if (!title.trim()) {
        alert("Title is required.");
        return;
      }

      setLoading(true);

      // ==========================================
      // Debug Payload
      // ==========================================

      const payload = {
        ama_id: Number(amaId),
        estate_id: Number(estateId),

        title,
        description,

        file: {
          name: file.name,
          size: file.size,
          type: file.type,
          extension: file.name.split(".").pop()?.toLowerCase(),
        },

        selectedVisits,
      };

      console.group("========== CREATE ATTACHMENT ==========");
      console.log("Payload :", payload);

      console.log(
        "AMA :",
        amas.find((x) => x.id === Number(amaId)),
      );

      console.log(
        "Estate :",
        estates.find((x) => x.id === Number(estateId)),
      );

      console.log(
        "Visits :",
        visits.filter((x) => selectedVisits.includes(x.id)),
      );

      console.log("File :", file);

      console.groupEnd();

      // ==========================
      // Upload File
      // ==========================

      const uploadForm = new FormData();
      uploadForm.append("file", file);

      const uploadResponse = await fetch("/api/uploads", {
        method: "POST",
        body: uploadForm,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload file.");
      }

      const uploadResult = await uploadResponse.json();

      const uploaded = uploadResult.data;

      const attachmentPayload = {
        ama_id: Number(amaId),
        estate_id: Number(estateId),
        title,
        description,
        file_name: uploaded.originalName,
        file_url: uploaded.filePath,
        mime_type: uploaded.mimeType,
        extension: uploaded.extension,
        file_size: uploaded.fileSize,
        uploaded_by: 1,
        visit_ids: selectedVisits,
      };

      console.group("========== FILE UPLOADED ==========");

      console.log(uploadResult);

      console.groupEnd();

      // ==========================
      // Save Attachment
      // ==========================

      console.group("========== POST ATTACHMENT ==========");

      console.log(JSON.stringify(attachmentPayload, null, 2));

      console.groupEnd();

      const response = await fetch("/api/attachments", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(attachmentPayload),
      });

      if (!response.ok) {
        throw new Error("Failed to create attachment.");
      }

      alert("Attachment created successfully.");

      router.push("/attachments");
    } catch (error) {
      console.error(error);

      alert("Failed to create attachment.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Create Attachment</h1>

        <p className="mt-1 text-sm text-slate-500">
          Upload one attachment and link it to one or more inspection visits.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left */}
        <div className="space-y-6 lg:col-span-2">
          <AttachmentInformation
            amas={amas}
            estates={filteredEstates}
            amaId={amaId}
            estateId={estateId}
            title={title}
            description={description}
            onAmaChange={setAmaId}
            onEstateChange={setEstateId}
            onTitleChange={setTitle}
            onDescriptionChange={setDescription}
          />

          <AttachmentVisitSelector
            visits={filteredVisits}
            disabled={!estateId}
            selectedVisits={selectedVisits}
            onToggle={handleVisitToggle}
            onSelectAll={handleSelectAll}
            onClearSelection={handleClearSelection}
          />

          <AttachmentUpload file={file} onChange={handleFileChange} />
        </div>

        {/* Right */}
        <div className="space-y-6">
          <AttachmentSummary
            ama={amas.find((item) => item.id === Number(amaId))?.name ?? "-"}
            estate={
              filteredEstates.find((item) => item.id === Number(estateId))
                ?.name ?? "-"
            }
            visits={selectedVisits.length}
            file={file}
            title={title}
          />

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => router.back()}
                disabled={loading}
                className="
                  flex-1
                  rounded-xl
                  border
                  border-slate-200
                  px-4
                  py-3
                  text-sm
                  font-medium
                  text-slate-700
                  transition
                  hover:bg-slate-50
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="
                  flex-1
                  rounded-xl
                  bg-blue-600
                  px-4
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-blue-700
                  disabled:cursor-not-allowed
                  disabled:bg-blue-400
                "
              >
                {loading ? "Creating..." : "Create Attachment"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
