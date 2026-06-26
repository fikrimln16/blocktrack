"use client";

import { CalendarDays, Clock3, CloudSun, TimerReset } from "lucide-react";
import { VisitFormValues } from "@/types/visit-form";
import { FieldErrors } from "react-hook-form";

interface Props {
  register: any;
  errors: FieldErrors<VisitFormValues>;
}

const weatherOptions = [
  {
    value: "Sunny",
    label: "☀️ Sunny",
  },
  {
    value: "Cloudy",
    label: "☁️ Cloudy",
  },
  {
    value: "Rainy",
    label: "🌧️ Rainy",
  },
  {
    value: "Storm",
    label: "⛈️ Storm",
  },
  {
    value: "Fog",
    label: "🌫️ Fog",
  },
];

const durationOptions = [15, 30, 45, 60, 90, 120];

export function VisitInformation({ register, errors }: Props) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">
          Visit Information
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Fill in the inspection information before continuing.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Visit Date */}
        <Field icon={<CalendarDays size={18} />} label="Visit Date">
          <input
            type="date"
            {...register("visit_date", {
              required: "Visit date is required",
            })}
            className={inputClass}
          />

          {errors.visit_date && (
            <p className="mt-2 text-sm text-red-500">
              {errors.visit_date.message}
            </p>
          )}
        </Field>

        {/* Visit Time */}
        <Field icon={<Clock3 size={18} />} label="Visit Time">
          <input
            type="time"
            {...register("visit_time", {
              required: "Visit time is required",
            })}
            className={inputClass}
          />

          {errors.visit_time && (
            <p className="mt-2 text-sm text-red-500">
              {errors.visit_time.message}
            </p>
          )}
        </Field>

        {/* Weather */}
        <Field icon={<CloudSun size={18} />} label="Weather">
          <select
            {...register("weather", {
              required: "Weather is required",
            })}
            className={inputClass}
          >
            {weatherOptions.map((weather) => (
              <option key={weather.value} value={weather.value}>
                {weather.label}
              </option>
            ))}
          </select>
        </Field>

        {/* Duration */}
        <Field icon={<TimerReset size={18} />} label="Estimated Duration">
          <select
            {...register("duration", {
              required: true,
              min: {
                value: 5,
                message: "Minimum duration is 5 minutes",
              },
            })}
            className={inputClass}
          >
            {durationOptions.map((item) => (
              <option key={item} value={item}>
                {item} Minutes
              </option>
            ))}
          </select>
        </Field>
      </div>
    </div>
  );
}

interface FieldProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}

function Field({ icon, label, children }: FieldProps) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
        <span className="text-blue-600">{icon}</span>

        {label}
      </label>

      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100";
