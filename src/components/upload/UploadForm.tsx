"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileUp, AlertCircle, CheckCircle } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function UploadForm() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [playerProfileId, setPlayerProfileId] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [jerseyNumber, setJerseyNumber] = useState("7"); // Default jersey number

  // Get player profile ID on component mount
  useEffect(() => {
    const fetchPlayerProfile = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          return;
        }

        const response = await axios.get('http://localhost:3000/api/player/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.data?.profile?.id) {
          setPlayerProfileId(response.data.profile.id);
        } else {
          // Set a default profile ID as fallback (remove in production)
          setPlayerProfileId("b1262d54-1a5f-429f-aeea-3646f317a05f");
        }
      } catch (error) {
        console.error('Error fetching player profile:', error);
        
        // Set a default profile ID as fallback (remove in production)
        setPlayerProfileId("b1262d54-1a5f-429f-aeea-3646f317a05f");
      }
    };

    fetchPlayerProfile();
  }, []);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Check file size (limit to 500MB)
    if (selectedFile.size > 500 * 1024 * 1024) {
      setUploadError("File size exceeds 500MB limit");
      return;
    }

    // Check file type
    const validTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo'];
    if (!validTypes.includes(selectedFile.type)) {
      setUploadError("File type not supported. Please upload MP4, MOV, or AVI");
      return;
    }

    setUploadError(null);
    setFile(selectedFile);

    // Create preview URL
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
  };

  // Upload video to cloud storage (simulated)
  const uploadToCloudStorage = async (file: File): Promise<string> => {
    // This is a placeholder for your actual cloud storage upload logic
    // In a real implementation, you would:
    // 1. Get a signed URL from your backend
    // 2. Upload directly to cloud storage
    // 3. Return the public URL

    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        setProgress(progress);
        
        if (progress >= 100) {
          clearInterval(interval);
          // Return a mock video URL
          resolve(`https://storage.example.com/${file.name}-${Date.now()}`);
        }
      }, 300);
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add more detailed validation and logging
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }
    
    if (!playerProfileId) {
      toast.error("Player profile not found. Please try again or contact support.");
      return;
    }

    try {
      setIsUploading(true);
      
      // Step 1: Upload to cloud storage and get URL
      const videoUrl = await uploadToCloudStorage(file);
      
      // Step 2: Save video reference to database
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error("Authentication token not found");
      }
      
      const response = await axios.post(
        'http://localhost:3000/api/videos/upload',
        {
          videoUrl,
          playerProfileId
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.warning) {
        console.warn(response.data.warning);
        toast.info("Using test mode due to database connection issue");
      }

      toast.success("Video uploaded successfully! Analysis in progress.");
      setUploadSuccess(true);
      
    } catch (error) {
      console.error('Upload failed:', error);
      
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || 
          "Failed to upload video. Please try again."
        );
      } else {
        toast.error("An unexpected error occurred during upload.");
      }
    } finally {
      setIsUploading(false);
    }
  };

  // Process video for analysis and redirect to player analysis page
  const handleProcessAnalysis = async () => {
    try {
      if (!file || !playerProfileId) {
        toast.error("Missing file or player information");
        return;
      }

      setIsUploading(true);
      
      // Create form data for API call
      const formData = new FormData();
      formData.append('playerProfileId', playerProfileId);
      formData.append('jerseyNumber', jerseyNumber);
      formData.append('video', file, file.name);
      
      // Call the API to process the video
      const response = await axios.post(
        'http://localhost:3000/upload-performance-video',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      // Store metrics in localStorage for use in the analysis page
      if (response.data && response.data.metrics) {
        localStorage.setItem('playerMetrics', JSON.stringify(response.data.metrics));
      }
      
      toast.success("Performance metrics processed successfully!");
      
      // Redirect to the player analysis page
      router.push('/playeranalysis');
      
    } catch (error) {
      console.error('Analysis processing failed:', error);
      toast.error("Failed to process video analysis. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  // Clear selected file
  const clearFile = () => {
    setFile(null);
    setPreviewUrl(null);
    setProgress(0);
    setUploadError(null);
    setUploadSuccess(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {!file ? (
          <div 
            className={`border-2 border-dashed ${uploadError ? 'border-red-500' : 'border-zinc-700'} rounded-xl p-8 text-center cursor-pointer hover:border-red-500 transition-colors`}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <input
              id="file-upload"
              type="file"
              accept="video/mp4,video/quicktime,video/x-msvideo"
              className="hidden"
              onChange={handleFileChange}
            />
            
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-4">
                <FileUp className="w-8 h-8 text-red-500" />
              </div>
              
              <h3 className="text-white font-medium text-lg mb-2">
                Drag & drop or click to upload
              </h3>
              
              <p className="text-zinc-400 text-sm mb-4">
                Supported formats: MP4, MOV, AVI (Max 500MB)
              </p>
              
              <Button 
                type="button"
                variant="outline" 
                className="border-zinc-700 text-white hover:bg-red-600 hover:text-white hover:border-red-600"
              >
                Select Video
              </Button>
              
              {uploadError && (
                <div className="mt-4 text-red-500 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{uploadError}</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-zinc-900 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center">
                  <Upload className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-md">{file.name}</h3>
                  <p className="text-zinc-400 text-sm">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
              
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearFile}
                className="text-zinc-400 hover:text-white"
              >
                Remove
              </Button>
            </div>
            
            {previewUrl && (
              <div className="mb-4 rounded-lg overflow-hidden bg-black">
                <video
                  src={previewUrl}
                  controls
                  className="w-full h-auto max-h-[300px]"
                />
              </div>
            )}

            {/* Display the player profile ID status */}
            <div className="mb-4 text-sm">
              <span className="text-zinc-400">Player Profile Status: </span>
              <span className={playerProfileId ? "text-green-500" : "text-red-500"}>
                {playerProfileId ? "Ready" : "Not Found"}
              </span>
            </div>
            
            {/* Jersey number input field */}
            <div className="mb-4">
              <label htmlFor="jersey-number" className="block text-zinc-400 text-sm mb-1">
                Jersey Number
              </label>
              <input
                id="jersey-number"
                type="text"
                value={jerseyNumber}
                onChange={(e) => setJerseyNumber(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white"
              />
            </div>
            
            {isUploading ? (
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-zinc-400">Uploading...</span>
                  <span className="text-white">{progress}%</span>
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-2">
                  <div 
                    className="bg-red-600 h-2 rounded-full" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            ) : (
              <div className="flex gap-4">
                {!uploadSuccess ? (
                <Button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white w-full"
                >
                  Upload Video
                </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleProcessAnalysis}
                    className="bg-green-600 hover:bg-green-700 text-white w-full flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Process Video Analysis
                  </Button>
                )}
              </div>
            )}
          </div>
        )}
      </form>
      
      <div className="mt-6 text-sm text-zinc-400">
        <p>
          By uploading, you agree to our <span className="text-red-500 cursor-pointer">Terms of Service</span> and 
          understand that AI analysis may take 5-15 minutes to complete.
        </p>
      </div>
    </div>
  );
}