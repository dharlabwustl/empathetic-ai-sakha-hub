
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Video, Clock, ListChecks, Play, Pause, Volume2, 
  VolumeX, Settings, Download, Share2, Bookmark,
  ThumbsUp, Eye, Star, ChevronRight, Users
} from 'lucide-react';
import { motion } from 'framer-motion';

interface VideoTabContentProps {
  conceptName: string;
}

const VideoTabContent: React.FC<VideoTabContentProps> = ({ conceptName }) => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [watchProgress, setWatchProgress] = useState(65);

  const videos = [
    {
      id: 1,
      title: `${conceptName} - Complete Explanation`,
      thumbnail: "/api/placeholder/400/225",
      duration: "12:34",
      source: "PREPZR Physics",
      difficulty: "Beginner",
      topics: ["Basic principles", "Formula explanation", "Simple examples"],
      watched: false,
      views: "2.3K",
      likes: 245,
      description: "A comprehensive introduction covering all fundamental aspects of Newton's Second Law",
      watchTime: "0:00"
    },
    {
      id: 2,
      title: `Advanced Applications of ${conceptName}`,
      thumbnail: "/api/placeholder/400/225",
      duration: "18:42",
      source: "PREPZR Physics",
      difficulty: "Advanced",
      topics: ["Complex scenarios", "Vector analysis", "Real-world problems"],
      watched: true,
      views: "1.8K",
      likes: 189,
      description: "Deep dive into advanced applications and complex problem-solving techniques",
      watchTime: "18:42"
    },
    {
      id: 3,
      title: `${conceptName} Laboratory Experiments`,
      thumbnail: "/api/placeholder/400/225",
      duration: "15:28",
      source: "PREPZR Labs",
      difficulty: "Intermediate",
      topics: ["Hands-on experiments", "Data analysis", "Practical verification"],
      watched: false,
      views: "1.2K",
      likes: 156,
      description: "Practical experiments demonstrating Newton's Second Law in action",
      watchTime: "3:45"
    },
    {
      id: 4,
      title: `${conceptName} Exam Preparation`,
      thumbnail: "/api/placeholder/400/225",
      duration: "22:15",
      source: "PREPZR Exam Prep",
      difficulty: "All Levels",
      topics: ["Exam strategies", "Common mistakes", "Time management"],
      watched: false,
      views: "3.1K",
      likes: 312,
      description: "Complete exam preparation guide with practice problems and strategies",
      watchTime: "0:00"
    }
  ];

  const relatedTopics = [
    { name: "Force and Motion", progress: 85 },
    { name: "Friction", progress: 70 },
    { name: "Circular Motion", progress: 60 },
    { name: "Energy Conservation", progress: 90 }
  ];

  const playlistVideos = [
    "Newton's First Law Review",
    "Force Diagrams Mastery",
    "Momentum and Impulse",
    "Work-Energy Theorem",
    "Rotational Motion Basics"
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const handleVideoSelect = (index: number) => {
    setCurrentVideo(index);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="space-y-6">
      {/* Main Video Player */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative">
            {/* Video Player Area */}
            <div className="aspect-video bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <motion.div
                    animate={{ scale: isPlaying ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Play className="h-20 w-20 mx-auto mb-4 opacity-80" />
                  </motion.div>
                  <h3 className="text-2xl font-semibold mb-2">{videos[currentVideo].title}</h3>
                  <p className="text-blue-200">{videos[currentVideo].description}</p>
                </div>
              </div>
              
              {/* Video Controls Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={togglePlay}
                    className="text-white hover:bg-white/20"
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </Button>
                  
                  <div className="flex-1">
                    <Progress value={watchProgress} className="h-1" />
                    <div className="flex justify-between text-xs text-white/80 mt-1">
                      <span>{videos[currentVideo].watchTime}</span>
                      <span>{videos[currentVideo].duration}</span>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleMute}
                    className="text-white hover:bg-white/20"
                  >
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20"
                  >
                    <Settings className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Video Info */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2">{videos[currentVideo].title}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {videos[currentVideo].views} views
                  </span>
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4" />
                    {videos[currentVideo].likes} likes
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {videos[currentVideo].duration}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {videos[currentVideo].description}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {videos[currentVideo].topics.map((topic, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Playlist */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5 text-indigo-600" />
                Video Playlist
              </CardTitle>
              <CardDescription>
                Complete learning series for {conceptName}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {videos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    currentVideo === index 
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                  onClick={() => handleVideoSelect(index)}
                >
                  <div className="flex gap-4">
                    <div className="w-32 h-18 bg-gray-200 dark:bg-gray-800 rounded shrink-0 flex items-center justify-center relative">
                      <Video className="h-6 w-6 text-gray-400" />
                      <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium line-clamp-2 pr-2">{video.title}</h3>
                        <Badge 
                          className={`text-xs ${getDifficultyColor(video.difficulty)} shrink-0`}
                          variant="outline"
                        >
                          {video.difficulty}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                        {video.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {video.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="h-3 w-3" />
                            {video.likes}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {video.watched && (
                            <span className="text-xs text-green-600 dark:text-green-500 flex items-center">
                              <ListChecks className="h-3 w-3 mr-1" />
                              Watched
                            </span>
                          )}
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                      
                      {video.watchTime !== "0:00" && (
                        <div className="mt-2">
                          <Progress 
                            value={(parseInt(video.watchTime.split(':')[0]) * 60 + parseInt(video.watchTime.split(':')[1])) / 
                                   (parseInt(video.duration.split(':')[0]) * 60 + parseInt(video.duration.split(':')[1])) * 100} 
                            className="h-1"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Related Topics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                Related Topics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {relatedTopics.map((topic, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{topic.name}</span>
                    <span className="text-gray-500">{topic.progress}%</span>
                  </div>
                  <Progress value={topic.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recommended Playlist */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Video className="h-4 w-4 text-indigo-500" />
                Up Next
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {playlistVideos.map((video, index) => (
                <div key={index} className="flex items-center gap-3 p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                    <Play className="h-3 w-3" />
                  </div>
                  <span className="text-sm flex-1">{video}</span>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full mt-3">
                View Full Playlist
              </Button>
            </CardContent>
          </Card>

          {/* Study Group */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Users className="h-4 w-4 text-green-500" />
                Study Together
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-3">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Join others watching this topic
                </div>
                <div className="flex -space-x-2 justify-center">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full border-2 border-white dark:border-gray-800" />
                  ))}
                </div>
                <Button size="sm" variant="outline" className="w-full">
                  <Users className="h-3 w-3 mr-2" />
                  Join Study Room
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VideoTabContent;
