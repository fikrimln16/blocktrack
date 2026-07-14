"use client";

import { Building2, MapPinned, FileText } from "lucide-react";

interface Ama {
  id: number;
  code: string;
  name: string;
}

interface Estate {
  id: number;
  name: string;
}

interface Props {
  amas: Ama[];
  estates: Estate[];

  amaId: string;
  estateId: string;

  title: string;
  description: string;

  onAmaChange: (value: string) => void;
  onEstateChange: (value: string) => void;

  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
}

export function AttachmentInformation({
  amas,
  estates,

  amaId,
  estateId,

  title,
  description,

  onAmaChange,
  onEstateChange,

  onTitleChange,
  onDescriptionChange,
}: Props) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Attachment Information
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Select the destination and provide the attachment information.
        </p>
      </div>

      <div className="space-y-6 p-6">
        {/* AMA & Estate */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* AMA */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <Building2 size={16} />
              AMA
              <span className="text-red-500">*</span>
            </label>

            <select
              value={amaId}
              onChange={(e) => onAmaChange(e.target.value)}
              className="
              w-full
              rounded-xl
              border
              border-slate-300
              bg-white
              px-4
              py-3
              text-sm
              shadow-sm
              outline-none
              transition
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-100
            "
            >
              <option value="">Select AMA</option>

              {amas.map((ama) => (
                <option key={ama.id} value={ama.id}>
                  {ama.code} - {ama.name}
                </option>
              ))}
            </select>

            <p className="mt-2 text-xs text-slate-500">Choose the AMA first.</p>
          </div>

          {/* Estate */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <MapPinned size={16} />
              Estate
              <span className="text-red-500">*</span>
            </label>

            <select
              value={estateId}
              onChange={(e) => onEstateChange(e.target.value)}
              disabled={!amaId}
              className="
              w-full
              rounded-xl
              border
              border-slate-300
              bg-white
              px-4
              py-3
              text-sm
              shadow-sm
              outline-none
              transition
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-100
              disabled:cursor-not-allowed
              disabled:bg-slate-100
              disabled:text-slate-400
            "
            >
              <option value="">
                {!amaId ? "Select AMA first" : "Select Estate"}
              </option>

              {estates.map((estate) => (
                <option key={estate.id} value={estate.id}>
                  {estate.name}
                </option>
              ))}
            </select>

            {!amaId ? (
              <p className="mt-2 text-xs text-slate-400">
                Please select an AMA to load available estates.
              </p>
            ) : (
              <div className="mt-2 flex items-center justify-between">
                <p className="text-xs text-slate-500">
                  Estate list filtered by selected AMA.
                </p>

                <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                  {estates.length} Estate
                  {estates.length !== 1 ? "s" : ""}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <FileText size={16} />
            Attachment Title
            <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Example: Estate Inspection Report July 2026"
            className="
            w-full
            rounded-xl
            border
            border-slate-300
            px-4
            py-3
            text-sm
            shadow-sm
            outline-none
            transition
            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-100
          "
          />
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 text-sm font-medium text-slate-700">
            Description
          </label>

          <textarea
            rows={5}
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Write additional information..."
            className="
            w-full
            resize-none
            rounded-xl
            border
            border-slate-300
            px-4
            py-3
            text-sm
            shadow-sm
            outline-none
            transition
            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-100
          "
          />
        </div>

        {/* Information */}
        <div className="rounded-2xl border border-blue-200 bg-blue-50 px-5 py-4">
          <p className="text-sm leading-6 text-blue-700">
            One attachment can be linked to multiple inspection visits within
            the selected estate.
          </p>
        </div>
      </div>
    </div>
  );
}
