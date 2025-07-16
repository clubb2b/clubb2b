import React from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Download } from 'lucide-react';
interface ProcessingControlsProps {
  isProcessing: boolean;
  progress: number;
  selectedImage: string | null;
  processedImage: string | null;
  onProcessImage: () => void;
  onDownloadImage: () => void;
}
const ProcessingControls: React.FC<ProcessingControlsProps> = ({
  isProcessing,
  progress,
  selectedImage,
  processedImage,
  onProcessImage,
  onDownloadImage
}) => {
  return <div className="space-y-4">
      {/* Processing Progress */}
      {isProcessing && <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Processing...</span>
            <span className="text-sm text-gray-500">{progress}%</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>}

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        
        
        {processedImage && <Button variant="outline" onClick={onDownloadImage} size="lg">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>}
      </div>
    </div>;
};
export default ProcessingControls;