"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CircleUser, Menu } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-zinc-950/90 backdrop-blur-sm z-50 border-b border-zinc-800">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-red-600 flex items-center justify-center">
            <div className="h-2 w-2 bg-zinc-950 rounded-full"></div>
          </div>
          <div className="hidden md:flex h-0.5 w-10 bg-red-600"></div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-white font-medium hover:text-red-500 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-red-600 after:transform after:scale-x-100"
          >
            HOME
          </Link>
          <Link
            href="/features"
            className="text-white font-medium hover:text-red-500 transition-colors"
          >
            FEATURES
          </Link>
          <Link
            href="/feature"
            className="text-white font-medium hover:text-red-500 transition-colors"
          >
            FEATURE
          </Link>
          <Link
            href="/contact"
            className="text-white font-medium hover:text-red-500 transition-colors"
          >
            CONTACT
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="hidden md:flex px-4 rounded-full bg-red-600 hover:bg-red-700 text-white">
            LOGIN
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu className="h-6 w-6 text-white" />
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-zinc-950 border-t border-zinc-800 py-4">
          <div className="container mx-auto px-4 flex flex-col gap-4">
            <Link
              href="/"
              className="text-white font-medium hover:text-red-500 transition-colors py-2"
            >
              HOME
            </Link>
            <Link
              href="/features"
              className="text-white font-medium hover:text-red-500 transition-colors py-2"
            >
              FEATURES
            </Link>
            <Link
              href="/feature"
              className="text-white font-medium hover:text-red-500 transition-colors py-2"
            >
              FEATURE
            </Link>
            <Link
              href="/contact"
              className="text-white font-medium hover:text-red-500 transition-colors py-2"
            >
              CONTACT
            </Link>
            <Button variant="ghost" size="sm" className="w-full justify-center px-4 rounded-full bg-red-600 hover:bg-red-700 text-white">
              LOGIN
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
