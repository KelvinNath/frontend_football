"use client";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [selectedRole, setSelectedRole] = useState<'scout' | 'player' | null>(null);

  return (
    <AppLayout>
      <div className="w-full max-w-6xl mx-auto">
        {/* Login Hero Section */}
        <div className="relative w-full rounded-xl overflow-hidden bg-zinc-950 mb-10">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent"></div>

          <div className="relative z-10 px-6 py-12 md:px-10 md:py-16 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Welcome to <span className="text-red-500">Performance</span> Analytics
            </h1>

            <p className="text-white/80 text-lg mb-8">
              Choose your role to get started
            </p>
          </div>
        </div>

        {/* Role Selection Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Scout Role Card */}
          <div 
            onClick={() => setSelectedRole('scout')}
            className={`bg-zinc-950 p-8 rounded-xl cursor-pointer transition-all duration-300 
            ${selectedRole === 'scout' ? 'ring-4 ring-red-600' : 'hover:bg-zinc-900'}`}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-red-600 flex items-center justify-center mb-6">
                <svg 
                  className="w-12 h-12 text-white" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" 
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Scout</h2>
              <p className="text-zinc-400 mb-6">
                Access detailed player analytics and performance tracking
              </p>
            </div>
          </div>

          {/* Player Role Card */}
          <div 
            onClick={() => setSelectedRole('player')}
            className={`bg-zinc-950 p-8 rounded-xl cursor-pointer transition-all duration-300 
            ${selectedRole === 'player' ? 'ring-4 ring-red-600' : 'hover:bg-zinc-900'}`}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-red-600 flex items-center justify-center mb-6">
                <svg 
                  className="w-12 h-12 text-white" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" 
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Player</h2>
              <p className="text-zinc-400 mb-6">
                View your personal performance metrics and progress
              </p>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        {selectedRole && (
          <div className="mt-8 text-center">
            <Button 
              size="lg" 
              className="bg-red-600 hover:bg-red-700 text-white rounded-full px-12"
              onClick={() => {
                // TODO: Implement navigation based on selected role
                console.log(`Navigating to ${selectedRole} authentication`);
              }}
            >
              Continue as {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
            </Button>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link
            href="/"
            className="bg-zinc-950 p-5 rounded-xl hover:bg-zinc-900 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-red-500 transition-colors">HOME</h3>
                <p className="text-sm text-zinc-400">Return to homepage</p>
              </div>
            </div>
          </Link>

          <Link
            href="/features"
            className="bg-zinc-950 p-5 rounded-xl hover:bg-zinc-900 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-red-500 transition-colors">FEATURES</h3>
                <p className="text-sm text-zinc-400">Explore platform capabilities</p>
              </div>
            </div>
          </Link>

          <Link
            href="/contact"
            className="bg-zinc-950 p-5 rounded-xl hover:bg-zinc-900 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-red-500 transition-colors">CONTACT</h3>
                <p className="text-sm text-zinc-400">Get support</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}