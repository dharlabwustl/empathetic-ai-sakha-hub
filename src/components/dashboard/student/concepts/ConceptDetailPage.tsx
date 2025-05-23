import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Video, Calculator, Eye, Brain, Lightbulb, FileText, Users, MessageSquare } from 'lucide-react';
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
                <TabsList className="grid w-full grid-cols-4 mb-6">
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
                      <div className="space-y-6">
                        {/* Graph Visualization */}
                        <div className="bg-purple-50 dark:bg-purple-950/30 p-6 rounded-lg">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Force vs Acceleration Graph</h3>
                            <Button 
                              onClick={() => {
                                const explanation = `This graph shows the relationship between force and acceleration for ${concept.title}. The X-axis represents force in Newtons, and the Y-axis shows acceleration in meters per second squared. Notice how the relationship is linear, which demonstrates Newton's Second Law where force equals mass times acceleration.`;
                                if ('speechSynthesis' in window) {
                                  const utterance = new SpeechSynthesisUtterance(explanation);
                                  utterance.rate = 0.9;
                                  window.speechSynthesis.speak(utterance);
                                }
                              }}
                              className="flex items-center gap-2"
                            >
                              <Video className="h-4 w-4" />
                              Explain Graph
                            </Button>
                          </div>
                          <div className="h-64 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center border">
                            <div className="text-center">
                              <div className="w-48 h-32 mx-auto mb-4 bg-gradient-to-r from-blue-200 to-purple-200 rounded flex items-center justify-center">
                                <span className="text-xs text-gray-600">Interactive Force Graph</span>
                              </div>
                              <p className="text-sm text-gray-600">Click "Explain Graph" for audio explanation</p>
                            </div>
                          </div>
                        </div>

                        {/* Diagram Visualization */}
                        <div className="bg-green-50 dark:bg-green-950/30 p-6 rounded-lg">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Force Vector Diagram</h3>
                            <Button 
                              onClick={() => {
                                const explanation = `This force vector diagram illustrates how multiple forces act on an object. The arrows represent force vectors, with their length indicating magnitude and direction showing the force direction. When forces are balanced, the object remains at rest or moves at constant velocity.`;
                                if ('speechSynthesis' in window) {
                                  const utterance = new SpeechSynthesisUtterance(explanation);
                                  utterance.rate = 0.9;
                                  window.speechSynthesis.speak(utterance);
                                }
                              }}
                              className="flex items-center gap-2"
                            >
                              <Video className="h-4 w-4" />
                              Explain Diagram
                            </Button>
                          </div>
                          <div className="h-64 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center border">
                            <div className="text-center">
                              <div className="w-48 h-32 mx-auto mb-4 bg-gradient-to-r from-green-200 to-blue-200 rounded flex items-center justify-center">
                                <span className="text-xs text-gray-600">Vector Diagram</span>
                              </div>
                              <p className="text-sm text-gray-600">Click "Explain Diagram" for audio explanation</p>
                            </div>
                          </div>
                        </div>

                        {/* Animation Visualization */}
                        <div className="bg-orange-50 dark:bg-orange-950/30 p-6 rounded-lg">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Motion Animation</h3>
                            <Button 
                              onClick={() => {
                                const explanation = `This animation demonstrates how force affects motion. Watch as different forces are applied to the object, causing changes in acceleration. The speed and direction of motion change based on the net force applied, perfectly illustrating Newton's laws of motion.`;
                                if ('speechSynthesis' in window) {
                                  const utterance = new SpeechSynthesisUtterance(explanation);
                                  utterance.rate = 0.9;
                                  window.speechSynthesis.speak(utterance);
                                }
                              }}
                              className="flex items-center gap-2"
                            >
                              <Video className="h-4 w-4" />
                              Explain Animation
                            </Button>
                          </div>
                          <div className="h-64 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center border">
                            <div className="text-center">
                              <div className="w-48 h-32 mx-auto mb-4 bg-gradient-to-r from-orange-200 to-red-200 rounded flex items-center justify-center">
                                <span className="text-xs text-gray-600">Motion Animation</span>
                              </div>
                              <p className="text-sm text-gray-600">Click "Explain Animation" for audio explanation</p>
                            </div>
                          </div>
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
                    {/* Other Learning Tools */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Notes & Annotations
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Create personal notes and annotations for this concept.
                          </p>
                          <Button variant="outline" size="sm" className="mt-2">
                            Open Notes
                          </Button>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm flex items-center gap-2">
                            <Calculator className="h-4 w-4" />
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
                    </div>

                    {/* Quick Recall Test Section - Positioned below other tools */}
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
                  </div>
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
