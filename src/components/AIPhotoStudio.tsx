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
  const {
    isProcessing,
    progress,
    processImage
  } = useImageProcessing();
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
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
    <section id="ai-photo-studio" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-white tracking-wider">
            AI PHOTO STUDIO
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
        </div>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Camera className="w-6 h-6" />
              Professional Vehicle Photography
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="remove-bg" className="flex items-center gap-2">
                  <Scissors className="w-4 h-4" />
                  Remove Background
                </TabsTrigger>
                <TabsTrigger value="enhance" className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Enhance
                </TabsTrigger>
                <TabsTrigger value="optimize" className="flex items-center gap-2">
                  <Wand2 className="w-4 h-4" />
                  Optimize
                </TabsTrigger>
              </TabsList>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <FileUpload
                    selectedImage={selectedImage}
                    onFileUpload={handleFileUpload}
                    fileInputRef={fileInputRef}
                  />
                  
                  <TabOptions
                    selectedBackground={selectedBackground}
                    onBackgroundChange={setSelectedBackground}
                  />

                  <ProcessingControls
                    selectedImage={selectedImage}
                    processedImage={processedImage}
                    isProcessing={isProcessing}
                    progress={progress}
                    onProcessImage={handleProcessImage}
                    onDownloadImage={downloadImage}
                  />
                </div>

                <ImageResult
                  selectedImage={selectedImage}
                  processedImage={processedImage}
                />
              </div>
            </Tabs>
          </CardContent>
        </Card>

        <AIShowroom />
      </div>
    </section>
  );
};
export default AIPhotoStudio;