import React from 'react';

interface ImageResultProps {
  selectedImage: string | null;
  processedImage: string | null;
}

const ImageResult: React.FC<ImageResultProps> = ({
  selectedImage,
  processedImage
}) => {
  if (!processedImage) return null;

  return (
    <div className="border rounded-lg p-4 bg-gray-700">
      <h3 className="text-lg font-semibold mb-4 text-white">Processed Result</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium mb-2 text-white">Original</h4>
          <img 
            src={selectedImage} 
            alt="Original" 
            className="w-full rounded-lg shadow border border-gray-600"
          />
        </div>
        <div>
          <h4 className="text-sm font-medium mb-2 text-white">Processed</h4>
          <img 
            src={processedImage} 
            alt="Processed" 
            className="w-full rounded-lg shadow border border-gray-600"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageResult;