"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  LayoutDashboard,
  Map,
  History,
  Trees,
  Building2,
  Package,
  ImageIcon,
  FileText,
  BarChart3,
  Menu,
  X,
  Headset,
  Palmtree,
} from "lucide-react";

const menus = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  // {
  //   title: "Live Monitoring",
  //   href: "/monitoring",
  //   icon: Map,
  // },
  // {
  //   title: "Visit History",
  //   href: "/visits",
  //   icon: History,
  // },
  // {
  //   title: "AMA",
  //   href: "/amas",
  //   icon: Trees,
  // },
  // {
  //   title: "Estate",
  //   href: "/estates",
  //   icon: Building2,
  // },
  {
    title: "Block",
    href: "/blocks",
    icon: Package,
  },
  // {
  //   title: "Photos",
  //   href: "/photos",
  //   icon: ImageIcon,
  // },
  // {
  //   title: "Reports",
  //   href: "/reports",
  //   icon: FileText,
  // },
  // {
  //   title: "Analytics",
  //   href: "/analytics",
  //   icon: BarChart3,
  // },
];

export function Sidebar() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle */}

      <button
        onClick={() => setOpen(true)}
        className="
          fixed right-4 top-4 z-[9999]
          flex h-11 w-11 items-center justify-center
          rounded-xl
          bg-blue-600
          text-white
          shadow-lg
          transition
          hover:bg-blue-700
          lg:hidden
        "
      >
        <Menu size={20} />
      </button>

      {/* Overlay */}

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="
            fixed inset-0 z-[9998]
            bg-slate-900/50
            backdrop-blur-sm
            lg:hidden
          "
        />
      )}

      {/* Mobile Sidebar */}

      <aside
        className={`
          fixed top-0 right-0 z-[9999]
          h-screen w-[300px] max-w-[90vw]
          bg-[#081A37]
          shadow-2xl
          transition-transform duration-300 ease-in-out
          lg:hidden
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <SidebarContent pathname={pathname} close={() => setOpen(false)} />
      </aside>

      {/* Desktop Sidebar */}

      <aside
        className="
          fixed left-0 top-0
          hidden h-screen w-[280px]
          flex-col
          border-r border-blue-900/20
          bg-[#081A37]
          lg:flex
        "
      >
        <SidebarContent pathname={pathname} />
      </aside>
    </>
  );
}

function SidebarContent({
  pathname,
  close,
}: {
  pathname: string;
  close?: () => void;
}) {
  return (
    <>
      <div className="flex items-center justify-between border-b border-blue-900/30 px-6 py-6">
        <div className="flex items-center gap-3">
          <div
            className="
              flex h-12 w-12
              items-center justify-center
              rounded-2xl
              bg-blue-600
            "
          >
            <Palmtree size={24} className="text-white" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">BlockTrack</h1>

            <p className="text-xs text-blue-200">Plantation Monitoring</p>
          </div>
        </div>

        {close && (
          <button
            onClick={close}
            className="
              rounded-xl
              p-2
              text-white
              transition
              hover:bg-white/10
            "
          >
            <X size={22} />
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between overflow-y-auto">
        <nav className="space-y-2 p-4">
          {menus.map((menu) => {
            const Icon = menu.icon;

            const active = pathname === menu.href;

            return (
              <Link
                key={menu.title}
                href={menu.href}
                onClick={close}
                className={`
                  flex items-center gap-3
                  rounded-2xl
                  px-4 py-3
                  text-sm font-medium
                  transition-all
                  ${
                    active
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-blue-100 hover:bg-blue-600/80 hover:text-white"
                  }
                `}
              >
                <Icon size={20} />

                {menu.title}
              </Link>
            );
          })}
        </nav>

        <div className="p-4">
          <div className="rounded-3xl bg-gradient-to-br from-blue-700 to-blue-600 p-5">
            <h3 className="mt-4 font-semibold text-white">Head Office</h3>

            <div className="mt-4 space-y-3 text-xs leading-5 text-blue-100">
              <div>
                <p className="font-semibold text-white">
                  PT PP London Sumatra Indonesia Tbk
                </p>

                <p>Ariobimo Sentral, 12th Floor</p>
                <p>Jl. HR. Rasuna Said Blok X-2 Kav.5</p>
                <p>Jakarta 12950</p>
              </div>

              <div>
                <p className="font-semibold text-white">Contact Information</p>

                <p>
                  <span className="font-medium text-white">Tel</span> : (+62 21)
                  8065 7388
                </p>

                <p>
                  <span className="font-medium text-white">Fax</span> : (+62 21)
                  8065 7399
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
