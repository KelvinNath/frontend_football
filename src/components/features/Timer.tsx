"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

interface TimerProps {
  initialTime?: number; // Initial time in seconds
  onTimeUpdate?: (time: number) => void;
  className?: string;
}

export default function Timer({
  initialTime = 0,
  onTimeUpdate,
  className
}: TimerProps) {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime + 1;
          if (onTimeUpdate) onTimeUpdate(newTime);
          return newTime;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, onTimeUpdate]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsRunning(prev => !prev);
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
    if (onTimeUpdate) onTimeUpdate(0);
  };

  const handleForward = () => {
    setTime(prev => {
      const newTime = prev + 10;
      if (onTimeUpdate) onTimeUpdate(newTime);
      return newTime;
    });
  };

  const handleBackward = () => {
    setTime(prev => {
      const newTime = Math.max(0, prev - 10);
      if (onTimeUpdate) onTimeUpdate(newTime);
      return newTime;
    });
  };

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-zinc-400 hover:text-white hover:bg-zinc-800 h-8 w-8"
          onClick={handleBackward}
        >
          <SkipBack className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="text-white bg-red-600 hover:bg-red-700 h-9 w-9 rounded-full"
          onClick={handlePlayPause}
        >
          {isRunning ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4 ml-0.5" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="text-zinc-400 hover:text-white hover:bg-zinc-800 h-8 w-8"
          onClick={handleForward}
        >
          <SkipForward className="h-4 w-4" />
        </Button>
      </div>

      <div className="text-white font-mono text-sm">{formatTime(time)}</div>
    </div>
  );
}
