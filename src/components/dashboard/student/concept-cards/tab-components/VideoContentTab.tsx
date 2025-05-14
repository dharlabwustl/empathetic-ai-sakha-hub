
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface VideoContentTabProps {
  concept: {
    id: string;
    title: string;
    videoUrl?: string;
    alternateVideoUrls?: string[];
  };
}

const VideoContentTab: React.FC<VideoContentTabProps> = ({ concept }) => {
  const mainVideoUrl = concept.videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ';
  const alternateVideos = concept.alternateVideoUrls || [
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    'https://www.youtube.com/embed/dQw4w9WgXcQ'
  ];

  return (
    <div className="space-y-6">
      <div className="main-video">
        <h3 className="text-lg font-medium mb-3">Main Concept Video</h3>
        <div className="aspect-video w-full rounded-lg overflow-hidden shadow-md">
          <iframe 
            src={mainVideoUrl} 
            className="w-full h-full"
            title={`${concept.title} main video`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      
      <div className="additional-videos">
        <h3 className="text-lg font-medium mb-3">Additional Learning Videos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {alternateVideos.map((videoUrl, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-video">
                <iframe 
                  src={videoUrl} 
                  className="w-full h-full"
                  title={`${concept.title} additional video ${index + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-3 flex justify-between items-center">
                <span className="text-sm font-medium">Alternative Explanation {index + 1}</span>
                <Button variant="ghost" size="sm">
                  <ExternalLink size={16} className="mr-1" />
                  Open
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoContentTab;
