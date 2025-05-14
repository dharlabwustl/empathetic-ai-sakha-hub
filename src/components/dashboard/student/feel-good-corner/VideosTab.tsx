import React from 'react';
import { Button } from "@/components/ui/button";
import { Play, ThumbsUp, Clock, List } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Video } from './types';

const VideosTab = () => {
  const videos: Video[] = [
    {
      id: '1',
      title: 'Morning Motivation',
      description: 'Start your day with this inspiring video to boost your energy and focus.',
      thumbnail: 'https://placehold.co/600x400/7dd3fc/FFFFFF.png?text=Morning+Motivation',
      duration: '8:30',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      views: 2345,
      likes: 123,
      category: 'motivation',
      tags: ['motivation', 'morning', 'focus']
    },
    {
      id: '2',
      title: 'Relaxing Nature Sounds',
      description: 'Unwind with calming nature sounds to reduce stress and improve concentration.',
      thumbnail: 'https://placehold.co/600x400/a78bfa/FFFFFF.png?text=Nature+Sounds',
      duration: '15:00',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      views: 4567,
      likes: 345,
      category: 'relaxation',
      tags: ['relaxation', 'nature', 'calm']
    },
    {
      id: '3',
      title: 'Study Tips & Tricks',
      description: 'Learn effective study techniques to maximize your learning potential.',
      thumbnail: 'https://placehold.co/600x400/f472b6/FFFFFF.png?text=Study+Tips',
      duration: '10:45',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      views: 1234,
      likes: 98,
      category: 'tips',
      tags: ['study', 'tips', 'tricks']
    },
    {
      id: '4',
      title: 'Success Story: From Average to Achiever',
      description: 'An inspiring story of a student who overcame challenges to achieve academic success.',
      thumbnail: 'https://placehold.co/600x400/fb7185/FFFFFF.png?text=Success+Story',
      duration: '12:15',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      views: 5678,
      likes: 456,
      category: 'success-stories',
      tags: ['success', 'story', 'achiever']
    },
  ];
  
  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Inspirational Videos</h3>
        <p className="text-sm text-muted-foreground">
          Watch these videos to stay motivated and relaxed during your study sessions.
        </p>
      </div>
      
      <Tabs defaultValue="motivation" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="motivation">Motivation</TabsTrigger>
          <TabsTrigger value="relaxation">Relaxation</TabsTrigger>
          <TabsTrigger value="tips">Study Tips</TabsTrigger>
          <TabsTrigger value="success">Success Stories</TabsTrigger>
        </TabsList>
        
        <TabsContent value="motivation" className="pt-4 space-y-4">
          {videos.filter(video => video.category === 'motivation').map((video) => (
            <div key={video.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => window.open(video.url, '_blank')}
                >
                  <Play className="h-4 w-4" />
                </Button>
                <div>
                  <p className="text-sm font-medium">{video.title}</p>
                  <p className="text-xs text-muted-foreground">{video.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{video.duration}</span>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <ThumbsUp className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </TabsContent>
        
        <TabsContent value="relaxation" className="pt-4 space-y-4">
          {videos.filter(video => video.category === 'relaxation').map((video) => (
            <div key={video.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => window.open(video.url, '_blank')}
                >
                  <Play className="h-4 w-4" />
                </Button>
                <div>
                  <p className="text-sm font-medium">{video.title}</p>
                  <p className="text-xs text-muted-foreground">{video.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{video.duration}</span>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <ThumbsUp className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </TabsContent>
        
        <TabsContent value="tips" className="pt-4 space-y-4">
          {videos.filter(video => video.category === 'tips').map((video) => (
            <div key={video.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => window.open(video.url, '_blank')}
                >
                  <Play className="h-4 w-4" />
                </Button>
                <div>
                  <p className="text-sm font-medium">{video.title}</p>
                  <p className="text-xs text-muted-foreground">{video.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{video.duration}</span>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <ThumbsUp className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </TabsContent>
        
        <TabsContent value="success" className="pt-4 space-y-4">
          {videos.filter(video => video.category === 'success-stories').map((video) => (
            <div key={video.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => window.open(video.url, '_blank')}
                >
                  <Play className="h-4 w-4" />
                </Button>
                <div>
                  <p className="text-sm font-medium">{video.title}</p>
                  <p className="text-xs text-muted-foreground">{video.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{video.duration}</span>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <ThumbsUp className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
      
      <div className="text-center pt-2">
        <Button variant="outline">
          Explore More Videos
        </Button>
      </div>
    </div>
  );
};

export default VideosTab;
