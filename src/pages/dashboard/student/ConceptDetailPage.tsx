
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Volume2, VolumeX, ExternalLink } from 'lucide-react';
import BackButton from '@/components/dashboard/student/BackButton';
import ConceptSidebar from '@/components/dashboard/student/concepts/concept-detail/ConceptSidebar';
import QuickRecallSection from '@/components/dashboard/student/concepts/concept-detail/QuickRecallSection';
import ConceptAnalytics from '@/components/dashboard/student/concepts/concept-detail/ConceptAnalytics';
import EnhancedLearningTabs from '@/components/dashboard/student/concepts/concept-detail/EnhancedLearningTabs';

const ConceptDetailPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const [isReading, setIsReading] = useState(false);
  const [masteryLevel, setMasteryLevel] = useState(65);
  const [isCompleted, setIsCompleted] = useState(false);

  // Mock concept data
  const concept = {
    id: conceptId || 'newtons-laws',
    title: "Newton's Laws of Motion",
    subject: 'Physics',
    difficulty: 'Medium' as const,
    description: 'Master the three fundamental laws that govern motion and forces in classical mechanics.',
    timeSpent: 145, // minutes
    questionsAnswered: 28,
    accuracy: 82,
    relatedConcepts: [
      { id: 'forces', title: 'Types of Forces', masteryLevel: 78 },
      { id: 'momentum', title: 'Momentum & Impulse', masteryLevel: 45 },
      { id: 'energy', title: 'Work & Energy', masteryLevel: 92 }
    ]
  };

  const handleReadAloud = () => {
    if (isReading) {
      speechSynthesis.cancel();
      setIsReading(false);
    } else {
      const text = `Learning ${concept.title}. ${concept.description}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsReading(false);
      speechSynthesis.speak(utterance);
      setIsReading(true);
    }
  };

  const handleQuizComplete = (score: number) => {
    const newMastery = Math.min(100, masteryLevel + Math.floor(score / 10));
    setMasteryLevel(newMastery);
    if (newMastery >= 80 && !isCompleted) {
      // Auto-trigger completion notification
    }
  };

  const handleMarkComplete = () => {
    setIsCompleted(true);
    setMasteryLevel(100);
  };

  const handleFormulaLabClick = () => {
    navigate(`/dashboard/student/concepts/${conceptId}/formula-lab`);
  };

  useEffect(() => {
    return () => {
      if (isReading) {
        speechSynthesis.cancel();
      }
    };
  }, [isReading]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950">
      <div className="container mx-auto p-4 max-w-7xl">
        <BackButton to="/dashboard/student/concepts" />
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {concept.title}
              </h1>
              <Badge variant="outline" className="text-sm">
                {concept.difficulty}
              </Badge>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
              {concept.description}
            </p>
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                {concept.subject}
              </Badge>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {Math.floor(concept.timeSpent / 60)}h {concept.timeSpent % 60}m studied
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 mt-4 lg:mt-0">
            <Button
              onClick={handleReadAloud}
              variant="outline"
              className="flex items-center gap-2"
            >
              {isReading ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              {isReading ? 'Stop Reading' : 'Read Aloud'}
            </Button>
          </div>
        </div>

        {/* Analytics Section */}
        <ConceptAnalytics
          conceptTitle={concept.title}
          masteryLevel={masteryLevel}
          timeSpent={concept.timeSpent}
          questionsAnswered={concept.questionsAnswered}
          accuracy={concept.accuracy}
          onMarkComplete={handleMarkComplete}
          isCompleted={isCompleted}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Enhanced Learning Tabs */}
            <EnhancedLearningTabs
              conceptId={concept.id}
              conceptTitle={concept.title}
              onFormulaLabClick={handleFormulaLabClick}
            />

            {/* Management Tools Section */}
            <Card className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-800 dark:to-gray-900">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800 dark:text-gray-200">
                  Management Tools
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-400">
                  Track progress, practice, and manage your learning journey
                </p>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="recall" className="w-full">
                  <TabsList className="grid w-full grid-cols-6 mb-6">
                    <TabsTrigger value="recall">Recall</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="revision">Revision</TabsTrigger>
                    <TabsTrigger value="notes">Notes</TabsTrigger>
                    <TabsTrigger value="discuss">Discuss</TabsTrigger>
                    <TabsTrigger value="linked">Linked</TabsTrigger>
                  </TabsList>

                  <TabsContent value="recall">
                    <QuickRecallSection
                      conceptId={concept.id}
                      title={concept.title}
                      content={concept.description}
                      onQuizComplete={handleQuizComplete}
                    />
                  </TabsContent>

                  <TabsContent value="analytics">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Performance Analytics</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Weak Areas Identified</h4>
                          <ul className="text-sm space-y-1">
                            <li>• Force vector calculations</li>
                            <li>• Newton's third law applications</li>
                            <li>• Friction coefficient problems</li>
                          </ul>
                        </div>
                        <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Strong Areas</h4>
                          <ul className="text-sm space-y-1">
                            <li>• Basic force concepts</li>
                            <li>• Mass vs weight distinction</li>
                            <li>• Simple F=ma calculations</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="revision">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Smart Revision Schedule</h3>
                      <div className="space-y-4">
                        <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">Next Review Due</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Tomorrow, 2:00 PM</p>
                            </div>
                            <Button size="sm">Schedule Now</Button>
                          </div>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Spaced Repetition Schedule</h4>
                          <div className="grid grid-cols-4 gap-2 text-xs">
                            <div className="text-center p-2 bg-white dark:bg-gray-800 rounded">Day 1</div>
                            <div className="text-center p-2 bg-white dark:bg-gray-800 rounded">Day 3</div>
                            <div className="text-center p-2 bg-white dark:bg-gray-800 rounded">Day 7</div>
                            <div className="text-center p-2 bg-white dark:bg-gray-800 rounded">Day 21</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="notes">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Personal Notes</h3>
                      <div className="space-y-4">
                        <textarea
                          className="w-full h-32 p-3 border rounded-lg resize-none"
                          placeholder="Add your personal notes about Newton's Laws..."
                        />
                        <Button>Save Notes</Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="discuss">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Discussion & Help</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">AI Tutor Chat</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            Get instant help from our AI tutor
                          </p>
                          <Button className="w-full bg-purple-600 hover:bg-purple-700">
                            Start Chat Session
                          </Button>
                        </div>
                        <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Community Forum</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            Discuss with fellow students
                          </p>
                          <Button className="w-full bg-green-600 hover:bg-green-700">
                            Join Discussion
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="linked">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Related Resources</h3>
                      <div className="space-y-4">
                        <div className="bg-indigo-50 dark:bg-indigo-950/30 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Prerequisite Concepts</h4>
                          <div className="space-y-2">
                            <Button variant="outline" className="w-full justify-start">
                              Basic Kinematics
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                              Vector Mathematics
                            </Button>
                          </div>
                        </div>
                        <div className="bg-teal-50 dark:bg-teal-950/30 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Next Topics</h4>
                          <div className="space-y-2">
                            <Button variant="outline" className="w-full justify-start">
                              Work and Energy
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                              Circular Motion
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <ConceptSidebar
              masteryLevel={masteryLevel}
              relatedConcepts={concept.relatedConcepts}
              examReady={masteryLevel >= 80}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptDetailPage;
