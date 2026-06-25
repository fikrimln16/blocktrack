import { FileText, FileSpreadsheet, File, Download } from "lucide-react";

const files = [
  {
    name: "Visit Report.pdf",
    size: "1.2 MB",
    icon: FileText,
    color: "text-red-500",
  },
  {
    name: "Monitoring Data.xlsx",
    size: "824 KB",
    icon: FileSpreadsheet,
    color: "text-green-500",
  },
  {
    name: "Field Notes.docx",
    size: "320 KB",
    icon: File,
    color: "text-blue-500",
  },
];

export function VisitAttachments() {
  return (
    <div
      className="
        rounded-[28px]
        border border-slate-200
        bg-white
        shadow-sm
      "
    >
      <div className="border-b border-slate-200 p-5">
        <h3 className="text-lg font-semibold text-slate-900">Attachments</h3>

        <p className="mt-1 text-sm text-slate-500">
          Supporting visit documents
        </p>
      </div>

      <div className="space-y-4 p-5">
        {files.map((file) => {
          const Icon = file.icon;

          return (
            <div
              key={file.name}
              className="
                flex items-center justify-between
                rounded-2xl
                border border-slate-200
                p-4
                transition
                hover:bg-slate-50
              "
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-slate-100 p-3">
                  <Icon size={20} className={file.color} />
                </div>

                <div>
                  <p className="font-medium text-slate-900">{file.name}</p>

                  <p className="text-sm text-slate-500">{file.size}</p>
                </div>
              </div>

              <button
                className="
                  flex h-10 w-10
                  items-center justify-center
                  rounded-xl
                  border border-slate-200
                  hover:bg-white
                "
              >
                <Download size={18} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
