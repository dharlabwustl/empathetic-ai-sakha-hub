
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  BookOpen, 
  Eye, 
  Box, 
  Calculator, 
  Play, 
  AlertTriangle,
  Brain,
  BarChart3,
  RotateCcw,
  StickyNote,
  MessageCircle,
  Link2,
  Volume2,
  VolumeX,
  Sparkles,
  Target,
  CheckCircle,
  TrendingUp,
  Clock,
  Award,
  Lightbulb,
  ArrowRight,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import ConceptAnalytics from '@/components/dashboard/student/concepts/ConceptAnalytics';
import EnhancedLearningTabs from '@/components/dashboard/student/concepts/concept-detail/EnhancedLearningTabs';
import PersonalizedRecommendations from '@/components/dashboard/student/concepts/concept-detail/PersonalizedRecommendations';
import ReadAloudSection from '@/components/dashboard/student/concepts/concept-detail/ReadAloudSection';

const ConceptDetailPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [masteryLevel, setMasteryLevel] = useState(65);
  const [timeSpent, setTimeSpent] = useState(45);
  const [questionsAnswered, setQuestionsAnswered] = useState(23);
  const [accuracy, setAccuracy] = useState(78);
  const [activeReadAloud, setActiveReadAloud] = useState<string | null>(null);
  const [showCompletionButton, setShowCompletionButton] = useState(false);
  const [recallAnswer, setRecallAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [activeManagementTab, setActiveManagementTab] = useState('recall');

  // Mock concept data
  const conceptData = {
    id: conceptId,
    title: "Newton's Laws of Motion",
    subject: "Physics",
    topic: "Mechanics",
    difficulty: "Intermediate",
    description: "Fundamental principles governing the motion of objects and the forces acting upon them."
  };

  useEffect(() => {
    if (masteryLevel >= 80 && !showCompletionButton) {
      setShowCompletionButton(true);
      toast({
        title: "🎉 Mastery Achieved!",
        description: "You've reached 80% mastery. Ready to complete this concept?",
      });
    }
  }, [masteryLevel, showCompletionButton, toast]);

  const handleReadAloud = (content: string, sectionId: string) => {
    if (activeReadAloud === sectionId) {
      speechSynthesis.cancel();
      setActiveReadAloud(null);
      return;
    }

    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(content);
    utterance.rate = 0.9;
    utterance.onend = () => setActiveReadAloud(null);
    speechSynthesis.speak(utterance);
    setActiveReadAloud(sectionId);
  };

  const handleRecallSubmit = () => {
    if (!recallAnswer.trim()) return;
    
    // Simulate AI analysis
    const accuracy = Math.floor(Math.random() * 30) + 70; // 70-100%
    const newMastery = Math.min(masteryLevel + Math.floor(accuracy / 10), 100);
    setMasteryLevel(newMastery);
    
    toast({
      title: "Answer Analyzed!",
      description: `${accuracy}% accuracy. Your mastery increased to ${newMastery}%`,
    });
    
    setRecallAnswer('');
  };

  const handleVoiceRecording = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      
      if (isRecording) {
        recognition.stop();
        setIsRecording(false);
      } else {
        recognition.start();
        setIsRecording(true);
        
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setRecallAnswer(transcript);
          setIsRecording(false);
        };
        
        recognition.onerror = () => {
          setIsRecording(false);
          toast({
            title: "Voice recognition failed",
            description: "Please try again or use text input",
            variant: "destructive"
          });
        };
      }
    } else {
      toast({
        title: "Voice recognition not supported",
        description: "Please use text input instead",
        variant: "destructive"
      });
    }
  };

  const generateNewInsights = () => {
    toast({
      title: "Generating New Insights...",
      description: "Analyzing your learning behavior to create personalized recommendations",
    });
    
    // Simulate insight generation
    setTimeout(() => {
      toast({
        title: "New Insights Available!",
        description: "Check your personalized recommendations below",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard/student/concepts')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Concepts
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {conceptData.title}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary">{conceptData.subject}</Badge>
                <Badge variant="outline">{conceptData.topic}</Badge>
                <Badge className="bg-amber-100 text-amber-800">{conceptData.difficulty}</Badge>
              </div>
            </div>
          </div>
          
          <AnimatePresence>
            {showCompletionButton && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="relative"
              >
                <Button 
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 text-lg font-semibold rounded-xl shadow-lg"
                  onClick={() => {
                    toast({
                      title: "🎉 Concept Completed!",
                      description: "Great job! Moving to next concept...",
                    });
                  }}
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Complete Concept
                  <Sparkles className="h-4 w-4 ml-2" />
                </Button>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-pulse" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Analytics Section */}
        <ConceptAnalytics 
          masteryLevel={masteryLevel}
          timeSpent={timeSpent}
          questionsAnswered={questionsAnswered}
          accuracy={accuracy}
          conceptTitle={conceptData.title}
        />

        {/* Generate New Insights Button */}
        <div className="mb-6">
          <Card className="border-2 border-dashed border-purple-200 dark:border-purple-800 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                    <Lightbulb className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-purple-900 dark:text-purple-100">
                      AI Learning Insights
                    </h3>
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                      Get personalized insights based on your learning behavior
                    </p>
                  </div>
                </div>
                <Button 
                  onClick={generateNewInsights}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Generate New Insights
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Learning Tools - Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <EnhancedLearningTabs 
              conceptData={conceptData}
              activeReadAloud={activeReadAloud}
              onReadAloud={handleReadAloud}
            />
          </div>

          {/* Personalized Recommendations Sidebar */}
          <div className="lg:col-span-1">
            <PersonalizedRecommendations 
              conceptId={conceptId!}
              masteryLevel={masteryLevel}
            />
          </div>
        </div>

        {/* Management Tools Section */}
        <div className="mt-12">
          <Card className="border-2 border-indigo-100 dark:border-indigo-800">
            <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Study Management Tools
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs value={activeManagementTab} onValueChange={setActiveManagementTab}>
                <TabsList className="grid grid-cols-6 mb-6">
                  <TabsTrigger value="recall" className="flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    Recall
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Analytics
                  </TabsTrigger>
                  <TabsTrigger value="revision" className="flex items-center gap-2">
                    <RotateCcw className="h-4 w-4" />
                    Revision
                  </TabsTrigger>
                  <TabsTrigger value="notes" className="flex items-center gap-2">
                    <StickyNote className="h-4 w-4" />
                    Notes
                  </TabsTrigger>
                  <TabsTrigger value="discuss" className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Discuss
                  </TabsTrigger>
                  <TabsTrigger value="linked" className="flex items-center gap-2">
                    <Link2 className="h-4 w-4" />
                    Linked
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="recall" className="space-y-4">
                  <div className="bg-blue-50 dark:bg-blue-950/30 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Brain className="h-5 w-5 text-blue-600" />
                      Quick Recall Test
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Test your understanding by explaining the concept in your own words
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Explain Newton's Laws of Motion:
                        </label>
                        <textarea
                          value={recallAnswer}
                          onChange={(e) => setRecallAnswer(e.target.value)}
                          className="w-full p-3 border rounded-lg min-h-[120px] resize-none"
                          placeholder="Type your explanation here... or use voice input"
                        />
                      </div>
                      
                      <div className="flex gap-3">
                        <Button
                          onClick={handleVoiceRecording}
                          variant="outline"
                          className={`flex items-center gap-2 ${isRecording ? 'bg-red-100 border-red-300' : ''}`}
                        >
                          {isRecording ? (
                            <>
                              <VolumeX className="h-4 w-4 text-red-500" />
                              Stop Recording
                            </>
                          ) : (
                            <>
                              <Volume2 className="h-4 w-4" />
                              Voice Input
                            </>
                          )}
                        </Button>
                        
                        <Button 
                          onClick={handleRecallSubmit}
                          disabled={!recallAnswer.trim()}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Analyze Answer
                        </Button>
                      </div>
                      
                      <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Award className="h-5 w-5 text-green-600" />
                          <span className="font-medium">Current Mastery: {masteryLevel}%</span>
                        </div>
                        <Progress value={masteryLevel} className="h-2" />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="analytics" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-5 w-5 text-green-600" />
                          <span className="font-medium">Performance Trend</span>
                        </div>
                        <div className="text-2xl font-bold text-green-600">+15%</div>
                        <p className="text-sm text-gray-600">Improvement this week</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="h-5 w-5 text-blue-600" />
                          <span className="font-medium">Study Streak</span>
                        </div>
                        <div className="text-2xl font-bold text-blue-600">7 days</div>
                        <p className="text-sm text-gray-600">Keep it up!</p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="revision" className="space-y-4">
                  <div className="bg-orange-50 dark:bg-orange-950/30 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <RotateCcw className="h-5 w-5 text-orange-600" />
                      Smart Revision Schedule
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                        <span>Next review in 2 days</span>
                        <Badge className="bg-orange-100 text-orange-800">Due Soon</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                        <span>Quick review in 1 week</span>
                        <Badge variant="outline">Scheduled</Badge>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="notes" className="space-y-4">
                  <div className="bg-yellow-50 dark:bg-yellow-950/30 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <StickyNote className="h-5 w-5 text-yellow-600" />
                      Personal Notes
                    </h3>
                    <textarea
                      className="w-full p-3 border rounded-lg min-h-[120px] resize-none"
                      placeholder="Add your personal notes about this concept..."
                    />
                    <Button className="mt-3">Save Notes</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="discuss" className="space-y-4">
                  <div className="bg-green-50 dark:bg-green-950/30 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <MessageCircle className="h-5 w-5 text-green-600" />
                      AI Tutor & Community
                    </h3>
                    <div className="space-y-3">
                      <Button className="w-full justify-start">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Ask AI Tutor
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Join Study Group Discussion
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="linked" className="space-y-4">
                  <div className="bg-purple-50 dark:bg-purple-950/30 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Link2 className="h-5 w-5 text-purple-600" />
                      Related Concepts & Resources
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Button variant="outline" className="justify-start">
                        <ArrowRight className="h-4 w-4 mr-2" />
                        Forces and Motion
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <ArrowRight className="h-4 w-4 mr-2" />
                        Energy Conservation
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <ArrowRight className="h-4 w-4 mr-2" />
                        Momentum
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <ArrowRight className="h-4 w-4 mr-2" />
                        Circular Motion
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Read Aloud Section */}
        {activeReadAloud && (
          <div className="fixed bottom-4 right-4 z-50">
            <ReadAloudSection
              text="Reading content aloud..."
              isActive={true}
              onStop={() => {
                speechSynthesis.cancel();
                setActiveReadAloud(null);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ConceptDetailPage;
