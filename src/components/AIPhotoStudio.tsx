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
  return;
};
export default AIPhotoStudio;