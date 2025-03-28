"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const onClickLogin = () => {
    router.push('/login');
  };

  const onClickSignUp = () => {
    router.push('/signup');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-zinc-950/90 backdrop-blur-sm z-50 border-b border-zinc-800">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-red-600 flex items-center justify-center">
            
          </div>
          <div className="hidden md:flex h-0.5 w-10 bg-red-600"></div>
        </div>

        <nav className="flex items-center gap-8">
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
            className="px-4 rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors duration-300 mr-2"
            onClick={onClickLogin}
          >
            LOGIN
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="px-4 rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors duration-300"
            onClick={onClickSignUp}
          >
            SIGN UP
          </Button>
        </div>
      </div>
    </header>
  );
}