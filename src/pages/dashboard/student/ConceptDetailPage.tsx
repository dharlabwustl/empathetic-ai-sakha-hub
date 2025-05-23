
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Eye, 
  Cube, 
  Calculator, 
  Play, 
  AlertTriangle, 
  Brain, 
  BarChart3, 
  RotateCw, 
  StickyNote, 
  MessageCircle, 
  Link2,
  Bookmark,
  Volume2,
  VolumeX,
  Star,
  Clock,
  Target,
  TrendingUp,
  Pause,
  ExternalLink,
  Lightbulb,
  Zap,
  Award
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import AIInsights from '@/components/dashboard/student/concepts/AIInsights';
import Visual3DContent from '@/components/dashboard/student/concepts/Visual3DContent';
import FormulaTabContent from '@/components/dashboard/student/concepts/concept-detail/FormulaTabContent';
import QuickRecallSection from '@/components/dashboard/student/concepts/concept-detail/QuickRecallSection';

const ConceptDetailPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [activeTab, setActiveTab] = useState('learn');
  const [activeSecondaryTab, setActiveSecondaryTab] = useState('recall');
  const [masteryLevel, setMasteryLevel] = useState(72);
  const [recallStrength, setRecallStrength] = useState(68);
  const [studyTime, setStudyTime] = useState(45);
  
  // Mock concept data - in real app, this would come from API
  const concept = {
    id: conceptId || '1',
    title: "Newton's Laws of Motion",
    subject: "Physics",
    topic: "Mechanics", 
    difficulty: "Intermediate",
    description: "Fundamental principles that describe the relationship between forces acting on a body and its motion, forming the foundation of classical mechanics.",
    estimatedTime: "25 min read",
    lastStudied: "2 days ago",
    nextReview: "Tomorrow"
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: `${concept.title} has been ${isBookmarked ? 'removed from' : 'added to'} your bookmarks.`
    });
  };

  const handleReadAloud = () => {
    setIsReadingAloud(!isReadingAloud);
    if (!isReadingAloud) {
      // In a real app, this would use text-to-speech API
      toast({
        title: "Reading aloud started",
        description: "The concept content is now being read aloud."
      });
    }
  };

  const handleFormulaLab = () => {
    window.open(`/dashboard/student/concepts/${conceptId}/formula-lab`, '_blank');
  };

  const handleQuizComplete = (score: number) => {
    const improvement = Math.min(score / 10, 5); // Max 5 point improvement
    const newMastery = Math.min(masteryLevel + improvement, 100);
    setMasteryLevel(newMastery);
    
    toast({
      title: "Great job!",
      description: `Your mastery level increased by ${improvement.toFixed(1)} points!`
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50/30 dark:from-slate-900 dark:to-indigo-950/30">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Masthead */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                  {concept.subject}
                </Badge>
                <Badge variant="outline" className="border-purple-200 text-purple-700 dark:border-purple-800 dark:text-purple-300">
                  {concept.topic}
                </Badge>
                <Badge 
                  variant={concept.difficulty === 'Intermediate' ? 'default' : 'secondary'}
                  className={concept.difficulty === 'Intermediate' ? 'bg-amber-500 hover:bg-amber-600' : ''}
                >
                  {concept.difficulty}
                </Badge>
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-bold mb-3 bg-gradient-to-r from-slate-900 to-indigo-600 dark:from-slate-100 dark:to-indigo-400 bg-clip-text text-transparent">
                {concept.title}
              </h1>
              
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                {concept.description}
              </p>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {concept.estimatedTime}
                </span>
                <span className="flex items-center gap-1">
                  <RotateCw className="h-4 w-4" />
                  Last studied: {concept.lastStudied}
                </span>
                <span className="flex items-center gap-1">
                  <Target className="h-4 w-4" />
                  Next review: {concept.nextReview}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 ml-4">
              <Button
                variant={isBookmarked ? "default" : "outline"}
                size="sm"
                onClick={handleBookmark}
                className="gap-2"
              >
                <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
              </Button>
              
              <Button
                variant={isReadingAloud ? "default" : "outline"}
                size="sm"
                onClick={handleReadAloud}
                className="gap-2"
              >
                {isReadingAloud ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                {isReadingAloud ? 'Stop' : 'Read Aloud'}
              </Button>
            </div>
          </div>
        </div>

        {/* Mastery & Recall Tracker */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-green-700 dark:text-green-300">Mastery Level</span>
                <Award className="h-4 w-4 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-green-800 dark:text-green-200 mb-1">{masteryLevel}%</div>
              <Progress value={masteryLevel} className="h-2" />
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Recall Strength</span>
                <Brain className="h-4 w-4 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-1">{recallStrength}%</div>
              <Progress value={recallStrength} className="h-2" />
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-950/50 dark:to-violet-950/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Study Time</span>
                <Clock className="h-4 w-4 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-purple-800 dark:text-purple-200">{studyTime}min</div>
              <div className="text-xs text-purple-600 dark:text-purple-400">This session</div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-amber-500 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/50 dark:to-orange-950/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-amber-700 dark:text-amber-300">Next Review</span>
                <TrendingUp className="h-4 w-4 text-amber-600" />
              </div>
              <div className="text-lg font-bold text-amber-800 dark:text-amber-200">Tomorrow</div>
              <div className="text-xs text-amber-600 dark:text-amber-400">Optimal timing</div>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights */}
        <div className="mb-8">
          <AIInsights />
        </div>

        {/* Main Content Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-6 mb-6 bg-white dark:bg-slate-800 p-1 rounded-lg shadow-sm">
                <TabsTrigger value="learn" className="gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                  <BookOpen className="h-4 w-4" />
                  Learn
                </TabsTrigger>
                <TabsTrigger value="visual" className="gap-2 data-[state=active]:bg-green-500 data-[state=active]:text-white">
                  <Eye className="h-4 w-4" />
                  Visual
                </TabsTrigger>
                <TabsTrigger value="3d" className="gap-2 data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                  <Cube className="h-4 w-4" />
                  3D Sim
                </TabsTrigger>
                <TabsTrigger value="formula" className="gap-2 data-[state=active]:bg-indigo-500 data-[state=active]:text-white">
                  <Calculator className="h-4 w-4" />
                  Formula
                </TabsTrigger>
                <TabsTrigger value="video" className="gap-2 data-[state=active]:bg-red-500 data-[state=active]:text-white">
                  <Play className="h-4 w-4" />
                  Video
                </TabsTrigger>
                <TabsTrigger value="mistakes" className="gap-2 data-[state=active]:bg-amber-500 data-[state=active]:text-white">
                  <AlertTriangle className="h-4 w-4" />
                  Mistakes
                </TabsTrigger>
              </TabsList>

              <TabsContent value="learn" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                      Understanding Newton's Laws of Motion
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="prose dark:prose-invert max-w-none">
                    <h3>Newton's First Law (Law of Inertia)</h3>
                    <p>An object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.</p>
                    
                    <h3>Newton's Second Law</h3>
                    <p>The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. This is expressed as F = ma.</p>
                    
                    <h3>Newton's Third Law</h3>
                    <p>For every action, there is an equal and opposite reaction.</p>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 mt-6">
                      <h4 className="flex items-center gap-2 text-blue-800 dark:text-blue-300 mb-2">
                        <Lightbulb className="h-5 w-5" />
                        Key Insight
                      </h4>
                      <p className="text-blue-700 dark:text-blue-300">These laws form the foundation of classical mechanics and explain how forces affect motion in our everyday world.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="visual">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5 text-green-600" />
                      Visual Learning Experience
                    </CardTitle>
                    <CardDescription>
                      Interactive diagrams and visual explanations to help you understand Newton's Laws
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Visual3DContent conceptName={concept.title} />
                    
                    <div className="mt-6 space-y-4">
                      <h3 className="text-lg font-semibold">Visual Explanations</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">First Law Visualization</h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            Imagine a hockey puck sliding on ice. Without friction, it would continue moving forever.
                          </p>
                          <div className="aspect-video bg-white dark:bg-slate-800 rounded border-2 border-dashed border-blue-300 flex items-center justify-center">
                            <div className="text-center">
                              <div className="w-8 h-8 bg-blue-500 rounded-full mx-auto mb-2"></div>
                              <p className="text-sm">Hockey Puck Demo</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Second Law in Action</h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            The same force applied to different masses produces different accelerations.
                          </p>
                          <div className="aspect-video bg-white dark:bg-slate-800 rounded border-2 border-dashed border-green-300 flex items-center justify-center">
                            <div className="text-center">
                              <div className="flex gap-2 mb-2">
                                <div className="w-4 h-4 bg-green-500 rounded"></div>
                                <div className="w-8 h-8 bg-green-600 rounded"></div>
                              </div>
                              <p className="text-sm">Mass vs Acceleration</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="3d">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Cube className="h-5 w-5 text-purple-600" />
                      3D Interactive Simulation
                    </CardTitle>
                    <CardDescription>
                      Explore Newton's Laws through immersive 3D simulations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <Button variant="outline" className="p-4 h-auto flex flex-col gap-2">
                          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                            <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                          </div>
                          <span className="font-medium">Collision Lab</span>
                          <span className="text-xs text-muted-foreground">Explore momentum conservation</span>
                        </Button>
                        
                        <Button variant="outline" className="p-4 h-auto flex flex-col gap-2">
                          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                            <div className="w-6 h-6 bg-green-500 rounded-sm"></div>
                          </div>
                          <span className="font-medium">Force Vectors</span>
                          <span className="text-xs text-muted-foreground">Visualize force components</span>
                        </Button>
                        
                        <Button variant="outline" className="p-4 h-auto flex flex-col gap-2">
                          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                            <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
                          </div>
                          <span className="font-medium">Orbital Motion</span>
                          <span className="text-xs text-muted-foreground">See gravitational forces</span>
                        </Button>
                      </div>
                      
                      <div className="aspect-video bg-gradient-to-br from-slate-900 to-indigo-900 rounded-lg flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"></div>
                        <div className="relative z-10 text-center text-white">
                          <Cube className="h-16 w-16 mx-auto mb-4 animate-spin" />
                          <h3 className="text-xl font-bold mb-2">3D Physics Simulation</h3>
                          <p className="mb-4">Interactive environment to explore Newton's Laws</p>
                          <Button className="bg-white text-slate-900 hover:bg-slate-100">
                            <Play className="h-4 w-4 mr-2" />
                            Launch Simulation
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Simulation Controls</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Mass:</span>
                              <span className="font-mono">5.0 kg</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Force:</span>
                              <span className="font-mono">20.0 N</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Acceleration:</span>
                              <span className="font-mono">4.0 m/s²</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Real-time Feedback</h4>
                          <div className="space-y-2 text-sm text-muted-foreground">
                            <p>• Adjust mass and force to see acceleration change</p>
                            <p>• Observe how objects interact in collisions</p>
                            <p>• Experiment with different scenarios</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="formula">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="h-5 w-5 text-indigo-600" />
                      Formula Practice Lab
                    </CardTitle>
                    <CardDescription>
                      Practice and master the mathematical relationships in Newton's Laws
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FormulaTabContent 
                      conceptId={conceptId || '1'}
                      conceptTitle={concept.title}
                      handleOpenFormulaLab={handleFormulaLab}
                    />
                    
                    <div className="mt-6 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/50 dark:to-blue-950/50 p-6 rounded-lg border border-indigo-200 dark:border-indigo-800">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-indigo-800 dark:text-indigo-300 mb-2">
                            Interactive Formula Lab
                          </h3>
                          <p className="text-indigo-600 dark:text-indigo-400 mb-4">
                            Practice with real calculations and see instant results for {concept.title}
                          </p>
                        </div>
                        <Button 
                          onClick={handleFormulaLab}
                          className="bg-indigo-600 hover:bg-indigo-700 gap-2"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Open Formula Lab
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="video">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Play className="h-5 w-5 text-red-600" />
                      Video Tutorials
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Play className="h-12 w-12 mx-auto mb-2 text-red-500" />
                          <p className="font-medium">Newton's Laws Explained</p>
                          <p className="text-sm text-muted-foreground">15 min</p>
                        </div>
                      </div>
                      <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Play className="h-12 w-12 mx-auto mb-2 text-red-500" />
                          <p className="font-medium">Real-world Examples</p>
                          <p className="text-sm text-muted-foreground">12 min</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="mistakes">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                      Common Mistakes & Previous Year Questions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold mb-3">Common Mistakes to Avoid</h3>
                        <div className="space-y-3">
                          <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-lg border border-red-200 dark:border-red-800">
                            <p className="font-medium text-red-800 dark:text-red-300 mb-1">Confusing mass and weight</p>
                            <p className="text-sm text-red-600 dark:text-red-400">Remember: mass is measured in kg, weight is a force measured in Newtons</p>
                          </div>
                          <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-lg border border-red-200 dark:border-red-800">
                            <p className="font-medium text-red-800 dark:text-red-300 mb-1">Forgetting Newton's Third Law</p>
                            <p className="text-sm text-red-600 dark:text-red-400">Action-reaction pairs act on different objects, not the same object</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold mb-3">Previous Year Questions</h3>
                        <div className="space-y-3">
                          <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                            <p className="font-medium mb-2">JEE Main 2023: A 2kg object experiences a net force of 10N. Calculate its acceleration.</p>
                            <Button variant="outline" size="sm">View Solution</Button>
                          </div>
                          <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                            <p className="font-medium mb-2">NEET 2022: Explain how Newton's Third Law applies to walking.</p>
                            <Button variant="outline" size="sm">View Solution</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Secondary Management Tools Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="text-lg">Management Tools</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs value={activeSecondaryTab} onValueChange={setActiveSecondaryTab} orientation="vertical">
                  <TabsList className="flex flex-col h-auto w-full bg-transparent p-1">
                    <TabsTrigger value="recall" className="w-full justify-start gap-2 data-[state=active]:bg-blue-100 dark:data-[state=active]:bg-blue-900/30">
                      <Brain className="h-4 w-4" />
                      Recall
                    </TabsTrigger>
                    <TabsTrigger value="analytics" className="w-full justify-start gap-2 data-[state=active]:bg-green-100 dark:data-[state=active]:bg-green-900/30">
                      <BarChart3 className="h-4 w-4" />
                      Analytics
                    </TabsTrigger>
                    <TabsTrigger value="revision" className="w-full justify-start gap-2 data-[state=active]:bg-purple-100 dark:data-[state=active]:bg-purple-900/30">
                      <RotateCw className="h-4 w-4" />
                      Revision
                    </TabsTrigger>
                    <TabsTrigger value="notes" className="w-full justify-start gap-2 data-[state=active]:bg-yellow-100 dark:data-[state=active]:bg-yellow-900/30">
                      <StickyNote className="h-4 w-4" />
                      Notes
                    </TabsTrigger>
                    <TabsTrigger value="discuss" className="w-full justify-start gap-2 data-[state=active]:bg-pink-100 dark:data-[state=active]:bg-pink-900/30">
                      <MessageCircle className="h-4 w-4" />
                      Discuss
                    </TabsTrigger>
                    <TabsTrigger value="linked" className="w-full justify-start gap-2 data-[state=active]:bg-indigo-100 dark:data-[state=active]:bg-indigo-900/30">
                      <Link2 className="h-4 w-4" />
                      Linked
                    </TabsTrigger>
                  </TabsList>

                  <div className="p-4">
                    <TabsContent value="recall" className="mt-0">
                      <QuickRecallSection
                        conceptId={conceptId || '1'}
                        title={concept.title}
                        content="Newton's Laws of Motion"
                        onQuizComplete={handleQuizComplete}
                      />
                    </TabsContent>

                    <TabsContent value="analytics" className="mt-0">
                      <div className="space-y-4">
                        <h3 className="font-medium">Performance Analytics</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span>Time spent</span>
                            <span className="font-medium">2h 15m</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Questions attempted</span>
                            <span className="font-medium">24</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Accuracy</span>
                            <span className="font-medium text-green-600">87%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Weak areas</span>
                            <span className="font-medium text-red-600">Third Law</span>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="revision" className="mt-0">
                      <div className="space-y-4">
                        <h3 className="font-medium">Revision Schedule</h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>Today - Quick review</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>Tomorrow - Practice problems</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span>Next week - Comprehensive test</span>
                          </div>
                        </div>
                        <Button size="sm" className="w-full">
                          <Zap className="h-4 w-4 mr-2" />
                          Start Revision
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="notes" className="mt-0">
                      <div className="space-y-3">
                        <h3 className="font-medium">Your Notes</h3>
                        <div className="bg-yellow-50 dark:bg-yellow-950/30 p-3 rounded text-sm">
                          <p className="font-medium mb-1">Key Formula</p>
                          <p>F = ma is the core equation</p>
                        </div>
                        <Button size="sm" className="w-full">
                          <StickyNote className="h-4 w-4 mr-2" />
                          Add Note
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="discuss" className="mt-0">
                      <div className="space-y-3">
                        <h3 className="font-medium">AI Tutor & Community</h3>
                        <Button size="sm" className="w-full">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Ask AI Tutor
                        </Button>
                        <Button size="sm" variant="outline" className="w-full">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Join Discussion
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="linked" className="mt-0">
                      <div className="space-y-3">
                        <h3 className="font-medium">Related Content</h3>
                        <div className="space-y-2 text-sm">
                          <a href="#" className="block p-2 bg-slate-50 dark:bg-slate-800 rounded hover:bg-slate-100 dark:hover:bg-slate-700">
                            Force and Motion
                          </a>
                          <a href="#" className="block p-2 bg-slate-50 dark:bg-slate-800 rounded hover:bg-slate-100 dark:hover:bg-slate-700">
                            Energy Conservation
                          </a>
                          <a href="#" className="block p-2 bg-slate-50 dark:bg-slate-800 rounded hover:bg-slate-100 dark:hover:bg-slate-700">
                            Momentum
                          </a>
                        </div>
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptDetailPage;
