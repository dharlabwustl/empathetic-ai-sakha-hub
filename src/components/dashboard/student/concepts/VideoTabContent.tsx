
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Video, Clock, ListChecks, Play, Pause, Volume2, VolumeX, Users, BookOpen, Target, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface VideoTabContentProps {
  conceptName: string;
}

const VideoTabContent: React.FC<VideoTabContentProps> = ({ conceptName }) => {
  const navigate = useNavigate();
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(35);

  // Enhanced video content with playlists and detailed metadata
  const videoPlaylists = [
    {
      title: "Fundamentals",
      videos: [
        {
          title: `${conceptName} Explained Simply`,
          thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
          duration: "5:24",
          source: "PREPZR Learning",
          topics: ["Basic principles", "Formula explanation", "Simple examples"],
          watched: true,
          difficulty: "Beginner",
          views: "15.2k",
          likes: "892"
        },
        {
          title: `Core Principles of ${conceptName}`,
          thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop", 
          duration: "7:18",
          source: "PREPZR Learning",
          topics: ["Fundamental concepts", "Real-world examples", "Visual demonstrations"],
          watched: false,
          difficulty: "Beginner",
          views: "12.8k",
          likes: "756"
        }
      ]
    },
    {
      title: "Advanced Applications",
      videos: [
        {
          title: `Advanced Applications of ${conceptName}`,
          thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop",
          duration: "8:12",
          source: "PREPZR Learning",
          topics: ["Complex circuits", "Real-world applications", "Common exam questions"],
          watched: false,
          difficulty: "Advanced",
          views: "8.4k",
          likes: "523"
        },
        {
          title: `${conceptName} in Engineering`,
          thumbnail: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop",
          duration: "10:45",
          source: "PREPZR Learning", 
          topics: ["Engineering applications", "Industry examples", "Problem solving"],
          watched: false,
          difficulty: "Advanced",
          views: "6.2k",
          likes: "398"
        }
      ]
    }
  ];

  const studyRoomFeatures = [
    { name: "Group Study", icon: <Users className="h-4 w-4" />, active: true, route: "/dashboard/student/study-groups" },
    { name: "Note Taking", icon: <BookOpen className="h-4 w-4" />, active: false, route: "/dashboard/student/notes" },
    { name: "Practice Mode", icon: <Target className="h-4 w-4" />, active: false, route: "/dashboard/student/practice-exam" }
  ];

  const handleFeatureClick = (route: string) => {
    navigate(route);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5 text-indigo-600" />
            Interactive Video Learning Experience
          </CardTitle>
          <CardDescription>
            Comprehensive video content with playlists, progress tracking, and collaborative study features
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Main Video Player */}
          <div className="mb-6">
            <div className="aspect-video bg-gradient-to-br from-indigo-900 to-purple-900 rounded-lg mb-4 relative overflow-hidden">
              <img 
                src={videoPlaylists[0].videos[currentVideo]?.thumbnail}
                alt="Video thumbnail"
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-6">
                  <Video className="h-16 w-16 mx-auto text-white/80 mb-4" />
                  <h3 className="text-xl font-medium text-white mb-2">
                    {videoPlaylists[0].videos[currentVideo]?.title}
                  </h3>
                  <p className="text-white/80 mb-4">Interactive video with real-time engagement features</p>
                  
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <Button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                    >
                      {isPlaying ? <Pause className="h-5 w-5 mr-2" /> : <Play className="h-5 w-5 mr-2" />}
                      {isPlaying ? 'Pause' : 'Play'}
                    </Button>
                    
                    <Button 
                      variant="outline"
                      onClick={() => setIsMuted(!isMuted)}
                      className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                    >
                      {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </Button>
                  </div>

                  {/* Enhanced Progress Bar */}
                  <div className="w-full max-w-md mx-auto">
                    <div className="flex justify-between text-sm text-white/80 mb-2">
                      <span>{Math.floor(progress * 5.24 / 100)}:{String(Math.floor((progress * 5.24 / 100 % 1) * 60)).padStart(2, '0')}</span>
                      <span>5:24</span>
                    </div>
                    <Progress value={progress} className="h-2 bg-white/20" />
                  </div>
                </div>
              </div>
              
              {/* Study Room Features Overlay */}
              <div className="absolute top-4 right-4 flex gap-2">
                {studyRoomFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Button
                      size="sm"
                      variant={feature.active ? "default" : "outline"}
                      onClick={() => handleFeatureClick(feature.route)}
                      className={`${feature.active 
                        ? 'bg-white/90 text-indigo-600 hover:bg-white' 
                        : 'bg-white/20 text-white border-white/30 hover:bg-white/30'
                      } backdrop-blur-sm`}
                    >
                      {feature.icon}
                      <span className="ml-1 hidden sm:inline">{feature.name}</span>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Video Playlists */}
          <Tabs defaultValue="fundamentals" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="fundamentals">Fundamentals</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>
            
            {videoPlaylists.map((playlist, playlistIndex) => (
              <TabsContent 
                key={playlistIndex}
                value={playlistIndex === 0 ? "fundamentals" : "advanced"}
                className="mt-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold">{playlist.title}</h4>
                    <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                      {playlist.videos.length} videos
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {playlist.videos.map((video, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                          video.watched ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800' : 
                          'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                        }`}>
                          <CardContent className="p-4">
                            <div className="flex gap-4">
                              <div className="w-32 h-20 rounded overflow-hidden shrink-0">
                                <img 
                                  src={video.thumbnail} 
                                  alt={video.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-2">
                                  <h5 className="font-medium line-clamp-1">{video.title}</h5>
                                  <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="text-xs">
                                      {video.difficulty}
                                    </Badge>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                      <Clock className="h-3 w-3" />
                                      <span>{video.duration}</span>
                                    </div>
                                  </div>
                                </div>
                                
                                <p className="text-sm text-muted-foreground mb-2">{video.source}</p>
                                
                                <div className="flex flex-wrap gap-1 mb-3">
                                  {video.topics.map((topic, i) => (
                                    <span 
                                      key={i}
                                      className="inline-flex text-xs bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded"
                                    >
                                      {topic}
                                    </span>
                                  ))}
                                </div>
                                
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center gap-4 text-xs text-gray-500">
                                    <span>{video.views} views</span>
                                    <span>{video.likes} likes</span>
                                  </div>
                                  
                                  <div className="flex items-center gap-2">
                                    {video.watched && (
                                      <span className="text-xs text-green-600 dark:text-green-500 flex items-center">
                                        <ListChecks className="h-3 w-3 mr-1" />
                                        Watched
                                      </span>
                                    )}
                                    <Button variant="outline" size="sm">
                                      {video.watched ? 'Rewatch' : 'Watch Now'}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
          
          {/* Enhanced Video Analytics Dashboard */}
          <Card className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-800">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                Video Learning Analytics
              </h4>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">12</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Videos Watched</div>
                  <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2 mt-1">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">4.2h</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Watch Time</div>
                  <div className="w-full bg-green-200 dark:bg-green-800 rounded-full h-2 mt-1">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">85%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</div>
                  <div className="w-full bg-purple-200 dark:bg-purple-800 rounded-full h-2 mt-1">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">92%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Engagement Score</div>
                  <div className="w-full bg-orange-200 dark:bg-orange-800 rounded-full h-2 mt-1">
                    <div className="bg-orange-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoTabContent;
