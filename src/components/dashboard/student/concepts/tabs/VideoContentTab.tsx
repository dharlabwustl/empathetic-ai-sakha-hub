
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface VideoContentTabProps {
  videoUrl?: string;
  videoTitle?: string;
  description?: string;
}

const VideoContentTab: React.FC<VideoContentTabProps> = ({
  videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ",
  videoTitle = "Concept Explanation Video",
  description = "This video explains the concept in detail with examples and practical applications."
}) => {
  return (
    <div className="space-y-6">
      <div className="aspect-video w-full rounded-lg overflow-hidden shadow-md">
        <iframe 
          width="100%" 
          height="100%" 
          src={videoUrl} 
          title={videoTitle} 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
      
      <Card>
        <CardContent className="p-4 space-y-4">
          <h3 className="text-lg font-medium">{videoTitle}</h3>
          <p className="text-muted-foreground">{description}</p>
          
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Key Takeaways:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Understanding the core principles of the concept</li>
              <li>Applications in real-world scenarios</li>
              <li>Common mistakes to avoid</li>
              <li>Practice techniques for mastery</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoContentTab;
