import { useState } from 'react';
import { pipeline, env } from '@huggingface/transformers';
import { toast } from '@/hooks/use-toast';

// Configure transformers.js
env.allowLocalModels = false;
env.useBrowserCache = false;

const MAX_IMAGE_DIMENSION = 1024;

export const useImageProcessing = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

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

  const removeBackground = async (imageElement: HTMLImageElement, selectedBackground: string): Promise<string> => {
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
        const backgroundOptions = [
          { value: 'transparent', label: 'Transparent', color: 'transparent' },
          { value: 'white', label: 'Pure White', color: '#ffffff' },
          { value: 'gradient-luxury', label: 'Luxury Gradient', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
          { value: 'showroom', label: 'Showroom Floor', color: 'linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%)' },
          { value: 'studio', label: 'Photo Studio', color: 'linear-gradient(45deg, #2c3e50 0%, #34495e 100%)' },
          { value: 'sunset', label: 'Golden Hour', color: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)' }
        ];
        
        const bgOption = backgroundOptions.find(bg => bg.value === selectedBackground);
        if (bgOption && bgOption.color !== 'transparent') {
          if (bgOption.color.startsWith('linear-gradient')) {
            // Create gradient background
            const gradient = outputCtx.createLinearGradient(0, 0, outputCanvas.width, outputCanvas.height);
            // Simple gradient parsing
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

  const processImage = async (
    selectedImage: string,
    activeTab: string,
    selectedBackground: string
  ): Promise<string | null> => {
    if (!selectedImage) {
      toast({
        title: "No Image Selected",
        description: "Please upload an image first",
        variant: "destructive",
      });
      return null;
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      const img = new Image();
      
      return new Promise((resolve, reject) => {
        img.onload = async () => {
          try {
            let result: string;
            
            switch (activeTab) {
              case 'remove-bg':
                result = await removeBackground(img, selectedBackground);
                break;
              case 'enhance':
                setProgress(50);
                result = await enhanceImage(img);
                setProgress(100);
                break;
              case 'optimize':
                setProgress(50);
                result = await optimizeForDevice(img, 'desktop');
                setProgress(100);
                break;
              default:
                throw new Error('Unknown processing type');
            }
            
            toast({
              title: "Success!",
              description: "Image processed successfully",
            });
            resolve(result);
          } catch (error) {
            console.error('Processing error:', error);
            toast({
              title: "Processing Failed",
              description: "Failed to process image. Please try again.",
              variant: "destructive",
            });
            reject(error);
          } finally {
            setIsProcessing(false);
            setProgress(0);
          }
        };
        img.src = selectedImage;
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      setIsProcessing(false);
      setProgress(0);
      return null;
    }
  };

  return {
    isProcessing,
    progress,
    processImage,
    setProgress,
    setIsProcessing
  };
};