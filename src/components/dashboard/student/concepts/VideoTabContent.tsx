
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, Clock, ListChecks, Play, Volume2, ChevronRight, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';

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
      watched: true,
      progress: 100,
      views: "1.2K",
      likes: 324
    },
    {
      title: `Advanced Applications of ${conceptName}`,
      thumbnail: "/placeholders/video-thumbnail-2.jpg",
      duration: "8:12",
      source: "PREPZR Learning",
      topics: ["Complex circuits", "Real-world applications", "Common exam questions"],
      watched: false,
      progress: 35,
      views: "876",
      likes: 218
    },
    {
      title: `${conceptName} Practice Problems`,
      thumbnail: "/placeholders/video-thumbnail-3.jpg",
      duration: "12:36",
      source: "PREPZR Learning",
      topics: ["Step-by-step solutions", "Exam-style questions", "Tips and tricks"],
      watched: false,
      progress: 0,
      views: "654",
      likes: 187
    }
  ];

  // Added related playlists
  const relatedPlaylists = [
    {
      name: "Master Physics Fundamentals",
      videoCount: 12,
      thumbnail: "/placeholders/playlist-thumbnail-1.jpg"
    },
    {
      name: "Exam Preparation Series",
      videoCount: 8,
      thumbnail: "/placeholders/playlist-thumbnail-2.jpg"
    }
  ];

  // Added study room features
  const studyRoomFeatures = [
    { name: "Group Watch", icon: <Users className="h-4 w-4" /> },
    { name: "Take Notes", icon: <ListChecks className="h-4 w-4" /> },
    { name: "Quiz Mode", icon: <Play className="h-4 w-4" /> }
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
          <div className="aspect-video bg-gradient-to-br from-slate-800 to-indigo-900 dark:bg-slate-900 rounded-lg mb-6 relative overflow-hidden">
            <div className="h-full flex items-center justify-center">
              <div className="text-center p-6">
                <Video className="h-12 w-12 mx-auto text-indigo-500 mb-4" />
                <h3 className="text-xl font-medium text-white">Interactive Video Player</h3>
                <p className="text-indigo-200 mt-2">Enhanced learning with visual explanations</p>
                
                {/* Video controls */}
                <div className="mt-4 flex justify-center gap-3">
                  <Button className="bg-white text-indigo-700 hover:bg-indigo-100">
                    <Play className="h-4 w-4 mr-2" />
                    Play Featured Video
                  </Button>
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/20">
                    <Volume2 className="h-4 w-4 mr-2" />
                    Audio Only
                  </Button>
                </div>

                {/* Study room features */}
                <div className="mt-6 flex justify-center gap-3">
                  {studyRoomFeatures.map((feature, idx) => (
                    <Badge key={idx} className="bg-white/10 text-white hover:bg-white/20 px-3 py-1.5 cursor-pointer">
                      {feature.icon}
                      <span className="ml-1.5">{feature.name}</span>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Video progress overlay */}
            <div className="absolute bottom-0 left-0 w-full px-4 pb-3">
              <div className="flex items-center justify-between text-xs text-white mb-1">
                <span>2:14</span>
                <span>5:24</span>
              </div>
              <Progress value={42} className="h-1.5 bg-white/20" />
            </div>
          </div>
          
          {/* Video List */}
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-lg">Featured Videos</h3>
              <Button variant="outline" size="sm" className="text-xs">
                View All Videos
              </Button>
            </div>
            
            {videos.map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border ${video.watched ? 'bg-slate-50 dark:bg-slate-900/50' : 'bg-white dark:bg-slate-900'}`}
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative w-full sm:w-40 h-24 bg-slate-200 dark:bg-slate-800 rounded-md shrink-0 flex items-center justify-center overflow-hidden">
                    <Video className="h-8 w-8 text-slate-400 absolute" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Play className="h-10 w-10 text-white" />
                    </div>
                    
                    {/* Video progress bar */}
                    {video.progress > 0 && (
                      <div className="absolute bottom-0 left-0 w-full">
                        <div className="h-1 bg-indigo-600" style={{ width: `${video.progress}%` }}></div>
                      </div>
                    )}
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
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>{video.views} views</span>
                        <span>{video.likes} likes</span>
                      </div>
                      
                      <div className="flex items-center gap-3">
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
              </motion.div>
            ))}
          </div>
          
          {/* Related playlists */}
          <div className="mt-8">
            <h3 className="font-medium text-lg mb-4">Related Playlists</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPlaylists.map((playlist, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-md transition-all cursor-pointer">
                  <div className="h-24 bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                    <Play className="h-8 w-8 text-white" />
                  </div>
                  <CardContent className="p-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-sm">{playlist.name}</h4>
                      <Badge variant="outline">{playlist.videoCount} videos</Badge>
                    </div>
                    <Button variant="ghost" size="sm" className="w-full justify-between mt-2 text-xs">
                      View Playlist
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoTabContent;
