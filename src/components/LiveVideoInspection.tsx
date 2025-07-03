import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Video, Phone, PhoneOff, Camera, Mic, MicOff, Monitor, Clock } from "lucide-react";
import { toast } from "sonner";
import { useNativeFeatures } from "@/hooks/useNativeFeatures";

const LiveVideoInspection = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [selectedVehicle, setSelectedVehicle] = useState<string>('');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const { takePhoto, isNative } = useNativeFeatures();

  // Mock vehicles for demonstration
  const vehicles = [
    { id: '1', name: '2023 Mercedes-Benz S-Class', location: 'Toronto, CA' },
    { id: '2', name: '2022 BMW X7', location: 'Montreal, CA' },
    { id: '3', name: '2024 Audi Q8', location: 'Vancouver, CA' }
  ];

  const inspectionSteps = [
    'Exterior Condition Check',
    'Interior Assessment',
    'Engine Bay Inspection',
    'Undercarriage Review',
    'Technology Systems Test',
    'Road Test (if applicable)'
  ];

  const startCall = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: true 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        
        setIsCallActive(true);
        toast.success("Live inspection started!");
        
        // Start call timer
        const interval = setInterval(() => {
          setCallDuration(prev => prev + 1);
        }, 1000);
        
        // Store interval ID for cleanup
        (window as any).callInterval = interval;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast.error("Unable to access camera. Please check permissions.");
    }
  };

  const endCall = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    
    setIsCallActive(false);
    setCallDuration(0);
    clearInterval((window as any).callInterval);
    toast.success("Live inspection ended");
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = isMuted;
      }
    }
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !isVideoOn;
      }
    }
  };

  const takeSnapshot = async () => {
    if (isNative) {
      const photo = await takePhoto();
      if (photo) {
        toast.success("Inspection photo captured!");
      }
    } else {
      // Web fallback - canvas screenshot
      if (videoRef.current) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        ctx?.drawImage(videoRef.current, 0, 0);
        toast.success("Inspection snapshot captured!");
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const scheduleInspection = () => {
    const message = `I would like to schedule a live video inspection for vehicle: ${
      vehicles.find(v => v.id === selectedVehicle)?.name || 'selected vehicle'
    }. Please provide available time slots.`;
    const whatsappUrl = `https://wa.me/15185077243?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-light text-white mb-4 tracking-wider">
          LIVE VIDEO INSPECTION
        </h1>
        <p className="text-gray-300 text-lg">
          Real-time vehicle inspection with our certified experts
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Video Feed */}
        <div className="lg:col-span-2">
          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 text-white">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  Live Inspection Feed
                </div>
                {isCallActive && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    LIVE - {formatTime(callDuration)}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
                {isCallActive ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Monitor className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                      <p className="text-gray-400">Video feed will appear here</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Start inspection to begin live video
                      </p>
                    </div>
                  </div>
                )}
                
                {/* Video Controls Overlay */}
                {isCallActive && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="flex items-center gap-2 bg-black/50 rounded-full px-4 py-2">
                      <Button
                        size="sm"
                        variant={isMuted ? "destructive" : "secondary"}
                        onClick={toggleMute}
                        className="rounded-full w-10 h-10 p-0"
                      >
                        {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      </Button>
                      
                      <Button
                        size="sm"
                        variant={!isVideoOn ? "destructive" : "secondary"}
                        onClick={toggleVideo}
                        className="rounded-full w-10 h-10 p-0"
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={takeSnapshot}
                        className="rounded-full w-10 h-10 p-0"
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={endCall}
                        className="rounded-full w-10 h-10 p-0"
                      >
                        <PhoneOff className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Inspection Panel */}
        <div className="space-y-6">
          {/* Vehicle Selection */}
          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 text-white">
            <CardHeader>
              <CardTitle className="text-lg">Select Vehicle</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {vehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedVehicle === vehicle.id
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                  onClick={() => setSelectedVehicle(vehicle.id)}
                >
                  <h4 className="font-medium">{vehicle.name}</h4>
                  <p className="text-sm text-gray-400">{vehicle.location}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Inspection Checklist */}
          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 text-white">
            <CardHeader>
              <CardTitle className="text-lg">Inspection Checklist</CardTitle>
              <CardDescription className="text-gray-400">
                Standard inspection points
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {inspectionSteps.map((step, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 rounded">
                    <div className="w-6 h-6 rounded-full border border-gray-500 flex items-center justify-center text-xs">
                      {index + 1}
                    </div>
                    <span className="text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Control Buttons */}
          <div className="space-y-3">
            {!isCallActive ? (
              <>
                <Button
                  onClick={startCall}
                  disabled={!selectedVehicle}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  size="lg"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Start Live Inspection
                </Button>
                
                <Button
                  onClick={scheduleInspection}
                  variant="outline"
                  className="w-full border-gray-600 text-white hover:bg-gray-700"
                  size="lg"
                >
                  <Clock className="w-5 h-5 mr-2" />
                  Schedule Inspection
                </Button>
              </>
            ) : (
              <Button
                onClick={endCall}
                variant="destructive"
                className="w-full"
                size="lg"
              >
                <PhoneOff className="w-5 h-5 mr-2" />
                End Inspection
              </Button>
            )}
          </div>

          {/* Features */}
          <Card className="bg-gradient-to-br from-purple-900 to-purple-800 border-purple-600 text-white">
            <CardHeader>
              <CardTitle className="text-lg">Premium Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div>✓ HD Video Quality</div>
                <div>✓ Real-time Communication</div>
                <div>✓ Expert Commentary</div>
                <div>✓ Detailed Photo Documentation</div>
                <div>✓ Inspection Report</div>
                <div>✓ Recording Available</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LiveVideoInspection;