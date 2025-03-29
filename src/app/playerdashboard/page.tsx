import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { 
  BarChart2, 
  Users, 
  Download, 
  Filter, 
  Zap,       
  Target,    
  Send 
} from "lucide-react";

const performanceData = [
  { category: 'Speed', current: 85, previous: 80, progression: 5 },
  { category: 'Shooting', current: 78, previous: 72, progression: 6 },
  { category: 'Passing', current: 82, previous: 75, progression: 7 },
  { category: 'Dribbling', current: 79, previous: 73, progression: 6 },
  { category: 'Overall Performance', current: 81, previous: 75, progression: 6 }
];

const monthlyProgressData = [
  { month: 'Jan', speed: 75, shooting: 70, passing: 72, dribbling: 68 },
  { month: 'Feb', speed: 80, shooting: 75, passing: 78, dribbling: 73 },
  { month: 'Mar', speed: 85, shooting: 78, passing: 82, dribbling: 79 },
  { month: 'Apr', speed: 87, shooting: 80, passing: 84, dribbling: 81 }
];

export default function PlayerPerformanceDashboard() {
  const [viewMode, setViewMode] = useState('graph');

  return (
    <div className="w-full max-w-6xl mx-auto bg-black text-white min-h-screen p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Player Performance Dashboard</h1>
          <p className="text-zinc-400">Comprehensive analytics and performance insights</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="flex items-center px-4 py-2 border border-zinc-800 text-white hover:bg-red-600 hover:text-white hover:border-red-600 rounded-lg"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>

          <button
            className="flex items-center px-4 py-2 border border-zinc-800 text-white hover:bg-red-600 hover:text-white hover:border-red-600 rounded-lg"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {performanceData.map((perf, index) => (
          <div key={index} className="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-red-600/10 flex items-center justify-center text-red-500">
                {index === 0 && <Zap className="h-5 w-5" />}
                {index === 1 && <Target className="h-5 w-5" />}
                {index === 2 && <Send className="h-5 w-5" />}
                {index === 3 && <BarChart2 className="h-5 w-5" />}
                {index === 4 && <Users className="h-5 w-5" />}
              </div>
              <div>
                <p className="text-zinc-400 text-sm">{perf.category}</p>
                <div className="flex items-center">
                  <p className="text-2xl font-bold text-white mr-2">{perf.current}</p>
                  <span className={`text-sm ${perf.progression > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {perf.progression > 0 ? `+${perf.progression}` : perf.progression}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Visualization Toggle */}
      <div className="flex justify-end gap-2 mb-6">
        <button
          onClick={() => setViewMode('graph')}
          className={`px-4 py-2 rounded-lg ${viewMode === 'graph' ? 'bg-red-600 text-white' : 'border border-zinc-800 text-white hover:bg-red-600'}`}
        >
          Graph View
        </button>
        <button
          onClick={() => setViewMode('radar')}
          className={`px-4 py-2 rounded-lg ${viewMode === 'radar' ? 'bg-red-600 text-white' : 'border border-zinc-800 text-white hover:bg-red-600'}`}
        >
          Radar View
        </button>
      </div>

      {/* Performance Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {viewMode === 'graph' ? (
          <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-800">
            <h3 className="text-xl font-semibold text-white mb-4">Monthly Performance Progression</h3>
            <LineChart width={600} height={300} data={monthlyProgressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="speed" stroke="#EF4444" />
              <Line type="monotone" dataKey="shooting" stroke="#10B981" />
              <Line type="monotone" dataKey="passing" stroke="#3B82F6" />
              <Line type="monotone" dataKey="dribbling" stroke="#8B5CF6" />
            </LineChart>
          </div>
        ) : (
          <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-800">
            <h3 className="text-xl font-semibold text-white mb-4">Skill Radar Chart</h3>
            <RadarChart 
              cx={300} 
              cy={250} 
              outerRadius={150} 
              width={600} 
              height={400} 
              data={[monthlyProgressData[monthlyProgressData.length - 1]]}
            >
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis dataKey="month" stroke="#9CA3AF" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#9CA3AF" />
              <Radar 
                dataKey="speed" 
                stroke="#EF4444" 
                fill="#EF4444" 
                fillOpacity={0.6} 
              />
              <Radar 
                dataKey="shooting" 
                stroke="#10B981" 
                fill="#10B981" 
                fillOpacity={0.6} 
              />
              <Radar 
                dataKey="passing" 
                stroke="#3B82F6" 
                fill="#3B82F6" 
                fillOpacity={0.6} 
              />
              <Radar 
                dataKey="dribbling" 
                stroke="#8B5CF6" 
                fill="#8B5CF6" 
                fillOpacity={0.6} 
              />
              <Tooltip />
            </RadarChart>
          </div>
        )}

        <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-800">
          <h3 className="text-xl font-semibold text-white mb-4">Performance Insights</h3>
          <div className="space-y-4">
            {performanceData.map((perf, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-600/10 flex items-center justify-center text-red-500">
                    {index === 0 && <Zap className="h-4 w-4" />}
                    {index === 1 && <Target className="h-4 w-4" />}
                    {index === 2 && <Send className="h-4 w-4" />}
                    {index === 3 && <BarChart2 className="h-4 w-4" />}
                    {index === 4 && <Users className="h-4 w-4" />}
                  </div>
                  <span className="text-white">{perf.category}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-zinc-400 mr-2">{perf.current}/100</span>
                  <span className={`text-sm ${perf.progression > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {perf.progression > 0 ? `+${perf.progression}` : perf.progression}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}