import AppLayout from "@/components/layout/AppLayout";
import UploadForm from "@/components/upload/UploadForm";
import { Button } from "@/components/ui/button";
import { Video, FileVideo, Upload as UploadIcon, Info } from "lucide-react";

export default function UploadPage() {
  return (
    <AppLayout>
      <div className="w-full max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Upload Match Video</h1>
          <p className="text-zinc-400">Upload your match video for AI analysis and player tracking</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-zinc-950 rounded-xl p-6 mb-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <UploadIcon className="h-5 w-5 text-red-500" />
                Upload Video
              </h2>

              <UploadForm />
            </div>

            <div className="bg-zinc-950 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Info className="h-5 w-5 text-red-500" />
                Upload Guidelines
              </h2>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-red-600 flex-shrink-0 flex items-center justify-center text-white text-xs font-medium">
                    1
                  </div>
                  <div>
                    <h3 className="text-white font-medium">High Quality Video</h3>
                    <p className="text-zinc-400 text-sm">For best results, upload videos with resolution of at least 720p.</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-red-600 flex-shrink-0 flex items-center justify-center text-white text-xs font-medium">
                    2
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Wide Angle View</h3>
                    <p className="text-zinc-400 text-sm">Ensure the video captures a wide view of the playing field.</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-red-600 flex-shrink-0 flex items-center justify-center text-white text-xs font-medium">
                    3
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Stable Camera</h3>
                    <p className="text-zinc-400 text-sm">Avoid excessive camera movement for optimal tracking results.</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-red-600 flex-shrink-0 flex items-center justify-center text-white text-xs font-medium">
                    4
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Good Lighting</h3>
                    <p className="text-zinc-400 text-sm">Ensure the match is played in proper lighting conditions.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <div className="bg-zinc-950 rounded-xl p-6 mb-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FileVideo className="h-5 w-5 text-red-500" />
                Supported Formats
              </h2>

              <div className="space-y-3">
                <div className="bg-zinc-900 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">MP4</span>
                    <span className="text-zinc-400 text-sm">H.264 codec</span>
                  </div>
                </div>

                <div className="bg-zinc-900 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">MOV</span>
                    <span className="text-zinc-400 text-sm">QuickTime</span>
                  </div>
                </div>

                <div className="bg-zinc-900 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">AVI</span>
                    <span className="text-zinc-400 text-sm">Standard format</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-white font-medium mb-2">File Size Limits</h3>
                <p className="text-zinc-400 text-sm mb-4">Maximum file size: 500MB</p>

                <h3 className="text-white font-medium mb-2">Processing Time</h3>
                <p className="text-zinc-400 text-sm">Analysis typically takes 5-15 minutes depending on video length and quality.</p>
              </div>
            </div>

            <div className="bg-zinc-950 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Video className="h-5 w-5 text-red-500" />
                Need Help?
              </h2>

              <p className="text-zinc-400 text-sm mb-4">
                Our team is available to assist with any questions about video uploads or analysis.
              </p>

              <Button
                variant="outline"
                className="w-full justify-center border-zinc-800 text-white hover:bg-red-600 hover:text-white hover:border-red-600"
              >
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
