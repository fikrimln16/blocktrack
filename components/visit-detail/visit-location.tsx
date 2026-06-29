import Link from "next/link";

import {
  Building2,
  MapPinned,
  Crosshair,
  LocateFixed,
  ExternalLink,
  Map,
} from "lucide-react";

import { VisitDetail } from "@/types/visit-detail";

import { LocationItem } from "./location-item";

interface Props {
  visit: VisitDetail;
}

export function VisitLocation({ visit }: Props) {
  const googleMapsUrl = `https://www.google.com/maps?q=${visit.latitude},${visit.longitude}`;

  return (
    <div className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Location & GPS</h2>

        <p className="mt-1 text-sm text-slate-500">
          Inspection location and GPS metadata.
        </p>
      </div>

      <div className="flex-1 space-y-4">
        <LocationItem icon={Building2} label="AMA" value={visit.ama} />

        <LocationItem icon={Building2} label="Estate" value={visit.estate} />

        <LocationItem icon={MapPinned} label="Block" value={visit.block} />

        <LocationItem
          icon={Crosshair}
          label="Coordinates"
          value={`${visit.latitude}, ${visit.longitude}`}
        />

        <LocationItem
          icon={LocateFixed}
          label="GPS Accuracy"
          value={`${visit.accuracy} m`}
        />

        <div className="mt-6">
          <Link
            href={googleMapsUrl}
            target="_blank"
            className="
      group
      flex
      items-center
      justify-between
      rounded-2xl
      border
      border-slate-200
      bg-slate-50
      p-4
      transition
      hover:border-blue-200
      hover:bg-blue-50
    "
          >
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-blue-100 p-3">
                <MapPinned size={20} className="text-blue-600" />
              </div>

              <div>
                <p className="font-medium text-slate-900">
                  Open in Google Maps
                </p>

                <p className="text-sm text-slate-500">
                  Navigate to inspection location
                </p>
              </div>
            </div>

            <ExternalLink
              size={18}
              className="
        text-slate-400
        transition
        group-hover:translate-x-1
        group-hover:text-blue-600
      "
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
