
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Video, Clock, ListChecks, Play, Pause, Volume2, 
  VolumeX, Settings, Download, Share2, Bookmark,
  ThumbsUp, Eye, Star, ChevronRight, Users,
  BarChart3, LineChart, Activity, BookOpen
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, LineChart as RechartLineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface VideoTabContentProps {
  conceptName: string;
}

const VideoTabContent: React.FC<VideoTabContentProps> = ({ conceptName }) => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [watchProgress, setWatchProgress] = useState(65);
  const [activeTab, setActiveTab] = useState("videos");

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

  // Learning analytics data
  const engagementData = [
    { session: 1, duration: 15, questions: 5, notes: 3 },
    { session: 2, duration: 22, questions: 7, notes: 5 },
    { session: 3, duration: 18, questions: 4, notes: 6 },
    { session: 4, duration: 25, questions: 8, notes: 4 },
    { session: 5, duration: 30, questions: 9, notes: 7 }
  ];
  
  const comprehensionData = [
    { concept: "Basic Principles", before: 35, after: 85 },
    { concept: "Formula Application", before: 42, after: 78 },
    { concept: "Problem Solving", before: 28, after: 72 },
    { concept: "Real Examples", before: 45, after: 88 },
    { concept: "Complex Scenarios", before: 20, after: 65 }
  ];
  
  const keyInsights = [
    { title: "Watch Time", value: "4.5 hours", change: "+1.2 hrs", isPositive: true },
    { title: "Retention Rate", value: "78%", change: "+12%", isPositive: true },
    { title: "Engagement Score", value: "8.5/10", change: "+1.3", isPositive: true },
    { title: "Quiz Performance", value: "85%", change: "+15%", isPositive: true }
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
      <Tabs defaultValue="videos" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            <span>Video Content</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span>Learning Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="notes" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Notes & Summaries</span>
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span>Key Insights</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="videos" className="mt-6">
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
        </TabsContent>

        <TabsContent value="analytics" className="mt-6 space-y-6">
          {/* Analytics Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {keyInsights.map((insight, idx) => (
              <Card key={idx}>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold">{insight.value}</div>
                    <p className="text-sm text-gray-500 mt-1">{insight.title}</p>
                    <Badge 
                      className={`mt-2 ${
                        insight.isPositive 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}
                    >
                      {insight.change}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Engagement Metrics Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Engagement Metrics</CardTitle>
              <CardDescription>
                Track your learning activity patterns across sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={engagementData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="session" label={{ value: 'Learning Session', position: 'insideBottom', offset: -5 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="duration" name="Watch Time (min)" fill="#8884d8" />
                    <Bar dataKey="questions" name="Questions Asked" fill="#82ca9d" />
                    <Bar dataKey="notes" name="Notes Created" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Comprehension Growth Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Comprehension Growth</CardTitle>
              <CardDescription>
                Measure your understanding before and after video learning
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={comprehensionData}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 50, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="concept" type="category" width={150} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="before" name="Before Learning %" fill="#ff7300" />
                    <Bar dataKey="after" name="After Learning %" fill="#00C49F" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Learning Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Learning Recommendations</CardTitle>
              <CardDescription>
                Based on your video learning patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">1</div>
                  <div>
                    <h4 className="font-medium">Focus on Interactive Exercises</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Your retention increases 35% when you practice with interactive examples after watching videos.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">2</div>
                  <div>
                    <h4 className="font-medium">Take Notes More Frequently</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Users who take 5+ notes per video score 28% higher on related assessments.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">3</div>
                  <div>
                    <h4 className="font-medium">Review Complex Concepts</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Your comprehension data shows gaps in "Variable Mass Systems" - recommended videos have been added to your playlist.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notes" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Video Notes & Summaries</CardTitle>
              <CardDescription>
                Your saved notes and auto-generated summaries from videos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium">Newton's Second Law Fundamentals</h3>
                    <Badge>10:25</Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    The Second Law states that an object's acceleration depends on the force applied and the object's mass. Force equals mass times acceleration (F = ma). When a constant force acts on a massive body, it causes a constant acceleration proportional to the force and inversely proportional to the mass.
                  </p>
                  <div className="flex justify-between items-center mt-3">
                    <div className="text-xs text-gray-500">Added May 15, 2025</div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm">Delete</Button>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium">Force Calculation Example</h3>
                    <Badge>15:42</Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Example: A 2kg object accelerating at 5 m/s² experiences a force of F = 2kg × 5m/s² = 10N. Remember that force is a vector quantity with both magnitude and direction. In multi-force problems, use vector addition to find the net force.
                  </p>
                  <div className="flex justify-between items-center mt-3">
                    <div className="text-xs text-gray-500">Added May 18, 2025</div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm">Delete</Button>
                    </div>
                  </div>
                </div>
                
                <div className="border border-dashed rounded-lg p-5 text-center">
                  <Button variant="outline">
                    + Add New Note
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Auto-Generated Summary</CardTitle>
              <CardDescription>
                AI-powered summary of the video content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <p>
                  <span className="font-medium">Key Concept:</span> Newton's Second Law establishes the relationship between an object's motion and the forces acting on it, expressed mathematically as F = ma.
                </p>
                
                <p>
                  <span className="font-medium">Important Formulas:</span>
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Force (F) = Mass (m) × Acceleration (a)</li>
                  <li>Mass (m) = Force (F) ÷ Acceleration (a)</li>
                  <li>Acceleration (a) = Force (F) ÷ Mass (m)</li>
                </ul>
                
                <p>
                  <span className="font-medium">Application Examples:</span>
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Calculating force needed to accelerate a car</li>
                  <li>Determining rocket thrust requirements</li>
                  <li>Analyzing impact forces in collisions</li>
                  <li>Computing weight (gravitational force) on different planets</li>
                </ul>
                
                <p>
                  <span className="font-medium">Common Misconceptions Addressed:</span>
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Weight vs. Mass distinction</li>
                  <li>Direction of force vectors</li>
                  <li>Handling multiple forces acting simultaneously</li>
                </ul>
                
                <p>
                  <span className="font-medium">Exam Tips:</span>
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Always check units for consistency in calculations</li>
                  <li>Draw free body diagrams to identify all acting forces</li>
                  <li>Remember that acceleration is always in the direction of the net force</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="insights" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Learning Pattern Analysis</CardTitle>
                <CardDescription>
                  How you engage with video content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Afternoon Productivity</span>
                    <span className="text-sm text-indigo-600">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Pause-and-Review Rate</span>
                    <span className="text-sm text-indigo-600">62%</span>
                  </div>
                  <Progress value={62} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Note-Taking Frequency</span>
                    <span className="text-sm text-indigo-600">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Video Completion Rate</span>
                    <span className="text-sm text-indigo-600">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg mt-4">
                  <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                    <Activity className="h-4 w-4 text-blue-600" />
                    Personalized Insight
                  </h4>
                  <p className="text-sm">
                    You learn most effectively in the afternoon between 2-5PM, with frequent short breaks. Try scheduling more study sessions during this peak time window.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Concept Mastery Prediction</CardTitle>
                <CardDescription>
                  AI-based forecast of your understanding
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartLineChart
                      data={[
                        { day: 1, actual: 25, predicted: 25 },
                        { day: 2, actual: 35, predicted: 38 },
                        { day: 3, actual: 45, predicted: 48 },
                        { day: 4, actual: 60, predicted: 62 },
                        { day: 5, actual: 75, predicted: 72 },
                        { day: 6, actual: null, predicted: 82 },
                        { day: 7, actual: null, predicted: 88 },
                        { day: 8, actual: null, predicted: 92 }
                      ]}
                      margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" label={{ value: 'Study Day', position: 'insideBottom', offset: -5 }} />
                      <YAxis label={{ value: 'Mastery %', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="actual" stroke="#8884d8" name="Actual Progress" dot={{ r: 6 }} />
                      <Line type="monotone" dataKey="predicted" stroke="#82ca9d" strokeDasharray="5 5" name="Predicted Progress" dot={{ r: 4 }} />
                    </RechartLineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg mt-4">
                  <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-green-600" />
                    Learning Forecast
                  </h4>
                  <p className="text-sm">
                    At your current pace, you're expected to achieve 92% mastery of this concept within 8 days of study. Adding just 2 practice quizzes could accelerate this to 6 days.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Knowledge Connections</CardTitle>
                <CardDescription>
                  How this concept connects to your broader learning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4 justify-center p-4">
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-2 text-blue-600 border-2 border-blue-300">
                      <div className="text-xs text-center p-2">Newton's<br/>Second Law</div>
                    </div>
                    <span className="text-xs font-medium">Current</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center mb-2 text-green-600">
                      <div className="text-xs text-center p-2">Newton's<br/>First Law</div>
                    </div>
                    <span className="text-xs font-medium">Mastered</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-yellow-50 dark:bg-yellow-900/20 flex items-center justify-center mb-2 text-yellow-600">
                      <div className="text-xs text-center p-2">Force<br/>Vectors</div>
                    </div>
                    <span className="text-xs font-medium">Related</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center mb-2 text-purple-600">
                      <div className="text-xs text-center p-2">Momentum</div>
                    </div>
                    <span className="text-xs font-medium">Dependent</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-gray-50 dark:bg-gray-900/20 flex items-center justify-center mb-2 text-gray-600">
                      <div className="text-xs text-center p-1">Circular<br/>Motion</div>
                    </div>
                    <span className="text-xs font-medium">Advanced</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VideoTabContent;
