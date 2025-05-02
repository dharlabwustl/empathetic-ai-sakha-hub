
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Clock, ThumbsUp } from 'lucide-react';

const MotivationalVideos: React.FC = () => {
  const videos = [
    {
      id: 1,
      title: "How to Stay Motivated While Studying",
      duration: "4:26",
      likes: 1245,
      thumbnail: "https://i.pravatar.cc/300?img=1",
    },
    {
      id: 2,
      title: "Overcoming Exam Anxiety - Quick Tips",
      duration: "3:12",
      likes: 983,
      thumbnail: "https://i.pravatar.cc/300?img=2",
    },
    {
      id: 3,
      title: "Study Techniques That Actually Work",
      duration: "5:48",
      likes: 2105,
      thumbnail: "https://i.pravatar.cc/300?img=3",
    },
  ];

  return (
    <div className="space-y-4">
      <p className="text-sm text-center text-muted-foreground">
        Short videos to boost your motivation and focus
      </p>
      
      <div className="grid gap-4">
        {videos.map((video) => (
          <Card key={video.id} className="overflow-hidden">
            <div className="relative">
              <div className="aspect-video bg-gray-200 dark:bg-gray-800 overflow-hidden">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/60 rounded-full p-3">
                    <Play className="h-5 w-5 text-white" fill="white" />
                  </div>
                </div>
              </div>
            </div>
            <CardContent className="p-3">
              <h4 className="font-medium text-sm mb-1">{video.title}</h4>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{video.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-3 w-3" />
                  <span>{video.likes}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MotivationalVideos;
