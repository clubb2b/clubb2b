import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Camera, 
  Upload, 
  Scissors, 
  Sparkles, 
  Download, 
  Image as ImageIcon,
  Wand2,
  Palette,
  Monitor,
  Smartphone,
  Tablet
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js
env.allowLocalModels = false;
env.useBrowserCache = false;

const MAX_IMAGE_DIMENSION = 1024;

const AIPhotoStudio = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('remove-bg');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedBackground, setSelectedBackground] = useState('transparent');
  const [customPrompt, setCustomPrompt] = useState('');

  const backgroundOptions = [
    { value: 'transparent', label: 'Transparent', color: 'transparent' },
    { value: 'white', label: 'Pure White', color: '#ffffff' },
    { value: 'gradient-luxury', label: 'Luxury Gradient', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { value: 'showroom', label: 'Showroom Floor', color: 'linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%)' },
    { value: 'studio', label: 'Photo Studio', color: 'linear-gradient(45deg, #2c3e50 0%, #34495e 100%)' },
    { value: 'sunset', label: 'Golden Hour', color: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)' }
  ];

  const resizeImageIfNeeded = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, image: HTMLImageElement) => {
    let width = image.naturalWidth;
    let height = image.naturalHeight;

    if (width > MAX_IMAGE_DIMENSION || height > MAX_IMAGE_DIMENSION) {
      if (width > height) {
        height = Math.round((height * MAX_IMAGE_DIMENSION) / width);
        width = MAX_IMAGE_DIMENSION;
      } else {
        width = Math.round((width * MAX_IMAGE_DIMENSION) / height);
        height = MAX_IMAGE_DIMENSION;
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(image, 0, 0, width, height);
      return true;
    }

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0);
    return false;
  };

  const removeBackground = async (imageElement: HTMLImageElement): Promise<string> => {
    try {
      setProgress(10);
      console.log('Starting background removal process...');
      
      const segmenter = await pipeline('image-segmentation', 'Xenova/segformer-b0-finetuned-ade-512-512', {
        device: 'webgpu',
      });
      
      setProgress(30);
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) throw new Error('Could not get canvas context');
      
      const wasResized = resizeImageIfNeeded(canvas, ctx, imageElement);
      console.log(`Image ${wasResized ? 'was' : 'was not'} resized. Final dimensions: ${canvas.width}x${canvas.height}`);
      
      setProgress(50);
      
      const imageData = canvas.toDataURL('image/jpeg', 0.8);
      console.log('Image converted to base64');
      
      setProgress(70);
      
      console.log('Processing with segmentation model...');
      const result = await segmenter(imageData);
      
      console.log('Segmentation result:', result);
      
      if (!result || !Array.isArray(result) || result.length === 0 || !result[0].mask) {
        throw new Error('Invalid segmentation result');
      }
      
      setProgress(90);
      
      const outputCanvas = document.createElement('canvas');
      outputCanvas.width = canvas.width;
      outputCanvas.height = canvas.height;
      const outputCtx = outputCanvas.getContext('2d');
      
      if (!outputCtx) throw new Error('Could not get output canvas context');
      
      // Apply background if not transparent
      if (selectedBackground !== 'transparent') {
        const bgOption = backgroundOptions.find(bg => bg.value === selectedBackground);
        if (bgOption && bgOption.color !== 'transparent') {
          if (bgOption.color.startsWith('linear-gradient')) {
            // Create gradient background
            const gradient = outputCtx.createLinearGradient(0, 0, outputCanvas.width, outputCanvas.height);
            // Simple gradient parsing - you might want to enhance this
            gradient.addColorStop(0, '#667eea');
            gradient.addColorStop(1, '#764ba2');
            outputCtx.fillStyle = gradient;
          } else {
            outputCtx.fillStyle = bgOption.color;
          }
          outputCtx.fillRect(0, 0, outputCanvas.width, outputCanvas.height);
        }
      }
      
      // Draw original image
      outputCtx.drawImage(canvas, 0, 0);
      
      // Apply the mask
      const outputImageData = outputCtx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
      const data = outputImageData.data;
      
      // Apply inverted mask to alpha channel
      for (let i = 0; i < result[0].mask.data.length; i++) {
        const alpha = Math.round((1 - result[0].mask.data[i]) * 255);
        data[i * 4 + 3] = alpha;
      }
      
      outputCtx.putImageData(outputImageData, 0, 0);
      setProgress(100);
      
      return outputCanvas.toDataURL('image/png', 1.0);
    } catch (error) {
      console.error('Error removing background:', error);
      throw error;
    }
  };

  const enhanceImage = async (imageElement: HTMLImageElement): Promise<string> => {
    // Placeholder for image enhancement - in a real app, you'd use an AI service
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) throw new Error('Could not get canvas context');
    
    canvas.width = imageElement.naturalWidth;
    canvas.height = imageElement.naturalHeight;
    
    // Apply basic enhancements
    ctx.filter = 'contrast(1.1) brightness(1.05) saturate(1.1)';
    ctx.drawImage(imageElement, 0, 0);
    
    return canvas.toDataURL('image/jpeg', 0.9);
  };

  const optimizeForDevice = async (imageElement: HTMLImageElement, device: string): Promise<string> => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) throw new Error('Could not get canvas context');
    
    let width = imageElement.naturalWidth;
    let height = imageElement.naturalHeight;
    let quality = 0.8;
    
    // Device-specific optimization
    switch (device) {
      case 'mobile':
        width = Math.min(width, 800);
        height = Math.round((height * width) / imageElement.naturalWidth);
        quality = 0.7;
        break;
      case 'tablet':
        width = Math.min(width, 1200);
        height = Math.round((height * width) / imageElement.naturalWidth);
        quality = 0.8;
        break;
      case 'desktop':
        width = Math.min(width, 1920);
        height = Math.round((height * width) / imageElement.naturalWidth);
        quality = 0.9;
        break;
    }
    
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(imageElement, 0, 0, width, height);
    
    return canvas.toDataURL('image/jpeg', quality);
  };

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

  const processImage = async () => {
    if (!selectedImage) {
      toast({
        title: "No Image Selected",
        description: "Please upload an image first",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      const img = new Image();
      img.onload = async () => {
        try {
          let result: string;
          
          switch (activeTab) {
            case 'remove-bg':
              result = await removeBackground(img);
              break;
            case 'enhance':
              setProgress(50);
              result = await enhanceImage(img);
              setProgress(100);
              break;
            case 'optimize':
              setProgress(50);
              result = await optimizeForDevice(img, 'desktop'); // Default to desktop
              setProgress(100);
              break;
            default:
              throw new Error('Unknown processing type');
          }
          
          setProcessedImage(result);
          toast({
            title: "Success!",
            description: "Image processed successfully",
          });
        } catch (error) {
          console.error('Processing error:', error);
          toast({
            title: "Processing Failed",
            description: "Failed to process image. Please try again.",
            variant: "destructive",
          });
        } finally {
          setIsProcessing(false);
          setProgress(0);
        }
      };
      img.src = selectedImage;
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      setIsProcessing(false);
      setProgress(0);
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
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-6 h-6" />
            AI Photography Studio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="remove-bg" className="flex items-center gap-2">
                <Scissors className="w-4 h-4" />
                Remove Background
              </TabsTrigger>
              <TabsTrigger value="enhance" className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Enhance Photo
              </TabsTrigger>
              <TabsTrigger value="optimize" className="flex items-center gap-2">
                <Wand2 className="w-4 h-4" />
                Optimize
              </TabsTrigger>
            </TabsList>

            {/* File Upload Section */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                ref={fileInputRef}
                className="hidden"
              />
              
              {selectedImage ? (
                <div className="space-y-4">
                  <img 
                    src={selectedImage} 
                    alt="Selected" 
                    className="max-w-full max-h-64 mx-auto rounded-lg shadow-lg"
                  />
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Change Image
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <ImageIcon className="w-12 h-12 mx-auto text-gray-400" />
                  <div>
                    <h3 className="text-lg font-semibold">Upload Vehicle Photo</h3>
                    <p className="text-gray-600">
                      Drag and drop or click to upload your vehicle image
                    </p>
                  </div>
                  <Button onClick={() => fileInputRef.current?.click()}>
                    <Upload className="w-4 h-4 mr-2" />
                    Select Image
                  </Button>
                </div>
              )}
            </div>

            {/* Tab-specific options */}
            <TabsContent value="remove-bg" className="space-y-4">
              <div>
                <Label htmlFor="background">Background Style</Label>
                <Select value={selectedBackground} onValueChange={setSelectedBackground}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {backgroundOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="enhance" className="space-y-4">
              <div>
                <Label>Enhancement Options</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <Palette className="w-4 h-4" />
                    <span className="text-sm">Auto Color Enhancement</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm">Smart Brightness</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="optimize" className="space-y-4">
              <div>
                <Label>Optimize for Device</Label>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4" />
                    Mobile
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Tablet className="w-4 h-4" />
                    Tablet
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Monitor className="w-4 h-4" />
                    Desktop
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Processing Section */}
            {isProcessing && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Processing...</span>
                  <span className="text-sm text-gray-500">{progress}%</span>
                </div>
                <Progress value={progress} className="w-full" />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <Button 
                onClick={processImage}
                disabled={!selectedImage || isProcessing}
                size="lg"
              >
                {isProcessing ? "Processing..." : "Process Image"}
              </Button>
              
              {processedImage && (
                <Button 
                  variant="outline" 
                  onClick={downloadImage}
                  size="lg"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              )}
            </div>

            {/* Result Section */}
            {processedImage && (
              <div className="border rounded-lg p-4 bg-gray-50">
                <h3 className="text-lg font-semibold mb-4">Processed Result</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Original</h4>
                    <img 
                      src={selectedImage} 
                      alt="Original" 
                      className="w-full rounded-lg shadow"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Processed</h4>
                    <img 
                      src={processedImage} 
                      alt="Processed" 
                      className="w-full rounded-lg shadow"
                    />
                  </div>
                </div>
              </div>
            )}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIPhotoStudio;