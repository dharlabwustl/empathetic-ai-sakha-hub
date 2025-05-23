
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ConceptsPageLayout } from '@/components/dashboard/student/concept-cards/ConceptsPageLayout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Video, 
  FileText, 
  FlaskConical, 
  MessageSquare, 
  Award, 
  PlayCircle,
  Star,
  Brain,
  BarChart,
  RefreshCw,
  Eye,
  Cube,
  AlertTriangle,
  Lightbulb,
  Target,
  ArrowRight,
  Volume2,
  Pause,
  Play,
  Square,
  CreditCard,
  Users,
  BookMarked
} from 'lucide-react';
import { motion } from 'framer-motion';
import NoteSection from './concept-detail/NoteSection';
import AIInsights from './AIInsights';
import ReadAloudSection from './concept-detail/ReadAloudSection';

// Mock concept data
const getMockConceptData = (conceptId: string) => {
  return {
    id: conceptId,
    title: 'Newton\'s Laws of Motion',
    description: 'Fundamental principles describing the relationship between force and motion.',
    subject: 'Physics',
    topic: 'Classical Mechanics',
    difficulty: 'medium' as const,
    completed: false,
    progress: 65,
    masteryLevel: 72,
    recallLevel: 80,
    lastStudied: '2 days ago',
    nextReview: 'Tomorrow',
    timeSpent: '2h 30m',
    relatedConcepts: [
      { id: '1', title: 'Conservation of Momentum', masteryLevel: 85 },
      { id: '2', title: 'Work and Energy', masteryLevel: 60 },
      { id: '3', title: 'Circular Motion', masteryLevel: 45 }
    ],
    content: `
      <h2>Introduction</h2>
      <p>Newton's laws of motion are three fundamental physical laws that establish the relationship between the motion of an object and the forces acting on it. These laws are the foundation of classical mechanics.</p>
      
      <h2>Newton's First Law (Law of Inertia)</h2>
      <p>An object at rest will remain at rest, and an object in motion will remain in motion at constant velocity, unless acted upon by an external force.</p>
      
      <h2>Newton's Second Law</h2>
      <p>The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.</p>
      <p>Mathematically: F = ma</p>
      
      <h2>Newton's Third Law</h2>
      <p>For every action, there is an equal and opposite reaction.</p>
    `,
    keyFormulas: [
      'F = ma (Force equals mass times acceleration)',
      'F₁ = -F₂ (Action-reaction forces are equal and opposite)'
    ],
    commonMistakes: [
      'Confusing mass and weight',
      'Not considering all forces acting on an object',
      'Misunderstanding the direction of reaction forces'
    ],
    previousYearQuestions: [
      'A 5kg object accelerates at 2m/s². Find the net force.',
      'Explain Newton\'s third law with examples.',
      'Derive the relationship between force, mass, and acceleration.'
    ],
    videos: [
      { id: 'v1', title: 'Understanding Newton\'s Laws', duration: '8:24' },
      { id: 'v2', title: 'Applications in Real Life', duration: '12:45' }
    ],
    flashcards: [
      { id: 'f1', front: 'What is Newton\'s First Law?', back: 'Law of Inertia' },
      { id: 'f2', front: 'F = ma represents which law?', back: 'Newton\'s Second Law' }
    ],
    bookmarked: true,
    estimatedTime: 45
  };
};

const ConceptDetailPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const [activeTab, setActiveTab] = useState('learn');
  const [concept, setConcept] = useState<any | null>(null);
  const [userNotes, setUserNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [isReadingAloud, setIsReadingAloud] = useState(false);

  useEffect(() => {
    if (conceptId) {
      setTimeout(() => {
        const data = getMockConceptData(conceptId);
        setConcept(data);
        setLoading(false);
      }, 500);
    }
  }, [conceptId]);

  const handleSaveNotes = () => {
    console.log("Saving notes:", userNotes);
  };

  const handleBookmarkToggle = () => {
    if (concept) {
      setConcept({
        ...concept,
        bookmarked: !concept.bookmarked
      });
    }
  };

  const startReadAloud = () => {
    setIsReadingAloud(true);
  };

  const stopReadAloud = () => {
    setIsReadingAloud(false);
  };

  if (loading) {
    return (
      <ConceptsPageLayout showBackButton title="Loading..." subtitle="">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </ConceptsPageLayout>
    );
  }

  if (!concept) {
    return (
      <ConceptsPageLayout showBackButton title="Not Found" subtitle="">
        <div className="text-center py-8">Concept not found</div>
      </ConceptsPageLayout>
    );
  }

  return (
    <ConceptsPageLayout 
      showBackButton 
      title="Concept Details" 
      subtitle="Master your understanding"
    >
      <div className="space-y-6">
        {/* Masthead */}
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-lg border p-6 shadow-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                  {concept.subject}
                </Badge>
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                  {concept.topic}
                </Badge>
                <Badge variant="outline" className={
                  concept.difficulty === 'easy' ? 'bg-green-50 text-green-700 border-green-200' :
                  concept.difficulty === 'medium' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                  'bg-red-50 text-red-700 border-red-200'
                }>
                  {concept.difficulty}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold mb-2">{concept.title}</h1>
              <p className="text-gray-600 dark:text-gray-400">{concept.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={startReadAloud}>
                <Volume2 className="h-4 w-4 mr-1" />
                Read Aloud
              </Button>
              <button onClick={handleBookmarkToggle} className="p-2">
                <Star className={`h-6 w-6 ${concept.bookmarked ? 'text-amber-500 fill-amber-500' : 'text-gray-400'}`} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Read Aloud Section */}
        {isReadingAloud && (
          <ReadAloudSection 
            text={concept.content}
            isActive={isReadingAloud}
            onStop={stopReadAloud}
          />
        )}

        {/* Mastery & Recall Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-600" />
                Mastery & Recall Tracker
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Mastery Level</div>
                  <div className="text-2xl font-bold text-blue-600 mb-2">{concept.masteryLevel}%</div>
                  <Progress value={concept.masteryLevel} className="h-2" />
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Recall Strength</div>
                  <div className="text-2xl font-bold text-green-600 mb-2">{concept.recallLevel}%</div>
                  <Progress value={concept.recallLevel} className="h-2" />
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Last Studied</div>
                  <div className="text-lg font-medium">{concept.lastStudied}</div>
                  <div className="text-sm text-gray-500">Total: {concept.timeSpent}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Next Review</div>
                  <div className="text-lg font-medium">{concept.nextReview}</div>
                  <Button size="sm" variant="outline" className="mt-1">
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Schedule
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <AIInsights conceptName={concept.title} />
        </motion.div>

        {/* Main Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 mb-6">
              {/* Primary Tabs */}
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
                <FlaskConical className="h-4 w-4" />
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
              
              {/* Secondary Tabs */}
              <TabsTrigger value="recall" className="flex items-center gap-1">
                <Brain className="h-4 w-4" />
                <span className="hidden sm:inline">Recall</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-1">
                <BarChart className="h-4 w-4" />
                <span className="hidden sm:inline">Analytics</span>
              </TabsTrigger>
              <TabsTrigger value="revision" className="flex items-center gap-1">
                <RefreshCw className="h-4 w-4" />
                <span className="hidden sm:inline">Revision</span>
              </TabsTrigger>
              <TabsTrigger value="notes" className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Notes</span>
              </TabsTrigger>
              <TabsTrigger value="discuss" className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">Discuss</span>
              </TabsTrigger>
              <TabsTrigger value="linked" className="flex items-center gap-1">
                <BookMarked className="h-4 w-4" />
                <span className="hidden sm:inline">Linked</span>
              </TabsTrigger>
            </TabsList>

            {/* Tab Contents */}
            <TabsContent value="learn">
              <Card>
                <CardContent className="p-6">
                  <div dangerouslySetInnerHTML={{ __html: concept.content }} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="visual">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Visual Representations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-8 text-center">
                      <div className="text-gray-500">Force Diagram Placeholder</div>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-8 text-center">
                      <div className="text-gray-500">Motion Graph Placeholder</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="3d">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">3D Interactive Simulation</h3>
                  <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-16 text-center">
                    <Cube className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <div className="text-gray-500">3D Physics Simulation</div>
                    <Button className="mt-4">Launch Simulation</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="formula">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Formula Lab</h3>
                  <div className="space-y-4">
                    {concept.keyFormulas.map((formula: string, index: number) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="font-mono text-center text-lg mb-2">{formula}</div>
                        <Button size="sm" variant="outline">Practice with this formula</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="video">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Video Tutorials</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {concept.videos.map((video: any) => (
                      <div key={video.id} className="border rounded-lg overflow-hidden">
                        <div className="bg-gray-100 dark:bg-gray-900 h-32 flex items-center justify-center">
                          <PlayCircle className="h-12 w-12 text-gray-500" />
                        </div>
                        <div className="p-4">
                          <h4 className="font-medium">{video.title}</h4>
                          <p className="text-sm text-gray-500">Duration: {video.duration}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="mistakes">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Common Mistakes & Previous Year Questions</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3 text-red-600">Common Mistakes</h4>
                      <div className="space-y-2">
                        {concept.commonMistakes.map((mistake: string, index: number) => (
                          <div key={index} className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                            <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                            <span className="text-sm">{mistake}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3 text-blue-600">Previous Year Questions</h4>
                      <div className="space-y-2">
                        {concept.previousYearQuestions.map((question: string, index: number) => (
                          <div key={index} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <span className="text-sm">{question}</span>
                            <Button size="sm" variant="outline" className="mt-2 ml-auto block">
                              Practice
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recall">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Quick Recall Test</h3>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">What is Newton's First Law?</h4>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start">An object at rest stays at rest</Button>
                        <Button variant="outline" className="w-full justify-start">Force equals mass times acceleration</Button>
                        <Button variant="outline" className="w-full justify-start">Every action has an equal reaction</Button>
                      </div>
                    </div>
                    <Button className="w-full">Start Full Recall Test</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Performance Analytics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">15</div>
                      <div className="text-sm text-gray-600">Study Sessions</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">85%</div>
                      <div className="text-sm text-gray-600">Avg. Quiz Score</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">2.5h</div>
                      <div className="text-sm text-gray-600">Total Time</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="revision">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Revision Schedule</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span>Quick Review</span>
                      <span className="text-sm text-green-600">Due Tomorrow</span>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span>Deep Review</span>
                      <span className="text-sm text-blue-600">Due in 3 days</span>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span>Final Review</span>
                      <span className="text-sm text-gray-600">Due in 1 week</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes">
              <NoteSection 
                userNotes={userNotes}
                setUserNotes={setUserNotes}
                handleSaveNotes={handleSaveNotes}
              />
            </TabsContent>

            <TabsContent value="discuss">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Discussion & AI Insights</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Brain className="h-5 w-5 text-blue-600 mt-1" />
                        <div>
                          <h4 className="font-medium">AI Tutor</h4>
                          <p className="text-sm text-gray-600 mt-1">Ask me anything about Newton's Laws!</p>
                          <Button size="sm" className="mt-2">Start Chat</Button>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Community Discussion</h4>
                      <p className="text-sm text-gray-600 mb-3">Join the conversation with other students</p>
                      <Button size="sm" variant="outline">Join Discussion</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="linked">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Linked Content</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Related Concepts</h4>
                      <div className="space-y-2">
                        {concept.relatedConcepts.map((related: any) => (
                          <Link 
                            key={related.id} 
                            to={`/dashboard/student/concepts/${related.id}`}
                            className="block p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                          >
                            <div className="font-medium text-sm">{related.title}</div>
                            <div className="text-xs text-gray-500">Mastery: {related.masteryLevel}%</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">Flashcards</h4>
                      <div className="space-y-2">
                        {concept.flashcards.map((card: any) => (
                          <div key={card.id} className="p-3 border rounded-lg">
                            <div className="text-sm font-medium">{card.front}</div>
                            <Button size="sm" variant="outline" className="mt-2">
                              <CreditCard className="h-3 w-3 mr-1" />
                              Review
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">Practice Exams</h4>
                      <div className="space-y-2">
                        <div className="p-3 border rounded-lg">
                          <div className="text-sm font-medium">Newton's Laws Quiz</div>
                          <div className="text-xs text-gray-500">10 questions • 15 min</div>
                          <Button size="sm" variant="outline" className="mt-2">
                            Start Exam
                          </Button>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <div className="text-sm font-medium">Physics Mock Test</div>
                          <div className="text-xs text-gray-500">50 questions • 90 min</div>
                          <Button size="sm" variant="outline" className="mt-2">
                            Start Exam
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </ConceptsPageLayout>
  );
};

export default ConceptDetailPage;
