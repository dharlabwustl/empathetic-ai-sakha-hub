
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Video, Clock, ListChecks, Play, Pause, Volume2, 
  VolumeX, Settings, Download, Share2, Bookmark,
  ThumbsUp, Eye, Star, ChevronRight, Users,
  BarChart3, LineChart, BarChart, PieChart,
  BookOpen, Lightbulb, Brain, Timer
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
  const [volume, setVolume] = useState([80]);
  const [playbackRate, setPlaybackRate] = useState([1]);
  const [activeSubtab, setActiveSubtab] = useState('videos');

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
  
  const learningStats = {
    timeSpent: "3h 45m",
    videosWatched: 7,
    completionRate: 68,
    retentionScore: 92,
    quizzesTaken: 4
  };
  
  const learningInsights = [
    "You retain 92% more information when watching videos followed by practice problems",
    "Your focus peaks around 15 minutes into video sessions",
    "You've made 43% more progress in topics with visual learning compared to text-only",
    "Weekend video sessions lead to 28% better quiz performance"
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
      <Tabs value={activeSubtab} onValueChange={setActiveSubtab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <Video className="h-4 w-4" /> Videos
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" /> Analytics
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" /> Learning Insights
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="flex items-center gap-2">
            <Star className="h-4 w-4" /> Recommended
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="videos" className="mt-0">
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
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Volume</p>
                    <div className="flex items-center gap-2">
                      <VolumeX className="h-4 w-4 text-gray-400" />
                      <Slider 
                        value={volume} 
                        onValueChange={setVolume} 
                        className="flex-1" 
                        max={100} 
                        step={1}
                      />
                      <Volume2 className="h-4 w-4 text-gray-400" />
                      <span className="text-xs w-8 text-right">{volume}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Playback Speed</p>
                    <div className="flex items-center gap-2">
                      <Timer className="h-4 w-4 text-gray-400" />
                      <Slider 
                        value={playbackRate} 
                        onValueChange={setPlaybackRate} 
                        className="flex-1" 
                        min={0.5} 
                        max={2} 
                        step={0.25}
                      />
                      <span className="text-xs w-8 text-right">{playbackRate}x</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
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
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {Object.entries(learningStats).map(([key, value], index) => (
              <Card key={index}>
                <CardContent className="pt-6 pb-4 px-4">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <div className="text-2xl font-bold">{value}</div>
                    <p className="text-sm text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Video Engagement Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <LineChart className="h-4 w-4 text-blue-500" />
                  Video Engagement Analysis
                </CardTitle>
                <CardDescription>Your interaction patterns during video lessons</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg border flex items-center justify-center">
                  <div className="text-center p-6">
                    <LineChart className="h-10 w-10 mx-auto mb-2 text-blue-500/50" />
                    <p className="text-sm text-gray-500">Engagement analytics visualization would appear here</p>
                    <p className="text-xs text-gray-400 mt-1">Tracking viewing habits, pauses, and replays</p>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Peak Engagement</div>
                    <div className="font-semibold">5-10 minute mark</div>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Replay Count</div>
                    <div className="font-semibold">7 times</div>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Completion Rate</div>
                    <div className="font-semibold">94%</div>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Avg. Viewing Time</div>
                    <div className="font-semibold">8.5 minutes</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Learning Progress Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Brain className="h-4 w-4 text-purple-500" />
                  Knowledge Retention Analysis
                </CardTitle>
                <CardDescription>Quiz performance after watching videos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg border flex items-center justify-center">
                  <div className="text-center p-6">
                    <BarChart className="h-10 w-10 mx-auto mb-2 text-purple-500/50" />
                    <p className="text-sm text-gray-500">Knowledge retention chart would appear here</p>
                    <p className="text-xs text-gray-400 mt-1">Comparing quiz performance before and after videos</p>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Pre-Video Score</div>
                    <div className="font-semibold">62%</div>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Post-Video Score</div>
                    <div className="font-semibold">87%</div>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Improvement</div>
                    <div className="font-semibold text-green-600">+25%</div>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Retention After 7 Days</div>
                    <div className="font-semibold">83%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="insights" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                Personalized Learning Insights
              </CardTitle>
              <CardDescription>
                AI-driven analysis of your video learning patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {learningInsights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 border rounded-lg bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full text-yellow-700 dark:text-yellow-300">
                        <Lightbulb className="h-4 w-4" />
                      </div>
                      <p className="text-sm">{insight}</p>
                    </div>
                  </motion.div>
                ))}
                
                <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/20 mt-6">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-blue-600" />
                    Recommended Learning Style
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Visual Learning</span>
                        <span className="text-blue-600 font-medium">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Interactive Learning</span>
                        <span className="text-blue-600 font-medium">78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Text-Based Learning</span>
                        <span className="text-blue-600 font-medium">45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                  </div>
                </div>
                
                <Button className="w-full mt-2">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Detailed Learning Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recommendations" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-500" />
                  Personalized Video Recommendations
                </CardTitle>
                <CardDescription>
                  Based on your learning style and progress
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {["Advanced Problem Solving", "Practical Applications", "Common Exam Mistakes"].map((category, idx) => (
                  <div key={idx} className="border rounded-lg p-4">
                    <h3 className="font-medium mb-3">{category}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[1, 2].map((i) => (
                        <div key={i} className="flex gap-3 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="w-16 h-12 bg-gray-200 dark:bg-gray-700 rounded flex-shrink-0 flex items-center justify-center">
                            <Video className="h-4 w-4 text-gray-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium line-clamp-1">
                              {category} - Example {i}
                            </p>
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                              <Clock className="h-3 w-3" /> 8:24
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full">
                  View All Recommended Videos
                </Button>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <PieChart className="h-4 w-4 text-indigo-500" />
                    Topic Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-lg border flex items-center justify-center">
                    <div className="text-center">
                      <PieChart className="h-8 w-8 mx-auto mb-2 text-indigo-500/50" />
                      <p className="text-xs text-gray-500">Content topic distribution</p>
                    </div>
                  </div>
                  
                  <div className="mt-3 space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                      <span>Theory (35%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                      <span>Examples (25%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span>Applications (30%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span>Exam Tips (10%)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Users className="h-4 w-4 text-green-500" />
                    Learning Community
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Students who watched this also enjoyed:
                  </p>
                  
                  <div className="space-y-2">
                    {["Practical Mechanics", "Forces in Engineering", "Physics Lab Techniques"].map((topic, i) => (
                      <div key={i} className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
                        <span className="text-sm">{topic}</span>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    <Users className="h-3 w-3 mr-2" />
                    Find Study Partners
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VideoTabContent;
