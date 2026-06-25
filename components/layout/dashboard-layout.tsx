"use client";

import { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <div className="lg:ml-[280px]">
        <Topbar />

        <main className="px-4 py-4 md:px-6 md:py-6 xl:px-8 xl:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
