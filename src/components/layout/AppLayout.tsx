"use client";

import { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Toaster } from "sonner";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-zinc-900">
      <Header />
      <Sidebar />

      <main className="md:pl-64 pt-16 min-h-screen">
        <div className="container mx-auto p-4 md:p-6 max-w-screen-xl">
          {children}
        </div>
      </main>

      <Toaster position="top-right" richColors />
    </div>
  );
}


