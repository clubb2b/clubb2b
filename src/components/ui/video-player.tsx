import { Play, Pause, Volume2, VolumeX, Maximize, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "./button";
import { Slider } from "./slider";
import { Dialog, DialogContent, DialogClose } from "./dialog";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
}

export function VideoPlayer({ src, poster, title }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (playing) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [playing]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted;
      videoRef.current.volume = volume;
    }
  }, [muted, volume]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    setMuted(value[0] === 0);
  };

  return (
    <>
      <div className="relative overflow-hidden rounded-lg bg-black">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setPlaying(false)}
          onClick={() => setPlaying(!playing)}
          className="w-full h-full object-cover"
        />

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center justify-between mb-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setPlaying(!playing)}
              className="text-white hover:bg-white/20"
            >
              {playing ? <Pause size={20} /> : <Play size={20} />}
            </Button>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMuted(!muted)}
                className="text-white hover:bg-white/20"
              >
                {muted || volume === 0 ? (
                  <VolumeX size={20} />
                ) : (
                  <Volume2 size={20} />
                )}
              </Button>
              <div className="w-24 hidden sm:block">
                <Slider
                  value={[muted ? 0 : volume]}
                  max={1}
                  step={0.01}
                  onValueChange={handleVolumeChange}
                  className="cursor-pointer"
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFullscreen}
                className="text-white hover:bg-white/20"
              >
                <Maximize size={20} />
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-white text-xs w-12">
              {formatTime(currentTime)}
            </span>
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={0.01}
              onValueChange={handleSeek}
              className="cursor-pointer"
            />
            <span className="text-white text-xs w-12">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {!playing && !currentTime && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              variant="outline"
              onClick={() => setPlaying(true)}
              className="bg-black/50 text-white border-white hover:bg-white hover:text-black"
            >
              <Play size={24} className="mr-2" /> Play Video
            </Button>
          </div>
        )}
      </div>

      {fullscreen && (
        <Dialog open={fullscreen} onOpenChange={setFullscreen}>
          <DialogContent className="max-w-6xl p-0 bg-black border-none">
            <div className="relative">
              <video
                ref={videoRef}
                src={src}
                autoPlay
                controls
                className="w-full h-full"
              />
              <DialogClose className="absolute top-2 right-2 text-white bg-black/50 rounded-full p-1 hover:bg-black/80">
                <X size={20} />
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}