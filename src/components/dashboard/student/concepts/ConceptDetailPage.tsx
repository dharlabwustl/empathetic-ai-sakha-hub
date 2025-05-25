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
import NotesSection from './NotesSection';
import TabAIAssistant from '../ai-assistant/TabAIAssistant';
import TabProgressMeter from '../progress/TabProgressMeter';
import { useTabProgress } from '@/hooks/useTabProgress';
import ConceptVoiceAssistant from './concept-detail/ConceptVoiceAssistant';

const ConceptDetailPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { conceptCards } = useUserStudyPlan();
  const [activeTab, setActiveTab] = useState('learn');
  const [concept, setConcept] = useState<ConceptCard | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { getTabProgress, updateTabProgress } = useTabProgress();

  // Load bookmark status from localStorage
  useEffect(() => {
    if (conceptId) {
      const bookmarks = JSON.parse(localStorage.getItem('bookmarkedConcepts') || '[]');
      setIsBookmarked(bookmarks.includes(conceptId));
    }
  }, [conceptId]);

  useEffect(() => {
    if (conceptId && conceptCards.length > 0) {
      const foundConcept = conceptCards.find(card => card.id === conceptId);
      if (foundConcept) {
        setConcept(foundConcept);
      }
    }
  }, [conceptId, conceptCards]);

  const handleBookmarkToggle = () => {
    if (!conceptId) return;
    
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedConcepts') || '[]');
    let updatedBookmarks;
    
    if (isBookmarked) {
      updatedBookmarks = bookmarks.filter((id: string) => id !== conceptId);
    } else {
      updatedBookmarks = [...bookmarks, conceptId];
    }
    
    localStorage.setItem('bookmarkedConcepts', JSON.stringify(updatedBookmarks));
    setIsBookmarked(!isBookmarked);
  };

  // Update progress when tab changes
  useEffect(() => {
    if (concept) {
      updateTabProgress('concepts', {
        totalTasks: 5, // Number of tabs
        tasksCompleted: concept.completed ? 5 : Math.floor(Math.random() * 3) + 1,
        completionPercentage: concept.progress || 0,
        timeSpent: 30 + Math.floor(Math.random() * 60),
        streak: 3
      });
    }
  }, [concept, activeTab]);

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

  const progressData = getTabProgress('concepts');

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

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <ConceptHeader 
              title={concept.title}
              subject={concept.subject}
              topic={concept.topic || 'General'}
              difficulty={concept.difficulty}
              isBookmarked={isBookmarked}
              onBookmarkToggle={handleBookmarkToggle}
            />
            
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
                    <FileText className="h-4 w-4" />
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
                            Notes & Annotations
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Create personal notes and annotations for this concept.
                          </p>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="mt-2"
                            onClick={() => setActiveTab('notes')}
                          >
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
                  </div>
                </TabsContent>

                <TabsContent value="notes" className="mt-0">
                  <NotesSection conceptName={concept.title} />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Enhanced Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <TabProgressMeter 
              tabName="Concepts" 
              progressData={progressData}
            />
            
            <TabAIAssistant 
              tabName="Concepts"
              context={`User is studying ${concept.title} in ${concept.subject}`}
            />
            
            <ConceptSidebar 
              masteryLevel={concept.masteryLevel || 65}
              relatedConcepts={[
                { id: '1', title: 'Velocity and Acceleration', masteryLevel: 78 },
                { id: '2', title: 'Newton\'s First Law', masteryLevel: 85 },
                { id: '3', title: 'Free Body Diagrams', masteryLevel: 92 }
              ]}
              examReady={concept.examReady || false}
              onRelatedConceptClick={(conceptId) => {
                navigate(`/dashboard/student/concepts/${conceptId}`);
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Voice Assistant for Concept Detail */}
      <ConceptVoiceAssistant 
        conceptName={concept.title}
        conceptContent={concept.content}
        currentTab={activeTab}
        userName={concept.title} // or get from user context
        isEnabled={true}
      />
    </div>
  );
};

export default ConceptDetailPage;
