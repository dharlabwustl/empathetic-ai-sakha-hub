
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Download, BookmarkPlus, ThumbsUp, MessageSquare } from "lucide-react";

interface VideoContentTabProps {
  conceptId: string;
  conceptTitle: string;
}

const VideoContentTab: React.FC<VideoContentTabProps> = ({ conceptId, conceptTitle }) => {
  const videos = [
    {
      id: '1',
      title: `${conceptTitle} - Core Concepts`,
      description: 'This video covers all the foundational principles of the concept with clear explanations.',
      duration: '12:45',
      thumbnail: 'https://placehold.co/600x400/3b82f6/FFFFFF.png?text=Concept+Video',
      instructor: 'Dr. Sharma'
    },
    {
      id: '2',
      title: `${conceptTitle} - Problem Solving`,
      description: 'Learn how to solve complex problems related to this concept step by step.',
      duration: '18:30',
      thumbnail: 'https://placehold.co/600x400/6366f1/FFFFFF.png?text=Problem+Solving',
      instructor: 'Prof. Gupta'
    },
    {
      id: '3',
      title: `${conceptTitle} - Advanced Applications`,
      description: 'Explore advanced applications and real-world examples of this concept.',
      duration: '15:20',
      thumbnail: 'https://placehold.co/600x400/8b5cf6/FFFFFF.png?text=Advanced+Topics',
      instructor: 'Dr. Patel'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Video Lectures</h3>
        <p className="text-sm text-muted-foreground">
          Watch these video lectures to understand the concept thoroughly.
        </p>
      </div>

      {videos.map((video) => (
        <Card key={video.id} className="overflow-hidden border border-gray-200 hover:border-blue-300 dark:border-gray-700 dark:hover:border-blue-800 transition-all">
          <div className="sm:flex">
            <div className="relative sm:w-1/3 h-48 sm:h-auto bg-gray-100 dark:bg-gray-800">
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 group">
                <Button className="rounded-full h-12 w-12" size="icon">
                  <Play className="h-6 w-6" />
                </Button>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {video.duration}
              </div>
            </div>
            
            <CardContent className="sm:w-2/3 p-4">
              <div className="space-y-2">
                <h4 className="font-medium text-base">{video.title}</h4>
                <p className="text-sm text-muted-foreground">{video.description}</p>
                <p className="text-xs text-muted-foreground">Instructor: {video.instructor}</p>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-8">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      <span className="text-xs">Helpful</span>
                    </Button>
                    <Button variant="outline" size="sm" className="h-8">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      <span className="text-xs">Questions</span>
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-8">
                      <BookmarkPlus className="h-4 w-4 mr-1" />
                      <span className="text-xs">Save</span>
                    </Button>
                    <Button variant="outline" size="sm" className="h-8">
                      <Download className="h-4 w-4 mr-1" />
                      <span className="text-xs">Download</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      ))}
      
      <div className="text-center pt-4">
        <Button variant="outline">Load More Videos</Button>
      </div>
    </div>
  );
};

export default VideoContentTab;
