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

      </div>
    </AppLayout>
  );
}