import React from 'react';
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Upload } from 'lucide-react';
interface FileUploadProps {
  selectedImage: string | null;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}
const FileUpload: React.FC<FileUploadProps> = ({
  selectedImage,
  onFileUpload,
  fileInputRef
}) => {
  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-gray-500 transition-colors">
        {selectedImage ? (
          <div className="space-y-4">
            <img 
              src={selectedImage} 
              alt="Selected" 
              className="max-w-full h-48 object-contain mx-auto rounded"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="w-full"
            >
              <Upload className="w-4 h-4 mr-2" />
              Change Image
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <ImageIcon className="w-12 h-12 text-gray-400 mx-auto" />
            <div>
              <p className="text-gray-300 mb-2">Upload your vehicle image</p>
              <p className="text-sm text-gray-500">Supports JPG, PNG, WebP</p>
            </div>
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="w-full"
            >
              <Upload className="w-4 h-4 mr-2" />
              Select Image
            </Button>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onFileUpload}
          className="hidden"
        />
      </div>
    </div>
  );
};
export default FileUpload;