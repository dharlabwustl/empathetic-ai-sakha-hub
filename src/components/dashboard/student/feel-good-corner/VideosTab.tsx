
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, ThumbsUp, Heart, Bookmark, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface VideoItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  embedUrl: string;
}

const VideosTab = () => {
  const [currentVideo, setCurrentVideo] = useState<VideoItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

  const videos = [
    {
      id: "1",
      title: "The Science of Happiness",
      description: "Learn how science explains what makes us truly happy.",
      thumbnail: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=500",
      embedUrl: "https://www.youtube.com/embed/8KkKuTCFvzI"
    },
    {
      id: "2",
      title: "How to Stay Motivated",
      description: "Tips to keep your motivation high during exam season.",
      thumbnail: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=500",
      embedUrl: "https://www.youtube.com/embed/sDEIZsxdcL8"
    },
    {
      id: "3",
      title: "Relaxing Nature Sounds",
      description: "Calm your mind with beautiful nature sounds.",
      thumbnail: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=500",
      embedUrl: "https://www.youtube.com/embed/eKFTSSKCzWA"
    }
  ];

  const selectRandomVideo = () => {
    const randomVideo = videos[Math.floor(Math.random() * videos.length)];
    setCurrentVideo(randomVideo);
    setIsPlaying(false);
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleSave = () => {
    toast({
      title: "Video saved",
      description: "This video has been saved to your collection",
    });
  };

  const handleLike = () => {
    toast({
      title: "Video liked",
      description: "We'll show you more videos like this",
    });
  };

  // Select a random video on component mount if none is selected
  React.useEffect(() => {
    if (!currentVideo) {
      selectRandomVideo();
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {currentVideo ? (
        <div className="space-y-3">
          <Card className="overflow-hidden">
            <div className="aspect-video w-full bg-gray-100 dark:bg-gray-800 relative">
              {isPlaying ? (
                <iframe
                  src={currentVideo.embedUrl}
                  title={currentVideo.title}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center relative">
                  <img 
                    src={currentVideo.thumbnail} 
                    alt={currentVideo.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <Button 
                      onClick={handlePlay}
                      size="lg"
                      variant="outline"
                      className="rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all"
                    >
                      <Video className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-3">
              <h3 className="text-lg font-medium">{currentVideo.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{currentVideo.description}</p>
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={handleLike}>
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  Like
                </Button>
                <Button size="sm" variant="outline" onClick={handleSave}>
                  <Bookmark className="h-4 w-4 mr-1" />
                  Save
                </Button>
                <Button size="sm" variant="default" className="ml-auto" onClick={selectRandomVideo}>
                  <RefreshCcw className="h-4 w-4 mr-1" />
                  Next Video
                </Button>
              </div>
            </div>
          </Card>
          
          <p className="text-xs text-center text-muted-foreground">
            <Heart className="h-3 w-3 inline mr-1 text-pink-500" />
            Our AI recommends videos to match your mood and help you relax
          </p>
        </div>
      ) : (
        <div className="p-8 text-center">
          <p>Loading videos...</p>
          <Button onClick={selectRandomVideo} className="mt-2">
            <RefreshCcw className="h-4 w-4 mr-1" />
            Try Again
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default VideosTab;
