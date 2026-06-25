"use client";

import { Tooltip } from "react-leaflet";

interface Props {
  blockCode: string;
}

export function BlockLabel({ blockCode }: Props) {
  return (
    <Tooltip permanent direction="center" opacity={1} className="block-label">
      <span
        style={{
          fontWeight: 700,
          fontSize: 12,
          color: "#0f172a",
          background: "rgba(255,255,255,.85)",
          padding: "2px 6px",
          borderRadius: 8,
        }}
      >
        {blockCode}
      </span>
    </Tooltip>
  );
}
