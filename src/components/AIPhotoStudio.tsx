import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Scissors, Sparkles, Wand2, Car } from 'lucide-react';
import { useImageProcessing } from '@/hooks/useImageProcessing';
import AIShowroom from './AIShowroom';
import FileUpload from './ai-photo-studio/FileUpload';
import ProcessingControls from './ai-photo-studio/ProcessingControls';
import TabOptions from './ai-photo-studio/TabOptions';
import ImageResult from './ai-photo-studio/ImageResult';

const AIPhotoStudio = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('remove-bg');
  const [selectedBackground, setSelectedBackground] = useState('transparent');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { isProcessing, progress, processImage } = useImageProcessing();


  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setProcessedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProcessImage = async () => {
    const result = await processImage(selectedImage, activeTab, selectedBackground);
    if (result) {
      setProcessedImage(result);
    }
  };

  const downloadImage = () => {
    if (!processedImage) return;
    
    const link = document.createElement('a');
    link.download = `processed-image-${Date.now()}.png`;
    link.href = processedImage;
    link.click();
  };

  return (
    <div className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-white tracking-wider">
            AI PHOTOGRAPHY STUDIO
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Professional vehicle photography enhancement for maximum sales impact
          </p>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
        </div>
        
        <Card className="bg-gradient-to-b from-gray-800 to-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Camera className="w-6 h-6" />
              AI Photography Studio
            </CardTitle>
          </CardHeader>
          <CardContent className="bg-gray-800">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-gray-700">
                <TabsTrigger value="remove-bg" className="flex items-center gap-2 text-white data-[state=active]:bg-white data-[state=active]:text-black">
                  <Scissors className="w-4 h-4" />
                  Remove Background
                </TabsTrigger>
                <TabsTrigger value="enhance" className="flex items-center gap-2 text-white data-[state=active]:bg-white data-[state=active]:text-black">
                  <Sparkles className="w-4 h-4" />
                  Enhance Photo
                </TabsTrigger>
                <TabsTrigger value="optimize" className="flex items-center gap-2 text-white data-[state=active]:bg-white data-[state=active]:text-black">
                  <Wand2 className="w-4 h-4" />
                  Optimize
                </TabsTrigger>
                <TabsTrigger value="ai-showroom" className="flex items-center gap-2 text-white data-[state=active]:bg-white data-[state=active]:text-black">
                  <Car className="w-4 h-4" />
                  AI Showroom
                </TabsTrigger>
              </TabsList>

{/* File Upload Section */}
            {activeTab !== 'ai-showroom' && (
              <FileUpload
                selectedImage={selectedImage}
                onFileUpload={handleFileUpload}
                fileInputRef={fileInputRef}
              />
            )}

            {/* AI Showroom Tab Content */}
            <TabsContent value="ai-showroom" className="space-y-6">
              <AIShowroom />
            </TabsContent>

            {/* Tab-specific options */}
            <TabOptions
              selectedBackground={selectedBackground}
              onBackgroundChange={setSelectedBackground}
            />

{/* Processing and Action Controls */}
            {activeTab !== 'ai-showroom' && (
              <ProcessingControls
                isProcessing={isProcessing}
                progress={progress}
                selectedImage={selectedImage}
                processedImage={processedImage}
                onProcessImage={handleProcessImage}
                onDownloadImage={downloadImage}
              />
            )}

            {/* Result Section */}
            {activeTab !== 'ai-showroom' && (
              <ImageResult
                selectedImage={selectedImage}
                processedImage={processedImage}
              />
            )}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  </div>
  );
};

export default AIPhotoStudio;