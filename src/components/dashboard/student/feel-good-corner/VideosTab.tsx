
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';

const VideosTab = () => {
  const educationalVideos = [
    {
      id: 'vid1',
      title: 'The Beauty of Mathematics',
      thumbnail: 'https://placehold.co/600x400/9c89ff/ffffff?text=Math+Video',
      duration: '4:32',
      category: 'Mathematics'
    },
    {
      id: 'vid2',
      title: 'Understanding Quantum Physics',
      thumbnail: 'https://placehold.co/600x400/4dbbf8/ffffff?text=Physics+Video',
      duration: '6:15',
      category: 'Physics'
    },
    {
      id: 'vid3',
      title: 'The Human Brain Explained',
      thumbnail: 'https://placehold.co/600x400/f88c4d/ffffff?text=Biology+Video',
      duration: '5:47',
      category: 'Biology'
    },
    {
      id: 'vid4',
      title: 'Understanding Chemical Reactions',
      thumbnail: 'https://placehold.co/600x400/4df8ae/ffffff?text=Chemistry+Video',
      duration: '4:18',
      category: 'Chemistry'
    },
    {
      id: 'vid5',
      title: 'History of Ancient Civilizations',
      thumbnail: 'https://placehold.co/600x400/f84d9e/ffffff?text=History+Video',
      duration: '7:22',
      category: 'History'
    },
    {
      id: 'vid6',
      title: 'Introduction to Creative Writing',
      thumbnail: 'https://placehold.co/600x400/f8e54d/ffffff?text=Literature+Video',
      duration: '3:50',
      category: 'Literature'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">Educational & Relaxing Videos</h3>
        <p className="text-muted-foreground">
          Watch short, engaging videos to give your mind a refresh while still learning something new.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {educationalVideos.map((video) => (
          <Card key={video.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative">
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full h-48 object-cover"
              />
              <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 text-xs rounded">
                {video.duration}
              </div>
              <div className="absolute top-2 left-2 bg-primary/90 text-white px-2 py-1 text-xs rounded">
                {video.category}
              </div>
            </div>
            <CardContent className="p-4">
              <h4 className="font-medium mb-2 line-clamp-1">{video.title}</h4>
              <Button variant="outline" size="sm" className="w-full">
                <BookOpen className="mr-2 h-4 w-4" />
                Watch Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800/30">
        <p className="text-sm text-blue-800 dark:text-blue-300">
          <strong>Study Tip:</strong> Brief educational videos can refresh your mind while reinforcing concepts in a different format, engaging both visual and auditory learning pathways.
        </p>
      </div>
    </div>
  );
};

export default VideosTab;
