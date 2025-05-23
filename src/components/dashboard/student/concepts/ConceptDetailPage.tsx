
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Play, Volume2, VolumeX, Brain, Lightbulb, BarChart3, MessageSquare, FileText, Repeat, Calculator, Eye, Cube, Video, AlertTriangle, HelpCircle, Clock, Target } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { ConceptCard } from '@/types/user/conceptCard';
import ConceptHeader from './concept-detail/ConceptHeader';
import FormulaTabContent from './FormulaTabContent';

const ConceptDetailPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [concept, setConcept] = useState<ConceptCard | null>(null);
  const [activeTab, setActiveTab] = useState('learn');

  // Mock concept data - in real app this would come from API
  useEffect(() => {
    const mockConcept: ConceptCard = {
      id: conceptId || '1',
      title: "Ohm's Law",
      description: "Understanding the relationship between voltage, current, and resistance in electrical circuits",
      subject: "Physics",
      chapter: "Current Electricity",
      topic: "Basic Laws",
      difficulty: 'medium',
      completed: false,
      progress: 65,
      content: `Ohm's Law states that the current through a conductor between two points is directly proportional to the voltage across the two points. This fundamental principle in electrical engineering helps us understand how electrical circuits behave.

The mathematical expression is: V = I × R

Where:
- V is the voltage (measured in Volts)
- I is the current (measured in Amperes) 
- R is the resistance (measured in Ohms)

This law is applicable to ohmic materials where resistance remains constant regardless of the current or voltage applied.`,
      estimatedTime: 45,
      recallAccuracy: 78,
      quizScore: 85,
      masteryLevel: 3,
      mastery: {
        level: "Intermediate",
        percentage: 65
      },
      keyPoints: [
        "Current is directly proportional to voltage",
        "Current is inversely proportional to resistance", 
        "Only applies to ohmic materials",
        "Forms the basis for circuit analysis"
      ],
      formulas: ["V = I × R", "I = V / R", "R = V / I"],
      bookmarked: false,
      videos: [
        {
          id: "1",
          title: "Ohm's Law Explained",
          url: "#",
          duration: "12:34",
          thumbnail: "/api/placeholder/320/180"
        }
      ],
      practiceQuestions: [
        {
          id: "q1",
          question: "If a circuit has a voltage of 12V and resistance of 4Ω, what is the current?",
          options: ["2A", "3A", "4A", "6A"],
          correctAnswer: "3A",
          explanation: "Using Ohm's Law: I = V/R = 12V/4Ω = 3A",
          difficulty: "easy"
        }
      ]
    };
    setConcept(mockConcept);
  }, [conceptId]);

  const handleReadAloud = () => {
    if (!concept) return;
    
    if (isReadingAloud) {
      window.speechSynthesis.cancel();
      setIsReadingAloud(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(concept.content);
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    
    utterance.onstart = () => setIsReadingAloud(true);
    utterance.onend = () => setIsReadingAloud(false);
    utterance.onerror = () => setIsReadingAloud(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleBookmarkToggle = () => {
    if (!concept) return;
    
    setConcept({
      ...concept,
      bookmarked: !concept.bookmarked
    });
    
    toast({
      title: concept.bookmarked ? "Bookmark Removed" : "Bookmark Added",
      description: concept.bookmarked 
        ? "Concept removed from bookmarks" 
        : "Concept added to bookmarks"
    });
  };

  if (!concept) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading concept...</p>
        </div>
      </div>
    );
  }

  const formulaVariables = [
    { symbol: 'V', name: 'Voltage', unit: 'Volts (V)' },
    { symbol: 'I', name: 'Current', unit: 'Amperes (A)' },
    { symbol: 'R', name: 'Resistance', unit: 'Ohms (Ω)' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/dashboard/student/concepts')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Concepts
              </Button>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReadAloud}
                className="flex items-center gap-2"
              >
                {isReadingAloud ? (
                  <>
                    <VolumeX className="h-4 w-4" />
                    Stop Reading
                  </>
                ) : (
                  <>
                    <Volume2 className="h-4 w-4" />
                    Read Aloud
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Concept Header */}
        <ConceptHeader
          title={concept.title}
          subject={concept.subject}
          topic={concept.topic || ''}
          difficulty={concept.difficulty}
          isBookmarked={concept.bookmarked}
          onBookmarkToggle={handleBookmarkToggle}
        />

        {/* Mastery & Recall Tracker */}
        <Card className="mb-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-indigo-600" />
              Mastery & Recall Tracker
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-2">
                  <Progress value={concept.mastery?.percentage || 0} className="absolute inset-0" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold">{concept.mastery?.percentage || 0}%</span>
                  </div>
                </div>
                <p className="text-sm font-medium">Mastery Level</p>
                <p className="text-xs text-gray-600">{concept.mastery?.level || 'Beginner'}</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">{concept.recallAccuracy || 0}%</div>
                <p className="text-sm font-medium">Recall Accuracy</p>
                <p className="text-xs text-gray-600">Last 7 days</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">{concept.quizScore || 0}%</div>
                <p className="text-sm font-medium">Quiz Score</p>
                <p className="text-xs text-gray-600">Latest attempt</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card className="mb-6 border-amber-200 dark:border-amber-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-amber-600" />
              AI Insights & Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
                <Lightbulb className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Focus Area</p>
                  <p className="text-sm text-gray-600">Practice more resistance calculations to improve accuracy</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Optimal Study Time</p>
                  <p className="text-sm text-gray-600">15-20 minutes for best retention based on your patterns</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
            <TabsTrigger value="learn" className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Learn</span>
            </TabsTrigger>
            <TabsTrigger value="visual" className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">Visual</span>
            </TabsTrigger>
            <TabsTrigger value="3d" className="flex items-center gap-1">
              <Cube className="h-4 w-4" />
              <span className="hidden sm:inline">3D</span>
            </TabsTrigger>
            <TabsTrigger value="formula" className="flex items-center gap-1">
              <Calculator className="h-4 w-4" />
              <span className="hidden sm:inline">Formula</span>
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-1">
              <Video className="h-4 w-4" />
              <span className="hidden sm:inline">Video</span>
            </TabsTrigger>
            <TabsTrigger value="mistakes" className="flex items-center gap-1">
              <AlertTriangle className="h-4 w-4" />
              <span className="hidden sm:inline">Mistakes</span>
            </TabsTrigger>
            <TabsTrigger value="recall" className="flex items-center gap-1">
              <Repeat className="h-4 w-4" />
              <span className="hidden sm:inline">Recall</span>
            </TabsTrigger>
            <TabsTrigger value="discuss" className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Discuss</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="learn" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Learn: {concept.title}</CardTitle>
                <CardDescription>Comprehensive text-based explanation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  {concept.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                  ))}
                </div>
                
                {concept.keyPoints && (
                  <div className="mt-6">
                    <h4 className="font-semibold mb-3">Key Points:</h4>
                    <ul className="space-y-2">
                      {concept.keyPoints.map((point, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
                          <span className="text-sm">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="visual" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Visual Representation</CardTitle>
                <CardDescription>Diagrams and visual aids</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-100 dark:bg-slate-800 rounded-lg aspect-video flex items-center justify-center">
                  <div className="text-center p-6">
                    <Eye className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-500">Interactive circuit diagram would be displayed here</p>
                    <p className="text-sm text-slate-400 mt-2">Visual representation of Ohm's Law</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="3d" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>3D Simulation</CardTitle>
                <CardDescription>Interactive 3D models and simulations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-100 dark:bg-slate-800 rounded-lg aspect-video flex items-center justify-center">
                  <div className="text-center p-6">
                    <Cube className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-500">3D interactive simulation would be displayed here</p>
                    <p className="text-sm text-slate-400 mt-2">Manipulate virtual circuits to see Ohm's Law in action</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="formula" className="space-y-6">
            <FormulaTabContent 
              formula="V = I × R"
              variables={formulaVariables}
            />
          </TabsContent>

          <TabsContent value="video" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Video Tutorials</CardTitle>
                <CardDescription>Curated video content for visual learning</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {concept.videos?.map((video) => (
                    <div key={video.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="w-20 h-12 bg-slate-200 dark:bg-slate-700 rounded flex items-center justify-center">
                        <Play className="h-6 w-6 text-slate-500" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{video.title}</h4>
                        <p className="text-sm text-gray-600">Duration: {video.duration}</p>
                      </div>
                      <Button size="sm">
                        <Play className="h-4 w-4 mr-1" />
                        Watch
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mistakes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Common Mistakes</CardTitle>
                <CardDescription>Avoid these common pitfalls</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="font-medium text-red-700 dark:text-red-400">Unit Confusion</h4>
                    <p className="text-sm text-gray-600">Remember to use consistent units (V for volts, A for amperes, Ω for ohms)</p>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-medium text-orange-700 dark:text-orange-400">Formula Rearrangement</h4>
                    <p className="text-sm text-gray-600">When solving for current or resistance, make sure to rearrange the formula correctly</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recall" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Recall Test</CardTitle>
                <CardDescription>Test your memory with these quick questions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                    <p className="font-medium mb-2">What does the 'I' represent in Ohm's Law?</p>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">Voltage</Button>
                      <Button variant="outline" size="sm">Current</Button>
                      <Button variant="outline" size="sm">Resistance</Button>
                      <Button variant="outline" size="sm">Power</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="discuss" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Discussion & AI Insights</CardTitle>
                <CardDescription>Ask questions and get AI-powered explanations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Ask anything about this concept:</p>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="e.g., How does temperature affect resistance?"
                        className="flex-1 px-3 py-2 border rounded-md text-sm"
                      />
                      <Button size="sm">Ask AI</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Related Concepts:</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Power Formula</Badge>
                      <Badge variant="outline">Series Circuits</Badge>
                      <Badge variant="outline">Parallel Circuits</Badge>
                      <Badge variant="outline">Kirchhoff's Laws</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ConceptDetailPage;
