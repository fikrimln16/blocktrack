"use client";

import { useState } from "react";

export function useCurrentLocation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getLocation = async (): Promise<GeolocationPosition> => {
    setLoading(true);
    setError("");

    if (!navigator.geolocation) {
      setLoading(false);
      throw new Error("Browser doesn't support Geolocation.");
    }

    // Cek permission jika browser mendukung
    if ("permissions" in navigator) {
      try {
        const permission = await navigator.permissions.query({
          name: "geolocation",
        });

        if (permission.state === "denied") {
          setLoading(false);
          throw new Error(
            "Location permission denied. Please enable it in your browser.",
          );
        }
      } catch {
        // Browser tidak mendukung permissions API
      }
    }

    const getPosition = (
      options: PositionOptions,
    ): Promise<GeolocationPosition> => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
      });
    };

    try {
      // Coba high accuracy terlebih dahulu
      const position = await getPosition({
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      });

      return position;
    } catch {
      // Jika gagal, fallback ke low accuracy
      try {
        const position = await getPosition({
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 60000,
        });

        return position;
      } finally {
        setLoading(false);
      }
    }
  };

  return {
    loading,
    error,
    setError,
    getLocation,
  };
}
