
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Video, Calculator, Eye, Brain, Lightbulb, FileText, Users, MessageSquare, PencilLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useUserStudyPlan } from '@/hooks/useUserStudyPlan';
import { ConceptCard } from '@/types/user/conceptCard';
import EnhancedLearnTab from './EnhancedLearnTab';
import Visual3DContent from './Visual3DContent';
import QuickRecallSection from './concept-detail/QuickRecallSection';
import ConceptHeader from './concept-detail/ConceptHeader';
import ConceptSidebar from './concept-detail/ConceptSidebar';
import NotesTab from './concept-detail/NotesTab';

const ConceptDetailPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { conceptCards } = useUserStudyPlan();
  const [activeTab, setActiveTab] = useState('learn');
  const [concept, setConcept] = useState<ConceptCard | null>(null);

  useEffect(() => {
    if (conceptId && conceptCards.length > 0) {
      const foundConcept = conceptCards.find(card => card.id === conceptId);
      if (foundConcept) {
        setConcept(foundConcept);
      }
    }
  }, [conceptId, conceptCards]);

  if (!concept) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard/student')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">Concept not found or loading...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard/student')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <ConceptHeader concept={concept} />
            
            <div className="mt-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-6">
                  <TabsTrigger value="learn" className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Learn
                  </TabsTrigger>
                  <TabsTrigger value="interactive" className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Interactive
                  </TabsTrigger>
                  <TabsTrigger value="3d" className="flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    3D Lab
                  </TabsTrigger>
                  <TabsTrigger value="tools" className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Learning Tools
                  </TabsTrigger>
                  <TabsTrigger value="notes" className="flex items-center gap-2">
                    <PencilLine className="h-4 w-4" />
                    Notes
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="learn" className="mt-0">
                  <EnhancedLearnTab conceptName={concept.title} />
                </TabsContent>

                <TabsContent value="interactive" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Eye className="h-5 w-5 text-purple-600" />
                        Interactive Visualizations with Audio
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-purple-50 dark:bg-purple-950/30 p-6 rounded-lg">
                        <p className="text-center text-gray-600 dark:text-gray-400">
                          Interactive visualizations with audio explanations for {concept.title} will be loaded here.
                        </p>
                        <div className="mt-4 text-center">
                          <Button 
                            onClick={() => {
                              const audioExplanation = `This interactive visualization shows ${concept.title}. Click on different elements to explore the concept in detail.`;
                              if ('speechSynthesis' in window) {
                                const utterance = new SpeechSynthesisUtterance(audioExplanation);
                                utterance.rate = 0.9;
                                window.speechSynthesis.speak(utterance);
                              }
                            }}
                            className="flex items-center gap-2"
                          >
                            <Video className="h-4 w-4" />
                            Play Audio Explanation
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="3d" className="mt-0">
                  <Visual3DContent conceptName={concept.title} />
                </TabsContent>

                <TabsContent value="tools" className="mt-0">
                  <div className="space-y-6">
                    {/* Quick Recall Test Section */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Brain className="h-5 w-5 text-blue-600" />
                          Quick Recall Test
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <QuickRecallSection 
                          conceptId={concept.id}
                          title={concept.title}
                          content={concept.content}
                          onQuizComplete={(score) => {
                            console.log(`Quiz completed with score: ${score}`);
                          }}
                        />
                      </CardContent>
                    </Card>

                    {/* Other Learning Tools */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Practice Problems
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Solve practice problems related to this concept.
                          </p>
                          <Button variant="outline" size="sm" className="mt-2">
                            Start Practice
                          </Button>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm flex items-center gap-2">
                            <Calculator className="h-4 w-4" />
                            Formula Helper
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Quick reference for formulas and equations.
                          </p>
                          <Button variant="outline" size="sm" className="mt-2">
                            View Formulas
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="notes" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <PencilLine className="h-5 w-5 text-indigo-600" />
                        Personal Notes
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <NotesTab conceptId={concept.id} />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ConceptSidebar concept={concept} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptDetailPage;
