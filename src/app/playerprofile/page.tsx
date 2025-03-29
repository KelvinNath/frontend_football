"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

// Add an interface for the error response data
interface ErrorResponse {
  message: string;
}

export default function PlayerProfile() {
  const router = useRouter();
  const [age, setAge] = useState('');
  const [position, setPosition] = useState('');
  const [club, setClub] = useState('');
  const [nationality, setNationality] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Predefined position options
  const positionOptions = [
    'Goalkeeper', 
    'Defender', 
    'Midfielder', 
    'Forward'
  ];

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user');

    if (!token || !user) {
      // Redirect to login if not authenticated
      router.push('/login');
      return;
    }

    // Check if profile already exists
    const checkPlayerProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/player/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        // If profile exists, redirect to home
        if (response.data.profile) {
          router.push('/');
        }
      } catch (error) {
        // If no profile found, stay on this page
        console.log('No existing profile found');
      }
    };

    checkPlayerProfile();
  }, [router]);

  const handleSubmitProfile = async () => {
    // Validate inputs
    if (!age || !position || !club || !nationality) {
      toast.error("Please fill in all fields");
      return;
    }

    // Additional validations
    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 16 || ageNum > 50) {
      toast.error("Please enter a valid age between 16 and 50");
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post(
        'http://localhost:3000/api/player/profile', 
        {
          age: ageNum,
          position,
          club,
          nationality
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      toast.success("Profile created successfully");
      router.push('/');
    } catch (error) {
      console.error('Profile creation failed:', error);
      toast.error(
        (error as AxiosError<{message: string}>).response?.data?.message || 
        "Failed to create profile. Please try again."
      );
      if (error instanceof AxiosError) {
        const errorMessage = (error.response?.data as ErrorResponse)?.message || 
          "Failed to create profile. Please try again.";
        toast.error(errorMessage);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900 rounded-xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Complete Your Profile
        </h2>

        <div className="space-y-4">
          {/* Age Input */}
          <div>
            <label className="block text-white mb-2">Age</label>
            <input 
              type="number" 
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter your age"
              className="w-full p-3 bg-zinc-950 text-white border border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          {/* Position Dropdown */}
          <div>
            <label className="block text-white mb-2">Position</label>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full p-3 bg-zinc-950 text-white border border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="">Select Position</option>
              {positionOptions.map((pos) => (
                <option key={pos} value={pos}>
                  {pos}
                </option>
              ))}
            </select>
          </div>

          {/* Club Input */}
          <div>
            <label className="block text-white mb-2">Club</label>
            <input 
              type="text"
              value={club}
              onChange={(e) => setClub(e.target.value)}
              placeholder="Enter your current club"
              className="w-full p-3 bg-zinc-950 text-white border border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          {/* Nationality Input */}
          <div>
            <label className="block text-white mb-2">Nationality</label>
            <input 
              type="text"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              placeholder="Enter your nationality"
              className="w-full p-3 bg-zinc-950 text-white border border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <Button 
              size="lg" 
              className="w-full bg-red-600 hover:bg-red-700 text-white rounded-full"
              onClick={handleSubmitProfile}
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Complete Profile'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}