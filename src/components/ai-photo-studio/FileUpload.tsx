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
    <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center bg-gray-800">
      <input
        type="file"
        accept="image/*"
        onChange={onFileUpload}
        ref={fileInputRef}
        className="hidden"
      />
      
      {selectedImage ? (
        <div className="space-y-4">
          <img 
            src={selectedImage} 
            alt="Selected" 
            className="max-w-full max-h-64 mx-auto rounded-lg shadow-lg border border-gray-600"
          />
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="border-white text-white hover:bg-white hover:text-black"
          >
            <Upload className="w-4 h-4 mr-2" />
            Change Image
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <ImageIcon className="w-12 h-12 mx-auto text-gray-400" />
          <div>
            <h3 className="text-lg font-semibold text-white">Upload Vehicle Photo</h3>
            <p className="text-gray-400">
              Drag and drop or click to upload your vehicle image for professional enhancement
            </p>
          </div>
          <Button 
            onClick={() => fileInputRef.current?.click()}
            className="bg-white text-black hover:bg-gray-200"
          >
            <Upload className="w-4 h-4 mr-2" />
            Select Image
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;