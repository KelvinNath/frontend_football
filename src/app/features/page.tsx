import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { CircularProgress } from "@/components/ui/circular-progress";
import {
  Upload, BarChart2, Activity, TrendingUp,
  Video, Users, Award, Map, Zap, LineChart
} from "lucide-react";

function FeatureCard({
  icon,
  title,
  description,
  isHighlighted = false
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  isHighlighted?: boolean;
}) {
  return (
    <div
      className={`
        ${isHighlighted ? 'bg-red-600' : 'bg-zinc-950 border border-zinc-800'}
        p-5 rounded-xl transition-transform hover:scale-[1.02] duration-300
      `}
    >
      <div className={`w-12 h-12 rounded-full ${isHighlighted ? 'bg-white/10' : 'bg-red-600/10'} flex items-center justify-center mb-4`}>
        <div className={isHighlighted ? "text-white" : "text-red-500"}>
          {icon}
        </div>
      </div>

      <h3 className={`text-xl font-bold ${isHighlighted ? 'text-white' : 'text-white'} mb-2`}>
        {title}
      </h3>

      <p className={isHighlighted ? "text-white/80" : "text-zinc-400"}>
        {description}
      </p>
    </div>
  );
}

export default function FeaturesPage() {
  return (
    <AppLayout>
      <div className="w-full max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16 mt-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome to <span className="text-red-500">Next</span>Kick
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto mb-8">
            Advanced analytics and performance tracking to improve player and team performance
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8"
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-zinc-700 text-white hover:bg-zinc-800 rounded-full px-8"
            >
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Main Features */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-white mb-10 text-center">Key Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Upload size={24} />}
              title="Easy Video Upload"
              description="Upload match videos with our simple drag-and-drop interface. We support all major video formats."
            />

            <FeatureCard
              icon={<Video size={24} />}
              title="AI Player Tracking"
              description="Advanced computer vision algorithms detect and track players throughout the match with high accuracy."
              isHighlighted
            />

            <FeatureCard
              icon={<Activity size={24} />}
              title="Performance Metrics"
              description="Get detailed statistics on player movement, speed, distance covered, and positioning."
            />
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-white mb-10 text-center">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                number: "1",
                title: "Upload",
                description: "Upload your match video through our secure platform"
              },
              {
                number: "2",
                title: "Processing",
                description: "Our AI analyzes the video, detecting and tracking players"
              },
              {
                number: "3",
                title: "Analysis",
                description: "Advanced algorithms extract performance metrics and insights"
              },
              {
                number: "4",
                title: "Results",
                description: "Receive detailed player reports and actionable insights"
              }
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl h-full">
                  <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-white">{step.number}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">
                    {step.title}
                  </h3>

                  <p className="text-zinc-400">
                    {step.description}
                  </p>
                </div>

                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="h-0.5 w-8 bg-red-600"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Features */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-white mb-10 text-center">Upcoming Features</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<LineChart size={24} />}
              title="Movement Heat Maps"
              description="Visualize player movement patterns with detailed heat maps showing positioning tendencies."
            />

            <FeatureCard
              icon={<TrendingUp size={24} />}
              title="Progress Tracking"
              description="Monitor player development over time with longitudinal performance tracking."
            />

            <FeatureCard
              icon={<BarChart2 size={24} />}
              title="Comparative Analysis"
              description="Compare performance metrics between players or against historical data."
            />

            <FeatureCard
              icon={<Map size={24} />}
              title="Tactical Insights"
              description="Gain deeper understanding of team formations and tactical patterns."
            />

            <FeatureCard
              icon={<Zap size={24} />}
              title="Real-time Processing"
              description="Fast video processing with results typically available within minutes."
            />

            <FeatureCard
              icon={<Award size={24} />}
              title="Performance Ratings"
              description="AI-generated ratings based on comprehensive performance analysis."
            />
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-white mb-10 text-center">Performance Metrics</h2>

          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center">
                <CircularProgress
                  value={92}
                  size={140}
                  strokeWidth={10}
                  label="92"
                  className="mb-4"
                />
                <h3 className="text-lg font-bold text-white mb-1">Speed Rating</h3>
                <p className="text-zinc-400 text-sm">Based on sprint frequency and top speed</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <CircularProgress
                  value={87}
                  size={140}
                  strokeWidth={10}
                  label="87"
                  className="mb-4"
                />
                <h3 className="text-lg font-bold text-white mb-1">Stamina Score</h3>
                <p className="text-zinc-400 text-sm">Measures energy levels throughout the match</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <CircularProgress
                  value={94}
                  size={140}
                  strokeWidth={10}
                  label="94"
                  className="mb-4"
                />
                <h3 className="text-lg font-bold text-white mb-1">Passing Accuracy</h3>
                <p className="text-zinc-400 text-sm">Success rate of attempted passes</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <CircularProgress
                  value={89}
                  size={140}
                  strokeWidth={10}
                  label="89"
                  className="mb-4"
                />
                <h3 className="text-lg font-bold text-white mb-1">Overall Rating</h3>
                <p className="text-zinc-400 text-sm">Composite score of all performance metrics</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Analyze Your Team?
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-8">
            Join thousands of coaches and analysts who are elevating their game with our AI-powered analysis platform
          </p>

          <Button
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white rounded-full px-10"
          >
            Start Your Analysis Now
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
