
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface Video {
  id: string;
  title: string;
  url: string;
  duration: string;
  thumbnail?: string;
}

interface VideoLessonsTabProps {
  videos: Video[];
}

const VideoLessonsTab: React.FC<VideoLessonsTabProps> = ({ videos }) => {
  return (
    <div className="space-y-6">
      {videos.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">No video lessons available for this concept yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {videos.map((video) => (
            <Card key={video.id}>
              <CardContent className="p-0 overflow-hidden">
                <div className="relative aspect-video">
                  <iframe 
                    src={video.url} 
                    title={video.title}
                    className="w-full h-full absolute top-0 left-0"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-4">
                  <h3 className="font-medium">{video.title}</h3>
                  <p className="text-sm text-muted-foreground">Duration: {video.duration}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoLessonsTab;
