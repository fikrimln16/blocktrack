"use client";

import Image from "next/image";
import Link from "next/link";
import { Camera, ArrowRight, MapPin, User } from "lucide-react";

interface RecentPhoto {
  id: number;
  photo_url: string;
  visit_code: string;
  inspector: string;
  estate: string;
  block: string;
  created_at: string;
}

interface Props {
  photos: RecentPhoto[];
}

export function RecentPhotosCard({ photos }: Props) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 p-6">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-pink-100 p-3">
            <Camera className="h-6 w-6 text-pink-600" />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Last Recent Photos
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Latest uploaded inspection documentation.
            </p>
          </div>
        </div>

        <Link
          href="/gallery"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          View Gallery
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Body */}
      <div className="p-6">
        {photos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Camera className="mb-4 h-12 w-12 text-slate-300" />

            <h3 className="text-lg font-semibold text-slate-700">No Photos</h3>

            <p className="mt-2 text-sm text-slate-500">
              There are no inspection photos yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative h-56 w-full overflow-hidden rounded-t-2xl">
                  <Image
                    src={photo.photo_url}
                    alt={photo.visit_code}
                    fill
                    sizes="(max-width:768px) 100vw,
                     (max-width:1280px) 50vw,
                     25vw"
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="space-y-3 p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
                    <User size={15} />
                    {photo.inspector}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <MapPin size={15} />
                    {photo.estate}
                  </div>

                  <div className="text-xs text-slate-400">
                    Block {photo.block}
                  </div>

                  <div className="border-t pt-3 text-xs text-slate-400">
                    {new Date(photo.created_at).toLocaleString("id-ID", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
