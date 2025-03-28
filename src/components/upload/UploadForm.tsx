"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useDropzone } from "react-dropzone";
import { Upload, Play, Video, X } from "lucide-react";
import { toast } from "sonner";

export default function UploadForm() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.[0]) {
      const file = acceptedFiles[0];
      setUploadedFile(file);

      // Create a preview URL for video files
      if (file.type.startsWith("video/")) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi']
    },
    maxFiles: 1,
    maxSize: 500 * 1024 * 1024, // 500MB
  });

  const handleUpload = () => {
    if (!uploadedFile) return;

    setIsUploading(true);

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        toast.success("Upload complete! Analysis will begin shortly.");
      }
    }, 200);
  };

  const handleRemoveFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setUploadedFile(null);
    setPreviewUrl(null);
    setUploadProgress(0);
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Upload Your Match</h2>

        {!uploadedFile ? (
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive ? "border-red-500 bg-red-500/10" : "border-zinc-700 hover:border-red-500/70 hover:bg-zinc-800/50"
            }`}
          >
            <input {...getInputProps()} />

            <div className="flex flex-col items-center justify-center gap-3">
              <div className="h-14 w-14 rounded-full bg-zinc-800 flex items-center justify-center">
                <Upload className="h-6 w-6 text-zinc-400" />
              </div>

              <div className="text-center">
                <p className="font-medium text-white">
                  {isDragActive ? "Drop your video here" : "Drag & drop your match video here"}
                </p>
                <p className="text-sm text-zinc-400 mt-1">
                  MP4, MOV or AVI up to 500MB
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="mt-2 border-zinc-700 text-white hover:bg-red-600 hover:text-white hover:border-red-600"
              >
                Select File
              </Button>
            </div>
          </div>
        ) : (
          <div className="relative border border-zinc-800 rounded-lg overflow-hidden">
            {previewUrl ? (
              <div className="aspect-video bg-black relative">
                <video
                  src={previewUrl}
                  className="w-full h-full object-contain"
                  controls
                />
              </div>
            ) : (
              <div className="aspect-video bg-zinc-900 flex items-center justify-center">
                <Video className="h-16 w-16 text-zinc-700" />
              </div>
            )}

            <div className="p-4 bg-zinc-900">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-white truncate max-w-[240px]">{uploadedFile.name}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-zinc-400 hover:text-white"
                  onClick={handleRemoveFile}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {isUploading && (
                <div className="w-full bg-zinc-800 rounded-full h-1.5 mb-3">
                  <div
                    className="bg-red-600 h-1.5 rounded-full"
                    style={{ width: `${uploadProgress}%`, transition: "width 0.2s ease-in-out" }}
                  ></div>
                </div>
              )}

              <div className="flex items-center gap-2 justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={isUploading}
                  className="border border-zinc-700 hover:bg-zinc-800 text-white"
                  onClick={handleRemoveFile}
                >
                  Cancel
                </Button>

                <Button
                  variant="default"
                  size="sm"
                  disabled={isUploading}
                  className="bg-red-600 hover:bg-red-700 text-white rounded-full"
                  onClick={handleUpload}
                >
                  {isUploading ? `Uploading ${uploadProgress}%` : "Upload"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
