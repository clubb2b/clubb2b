import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Upload, 
  Download, 
  Image as ImageIcon,
  Car,
  Building,
  Sparkles
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const AIShowroom = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState('Indoor Showroom');
  const [processingSteps, setProcessingSteps] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showroomStyles = [
    { value: 'Indoor Showroom', label: 'Indoor Luxury Showroom', icon: <Building className="w-4 h-4" /> },
    { value: 'Rooftop Showroom', label: 'Rooftop Display', icon: <Car className="w-4 h-4" /> },
    { value: 'Luxury Gallery', label: 'Premium Gallery', icon: <Sparkles className="w-4 h-4" /> },
    { value: 'Modern Studio', label: 'Modern Photo Studio', icon: <ImageIcon className="w-4 h-4" /> }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setProcessedImage(null);
        setProcessingSteps([]);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async () => {
    if (!selectedImage) {
      toast({
        title: "No Image Selected",
        description: "Please upload a car image first",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setProcessingSteps([]);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 1000);

      const { data, error } = await supabase.functions.invoke('generate-ai-showroom', {
        body: {
          image: selectedImage,
          style: selectedStyle
        }
      });

      clearInterval(progressInterval);

      if (error) {
        throw new Error(error.details || 'Failed to process image');
      }

      if (data.success) {
        setProcessedImage(data.finalImageUrl);
        setProcessingSteps(data.processingSteps || []);
        setProgress(100);
        toast({
          title: "Success!",
          description: `AI Showroom created with ${selectedStyle} background`,
        });
      } else {
        throw new Error(data.error || 'Processing failed');
      }

    } catch (error) {
      console.error('Processing error:', error);
      toast({
        title: "Processing Failed",
        description: error.message || "Failed to create AI showroom. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const downloadImage = () => {
    if (!processedImage) return;
    
    const link = document.createElement('a');
    link.download = `club-b2b-showroom-${Date.now()}.png`;
    link.href = processedImage;
    link.click();
  };

  return (
    <Card className="bg-gradient-to-b from-gray-800 to-gray-900 border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Car className="w-6 h-6" />
          CLUB B2B AI SHOWROOM
        </CardTitle>
        <p className="text-gray-300 text-sm">
          Transform your vehicle photos into professional showroom presentations
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* File Upload Section */}
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center bg-gray-800">
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
                alt="Selected car" 
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
              <Car className="w-12 h-12 mx-auto text-gray-400" />
              <div>
                <h3 className="text-lg font-semibold text-white">Upload Car Photo</h3>
                <p className="text-gray-400">
                  Upload your vehicle image to create a professional showroom presentation
                </p>
              </div>
              <Button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-white text-black hover:bg-gray-200"
              >
                <Upload className="w-4 h-4 mr-2" />
                Select Car Image
              </Button>
            </div>
          )}
        </div>

        {/* Showroom Style Selection */}
        <div className="space-y-4">
          <Label className="text-white">Choose Showroom Style</Label>
          <Select value={selectedStyle} onValueChange={setSelectedStyle}>
            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              {showroomStyles.map((style) => (
                <SelectItem key={style.value} value={style.value} className="text-white hover:bg-gray-600">
                  <div className="flex items-center gap-2">
                    {style.icon}
                    {style.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Processing Steps */}
        {processingSteps.length > 0 && (
          <div className="bg-gray-700 p-4 rounded-lg">
            <h4 className="text-white font-semibold mb-2">Processing Steps:</h4>
            <ul className="space-y-1">
              {processingSteps.map((step, index) => (
                <li key={index} className="text-gray-300 text-sm flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  {step}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Processing Progress */}
        {isProcessing && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white">Creating AI Showroom...</span>
              <span className="text-sm text-gray-400">{progress}%</span>
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
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {isProcessing ? "Processing..." : "Create AI Showroom"}
          </Button>
          
          {processedImage && (
            <Button 
              variant="outline" 
              onClick={downloadImage}
              size="lg"
              className="border-white text-white hover:bg-white hover:text-black"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          )}
        </div>

        {/* Result Section */}
        {processedImage && (
          <div className="border rounded-lg p-4 bg-gray-700">
            <h3 className="text-lg font-semibold mb-4 text-white">CLUB B2B AI Showroom Result</h3>
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
                <h4 className="text-sm font-medium mb-2 text-white">AI Showroom</h4>
                <img 
                  src={processedImage} 
                  alt="AI Showroom" 
                  className="w-full rounded-lg shadow border border-gray-600"
                />
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIShowroom;