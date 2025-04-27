
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, ThumbsUp, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const VideosTab = () => {
  const videoCategories = [
    { id: "motivational", name: "Motivational" },
    { id: "relaxing", name: "Relaxing" },
    { id: "educational", name: "Educational" },
    { id: "humorous", name: "Humorous" },
  ];
  
  // Mock videos data - in a real app, this would come from an API
  const videos = [
    {
      id: "v1",
      title: "5-Minute Break to Boost Motivation",
      thumbnail: "https://via.placeholder.com/300x180.png?text=Motivational+Video",
      duration: "4:56",
      likes: 245,
      comments: 32,
      category: "motivational"
    },
    {
      id: "v2",
      title: "Study Break: Peaceful Nature Sounds",
      thumbnail: "https://via.placeholder.com/300x180.png?text=Nature+Sounds",
      duration: "10:00",
      likes: 189,
      comments: 15,
      category: "relaxing"
    },
    {
      id: "v3",
      title: "How Memory Works - Explained in 3 Minutes",
      thumbnail: "https://via.placeholder.com/300x180.png?text=Memory+Explained",
      duration: "3:28",
      likes: 324,
      comments: 47,
      category: "educational"
    },
    {
      id: "v4",
      title: "When the Exam Is Tomorrow",
      thumbnail: "https://via.placeholder.com/300x180.png?text=Exam+Humor",
      duration: "2:15",
      likes: 678,
      comments: 124,
      category: "humorous"
    }
  ];
  
  return (
    <div className="space-y-4">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          {videoCategories.map(category => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {videos.map((video) => (
          <Card key={video.id} className="overflow-hidden group">
            <div className="relative">
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full aspect-video object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="icon" className="bg-white/80 hover:bg-white text-black rounded-full">
                  <Play className="h-5 w-5 ml-0.5" />
                </Button>
              </div>
              <Badge className="absolute bottom-2 right-2 bg-black/70">{video.duration}</Badge>
            </div>
            <CardContent className="p-3">
              <h3 className="font-medium line-clamp-2 mb-2">{video.title}</h3>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <Badge variant="outline">{video.category}</Badge>
                <div className="flex items-center gap-3">
                  <span className="flex items-center">
                    <ThumbsUp className="h-3 w-3 mr-1" />
                    {video.likes}
                  </span>
                  <span className="flex items-center">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    {video.comments}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Button variant="outline" className="w-full">
        Load More Videos
      </Button>
    </div>
  );
};

export default VideosTab;
