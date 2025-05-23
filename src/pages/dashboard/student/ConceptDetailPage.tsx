
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Star, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause,
  BookOpen,
  Eye,
  Atom,
  Calculator,
  PlayCircle,
  AlertTriangle,
  Brain,
  BarChart3,
  Calendar,
  PenTool,
  MessageCircle,
  Link,
  Trophy,
  Target,
  Clock,
  TrendingUp,
  ExternalLink
} from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from '@/hooks/use-toast';
import ConceptHeader from '@/components/dashboard/student/concepts/concept-detail/ConceptHeader';
import QuickRecallSection from '@/components/dashboard/student/concepts/concept-detail/QuickRecallSection';
import RevisionSection from '@/components/dashboard/student/concepts/concept-detail/RevisionSection';
import Visual3DContent from '@/components/dashboard/student/concepts/Visual3DContent';
import FormulaTabContent from '@/components/dashboard/student/concepts/concept-detail/FormulaTabContent';

const ConceptDetailPage = () => {
  const { conceptId } = useParams();
  const { toast } = useToast();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [isFlagged, setIsFlagged] = useState(false);
  const [masteryLevel, setMasteryLevel] = useState(75);
  const [recallStrength, setRecallStrength] = useState(68);
  const [studyTime, setStudyTime] = useState(240); // minutes
  const [activeTab, setActiveTab] = useState('learn');

  // Mock concept data - in real app, this would come from API
  const conceptData = {
    id: conceptId || '1',
    title: "Newton's Laws of Motion",
    subject: "Physics",
    topic: "Mechanics",
    difficulty: 'medium' as const,
    description: "Fundamental laws that describe the relationship between forces and motion of objects.",
    nextReview: "Tomorrow at 10:00 AM"
  };

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: isBookmarked ? "Concept removed from your saved list" : "Concept saved to your bookmark list"
    });
  };

  const handleReadAloudToggle = () => {
    setIsReadingAloud(!isReadingAloud);
    if (!isReadingAloud) {
      toast({
        title: "Reading aloud started",
        description: "Content will be read to you"
      });
    }
  };

  const handleQuizComplete = (score: number) => {
    const improvement = Math.min(10, Math.floor(score / 10));
    setMasteryLevel(prev => Math.min(100, prev + improvement));
    setRecallStrength(prev => Math.min(100, prev + improvement));
    
    toast({
      title: "Great work!",
      description: `Your mastery improved by ${improvement}%`
    });
  };

  const handleFormulaLab = () => {
    window.open('https://preview--empathetic-ai-sakha-hub.lovable.app/dashboard/student/concepts/1/formula-lab', '_blank');
  };

  return (
    <SharedPageLayout
      title={conceptData.title}
      subtitle={`${conceptData.subject} • ${conceptData.topic}`}
      showBackButton={true}
      backButtonUrl="/dashboard/student/concepts"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Premium Header */}
        <ConceptHeader
          title={conceptData.title}
          subject={conceptData.subject}
          topic={conceptData.topic}
          difficulty={conceptData.difficulty}
          isBookmarked={isBookmarked}
          onBookmarkToggle={handleBookmarkToggle}
        />

        {/* Mastery & KPI Tracker */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Mastery Level</p>
                  <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{masteryLevel}%</p>
                </div>
                <Trophy className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <Progress value={masteryLevel} className="mt-2 h-2" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200 dark:border-green-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700 dark:text-green-300">Recall Strength</p>
                  <p className="text-2xl font-bold text-green-900 dark:text-green-100">{recallStrength}%</p>
                </div>
                <Target className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <Progress value={recallStrength} className="mt-2 h-2" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-950/30 dark:to-violet-950/30 border-purple-200 dark:border-purple-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Study Time</p>
                  <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">{Math.floor(studyTime / 60)}h {studyTime % 60}m</p>
                </div>
                <Clock className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-200 dark:border-amber-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-amber-700 dark:text-amber-300">Next Review</p>
                  <p className="text-sm font-bold text-amber-900 dark:text-amber-100">Tomorrow</p>
                  <p className="text-xs text-amber-600 dark:text-amber-400">10:00 AM</p>
                </div>
                <Calendar className="h-8 w-8 text-amber-600 dark:text-amber-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Read Aloud Controls */}
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            variant="outline"
            onClick={handleReadAloudToggle}
            className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border-gray-200 dark:border-gray-700"
          >
            {isReadingAloud ? (
              <>
                <Pause className="h-4 w-4" />
                Pause Reading
              </>
            ) : (
              <>
                <Volume2 className="h-4 w-4" />
                Read Aloud
              </>
            )}
          </Button>
        </motion.div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Primary Learning Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              {/* Learning Tool Tabs */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-1">
                <TabsList className="grid w-full grid-cols-6 bg-transparent">
                  <TabsTrigger value="learn" className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Learn
                  </TabsTrigger>
                  <TabsTrigger value="visual" className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Visual
                  </TabsTrigger>
                  <TabsTrigger value="3d" className="flex items-center gap-2">
                    <Atom className="h-4 w-4" />
                    3D Sim
                  </TabsTrigger>
                  <TabsTrigger value="formula" className="flex items-center gap-2">
                    <Calculator className="h-4 w-4" />
                    Formula
                  </TabsTrigger>
                  <TabsTrigger value="video" className="flex items-center gap-2">
                    <PlayCircle className="h-4 w-4" />
                    Video
                  </TabsTrigger>
                  <TabsTrigger value="mistakes" className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Mistakes
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Tab Content */}
              <TabsContent value="learn" className="space-y-6">
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                      Newton's Laws of Motion - Comprehensive Guide
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Key Insights</h3>
                      <div className="grid gap-4">
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
                          <h4 className="font-medium mb-2">First Law - Law of Inertia</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            An object at rest stays at rest, and an object in motion stays in motion at constant velocity, 
                            unless acted upon by an external force.
                          </p>
                        </div>
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
                          <h4 className="font-medium mb-2">Second Law - F = ma</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            The acceleration of an object is directly proportional to the net force acting on it 
                            and inversely proportional to its mass.
                          </p>
                        </div>
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
                          <h4 className="font-medium mb-2">Third Law - Action-Reaction</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            For every action, there is an equal and opposite reaction.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="visual">
                <Visual3DContent conceptName={conceptData.title} />
              </TabsContent>

              <TabsContent value="3d" className="space-y-6">
                <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Atom className="h-5 w-5 text-purple-600" />
                      Immersive 3D Physics Simulations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <h4 className="font-semibold mb-2">Collision Laboratory</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Experiment with elastic and inelastic collisions in a virtual environment.
                          </p>
                          <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg flex items-center justify-center mb-4">
                            <div className="text-center">
                              <Atom className="h-12 w-12 mx-auto mb-2 text-purple-500" />
                              <p className="text-purple-600 dark:text-purple-400 font-medium">Collision Lab</p>
                            </div>
                          </div>
                          <Button className="w-full" variant="outline">
                            <Play className="h-4 w-4 mr-2" />
                            Launch Simulation
                          </Button>
                        </CardContent>
                      </Card>

                      <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <h4 className="font-semibold mb-2">Force Vector Visualization</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Visualize force vectors and their components in real-time.
                          </p>
                          <div className="aspect-video bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg flex items-center justify-center mb-4">
                            <div className="text-center">
                              <TrendingUp className="h-12 w-12 mx-auto mb-2 text-blue-500" />
                              <p className="text-blue-600 dark:text-blue-400 font-medium">Vector Lab</p>
                            </div>
                          </div>
                          <Button className="w-full" variant="outline">
                            <Play className="h-4 w-4 mr-2" />
                            Launch Simulation
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="formula">
                <FormulaTabContent 
                  conceptId={conceptData.id}
                  conceptTitle={conceptData.title}
                  handleOpenFormulaLab={handleFormulaLab}
                />
              </TabsContent>

              <TabsContent value="video" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PlayCircle className="h-5 w-5 text-red-600" />
                      Video Tutorial Library
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((i) => (
                        <Card key={i} className="hover:shadow-lg transition-shadow">
                          <CardContent className="p-4">
                            <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg mb-3 flex items-center justify-center">
                              <PlayCircle className="h-12 w-12 text-gray-400" />
                            </div>
                            <h4 className="font-medium mb-1">Newton's Law {i}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Duration: 8:32</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="mistakes" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                      Common Mistakes & Previous Year Questions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <h4 className="font-medium text-red-800 dark:text-red-300 mb-2">Common Mistake #1</h4>
                        <p className="text-sm text-red-700 dark:text-red-400">
                          Confusing mass and weight when applying F = ma
                        </p>
                      </div>
                      <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                        <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-2">Previous Year Question (2023)</h4>
                        <p className="text-sm text-amber-700 dark:text-amber-400">
                          A 5kg object accelerates at 2 m/s². Calculate the net force acting on it.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Management Tools Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-sm font-medium">Management Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Tabs orientation="vertical" className="w-full">
                  <TabsList className="grid w-full grid-rows-6 h-auto">
                    <TabsTrigger value="recall" className="justify-start">
                      <Brain className="h-4 w-4 mr-2" />
                      Recall
                    </TabsTrigger>
                    <TabsTrigger value="analytics" className="justify-start">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Analytics
                    </TabsTrigger>
                    <TabsTrigger value="revision" className="justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      Revision
                    </TabsTrigger>
                    <TabsTrigger value="notes" className="justify-start">
                      <PenTool className="h-4 w-4 mr-2" />
                      Notes
                    </TabsTrigger>
                    <TabsTrigger value="discuss" className="justify-start">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Discuss
                    </TabsTrigger>
                    <TabsTrigger value="linked" className="justify-start">
                      <Link className="h-4 w-4 mr-2" />
                      Linked
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="recall" className="mt-4">
                    <QuickRecallSection
                      conceptId={conceptData.id}
                      title={conceptData.title}
                      content="Newton's Laws of Motion content"
                      onQuizComplete={handleQuizComplete}
                    />
                  </TabsContent>

                  <TabsContent value="analytics" className="mt-4">
                    <div className="space-y-3">
                      <h4 className="font-medium">Performance Tracking</h4>
                      <div className="space-y-2">
                        <div className="text-xs">Weak Areas</div>
                        <Badge variant="destructive" className="text-xs">Third Law Applications</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="text-xs">Improvement Trend</div>
                        <div className="text-green-600 text-sm">↗ +15% this week</div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="revision" className="mt-4">
                    <RevisionSection
                      conceptId={conceptData.id}
                      isFlagged={isFlagged}
                      onToggleFlag={() => setIsFlagged(!isFlagged)}
                    />
                  </TabsContent>

                  <TabsContent value="notes" className="mt-4">
                    <div className="space-y-3">
                      <h4 className="font-medium">Personal Notes</h4>
                      <textarea
                        className="w-full h-24 p-2 border rounded text-sm"
                        placeholder="Add your notes here..."
                      />
                      <Button size="sm" className="w-full">Save Notes</Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="discuss" className="mt-4">
                    <div className="space-y-3">
                      <h4 className="font-medium">AI Tutor & Community</h4>
                      <Button size="sm" className="w-full" variant="outline">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Ask AI Tutor
                      </Button>
                      <Button size="sm" className="w-full" variant="outline">
                        Join Discussion
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="linked" className="mt-4">
                    <div className="space-y-3">
                      <h4 className="font-medium">Related Resources</h4>
                      <div className="space-y-2">
                        <Button size="sm" variant="ghost" className="w-full justify-start text-xs">
                          Energy & Work
                        </Button>
                        <Button size="sm" variant="ghost" className="w-full justify-start text-xs">
                          Friction Forces
                        </Button>
                        <Button size="sm" variant="ghost" className="w-full justify-start text-xs">
                          Practice Exam #3
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default ConceptDetailPage;
