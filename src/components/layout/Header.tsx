"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const onClickLogin = () => {
    router.push('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-zinc-950/90 backdrop-blur-sm z-50 border-b border-zinc-800">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-red-600 flex items-center justify-center">
            
          </div>
          <div className="hidden md:flex h-0.5 w-10 bg-red-600"></div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-white font-medium group relative transition-colors duration-300 py-1"
          >
            HOME
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
          <Link
            href="/features"
            className="text-white font-medium group relative transition-colors duration-300 py-1"
          >
            FEATURES
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
          
          <Link
            href="/contact"
            className="text-white font-medium group relative transition-colors duration-300 py-1"
          >
            CONTACT
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            className="hidden md:flex px-4 rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors duration-300"
            onClick={onClickLogin}
          >
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
              className="text-white font-medium group relative transition-colors duration-300 py-2"
            >
              HOME
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <Link
              href="/features"
              className="text-white font-medium group relative transition-colors duration-300 py-2"
            >
              FEATURES
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <Link
              href="/feature"
              className="text-white font-medium group relative transition-colors duration-300 py-2"
            >
              FEATURE
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <Link
              href="/contact"
              className="text-white font-medium group relative transition-colors duration-300 py-2"
            >
              CONTACT
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-center px-4 rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors duration-300"
              onClick={onClickLogin}
            >
              LOGIN
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}