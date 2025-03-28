"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface CircularProgressProps {
  value: number; // Value between 0-100
  size?: number; // Size in pixels
  strokeWidth?: number; // Stroke width in pixels
  primaryColor?: string; // Primary color (for the value)
  secondaryColor?: string; // Secondary color (background track)
  label?: string; // Optional label to show inside the circle
  className?: string; // Optional className
}

export function CircularProgress({
  value,
  size = 120,
  strokeWidth = 8,
  primaryColor = "#ef4444", // Red-500
  secondaryColor = "#3b82f6", // Blue-500
  label,
  className,
}: CircularProgressProps) {
  const [progress, setProgress] = useState(0);

  // Calculate circle properties
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Animate the progress
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(value);
    }, 100);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className={cn("relative flex items-center justify-center", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rotate-[-90deg]">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={secondaryColor}
          strokeWidth={strokeWidth}
          strokeOpacity={0.2}
        />

        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={primaryColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
        />
      </svg>

      {/* Red dots around the circle */}
      <div className="absolute inset-0 flex items-center justify-center">
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const dotX = (size / 2) + (radius + 4) * Math.cos(angle);
          const dotY = (size / 2) + (radius + 4) * Math.sin(angle);

          return (
            <div
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full bg-red-500"
              style={{
                left: `${dotX}px`,
                top: `${dotY}px`,
                opacity: i % 3 === 0 ? 1 : 0,
              }}
            />
          );
        })}
      </div>

      {/* Center text */}
      {label && (
        <div className="absolute inset-0 flex items-center justify-center rotate-0">
          <span className="text-2xl font-bold text-white">{label}</span>
        </div>
      )}
    </div>
  );
}
