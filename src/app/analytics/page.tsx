import AppLayout from "@/components/layout/AppLayout";
import PlayerCard from "@/components/features/PlayerCard";
import { CircularProgress } from "@/components/ui/circular-progress";
import { Button } from "@/components/ui/button";
import { BarChart2, Users, Download, Filter, List, Grid, Search, MoreHorizontal } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <AppLayout>
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Scout Dashboard</h1>
            <p className="text-zinc-400">View detailed performance metrics and AI analysis</p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="border-zinc-800 text-white hover:bg-red-600 hover:text-white hover:border-red-600"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="border-zinc-800 text-white hover:bg-red-600 hover:text-white hover:border-red-600"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Players", value: "24", icon: <Users className="h-5 w-5" /> },
            { label: "Analysis Conducted", value: "18", icon: <BarChart2 className="h-5 w-5" /> },
            { label: "Team Average", value: "87.5", icon: <CircularProgress value={87} size={40} strokeWidth={4} label="" /> },
            { label: "Top Performer", value: "99", icon: <CircularProgress value={99} size={40} strokeWidth={4} label="" /> }
          ].map((item, index) => (
            <div key={index} className="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-red-600/10 flex items-center justify-center text-red-500">
                  {item.icon}
                </div>
                <div>
                  <p className="text-zinc-400 text-sm">{item.label}</p>
                  <p className="text-2xl font-bold text-white">{item.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and View Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-zinc-500" />
            </div>
            <input
              type="text"
              placeholder="Search players..."
              className="w-full pl-10 pr-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 bg-zinc-900 text-zinc-400 hover:text-white"
            >
              <List className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 bg-red-600 text-white hover:bg-red-700"
            >
              <Grid className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Player Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="group relative">
              <PlayerCard
                type={index % 3 === 0 ? "breakdown" : (index % 3 === 1 ? "report" : "profile")}
                title={
                  index % 3 === 0
                    ? "Player Performance"
                    : (index % 3 === 1 ? "Player Reports" : "Player Profile")
                }
                imageUrl={index % 3 === 0 ? "/player1.png" : undefined}
                rating={90 + index}
                stats={[
                  { label: "Speed", value: 85 + index },
                  { label: "Accuracy", value: 88 + (index % 5) },
                  { label: "Passes", value: 42 + (index * 2) },
                  { label: "Distance", value: 6 + (index % 4) }
                ]}
              />

              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 bg-zinc-950/80 backdrop-blur-sm text-zinc-400 hover:text-white hover:bg-zinc-900"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mb-8">
          <Button
            variant="outline"
            className="px-6 border-zinc-800 text-white hover:bg-red-600 hover:text-white hover:border-red-600"
          >
            Load More Players
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
