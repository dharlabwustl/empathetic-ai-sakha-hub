
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, Clock, ListChecks } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoTabContentProps {
  conceptName: string;
}

const VideoTabContent: React.FC<VideoTabContentProps> = ({ conceptName }) => {
  // Sample videos data
  const videos = [
    {
      title: `${conceptName} Explained Simply`,
      thumbnail: "/placeholders/video-thumbnail-1.jpg",
      duration: "5:24",
      source: "PREPZR Learning",
      topics: ["Basic principles", "Formula explanation", "Simple examples"],
      watched: true
    },
    {
      title: `Advanced Applications of ${conceptName}`,
      thumbnail: "/placeholders/video-thumbnail-2.jpg",
      duration: "8:12",
      source: "PREPZR Learning",
      topics: ["Complex circuits", "Real-world applications", "Common exam questions"],
      watched: false
    },
    {
      title: `${conceptName} Practice Problems`,
      thumbnail: "/placeholders/video-thumbnail-3.jpg",
      duration: "12:36",
      source: "PREPZR Learning",
      topics: ["Step-by-step solutions", "Exam-style questions", "Tips and tricks"],
      watched: false
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5 text-indigo-600" />
            Video Explanations
          </CardTitle>
          <CardDescription>
            Visual and audio explanations of {conceptName}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Featured Video */}
          <div className="aspect-video bg-slate-100 dark:bg-slate-900 rounded-lg mb-6">
            <div className="h-full flex items-center justify-center">
              <div className="text-center p-6">
                <Video className="h-12 w-12 mx-auto text-indigo-500 mb-4" />
                <h3 className="text-xl font-medium">Video Player</h3>
                <p className="text-muted-foreground mt-2">Selected video will play here</p>
                <Button className="mt-4">
                  Play Featured Video
                </Button>
              </div>
            </div>
          </div>
          
          {/* Video List */}
          <div className="space-y-4">
            {videos.map((video, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border ${video.watched ? 'bg-slate-50 dark:bg-slate-900/50' : 'bg-white dark:bg-slate-900'}`}
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-40 h-24 bg-slate-200 dark:bg-slate-800 rounded shrink-0 flex items-center justify-center">
                    <Video className="h-8 w-8 text-slate-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium line-clamp-1">{video.title}</h3>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{video.duration}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{video.source}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {video.topics.map((topic, i) => (
                        <span 
                          key={i}
                          className="inline-flex text-xs bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                      <Button variant="outline" size="sm">
                        Watch Now
                      </Button>
                      {video.watched && (
                        <span className="text-xs text-green-600 dark:text-green-500 flex items-center">
                          <ListChecks className="h-3 w-3 mr-1" />
                          Watched
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoTabContent;
