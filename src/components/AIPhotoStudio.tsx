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
    <div className="py-20 bg-gradient-to-br from-background via-background/50 to-primary/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            AI Photo Studio
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Transform your vehicle photos with AI-powered editing tools
          </p>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Professional Vehicle Photography
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="remove-bg" className="flex items-center gap-2">
                  <Scissors className="h-4 w-4" />
                  Remove Background
                </TabsTrigger>
                <TabsTrigger value="enhance" className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Enhance Image
                </TabsTrigger>
                <TabsTrigger value="optimize" className="flex items-center gap-2">
                  <Wand2 className="h-4 w-4" />
                  Optimize
                </TabsTrigger>
              </TabsList>

              <div className="mt-6">
                <FileUpload
                  onFileUpload={handleFileUpload}
                  fileInputRef={fileInputRef}
                />

                {selectedImage && (
                  <div className="mt-6">
                    <TabsContent value="remove-bg">
                      <TabOptions
                        activeTab={activeTab}
                        selectedBackground={selectedBackground}
                        onBackgroundChange={setSelectedBackground}
                      />
                    </TabsContent>
                    <TabsContent value="enhance">
                      <p className="text-muted-foreground">
                        Enhance image quality, contrast, and colors automatically.
                      </p>
                    </TabsContent>
                    <TabsContent value="optimize">
                      <p className="text-muted-foreground">
                        Optimize image size and quality for different devices.
                      </p>
                    </TabsContent>

                    <ProcessingControls
                      isProcessing={isProcessing}
                      progress={progress}
                      onProcess={handleProcessImage}
                      onDownload={downloadImage}
                      hasProcessedImage={!!processedImage}
                    />

                    <ImageResult
                      selectedImage={selectedImage}
                      processedImage={processedImage}
                    />
                  </div>
                )}
              </div>
            </Tabs>
          </CardContent>
        </Card>

        <AIShowroom />
      </div>
    </div>
  );
};
export default AIPhotoStudio;