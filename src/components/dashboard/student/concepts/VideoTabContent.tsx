
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, Clock, Star, BarChart2, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoTabContentProps {
  conceptName: string;
}

const VideoTabContent: React.FC<VideoTabContentProps> = ({ conceptName }) => {
  // Sample video data
  const videos = [
    {
      id: "v1",
      title: `${conceptName} Explained Simply`,
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Just a placeholder URL
      duration: "8:45",
      instructor: "Dr. Emily Physics",
      rating: 4.8,
      views: 24563,
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg"
    },
    {
      id: "v2",
      title: `${conceptName} Practice Problems`,
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Just a placeholder URL
      duration: "12:20",
      instructor: "Prof. James Maxwell",
      rating: 4.6,
      views: 18345,
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg"
    },
    {
      id: "v3",
      title: `${conceptName} Advanced Applications`,
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Just a placeholder URL
      duration: "15:32",
      instructor: "Dr. Marie Circuit",
      rating: 4.9,
      views: 9872,
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg"
    }
  ];
  
  // Selected video (first one by default)
  const selectedVideo = videos[0];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5 text-indigo-600" />
            Video Lessons: {conceptName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="aspect-video bg-black rounded-md overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src={selectedVideo.url}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              
              <div className="mt-4">
                <h3 className="text-xl font-medium">{selectedVideo.title}</h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {selectedVideo.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    {selectedVideo.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <BarChart2 className="h-4 w-4" />
                    {selectedVideo.views.toLocaleString()} views
                  </span>
                </div>
                <p className="mt-4">
                  In this video, {selectedVideo.instructor} explains the core principles of {conceptName},
                  including key formulas, applications, and common problem-solving techniques.
                </p>
              </div>
              
              <div className="mt-6 space-y-2">
                <h4 className="font-medium">Key Timestamps</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="justify-start">
                    <span className="mr-2 px-1.5 py-0.5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 rounded text-xs">0:30</span>
                    Basic definition
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <span className="mr-2 px-1.5 py-0.5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 rounded text-xs">2:15</span>
                    Formula explanation
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <span className="mr-2 px-1.5 py-0.5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 rounded text-xs">4:50</span>
                    Example problem 1
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <span className="mr-2 px-1.5 py-0.5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 rounded text-xs">6:30</span>
                    Advanced applications
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">Related Videos</h3>
              
              {videos.slice(1).map((video) => (
                <Card key={video.id} className="overflow-hidden">
                  <div className="aspect-video relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white px-2 py-1 rounded text-xs">
                      {video.duration}
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <h4 className="font-medium line-clamp-2 text-sm">{video.title}</h4>
                    <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
                      <span>{video.instructor}</span>
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500" fill="currentColor" />
                        {video.rating}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Button variant="outline" className="w-full flex items-center justify-center gap-1">
                View All Videos
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoTabContent;
