"use client";

import { usePathname } from "next/navigation";

import { Bell, Search, CalendarDays } from "lucide-react";

export function Topbar() {
  const pathname = usePathname();

  const pageInfo = getPageInfo(pathname);

  return (
    <header
      className="
        sticky top-0 z-50
        border-b border-slate-200
        bg-white/90
        backdrop-blur-md
      "
    >
      <div
        className="
          flex h-[76px]
          items-center justify-between
          px-4 md:px-6 xl:px-8
        "
      >
        {/* LEFT */}

        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            {pageInfo.title}
          </h2>

          <p className="text-sm text-slate-500">{pageInfo.description}</p>
        </div>
      </div>
    </header>
  );
}

function getPageInfo(pathname: string) {
  if (pathname === "/dashboard") {
    return {
      title: "Dashboard",
      description: "Block Visit Monitoring Overview",
    };
  }

  if (pathname === "/visits") {
    return {
      title: "Visit History",
      description: "Manage and monitor field visits",
    };
  }

  if (pathname.startsWith("/visits/")) {
    return {
      title: "Visit Detail",
      description: "Detailed information about a visit",
    };
  }

  if (pathname === "/amas") {
    return {
      title: "AMA Management",
      description: "Manage all AMA locations",
    };
  }

  if (pathname === "/estates") {
    return {
      title: "Estate Management",
      description: "Manage plantation estates",
    };
  }

  if (pathname === "/blocks") {
    return {
      title: "Block Management",
      description: "Monitor plantation blocks",
    };
  }

  if (pathname === "/photos") {
    return {
      title: "Photo Gallery",
      description: "Visit documentation and photos",
    };
  }

  if (pathname === "/reports") {
    return {
      title: "Reports",
      description: "Generate and download reports",
    };
  }

  if (pathname === "/analytics") {
    return {
      title: "Analytics",
      description: "Performance and visit analytics",
    };
  }

  return {
    title: "BlockTrack",
    description: "Plantation Monitoring System",
  };
}
