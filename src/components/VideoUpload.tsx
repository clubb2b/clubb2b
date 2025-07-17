import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Video, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function VideoUpload() {
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    if (!file.type.startsWith("video/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload a video file",
        variant: "destructive"
      });
      return;
    }

    setVideoFile(file);
    setUploading(true);

    // Simulating upload
    setTimeout(() => {
      setUploading(false);
      setUploaded(true);
      toast({
        title: "Video uploaded",
        description: "Your video has been uploaded successfully",
        variant: "default"
      });
    }, 2000);
  }, [toast]);

  const resetUpload = useCallback(() => {
    setVideoFile(null);
    setUploaded(false);
  }, []);

  return (
    <div className="flex flex-col items-center p-6 border border-dashed border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-900 dark:border-gray-700 text-center">
      {!videoFile ? (
        <>
          <Video className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">Upload Vehicle Video</h3>
          <p className="text-sm text-gray-500 mb-4 dark:text-gray-400">
            Showcase your vehicle with high-quality video. MP4, MOV or AVI files accepted.
          </p>
          <Button
            variant="outline"
            className="relative overflow-hidden"
            disabled={uploading}
          >
            <Upload className="mr-2 h-4 w-4" />
            <span>Select Video</span>
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleUpload}
              accept="video/*"
            />
          </Button>
        </>
      ) : (
        <div className="w-full">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Video className="h-8 w-8 text-primary mr-3" />
              <div className="text-left">
                <p className="text-sm font-medium truncate max-w-[180px] sm:max-w-xs">
                  {videoFile.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={resetUpload}
              disabled={uploading}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {uploading ? (
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
              <div className="bg-primary h-2.5 rounded-full animate-pulse w-full"></div>
              <p className="text-xs text-center mt-2 text-gray-500 dark:text-gray-400">Uploading...</p>
            </div>
          ) : uploaded ? (
            <div className="flex items-center justify-center text-green-600 dark:text-green-400 mb-4">
              <Check className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Upload complete</span>
            </div>
          ) : null}
          
          <div className="flex justify-end">
            <Button
              variant="default"
              size="sm"
              disabled={uploading || !uploaded}
              onClick={() => {
                toast({
                  title: "Video published",
                  description: "Your video is now live on the vehicle listing",
                  variant: "default"
                });
              }}
            >
              Publish Video
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}