
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Eye, 
  FlaskConical, 
  Video, 
  AlertTriangle,
  Brain,
  BarChart3,
  Clock,
  MessageSquare,
  Pen,
  Box,
  PlayCircle,
  Star,
  Bookmark,
  ArrowLeft,
  Sparkles,
  Target,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Info,
  Calculator,
  RotateCw,
  Download,
  ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';

// Mock data for concept
const mockConcept = {
  id: 'newtons-laws',
  title: "Newton's Laws of Motion",
  subject: 'Physics',
  topic: 'Mechanics',
  description: 'The three fundamental laws that form the foundation of classical mechanics.',
  difficulty: 'medium' as const,
  progress: 45,
  completed: false,
  isBookmarked: false,
  relatedConcepts: ['Force', 'Acceleration', 'Momentum']
};

const ConceptDetailPage: React.FC = () => {
  const { conceptId } = useParams();
  const [activeTab, setActiveTab] = useState('learn');
  const [activeSecondaryTab, setActiveSecondaryTab] = useState('notes');
  const [isBookmarked, setIsBookmarked] = useState(mockConcept.isBookmarked);
  const [isReadingAloud, setIsReadingAloud] = useState(false);

  const handleBookmarkToggle = () => {
    setIsBookmarked(prev => !prev);
  };

  const handleReadAloud = () => {
    setIsReadingAloud(prev => !prev);
    
    if (!isReadingAloud) {
      const speech = new SpeechSynthesisUtterance();
      speech.text = "Newton's Laws of Motion are three fundamental principles that explain how objects move and interact with forces.";
      speech.rate = 1;
      speech.pitch = 1;
      window.speechSynthesis.speak(speech);
    } else {
      window.speechSynthesis.cancel();
    }
  };

  const difficultyColors = {
    easy: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    hard: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Back Button */}
      <Button variant="ghost" className="mb-4" onClick={() => window.history.back()}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Concepts
      </Button>
      
      {/* Concept Header/Masthead */}
      <motion.div 
        className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-lg border p-6 shadow-sm"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300">
                {mockConcept.subject}
              </Badge>
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300">
                {mockConcept.topic}
              </Badge>
              <Badge variant="outline" className={difficultyColors[mockConcept.difficulty]}>
                {mockConcept.difficulty.charAt(0).toUpperCase() + mockConcept.difficulty.slice(1)}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">
              {mockConcept.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {mockConcept.description}
            </p>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleBookmarkToggle}
            className="shrink-0"
          >
            {isBookmarked ? (
              <Bookmark className="h-5 w-5 fill-amber-500 text-amber-500" />
            ) : (
              <Bookmark className="h-5 w-5" />
            )}
          </Button>
        </div>
      </motion.div>
      
      {/* Mastery & Recall Tracker */}
      <Card className="border-indigo-200 dark:border-indigo-800">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-600" />
                Concept Mastery
              </h3>
              <div className="flex items-center gap-2">
                <Progress value={45} className="h-2 flex-1" />
                <span className="text-sm font-medium">45%</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <Brain className="h-4 w-4 text-purple-600" />
                Recall Accuracy
              </h3>
              <div className="flex items-center gap-2">
                <Progress value={72} className="h-2 flex-1" />
                <span className="text-sm font-medium">72%</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleReadAloud}
                className={isReadingAloud ? "bg-purple-100 border-purple-300" : ""}
              >
                <PlayCircle className={`h-4 w-4 mr-2 ${isReadingAloud ? "text-purple-600" : ""}`} />
                {isReadingAloud ? "Stop Reading" : "Read Aloud"}
              </Button>
            </div>
            
            <div className="flex flex-col gap-2">
              <Button variant="outline" size="sm">
                <Clock className="h-4 w-4 mr-2" />
                Track Study Time
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* AI Insights */}
      <Card className="border-indigo-200 dark:border-indigo-800">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="h-5 w-5 text-indigo-600" />
            <span>AI Insights for {mockConcept.title}</span>
            <Badge variant="outline" className="ml-auto bg-indigo-50 text-indigo-700 border-indigo-200">
              Personalized
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="border border-blue-100 rounded-lg p-4 bg-blue-50">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium mb-1">Understanding Gap</h4>
                  <p className="text-slate-700">
                    You're struggling with the application of Newton's Third Law in real-world scenarios.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border border-emerald-100 rounded-lg p-4 bg-emerald-50">
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium mb-1">Learning Focus</h4>
                  <p className="text-slate-700">
                    Use visual diagrams to reinforce understanding of force pairs.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border border-purple-100 rounded-lg p-4 bg-purple-50">
              <div className="flex items-start gap-3">
                <ArrowRight className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium mb-1">Next Step</h4>
                  <p className="text-slate-700">
                    Proceed to Momentum Conservation principles after mastering this.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Primary Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 mb-4">
          <TabsTrigger value="learn" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Learn</span>
          </TabsTrigger>
          
          <TabsTrigger value="visual" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">Visual</span>
          </TabsTrigger>
          
          <TabsTrigger value="3d" className="flex items-center gap-2">
            <Box className="h-4 w-4" />
            <span className="hidden sm:inline">3D</span>
          </TabsTrigger>
          
          <TabsTrigger value="formula" className="flex items-center gap-2">
            <FlaskConical className="h-4 w-4" />
            <span className="hidden sm:inline">Formula</span>
          </TabsTrigger>
          
          <TabsTrigger value="video" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            <span className="hidden sm:inline">Video</span>
          </TabsTrigger>
          
          <TabsTrigger value="mistakes" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span className="hidden sm:inline">Mistakes</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Learn Tab Content */}
        <TabsContent value="learn">
          <Card>
            <CardHeader>
              <CardTitle>Understanding Newton's Laws of Motion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-700 mb-2">First Law (Law of Inertia)</h4>
                  <p className="text-blue-600">
                    An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction unless acted upon by an unbalanced force.
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-700 mb-2">Second Law (F=ma)</h4>
                  <p className="text-green-600">
                    The force acting on an object is equal to the mass of the object times its acceleration.
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-medium text-purple-700 mb-2">Third Law (Action-Reaction)</h4>
                  <p className="text-purple-600">
                    For every action, there is an equal and opposite reaction.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Visual Tab Content */}
        <TabsContent value="visual">
          <Card>
            <CardHeader>
              <CardTitle>Visual Representation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-100 dark:bg-slate-900 rounded-lg aspect-video flex items-center justify-center">
                <p className="text-slate-500 dark:text-slate-400">Interactive diagrams and visualizations would be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* 3D Tab Content */}
        <TabsContent value="3d">
          <Card>
            <CardHeader>
              <CardTitle>3D Models & Simulations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-100 dark:bg-slate-900 rounded-lg aspect-video flex items-center justify-center">
                <p className="text-slate-500 dark:text-slate-400">Interactive 3D simulations would be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Formula Tab Content */}
        <TabsContent value="formula">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FlaskConical className="h-5 w-5 text-indigo-600" />
                Interactive Formula Lab
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Mass (kg)</label>
                      <input 
                        type="number" 
                        placeholder="Enter mass"
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Acceleration (m/s²)</label>
                      <input 
                        type="number" 
                        placeholder="Enter acceleration"
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                    
                    <Button className="w-full">
                      <Calculator className="h-4 w-4 mr-2" />
                      Calculate Force
                    </Button>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="text-center">
                      <h3 className="text-lg font-medium mb-2">Formula</h3>
                      <div className="bg-indigo-50 p-6 rounded-lg">
                        <p className="text-3xl font-bold text-indigo-600">F = m × a</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Video Tab Content */}
        <TabsContent value="video">
          <Card>
            <CardHeader>
              <CardTitle>Video Tutorials</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-100 dark:bg-slate-900 rounded-lg aspect-video flex items-center justify-center">
                <p className="text-slate-500 dark:text-slate-400">Video tutorials would be embedded here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Common Mistakes Tab Content */}
        <TabsContent value="mistakes">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Common Mistakes with {mockConcept.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="mb-6 bg-amber-50 border border-amber-100 rounded-lg p-4">
                  <div className="flex gap-3">
                    <Info className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                    <p className="text-sm">
                      <span className="font-medium">Mistake Prevention:</span> Understanding these common errors will help you avoid them in exams.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      <h4 className="font-medium">Confusing Mass and Weight</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Many students mix up mass (intrinsic property) and weight (force due to gravity).</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                          <h5 className="font-medium text-green-700">Correct</h5>
                        </div>
                        <p className="text-sm text-green-600">Mass is measured in kg and doesn't change with location.</p>
                      </div>
                      
                      <div className="bg-red-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <XCircle className="h-5 w-5 text-red-600" />
                          <h5 className="font-medium text-red-700">Incorrect</h5>
                        </div>
                        <p className="text-sm text-red-600">Using mass and weight interchangeably in calculations.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      <h4 className="font-medium">Misapplying Newton's Third Law</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Students often forget that action-reaction pairs act on different objects.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                          <h5 className="font-medium text-green-700">Correct</h5>
                        </div>
                        <p className="text-sm text-green-600">Forces act on different objects and cannot cancel each other.</p>
                      </div>
                      
                      <div className="bg-red-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <XCircle className="h-5 w-5 text-red-600" />
                          <h5 className="font-medium text-red-700">Incorrect</h5>
                        </div>
                        <p className="text-sm text-red-600">Assuming action-reaction forces cancel out on the same object.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Secondary Tabs */}
      <Tabs value={activeSecondaryTab} onValueChange={setActiveSecondaryTab} className="w-full mt-6">
        <TabsList className="grid w-full grid-cols-5 mb-4">
          <TabsTrigger value="recall" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            <span className="hidden sm:inline">Recall</span>
          </TabsTrigger>
          
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Analytics</span>
          </TabsTrigger>
          
          <TabsTrigger value="revision" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">Revision</span>
          </TabsTrigger>
          
          <TabsTrigger value="notes" className="flex items-center gap-2">
            <Pen className="h-4 w-4" />
            <span className="hidden sm:inline">Notes</span>
          </TabsTrigger>
          
          <TabsTrigger value="discuss" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Discuss</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Recall Tab Content */}
        <TabsContent value="recall">
          <Card>
            <CardHeader>
              <CardTitle>Quick Recall Exercises</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">What are Newton's Three Laws?</h4>
                  <p className="text-sm text-gray-600 mb-3">Test your understanding of the fundamental principles.</p>
                  <Button size="sm">Show Answer</Button>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">If F = ma, what happens to acceleration when mass increases?</h4>
                  <p className="text-sm text-gray-600 mb-3">Analyze the relationship between variables.</p>
                  <Button size="sm">Show Answer</Button>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Give an example of Newton's Third Law in daily life</h4>
                  <p className="text-sm text-gray-600 mb-3">Apply the concept to real-world scenarios.</p>
                  <Button size="sm">Show Answer</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Analytics Tab Content */}
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">85%</div>
                    <p className="text-sm text-gray-600">Quiz Performance</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">12</div>
                    <p className="text-sm text-gray-600">Study Sessions</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">3.2h</div>
                    <p className="text-sm text-gray-600">Total Study Time</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Learning Progress</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Understanding Level</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Revision Tab Content */}
        <TabsContent value="revision">
          <Card>
            <CardHeader>
              <CardTitle>Revision Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-amber-50 border-amber-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-amber-800">Next revision due</h4>
                      <p className="text-sm text-amber-600">May 25, 2025</p>
                    </div>
                    <Button size="sm" variant="outline" className="border-amber-300 text-amber-700">
                      Mark as Revised
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-3">Revision History</h4>
                  <div className="text-sm space-y-1">
                    <p><span className="font-medium">First studied:</span> May 10, 2025</p>
                    <p><span className="font-medium">Last revised:</span> May 18, 2025</p>
                    <p><span className="font-medium">Revision count:</span> 3 times</p>
                    <p><span className="font-medium">Retention rate:</span> 87%</p>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Spaced Repetition Schedule</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Next review: 1 day</span>
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Next review: 3 days</span>
                      <Clock className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Next review: 1 week</span>
                      <Clock className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notes Tab Content */}
        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <CardTitle>Your Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <textarea 
                    className="w-full h-40 p-3 border rounded-lg resize-none"
                    placeholder="Add your notes about Newton's Laws of Motion here..."
                    defaultValue="Newton's First Law is about inertia - objects resist changes in motion.

Key points to remember:
- An object at rest stays at rest
- An object in motion stays in motion
- Unless acted upon by a force

Examples:
- Ball rolling on a smooth surface
- Passengers in a braking car"
                  ></textarea>
                </div>
                
                <div className="flex gap-2">
                  <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Save Notes
                  </Button>
                  <Button variant="outline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Export as PDF
                  </Button>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Recent Notes</h4>
                  <div className="space-y-2">
                    <div className="p-2 bg-gray-50 rounded text-sm">
                      <p className="font-medium">Force and acceleration relationship</p>
                      <p className="text-gray-600">Added 2 days ago</p>
                    </div>
                    <div className="p-2 bg-gray-50 rounded text-sm">
                      <p className="font-medium">Real-world examples of inertia</p>
                      <p className="text-gray-600">Added 5 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Discuss Tab Content */}
        <TabsContent value="discuss">
          <Card>
            <CardHeader>
              <CardTitle>Discussion Forum</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">JS</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">John Student</span>
                        <span className="text-xs text-gray-500">2 hours ago</span>
                      </div>
                      <p className="text-sm mb-2">Can someone explain why a book on a table doesn't fall through? Is it related to Newton's laws?</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Reply</Button>
                        <Button size="sm" variant="ghost">Like (3)</Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-green-600">AS</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">Alice Science</span>
                        <span className="text-xs text-gray-500">1 day ago</span>
                      </div>
                      <p className="text-sm mb-2">What's the difference between mass and weight? I keep getting confused in problems.</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Reply</Button>
                        <Button size="sm" variant="ghost">Like (7)</Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Ask a Question</h4>
                  <textarea 
                    className="w-full h-20 p-3 border rounded-lg resize-none"
                    placeholder="Ask your question about Newton's Laws..."
                  ></textarea>
                  <Button className="mt-2">Post Question</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConceptDetailPage;
