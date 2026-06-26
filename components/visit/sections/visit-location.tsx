"use client";

import { useState } from "react";

import { Crosshair, LocateFixed, RotateCcw, CheckCircle2 } from "lucide-react";

import { UseFormSetValue, UseFormWatch, FieldErrors } from "react-hook-form";

import { VisitFormValues } from "@/types/visit-form";
import { useCurrentLocation } from "../hooks/use-current-location";

interface Props {
  setValue: UseFormSetValue<VisitFormValues>;
  watch: UseFormWatch<VisitFormValues>;
  errors: FieldErrors<VisitFormValues>;
}

export function VisitLocation({ setValue, watch, errors }: Props) {
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
      <div>
        <h2 className="text-xl font-semibold">Visit Location</h2>

        <p className="mt-1 text-sm text-slate-500">
          Capture GPS location or input manually.
        </p>
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={mode === "gps"}
            onChange={() => setMode("gps")}
          />
          Current GPS
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={mode === "manual"}
            onChange={() => setMode("manual")}
          />
          Manual Coordinate
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">Latitude</label>

          <input
            type="number"
            step="any"
            readOnly={mode === "gps"}
            value={latitude ?? ""}
            onChange={(e) => setValue("latitude", Number(e.target.value))}
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
          <label className="mb-2 block text-sm font-medium">Longitude</label>

          <input
            type="number"
            step="any"
            readOnly={mode === "gps"}
            value={longitude ?? ""}
            onChange={(e) => setValue("longitude", Number(e.target.value))}
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

      <div className="flex flex-wrap gap-6 rounded-2xl bg-slate-50 p-5">
        <div>
          <p className="text-xs uppercase text-slate-400">Accuracy</p>

          <p className="mt-1 font-semibold">
            {accuracy ? `${accuracy} m` : "-"}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase text-slate-400">Status</p>

          {latitude && longitude ? (
            <div className="mt-1 flex items-center gap-2 font-semibold text-green-600">
              <CheckCircle2 size={18} />
              GPS Captured
            </div>
          ) : (
            <div className="mt-1 flex items-center gap-2 font-semibold text-amber-600">
              <Crosshair size={18} />
              Waiting GPS
            </div>
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
        <button
          type="button"
          onClick={handleCurrentLocation}
          disabled={loading}
          className="rounded-xl border border-blue-200 px-4 py-3 text-blue-600 hover:bg-blue-50"
        >
          Retry
        </button>
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

const inputClass =
  "w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100";
