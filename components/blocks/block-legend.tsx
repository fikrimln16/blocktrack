"use client";

export function BlockLegend() {
  return (
    <div
      className="
        absolute
        bottom-4
        left-4
        z-[1000]
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-4
        shadow-xl
      "
    >
      <h4 className="mb-3 font-semibold">Legend</h4>

      <div className="space-y-2 text-sm">
        <Legend color="#16A34A" label="Normal Block" />

        <Legend color="#2563EB" label="Selected Block" />

        <Legend color="#EF4444" label="Visit Marker" />
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="h-4 w-4 rounded"
        style={{
          background: color,
        }}
      />

      {label}
    </div>
  );
}
