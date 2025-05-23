
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Star, 
  Volume2, 
  Brain, 
  Clock, 
  Target, 
  TrendingUp,
  BookOpen,
  Eye,
  Box,
  Calculator,
  Play,
  AlertTriangle,
  RotateCcw,
  BarChart3,
  Calendar,
  NotebookPen,
  MessageCircle,
  Link as LinkIcon
} from 'lucide-react';
import ConceptHeader from './concept-detail/ConceptHeader';
import ConceptSidebar from './concept-detail/ConceptSidebar';
import NoteSection from './concept-detail/NoteSection';
import ReadAloudSection from './concept-detail/ReadAloudSection';
import AIInsights from './AIInsights';
import AnalyticsSection from './AnalyticsSection';
import AIInsightsSection from './AIInsightsSection';
import CommonMistakesContent from './CommonMistakesContent';
import { useUserNotes } from '@/hooks/useUserNotes';

// Mock concept data
const mockConcept = {
  id: '1',
  title: "Newton's Laws of Motion",
  subject: 'Physics',
  topic: 'Mechanics',
  difficulty: 'medium' as const,
  description: 'Understanding the fundamental principles that govern motion and forces in classical mechanics.',
  content: `Newton's Laws of Motion are three fundamental principles that describe the relationship between forces acting on a body and its motion. 

**First Law (Law of Inertia)**: An object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.

**Second Law**: The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. F = ma

**Third Law**: For every action, there is an equal and opposite reaction.

These laws form the foundation of classical mechanics and are essential for understanding how objects move and interact in our everyday world.`,
  masteryLevel: 75,
  relatedConcepts: [
    { id: '2', title: 'Force and Acceleration', masteryLevel: 85 },
    { id: '3', title: 'Momentum Conservation', masteryLevel: 60 },
    { id: '4', title: 'Energy and Work', masteryLevel: 70 }
  ],
  examReady: false,
  bookmarked: false
};

const ConceptDetailPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const [activeTab, setActiveTab] = useState('learn');
  const [isBookmarked, setIsBookmarked] = useState(mockConcept.bookmarked);
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [userNotes, setUserNotes] = useState('');
  const { saveNote, getNoteForConcept } = useUserNotes();

  useEffect(() => {
    if (conceptId) {
      const savedNotes = getNoteForConcept(conceptId);
      setUserNotes(savedNotes);
    }
  }, [conceptId, getNoteForConcept]);

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleReadAloud = () => {
    if (isReadingAloud) {
      speechSynthesis.cancel();
      setIsReadingAloud(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(mockConcept.content);
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
      setIsReadingAloud(true);
      
      utterance.onend = () => setIsReadingAloud(false);
    }
  };

  const handleSaveNotes = () => {
    if (conceptId) {
      const success = saveNote(conceptId, userNotes);
      if (success) {
        console.log('Notes saved successfully');
      }
    }
  };

  // Mastery KPIs
  const masteryKpis = [
    {
      title: 'Mastery Level',
      value: mockConcept.masteryLevel,
      unit: '%',
      icon: Brain,
      color: 'text-blue-600'
    },
    {
      title: 'Recall Strength',
      value: 68,
      unit: '%',
      icon: Target,
      color: 'text-green-600'
    },
    {
      title: 'Study Time',
      value: 45,
      unit: 'min',
      icon: Clock,
      color: 'text-amber-600'
    },
    {
      title: 'Next Review',
      value: 2,
      unit: 'days',
      icon: Calendar,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Masthead */}
        <ConceptHeader
          title={mockConcept.title}
          subject={mockConcept.subject}
          topic={mockConcept.topic}
          difficulty={mockConcept.difficulty}
          isBookmarked={isBookmarked}
          onBookmarkToggle={handleBookmarkToggle}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Mastery & Recall Tracker */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-indigo-600" />
                  Mastery & Recall Tracker
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {masteryKpis.map((kpi, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
                      <div className="flex items-center justify-between mb-2">
                        <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
                        <span className="text-2xl font-bold">{kpi.value}</span>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">{kpi.title}</div>
                      {kpi.unit === '%' && (
                        <Progress value={kpi.value} className="h-1 mt-2" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Insights */}
            <AIInsights conceptName={mockConcept.title} />

            {/* Main Content Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              {/* Primary Learning Tabs */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Learning Modes</h3>
                <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 gap-1">
                  <TabsTrigger value="learn" className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    Learn
                  </TabsTrigger>
                  <TabsTrigger value="visual" className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    Visual
                  </TabsTrigger>
                  <TabsTrigger value="3d" className="flex items-center gap-1">
                    <Box className="h-4 w-4" />
                    3D Sim
                  </TabsTrigger>
                  <TabsTrigger value="formula" className="flex items-center gap-1">
                    <Calculator className="h-4 w-4" />
                    Formula
                  </TabsTrigger>
                  <TabsTrigger value="video" className="flex items-center gap-1">
                    <Play className="h-4 w-4" />
                    Video
                  </TabsTrigger>
                  <TabsTrigger value="mistakes" className="flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4" />
                    Mistakes
                  </TabsTrigger>
                </TabsList>

                {/* Secondary Management Tabs */}
                <h3 className="text-lg font-semibold">Learning Management</h3>
                <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 gap-1">
                  <TabsTrigger value="recall" className="flex items-center gap-1">
                    <Brain className="h-4 w-4" />
                    Recall
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="flex items-center gap-1">
                    <BarChart3 className="h-4 w-4" />
                    Analytics
                  </TabsTrigger>
                  <TabsTrigger value="revision" className="flex items-center gap-1">
                    <RotateCcw className="h-4 w-4" />
                    Revision
                  </TabsTrigger>
                  <TabsTrigger value="notes" className="flex items-center gap-1">
                    <NotebookPen className="h-4 w-4" />
                    Notes
                  </TabsTrigger>
                  <TabsTrigger value="discuss" className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    Discuss
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Read Aloud Section */}
              {isReadingAloud && (
                <ReadAloudSection
                  text={mockConcept.content}
                  isActive={isReadingAloud}
                  onStop={() => setIsReadingAloud(false)}
                />
              )}

              {/* Tab Contents */}
              <div className="space-y-6">
                <TabsContent value="learn" className="space-y-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle>Learn: {mockConcept.title}</CardTitle>
                      <Button variant="outline" size="sm" onClick={handleReadAloud}>
                        <Volume2 className="h-4 w-4 mr-2" />
                        {isReadingAloud ? 'Stop Reading' : 'Read Aloud'}
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="prose dark:prose-invert max-w-none">
                        {mockConcept.content.split('\n\n').map((paragraph, index) => (
                          <p key={index} className="mb-4">
                            {paragraph.replace(/\*\*(.*?)\*\*/g, '$1')}
                          </p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="visual" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Visual Representations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 flex items-center justify-center">
                          <div className="text-center">
                            <Eye className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                            <p className="text-gray-600 dark:text-gray-300">Force Diagram</p>
                          </div>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 flex items-center justify-center">
                          <div className="text-center">
                            <Eye className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                            <p className="text-gray-600 dark:text-gray-300">Motion Graph</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="3d" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>3D Simulation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-16 flex items-center justify-center">
                        <div className="text-center">
                          <Box className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                          <p className="text-gray-600 dark:text-gray-300">Interactive 3D Physics Simulation</p>
                          <Button className="mt-4">Launch Simulation</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="formula" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Formula Lab</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4">
                          <h4 className="font-medium mb-2">Newton's Second Law</h4>
                          <div className="text-xl font-mono">F = ma</div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                            Force equals mass times acceleration
                          </p>
                        </div>
                        <Button>Practice Formula Problems</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="video" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Video Tutorials</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((video) => (
                          <div key={video} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                            <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded mb-2 flex items-center justify-center">
                              <Play className="h-8 w-8 text-gray-400" />
                            </div>
                            <h4 className="font-medium">Video {video}: Newton's Laws Explained</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Duration: 5:30</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="mistakes" className="space-y-4">
                  <CommonMistakesContent conceptName={mockConcept.title} />
                </TabsContent>

                <TabsContent value="recall" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Recall Test</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="bg-yellow-50 dark:bg-yellow-950/30 rounded-lg p-4">
                          <h4 className="font-medium mb-2">Question 1 of 5</h4>
                          <p className="mb-4">What is Newton's First Law of Motion?</p>
                          <div className="space-y-2">
                            {['Law of Inertia', 'F = ma', 'Action-Reaction', 'Conservation of Energy'].map((option, index) => (
                              <Button key={index} variant="outline" className="w-full justify-start">
                                {option}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-4">
                  <AnalyticsSection conceptName={mockConcept.title} />
                </TabsContent>

                <TabsContent value="revision" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Revision Schedule</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-4">
                          <h4 className="font-medium text-green-700 dark:text-green-400">Next Review: In 2 days</h4>
                          <p className="text-sm text-green-600 dark:text-green-300 mt-1">
                            Based on spaced repetition algorithm
                          </p>
                        </div>
                        <Button>Schedule Custom Review</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="notes" className="space-y-4">
                  <NoteSection
                    userNotes={userNotes}
                    setUserNotes={setUserNotes}
                    handleSaveNotes={handleSaveNotes}
                  />
                </TabsContent>

                <TabsContent value="discuss" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>AI Tutor Chat</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-3">
                            <p className="text-sm">Ask me anything about Newton's Laws!</p>
                          </div>
                          <div className="flex gap-2">
                            <input 
                              type="text" 
                              placeholder="Type your question..."
                              className="flex-1 px-3 py-2 border rounded-lg"
                            />
                            <Button>Send</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <AIInsightsSection conceptId={mockConcept.id} conceptTitle={mockConcept.title} />
                  </div>
                </TabsContent>
              </div>
            </Tabs>

            {/* Linked Content Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LinkIcon className="h-5 w-5" />
                  Linked Content
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="concepts" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="concepts">Related Concepts</TabsTrigger>
                    <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
                    <TabsTrigger value="exams">Practice Exams</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="concepts">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mockConcept.relatedConcepts.map((concept) => (
                        <div key={concept.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                          <h4 className="font-medium">{concept.title}</h4>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm text-gray-600 dark:text-gray-300">Mastery</span>
                            <Badge variant="outline">{concept.masteryLevel}%</Badge>
                          </div>
                          <Progress value={concept.masteryLevel} className="h-1 mt-2" />
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="flashcards">
                    <div className="text-center py-8">
                      <p className="text-gray-600 dark:text-gray-300">15 flashcards available for this concept</p>
                      <Button className="mt-4">Start Flashcard Review</Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="exams">
                    <div className="text-center py-8">
                      <p className="text-gray-600 dark:text-gray-300">3 practice exams include this concept</p>
                      <Button className="mt-4">Take Practice Exam</Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ConceptSidebar
              masteryLevel={mockConcept.masteryLevel}
              relatedConcepts={mockConcept.relatedConcepts}
              examReady={mockConcept.examReady}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptDetailPage;
