
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, Star, Volume2, VolumeX, Play, Pause, 
  BookOpen, Eye, Atom, Calculator, Video, AlertTriangle,
  Brain, BarChart, Clock, FileText, MessageCircle, Link,
  Trophy, Zap, Target, CheckCircle, Timer, Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Import components
import ConceptHeader from '@/components/dashboard/student/concepts/concept-detail/ConceptHeader';
import ReadAloudSection from '@/components/dashboard/student/concepts/concept-detail/ReadAloudSection';
import ConceptSidebar from '@/components/dashboard/student/concepts/concept-detail/ConceptSidebar';
import { AIInsights } from '@/components/dashboard/student/concepts/AIInsights';
import Visual3DContent from '@/components/dashboard/student/concepts/Visual3DContent';
import FormulaTabContent from '@/components/dashboard/student/concepts/FormulaTabContent';
import { ConceptNotesSection } from '@/components/dashboard/student/concepts/ConceptNotesSection';

interface ConceptData {
  id: string;
  title: string;
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  content: string;
  formulas: Array<{
    formula: string;
    variables: Array<{
      symbol: string;
      name: string;
      unit: string;
    }>;
  }>;
  relatedConcepts: Array<{
    id: string;
    title: string;
    masteryLevel: number;
  }>;
  masteryLevel: number;
  recallStrength: number;
  studyTime: number;
  nextReview: string;
  examReady: boolean;
}

const ConceptDetailPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [concept, setConcept] = useState<ConceptData | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [activeTab, setActiveTab] = useState('learn');
  const [activeMgmtTab, setActiveMgmtTab] = useState('recall');
  const [masteryScore, setMasteryScore] = useState(0);
  const [recallTestActive, setRecallTestActive] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [recallQuestions] = useState([
    "What is the relationship between force, mass, and acceleration?",
    "How does Newton's second law apply to real-world scenarios?",
    "What units are used for force, mass, and acceleration?"
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [testResults, setTestResults] = useState<Array<{question: string, answer: string, score: number}>>([]);

  // Mock concept data
  useEffect(() => {
    const mockConcept: ConceptData = {
      id: conceptId || '1',
      title: "Newton's Second Law of Motion",
      subject: "Physics",
      topic: "Mechanics",
      difficulty: 'medium',
      description: "Understanding the relationship between force, mass, and acceleration through F = ma",
      content: `Newton's second law of motion is one of the fundamental principles in physics that describes the relationship between the forces acting on a body and its motion. The law states that the acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.

This law can be mathematically expressed as F = ma, where:
- F represents the net force applied to the object (measured in Newtons)
- m represents the mass of the object (measured in kilograms)
- a represents the acceleration of the object (measured in meters per second squared)

Key insights:
1. Force and acceleration are directly proportional
2. Mass acts as resistance to acceleration
3. The direction of acceleration is the same as the direction of net force
4. This law applies to all objects in the universe

Real-world applications include understanding vehicle dynamics, rocket propulsion, and sports mechanics.`,
      formulas: [{
        formula: "F = ma",
        variables: [
          { symbol: "F", name: "Force", unit: "N" },
          { symbol: "m", name: "Mass", unit: "kg" },
          { symbol: "a", name: "Acceleration", unit: "m/s²" }
        ]
      }],
      relatedConcepts: [
        { id: '2', title: "Newton's First Law", masteryLevel: 85 },
        { id: '3', title: "Newton's Third Law", masteryLevel: 70 },
        { id: '4', title: "Momentum", masteryLevel: 60 }
      ],
      masteryLevel: 75,
      recallStrength: 85,
      studyTime: 45,
      nextReview: '2024-01-25',
      examReady: true
    };
    
    setConcept(mockConcept);
    setMasteryScore(mockConcept.masteryLevel);
  }, [conceptId]);

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Bookmark Removed" : "Bookmark Added",
      description: `${concept?.title} has been ${isBookmarked ? 'removed from' : 'added to'} your bookmarks.`,
    });
  };

  const handleReadAloud = () => {
    if (isReadingAloud) {
      speechSynthesis.cancel();
      setIsReadingAloud(false);
    } else {
      const text = getActiveTabContent();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.onend = () => setIsReadingAloud(false);
      speechSynthesis.speak(utterance);
      setIsReadingAloud(true);
    }
  };

  const getActiveTabContent = () => {
    if (!concept) return '';
    switch (activeTab) {
      case 'learn': return concept.content;
      case 'visual': return 'Visual representation of the concept with interactive diagrams and explanations.';
      case 'simulation': return '3D simulation content for immersive learning experience.';
      case 'formula': return 'Formula practice and interactive calculations.';
      case 'video': return 'Video tutorial content for visual learners.';
      case 'mistakes': return 'Common mistakes and previous year questions analysis.';
      default: return concept.content;
    }
  };

  const startRecallTest = () => {
    setRecallTestActive(true);
    setCurrentQuestionIndex(0);
    setUserAnswer('');
    setTestResults([]);
  };

  const submitRecallAnswer = () => {
    // Simulate AI evaluation
    const score = Math.floor(Math.random() * 40) + 60; // 60-100% score
    const newResult = {
      question: recallQuestions[currentQuestionIndex],
      answer: userAnswer,
      score: score
    };
    
    setTestResults([...testResults, newResult]);
    
    if (currentQuestionIndex < recallQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer('');
    } else {
      // Test completed
      const avgScore = testResults.concat(newResult).reduce((sum, result) => sum + result.score, 0) / recallQuestions.length;
      setMasteryScore(Math.min(100, masteryScore + Math.floor(avgScore / 10)));
      setRecallTestActive(false);
      toast({
        title: "Recall Test Completed!",
        description: `Average Score: ${Math.round(avgScore)}%. Mastery improved!`,
      });
    }
  };

  if (!concept) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Back Button */}
        <Button 
          variant="outline" 
          onClick={() => navigate('/dashboard/student/concepts')}
          className="mb-6 hover:scale-105 transition-transform"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Concepts
        </Button>

        {/* Concept Header */}
        <ConceptHeader
          title={concept.title}
          subject={concept.subject}
          topic={concept.topic}
          difficulty={concept.difficulty}
          isBookmarked={isBookmarked}
          onBookmarkToggle={handleBookmarkToggle}
        />

        {/* Mastery & Recall Tracker */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Mastery Level</p>
                  <p className="text-2xl font-bold">{masteryScore}%</p>
                </div>
                <Trophy className="h-8 w-8 text-green-200" />
              </div>
              <Progress value={masteryScore} className="mt-2 h-2 bg-green-400" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Recall Strength</p>
                  <p className="text-2xl font-bold">{concept.recallStrength}%</p>
                </div>
                <Brain className="h-8 w-8 text-blue-200" />
              </div>
              <Progress value={concept.recallStrength} className="mt-2 h-2 bg-blue-400" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-violet-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Study Time</p>
                  <p className="text-2xl font-bold">{concept.studyTime}m</p>
                </div>
                <Timer className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Next Review</p>
                  <p className="text-lg font-bold">{concept.nextReview}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-6"
        >
          <AIInsights conceptName={concept.title} />
        </motion.div>

        {/* Read Aloud Section */}
        <AnimatePresence>
          {isReadingAloud && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mb-6"
            >
              <ReadAloudSection
                text={getActiveTabContent()}
                isActive={isReadingAloud}
                onStop={() => setIsReadingAloud(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Learning Tools Tabs */}
            <Card className="mb-6">
              <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Learning Tools
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReadAloud}
                    className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                  >
                    {isReadingAloud ? (
                      <>
                        <Pause className="mr-2 h-4 w-4" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Volume2 className="mr-2 h-4 w-4" />
                        Read Aloud
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-6 bg-gray-100 dark:bg-gray-800">
                    <TabsTrigger value="learn" className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Learn
                    </TabsTrigger>
                    <TabsTrigger value="visual" className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Visual
                    </TabsTrigger>
                    <TabsTrigger value="simulation" className="flex items-center gap-2">
                      <Atom className="h-4 w-4" />
                      3D Sim
                    </TabsTrigger>
                    <TabsTrigger value="formula" className="flex items-center gap-2">
                      <Calculator className="h-4 w-4" />
                      Formula
                    </TabsTrigger>
                    <TabsTrigger value="video" className="flex items-center gap-2">
                      <Video className="h-4 w-4" />
                      Video
                    </TabsTrigger>
                    <TabsTrigger value="mistakes" className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Mistakes
                    </TabsTrigger>
                  </TabsList>

                  <div className="p-6">
                    <TabsContent value="learn" className="space-y-4">
                      <div className="prose dark:prose-invert max-w-none">
                        <h3 className="text-xl font-semibold mb-4">Understanding {concept.title}</h3>
                        <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border-l-4 border-blue-500 mb-4">
                          <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">Key Concept</h4>
                          <p className="text-blue-800 dark:text-blue-200">{concept.description}</p>
                        </div>
                        <div className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                          {concept.content}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="visual">
                      <Visual3DContent conceptName={concept.title} />
                    </TabsContent>

                    <TabsContent value="simulation">
                      <div className="space-y-6">
                        <div className="text-center">
                          <h3 className="text-xl font-semibold mb-4">3D Interactive Simulations</h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Explore physics concepts through immersive 3D simulations
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Card className="bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-purple-950/50 dark:to-indigo-950/50">
                            <CardContent className="p-6">
                              <h4 className="font-semibold mb-3 flex items-center">
                                <Atom className="h-5 w-5 mr-2 text-purple-600" />
                                Collision Lab
                              </h4>
                              <div className="aspect-video bg-gradient-to-br from-purple-200 to-blue-200 dark:from-purple-900/50 dark:to-blue-900/50 rounded-lg flex items-center justify-center mb-4">
                                <Button className="bg-purple-600 hover:bg-purple-700">
                                  <Play className="h-4 w-4 mr-2" />
                                  Launch Simulation
                                </Button>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Experiment with different masses and velocities to see F=ma in action
                              </p>
                            </CardContent>
                          </Card>

                          <Card className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/50 dark:to-emerald-950/50">
                            <CardContent className="p-6">
                              <h4 className="font-semibold mb-3 flex items-center">
                                <Target className="h-5 w-5 mr-2 text-green-600" />
                                Force Vectors
                              </h4>
                              <div className="aspect-video bg-gradient-to-br from-green-200 to-emerald-200 dark:from-green-900/50 dark:to-emerald-900/50 rounded-lg flex items-center justify-center mb-4">
                                <Button className="bg-green-600 hover:bg-green-700">
                                  <Play className="h-4 w-4 mr-2" />
                                  Launch Simulation
                                </Button>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Visualize force vectors and their resultant effects on motion
                              </p>
                            </CardContent>
                          </Card>

                          <Card className="bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-950/50 dark:to-red-950/50">
                            <CardContent className="p-6">
                              <h4 className="font-semibold mb-3 flex items-center">
                                <Zap className="h-5 w-5 mr-2 text-orange-600" />
                                Orbital Motion
                              </h4>
                              <div className="aspect-video bg-gradient-to-br from-orange-200 to-red-200 dark:from-orange-900/50 dark:to-red-900/50 rounded-lg flex items-center justify-center mb-4">
                                <Button className="bg-orange-600 hover:bg-orange-700">
                                  <Play className="h-4 w-4 mr-2" />
                                  Launch Simulation
                                </Button>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Explore how gravitational forces create orbital motion
                              </p>
                            </CardContent>
                          </Card>

                          <Card className="bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-950/50 dark:to-cyan-950/50">
                            <CardContent className="p-6">
                              <h4 className="font-semibold mb-3 flex items-center">
                                <Calculator className="h-5 w-5 mr-2 text-blue-600" />
                                Real-time Calculator
                              </h4>
                              <div className="aspect-video bg-gradient-to-br from-blue-200 to-cyan-200 dark:from-blue-900/50 dark:to-cyan-900/50 rounded-lg flex items-center justify-center mb-4">
                                <Button className="bg-blue-600 hover:bg-blue-700">
                                  <Calculator className="h-4 w-4 mr-2" />
                                  Open Calculator
                                </Button>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Calculate force, mass, and acceleration in real-time scenarios
                              </p>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="formula">
                      <div className="space-y-4">
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-lg">
                          <h3 className="text-lg font-semibold mb-2">Formula Practice Lab</h3>
                          <p className="text-indigo-100">Master the formulas through interactive practice</p>
                        </div>
                        
                        <Card className="border-2 border-indigo-200 dark:border-indigo-800">
                          <CardContent className="p-6">
                            <div className="text-center mb-4">
                              <h4 className="text-xl font-semibold mb-2">Interactive Formula Lab</h4>
                              <p className="text-gray-600 dark:text-gray-400">
                                Practice {concept.title} formulas with step-by-step guidance
                              </p>
                            </div>
                            
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-lg text-center">
                              <Calculator className="h-16 w-16 mx-auto mb-4 text-indigo-600" />
                              <h5 className="text-lg font-semibold mb-2">Ready to Practice?</h5>
                              <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Launch the dedicated Formula Lab for hands-on practice with real calculations
                              </p>
                              <Button 
                                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                                onClick={() => window.open('https://preview--empathetic-ai-sakha-hub.lovable.app/dashboard/student/concepts/1/formula-lab', '_blank')}
                              >
                                <Calculator className="h-4 w-4 mr-2" />
                                Open Formula Lab
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>

                    <TabsContent value="video">
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Video Tutorials</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            { title: "Introduction to Newton's Second Law", duration: "8:45", level: "Beginner" },
                            { title: "Real World Applications", duration: "12:30", level: "Intermediate" },
                            { title: "Problem Solving Techniques", duration: "15:20", level: "Advanced" },
                            { title: "Common Misconceptions", duration: "6:15", level: "All Levels" }
                          ].map((video, index) => (
                            <Card key={index} className="hover:shadow-lg transition-shadow">
                              <CardContent className="p-4">
                                <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg mb-3 flex items-center justify-center">
                                  <Play className="h-12 w-12 text-gray-500" />
                                </div>
                                <h4 className="font-semibold mb-1">{video.title}</h4>
                                <div className="flex justify-between text-sm text-gray-500">
                                  <span>{video.duration}</span>
                                  <Badge variant="outline">{video.level}</Badge>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="mistakes">
                      <div className="space-y-6">
                        <h3 className="text-xl font-semibold">Common Mistakes & Previous Year Questions</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Card className="border-l-4 border-red-500">
                            <CardHeader>
                              <CardTitle className="text-red-600 flex items-center">
                                <AlertTriangle className="h-5 w-5 mr-2" />
                                Common Mistakes
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              {[
                                "Confusing mass with weight",
                                "Not considering all forces acting on an object",
                                "Incorrect unit conversions",
                                "Mixing up cause and effect in F=ma"
                              ].map((mistake, index) => (
                                <div key={index} className="flex items-start space-x-3">
                                  <div className="w-6 h-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-red-600 text-sm font-semibold">{index + 1}</span>
                                  </div>
                                  <p className="text-gray-700 dark:text-gray-300">{mistake}</p>
                                </div>
                              ))}
                            </CardContent>
                          </Card>

                          <Card className="border-l-4 border-green-500">
                            <CardHeader>
                              <CardTitle className="text-green-600 flex items-center">
                                <CheckCircle className="h-5 w-5 mr-2" />
                                Previous Year Questions
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              {[
                                { year: "2023", difficulty: "Medium", topic: "Force calculation" },
                                { year: "2022", difficulty: "Hard", topic: "Multiple forces" },
                                { year: "2021", difficulty: "Easy", topic: "Basic F=ma" },
                                { year: "2020", difficulty: "Medium", topic: "Real-world application" }
                              ].map((question, index) => (
                                <div key={index} className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                  <div className="flex justify-between items-center">
                                    <span className="font-medium">{question.year} - {question.topic}</span>
                                    <Badge variant={question.difficulty === 'Easy' ? 'default' : question.difficulty === 'Medium' ? 'secondary' : 'destructive'}>
                                      {question.difficulty}
                                    </Badge>
                                  </div>
                                </div>
                              ))}
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>
              </CardContent>
            </Card>

            {/* Management Tools */}
            <Card>
              <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <Brain className="mr-2 h-5 w-5" />
                  Management Tools
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs value={activeMgmtTab} onValueChange={setActiveMgmtTab}>
                  <TabsList className="grid w-full grid-cols-6 bg-gray-100 dark:bg-gray-800">
                    <TabsTrigger value="recall">
                      <Brain className="h-4 w-4 mr-1" />
                      Recall
                    </TabsTrigger>
                    <TabsTrigger value="analytics">
                      <BarChart className="h-4 w-4 mr-1" />
                      Analytics
                    </TabsTrigger>
                    <TabsTrigger value="revision">
                      <Clock className="h-4 w-4 mr-1" />
                      Revision
                    </TabsTrigger>
                    <TabsTrigger value="notes">
                      <FileText className="h-4 w-4 mr-1" />
                      Notes
                    </TabsTrigger>
                    <TabsTrigger value="discuss">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Discuss
                    </TabsTrigger>
                    <TabsTrigger value="linked">
                      <Link className="h-4 w-4 mr-1" />
                      Linked
                    </TabsTrigger>
                  </TabsList>

                  <div className="p-6">
                    <TabsContent value="recall">
                      <div className="space-y-6">
                        <div className="text-center">
                          <h3 className="text-xl font-semibold mb-2">Quick Recall Test</h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            Test your understanding and improve your mastery score
                          </p>
                        </div>

                        {!recallTestActive ? (
                          <div className="text-center space-y-4">
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/30 dark:to-indigo-950/30 p-8 rounded-lg">
                              <Brain className="h-16 w-16 mx-auto mb-4 text-blue-600" />
                              <h4 className="text-lg font-semibold mb-2">Ready to Test Your Knowledge?</h4>
                              <p className="text-gray-600 dark:text-gray-400 mb-6">
                                Answer questions about what you've learned. The system will evaluate your understanding and update your mastery score.
                              </p>
                              <Button onClick={startRecallTest} className="bg-blue-600 hover:bg-blue-700">
                                <Brain className="h-4 w-4 mr-2" />
                                Start Recall Test
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium">Question {currentQuestionIndex + 1} of {recallQuestions.length}</span>
                                <Progress value={((currentQuestionIndex + 1) / recallQuestions.length) * 100} className="w-32" />
                              </div>
                              <h4 className="font-semibold mb-4">{recallQuestions[currentQuestionIndex]}</h4>
                              <textarea
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                placeholder="Explain what you understand about this concept..."
                                className="w-full p-3 border rounded-lg min-h-[120px] resize-none"
                              />
                              <div className="flex justify-end mt-4">
                                <Button 
                                  onClick={submitRecallAnswer}
                                  disabled={!userAnswer.trim()}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  {currentQuestionIndex < recallQuestions.length - 1 ? 'Next Question' : 'Complete Test'}
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}

                        {testResults.length > 0 && (
                          <div className="mt-6">
                            <h4 className="font-semibold mb-3">Test Results</h4>
                            <div className="space-y-2">
                              {testResults.map((result, index) => (
                                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                  <span className="text-sm">Question {index + 1}</span>
                                  <Badge variant={result.score >= 80 ? 'default' : result.score >= 60 ? 'secondary' : 'destructive'}>
                                    {result.score}%
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="analytics">
                      <div className="space-y-6">
                        <h3 className="text-xl font-semibold">Performance Analytics</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-sm">Study Progress</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>Understanding</span>
                                    <span>85%</span>
                                  </div>
                                  <Progress value={85} />
                                </div>
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>Application</span>
                                    <span>72%</span>
                                  </div>
                                  <Progress value={72} />
                                </div>
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>Problem Solving</span>
                                    <span>68%</span>
                                  </div>
                                  <Progress value={68} />
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle className="text-sm">Weak Areas</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                {['Unit conversions', 'Multiple force scenarios', 'Real-world applications'].map((area, index) => (
                                  <div key={index} className="flex items-center justify-between p-2 bg-red-50 dark:bg-red-950/30 rounded">
                                    <span className="text-sm">{area}</span>
                                    <Button variant="outline" size="sm">Practice</Button>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="revision">
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Smart Revision Schedule</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            { date: 'Today', status: 'Due', color: 'red' },
                            { date: 'Tomorrow', status: 'Scheduled', color: 'yellow' },
                            { date: 'Jan 28', status: 'Planned', color: 'green' },
                            { date: 'Feb 2', status: 'Planned', color: 'blue' }
                          ].map((item, index) => (
                            <div key={index} className={`p-4 border-l-4 border-${item.color}-500 bg-${item.color}-50 dark:bg-${item.color}-950/20 rounded-lg`}>
                              <div className="flex justify-between items-center">
                                <div>
                                  <h4 className="font-medium">{item.date}</h4>
                                  <p className="text-sm text-gray-600">{item.status}</p>
                                </div>
                                <Button variant="outline" size="sm">Review</Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="notes">
                      <ConceptNotesSection 
                        conceptId={concept.id} 
                        conceptTitle={concept.title}
                      />
                    </TabsContent>

                    <TabsContent value="discuss">
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold">AI Tutor & Community</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Card>
                            <CardHeader>
                              <CardTitle>Ask AI Tutor</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                <textarea 
                                  placeholder="Ask any question about this concept..."
                                  className="w-full p-3 border rounded-lg min-h-[100px]"
                                />
                                <Button className="w-full">Ask Question</Button>
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle>Community Discussion</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                {[
                                  { user: 'Alex', question: 'How to apply F=ma in circular motion?', replies: 3 },
                                  { user: 'Sarah', question: 'Real-world examples needed', replies: 7 },
                                  { user: 'Mike', question: 'Struggling with unit conversions', replies: 2 }
                                ].map((discussion, index) => (
                                  <div key={index} className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <p className="font-medium text-sm">{discussion.question}</p>
                                        <p className="text-xs text-gray-500">by {discussion.user}</p>
                                      </div>
                                      <Badge variant="secondary">{discussion.replies} replies</Badge>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="linked">
                      <div className="space-y-6">
                        <h3 className="text-xl font-semibold">Related Resources</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-sm">Related Concepts</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                {concept.relatedConcepts.map((related) => (
                                  <div key={related.id} className="flex justify-between items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded cursor-pointer">
                                    <span className="text-sm">{related.title}</span>
                                    <Progress value={related.masteryLevel} className="w-16 h-2" />
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle className="text-sm">Flashcards</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                {['F = ma Definition', 'Force Units', 'Mass vs Weight', 'Acceleration Concepts'].map((card, index) => (
                                  <div key={index} className="p-2 border rounded hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                                    <span className="text-sm">{card}</span>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle className="text-sm">Practice Exams</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                {['Newton\'s Laws Quiz', 'Force Calculations', 'Mixed Problems', 'Advanced Applications'].map((exam, index) => (
                                  <div key={index} className="p-2 border rounded hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                                    <span className="text-sm">{exam}</span>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              <ConceptSidebar
                masteryLevel={masteryScore}
                relatedConcepts={concept.relatedConcepts}
                examReady={concept.examReady}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptDetailPage;
