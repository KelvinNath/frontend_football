"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CircularProgress } from "@/components/ui/circular-progress";
import Image from "next/image";
import { Activity, BarChart3, PieChart } from "lucide-react";

interface PlayerStatProps {
  label: string;
  value: number;
  icon?: React.ReactNode;
}

function PlayerStat({ label, value, icon }: PlayerStatProps) {
  return (
    <div className="flex items-center gap-2">
      {icon && <div className="text-red-500">{icon}</div>}
      <div>
        <p className="text-xs text-zinc-400">{label}</p>
        <p className="text-lg font-bold text-white">{value}</p>
      </div>
    </div>
  );
}

interface PlayerCardProps {
  type: "breakdown" | "report" | "profile";
  title: string;
  description?: string;
  imageUrl?: string;
  stats?: Array<{ label: string; value: number }>;
  rating?: number;
}

export default function PlayerCard({
  type,
  title,
  description,
  imageUrl,
  stats = [],
  rating
}: PlayerCardProps) {
  return (
    <Card className="bg-zinc-900 border-zinc-800 overflow-hidden h-full">
      <div className="relative">
        {/* Red accent on the left */}
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-red-600"></div>

        {type === "breakdown" && imageUrl && (
          <div className="relative aspect-[3/4] w-full">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent"></div>

            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-xl font-bold text-white uppercase">{title}</h3>
              {description && (
                <p className="text-sm text-zinc-300">{description}</p>
              )}
            </div>
          </div>
        )}

        <CardContent className={`p-4 ${type === "breakdown" && imageUrl ? "pt-0" : ""}`}>
          {(type !== "breakdown" || !imageUrl) && (
            <>
              <h3 className="text-lg font-bold text-white uppercase mb-2">{title}</h3>
              {description && (
                <p className="text-sm text-zinc-300 mb-4">{description}</p>
              )}
            </>
          )}

          {type === "report" && (
            <div className="mt-4 flex flex-col items-center justify-center">
              <CircularProgress
                value={rating || 0}
                size={120}
                strokeWidth={8}
                primaryColor="#ef4444"
                secondaryColor="#3b82f6"
                label={`${rating}`}
                className="mb-4"
              />

              <div className="grid grid-cols-2 gap-4 w-full mt-2">
                {stats.slice(0, 4).map((stat, index) => (
                  <PlayerStat
                    key={index}
                    label={stat.label}
                    value={stat.value}
                    icon={index === 0 ? <Activity size={16} /> : undefined}
                  />
                ))}
              </div>
            </div>
          )}

          {type === "profile" && (
            <div className="mt-4 flex flex-col space-y-6">
              <CircularProgress
                value={rating || 0}
                size={140}
                strokeWidth={12}
                primaryColor="#ef4444"
                secondaryColor="#3b82f6"
                label={`${rating}`}
                className="mx-auto"
              />

              <div className="grid grid-cols-2 gap-y-4 w-full">
                {stats.map((stat, index) => (
                  <PlayerStat
                    key={index}
                    label={stat.label}
                    value={stat.value}
                    icon={index % 2 === 0 ? <BarChart3 size={16} /> : <PieChart size={16} />}
                  />
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );
}
