"use client";

import { useState } from "react";

import { Crosshair, LocateFixed, RotateCcw, CheckCircle2 } from "lucide-react";

import { UseFormSetValue, UseFormWatch, FieldErrors } from "react-hook-form";

import { VisitFormValues } from "@/types/visit-form";
import { useCurrentLocation } from "../hooks/use-current-location";

import dynamic from "next/dynamic";
import { BlockGeometry } from "@/types/map";

interface Props {
  setValue: UseFormSetValue<VisitFormValues>;
  watch: UseFormWatch<VisitFormValues>;
  errors: FieldErrors<VisitFormValues>;
  blockGeometry: BlockGeometry; // GeoJSON polygon
}

export function VisitLocation({
  setValue,
  watch,
  errors,
  blockGeometry,
}: Props) {
  const MapPicker = dynamic(
    () => import("../hooks/map-picker").then((m) => m.MapPicker),
    {
      ssr: false,
    },
  );

  const { loading, error, setError, getLocation } = useCurrentLocation();

  const latitude = watch("latitude");

  const longitude = watch("longitude");

  const accuracy = watch("accuracy");

  const [mode, setMode] = useState<"gps" | "manual">("gps");

  async function handleCurrentLocation() {
    try {
      const position = await getLocation();

      setValue("latitude", Number(position.coords.latitude.toFixed(7)));

      setValue("longitude", Number(position.coords.longitude.toFixed(7)));

      setValue("accuracy", Math.round(position.coords.accuracy));

      setError("");
    } catch (err) {
      if (err instanceof GeolocationPositionError) {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError("Location permission denied.");
            break;

          case err.POSITION_UNAVAILABLE:
            setError("Location unavailable.");
            break;

          case err.TIMEOUT:
            setError("Location request timeout.");
            break;

          default:
            setError("Unable to retrieve your location.");
        }
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error.");
      }
    }
  }

  return (
    <div className="mt-10 space-y-8 border-t border-slate-200 pt-8">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold">Visit Location</h2>

        <p className="mt-1 text-sm text-slate-500">
          Capture GPS automatically or choose a location directly from the map.
        </p>
      </div>

      {/* Mode */}
      <div className="flex gap-6">
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="radio"
            checked={mode === "gps"}
            onChange={() => setMode("gps")}
          />
          Current GPS
        </label>

        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="radio"
            checked={mode === "manual"}
            onChange={() => setMode("manual")}
          />
          Select on Map
        </label>
      </div>

      {/* GPS */}
      {mode === "gps" ? (
        <>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Latitude</label>

              <input
                readOnly
                value={latitude ?? ""}
                className={`${inputClass} ${
                  errors.latitude
                    ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                    : ""
                }`}
              />

              {errors.latitude && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.latitude.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Longitude
              </label>

              <input
                readOnly
                value={longitude ?? ""}
                className={`${inputClass} ${
                  errors.longitude
                    ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                    : ""
                }`}
              />

              {errors.longitude && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.longitude.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              disabled={loading}
              onClick={handleCurrentLocation}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 disabled:opacity-60"
            >
              <LocateFixed size={18} />

              {loading ? "Getting Location..." : "Get Current Location"}
            </button>

            <button
              type="button"
              onClick={() => {
                setValue("latitude", undefined);
                setValue("longitude", undefined);
                setValue("accuracy", undefined);
                setError("");
              }}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 hover:bg-slate-50"
            >
              <RotateCcw size={18} />
              Reset
            </button>
          </div>
        </>
      ) : (
        <>
          {/* MAP */}

          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <MapPicker
              latitude={latitude}
              longitude={longitude}
              blockGeometry={blockGeometry}
              onSelect={(lat, lng) => {
                setValue("latitude", Number(lat.toFixed(7)));
                setValue("longitude", Number(lng.toFixed(7)));
                setValue("accuracy", 0);
                setError("");
              }}
            />
          </div>

          {/* Coordinate */}

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Latitude</label>

              <input readOnly value={latitude ?? ""} className={inputClass} />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Longitude
              </label>

              <input readOnly value={longitude ?? ""} className={inputClass} />
            </div>
          </div>
        </>
      )}

      {/* Status */}

      <div className="flex flex-wrap gap-6 rounded-2xl bg-slate-50 p-5">
        <div>
          <p className="text-xs uppercase text-slate-400">Accuracy</p>

          <p className="mt-1 font-semibold">
            {mode === "gps" ? (accuracy ? `${accuracy} m` : "-") : "Manual"}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase text-slate-400">Status</p>

          {latitude && longitude ? (
            <div className="mt-1 flex items-center gap-2 font-semibold text-green-600">
              <CheckCircle2 size={18} />

              {mode === "gps" ? "GPS Captured" : "Location Selected"}
            </div>
          ) : (
            <div className="mt-1 flex items-center gap-2 font-semibold text-amber-600">
              <Crosshair size={18} />
              Waiting Location
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}
    </div>
  );
}

const inputClass =
  "w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100";
