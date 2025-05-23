
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Star, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause,
  Brain,
  Clock,
  Target,
  Calendar,
  Eye,
  Box,
  Calculator,
  Video,
  AlertTriangle,
  RotateCcw,
  BarChart3,
  Edit,
  MessageCircle,
  Link
} from 'lucide-react';
import ConceptHeader from '@/components/dashboard/student/concepts/concept-detail/ConceptHeader';
import ConceptExplanationContent from '@/components/dashboard/student/concept-cards/ConceptExplanationContent';
import AIInsights from '@/components/dashboard/student/concepts/AIInsights';
import AnalyticsSection from '@/components/dashboard/student/concepts/AnalyticsSection';
import ReadAloudSection from '@/components/dashboard/student/concepts/concept-detail/ReadAloudSection';

const ConceptDetailPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [activeTab, setActiveTab] = useState('learn');

  // Mock concept data - in a real app, this would come from an API
  const conceptData = {
    id: conceptId || '1',
    title: "Newton's Laws of Motion",
    subject: "Physics",
    topic: "Mechanics",
    difficulty: 'medium' as const,
    description: "Fundamental principles that describe the relationship between forces acting on a body and its motion due to those forces.",
    masteryLevel: 75,
    recallStrength: 68,
    studyTime: 145,
    nextReview: "Tomorrow, 2:30 PM",
    content: "Newton's Laws of Motion are three fundamental principles that explain how objects move and interact with forces. These laws form the foundation of classical mechanics."
  };

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleReadAloud = () => {
    if (isReadingAloud) {
      speechSynthesis.cancel();
      setIsReadingAloud(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(conceptData.content);
      utterance.rate = 0.9;
      utterance.onend = () => setIsReadingAloud(false);
      speechSynthesis.speak(utterance);
      setIsReadingAloud(true);
    }
  };

  const primaryTabs = [
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'visual', label: 'Visual', icon: Eye },
    { id: '3d', label: '3D Simulation', icon: Box },
    { id: 'formula', label: 'Formula Lab', icon: Calculator },
    { id: 'video', label: 'Video', icon: Video },
    { id: 'mistakes', label: 'Common Mistakes', icon: AlertTriangle }
  ];

  const secondaryTabs = [
    { id: 'recall', label: 'Recall', icon: RotateCcw },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'revision', label: 'Revision', icon: Calendar },
    { id: 'notes', label: 'Notes', icon: Edit },
    { id: 'discuss', label: 'Discuss', icon: MessageCircle },
    { id: 'linked', label: 'Linked', icon: Link }
  ];

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Masthead */}
      <ConceptHeader
        title={conceptData.title}
        subject={conceptData.subject}
        topic={conceptData.topic}
        difficulty={conceptData.difficulty}
        isBookmarked={isBookmarked}
        onBookmarkToggle={handleBookmarkToggle}
      />

      {/* Description and Read Aloud */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <p className="text-gray-700 dark:text-gray-300 flex-1 mr-4">
              {conceptData.description}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReadAloud}
              className="flex items-center gap-2"
            >
              {isReadingAloud ? (
                <>
                  <VolumeX className="h-4 w-4" />
                  Stop
                </>
              ) : (
                <>
                  <Volume2 className="h-4 w-4" />
                  Read Aloud
                </>
              )}
            </Button>
          </div>
          
          {isReadingAloud && (
            <ReadAloudSection
              text={conceptData.content}
              isActive={isReadingAloud}
              onStop={() => setIsReadingAloud(false)}
            />
          )}
        </CardContent>
      </Card>

      {/* Mastery & Recall Tracker */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Mastery Level</span>
              </div>
              <span className="text-lg font-bold">{conceptData.masteryLevel}%</span>
            </div>
            <Progress value={conceptData.masteryLevel} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Recall Strength</span>
              </div>
              <span className="text-lg font-bold">{conceptData.recallStrength}%</span>
            </div>
            <Progress value={conceptData.recallStrength} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-medium">Study Time</span>
              </div>
              <span className="text-lg font-bold">{conceptData.studyTime}m</span>
            </div>
            <div className="text-xs text-muted-foreground">This week</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-medium">Next Review</span>
              </div>
            </div>
            <div className="text-sm font-medium">{conceptData.nextReview}</div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <AIInsights conceptName={conceptData.title} />

      {/* Main Content Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Learning Content</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Primary Learning</h3>
              <TabsList className="grid grid-cols-3 lg:grid-cols-6 gap-2">
                {primaryTabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="flex items-center gap-2"
                  >
                    <tab.icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Management & Tools</h3>
              <TabsList className="grid grid-cols-3 lg:grid-cols-6 gap-2">
                {secondaryTabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="flex items-center gap-2"
                  >
                    <tab.icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Primary Tab Content */}
            <TabsContent value="learn">
              <ConceptExplanationContent conceptTitle={conceptData.title} />
            </TabsContent>

            <TabsContent value="visual">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Visual Learning</h3>
                  <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Eye className="h-12 w-12 mx-auto mb-2 text-blue-500" />
                      <p className="text-sm text-muted-foreground">Interactive visual diagrams and animations</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="3d">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">3D Simulation</h3>
                  <div className="aspect-video bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Box className="h-12 w-12 mx-auto mb-2 text-purple-500" />
                      <p className="text-sm text-muted-foreground">3D interactive simulations and models</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="formula">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Formula Lab</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Key Formulas</h4>
                      <div className="space-y-2">
                        <div className="font-mono text-lg">F = ma</div>
                        <div className="font-mono text-lg">F₁₂ = -F₂₁</div>
                      </div>
                    </div>
                    <Button className="w-full">Practice with Interactive Formula Tool</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="video">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Video Tutorials</h3>
                  <div className="aspect-video bg-gradient-to-br from-red-50 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Video className="h-12 w-12 mx-auto mb-2 text-red-500" />
                      <p className="text-sm text-muted-foreground">Curated video content and tutorials</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="mistakes">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Common Mistakes & Previous Years</h3>
                  <div className="space-y-4">
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                      <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-2">Common Mistake #1</h4>
                      <p className="text-sm text-amber-700 dark:text-amber-400">
                        Confusing Newton's Third Law with action-reaction pairs in the same system
                      </p>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                      <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Previous Year Question</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-400">
                        JEE Main 2023: A block slides down an inclined plane...
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Secondary Tab Content */}
            <TabsContent value="recall">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Quick Recall Tests</h3>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Quick Question</h4>
                      <p className="mb-3">What does Newton's First Law state?</p>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start">An object at rest stays at rest...</Button>
                        <Button variant="outline" className="w-full justify-start">Force equals mass times acceleration</Button>
                        <Button variant="outline" className="w-full justify-start">For every action, there's an equal reaction</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <AnalyticsSection conceptName={conceptData.title} />
            </TabsContent>

            <TabsContent value="revision">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Revision Schedule</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <span className="text-sm">Today - Quick Review</span>
                      <Badge variant="outline" className="bg-green-100 text-green-700">Due</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <span className="text-sm">Tomorrow - Practice Problems</span>
                      <Badge variant="outline">Scheduled</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/20 rounded-lg">
                      <span className="text-sm">Next Week - Comprehensive Test</span>
                      <Badge variant="outline">Planned</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Personal Notes</h3>
                  <div className="space-y-4">
                    <textarea
                      className="w-full h-32 p-3 border rounded-lg resize-none"
                      placeholder="Add your personal notes here..."
                    />
                    <Button className="w-full">Save Notes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="discuss">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Discussion & AI Tutor</h3>
                  <div className="space-y-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Ask AI Tutor</h4>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Ask a question about this concept..."
                          className="flex-1 p-2 border rounded"
                        />
                        <Button>Ask</Button>
                      </div>
                    </div>
                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-2">Community Discussion</h4>
                      <p className="text-sm text-muted-foreground">Join the conversation with other students</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="linked">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Linked Content</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Related Concepts</h4>
                      <ul className="text-sm space-y-1">
                        <li className="text-blue-600 cursor-pointer hover:underline">Momentum Conservation</li>
                        <li className="text-blue-600 cursor-pointer hover:underline">Energy & Work</li>
                        <li className="text-blue-600 cursor-pointer hover:underline">Circular Motion</li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Flashcard Sets</h4>
                      <ul className="text-sm space-y-1">
                        <li className="text-blue-600 cursor-pointer hover:underline">Newton's Laws Review</li>
                        <li className="text-blue-600 cursor-pointer hover:underline">Force & Motion</li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Practice Exams</h4>
                      <ul className="text-sm space-y-1">
                        <li className="text-blue-600 cursor-pointer hover:underline">Mechanics Test 1</li>
                        <li className="text-blue-600 cursor-pointer hover:underline">Physics Mock Exam</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConceptDetailPage;
