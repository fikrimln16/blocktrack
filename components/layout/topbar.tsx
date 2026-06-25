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

        {/* RIGHT */}

        <div className="flex items-center gap-3">
          <div
            className="
              hidden xl:flex
              h-12 w-[340px]
              items-center
              rounded-2xl
              border border-slate-200
              bg-slate-50
              px-4
            "
          >
            <Search size={18} className="text-slate-400" />

            <input
              placeholder="Search..."
              className="
                ml-3
                flex-1
                bg-transparent
                text-sm
                outline-none
              "
            />
          </div>

          <button
            className="
              hidden md:flex
              items-center gap-2
              rounded-2xl
              border border-slate-200
              bg-white
              px-4 py-3
              text-sm
              font-medium
            "
          >
            <CalendarDays size={18} />
            Today
          </button>

          <button
            className="
              relative
              flex h-12 w-12
              items-center justify-center
              rounded-2xl
              border border-slate-200
              bg-white
            "
          >
            <Bell size={18} />

            <span
              className="
                absolute right-3 top-3
                h-2 w-2
                rounded-full
                bg-red-500
              "
            />
          </button>

          <div
            className="
              flex items-center gap-3
              rounded-2xl
              border border-slate-200
              bg-white
              p-2
            "
          >
            <div
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-full
                bg-blue-600
                text-white
                font-semibold
              "
            >
              FM
            </div>

            <div className="hidden lg:block">
              <p className="font-semibold">Fikri Maulana</p>

              <p className="text-xs text-slate-500">Administrator</p>
            </div>
          </div>
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
