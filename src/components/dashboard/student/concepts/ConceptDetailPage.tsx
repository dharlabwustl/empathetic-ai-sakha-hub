
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Video, Calculator, Eye, Brain, Lightbulb, FileText, Users, MessageSquare, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useUserStudyPlan } from '@/hooks/useUserStudyPlan';
import { useUserNotes } from '@/hooks/useUserNotes';
import { ConceptCard } from '@/types/user/conceptCard';
import { toast } from '@/hooks/use-toast';
import EnhancedLearnTab from './EnhancedLearnTab';
import Visual3DContent from './Visual3DContent';
import QuickRecallSection from './concept-detail/QuickRecallSection';
import ConceptHeader from './concept-detail/ConceptHeader';
import ConceptSidebar from './concept-detail/ConceptSidebar';
import NoteSection from './concept-detail/NoteSection';

const ConceptDetailPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { conceptCards } = useUserStudyPlan();
  const { saveNote, getNoteForConcept } = useUserNotes();
  const [activeTab, setActiveTab] = useState('learn');
  const [concept, setConcept] = useState<ConceptCard | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [userNotes, setUserNotes] = useState('');

  useEffect(() => {
    if (conceptId && conceptCards.length > 0) {
      const foundConcept = conceptCards.find(card => card.id === conceptId);
      if (foundConcept) {
        setConcept(foundConcept);
        
        // Load existing notes
        const existingNotes = getNoteForConcept(conceptId);
        setUserNotes(existingNotes);
        
        // Load bookmark status from localStorage
        const bookmarks = JSON.parse(localStorage.getItem('bookmarkedConcepts') || '[]');
        setIsBookmarked(bookmarks.includes(conceptId));
      }
    }
  }, [conceptId, conceptCards, getNoteForConcept]);

  const handleBookmarkToggle = () => {
    if (!conceptId) return;
    
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedConcepts') || '[]');
    
    if (isBookmarked) {
      const updatedBookmarks = bookmarks.filter((id: string) => id !== conceptId);
      localStorage.setItem('bookmarkedConcepts', JSON.stringify(updatedBookmarks));
      setIsBookmarked(false);
      toast({
        title: "Bookmark removed",
        description: "This concept has been removed from your bookmarks.",
      });
    } else {
      const updatedBookmarks = [...bookmarks, conceptId];
      localStorage.setItem('bookmarkedConcepts', JSON.stringify(updatedBookmarks));
      setIsBookmarked(true);
      toast({
        title: "Bookmark added",
        description: "This concept has been added to your bookmarks for easy access.",
      });
    }
  };

  const handleSaveNotes = () => {
    if (!conceptId) return;
    
    const success = saveNote(conceptId, userNotes);
    if (success) {
      toast({
        title: "Notes saved",
        description: "Your notes have been saved successfully.",
      });
    } else {
      toast({
        title: "Error saving notes",
        description: "There was an error saving your notes. Please try again.",
        variant: "destructive",
      });
    }
  };

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
                      <div className="space-y-6">
                        <div className="bg-purple-50 dark:bg-purple-950/30 p-6 rounded-lg">
                          <h3 className="text-lg font-semibold mb-4">{concept.title} - Interactive Model</h3>
                          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 border-2 border-dashed border-purple-200 dark:border-purple-800 min-h-[400px] flex items-center justify-center">
                            <div className="text-center space-y-4">
                              <div className="w-64 h-64 mx-auto bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center animate-pulse">
                                <Eye className="h-16 w-16 text-white" />
                              </div>
                              <h4 className="text-xl font-bold">Interactive {concept.title} Model</h4>
                              <p className="text-gray-600 dark:text-gray-400">
                                Click and drag to interact with the model. Hover over different parts for detailed explanations.
                              </p>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-center gap-4">
                            <Button 
                              onClick={() => {
                                const explanation = `This interactive visualization demonstrates ${concept.title}. You can click and drag to rotate the model, zoom in and out to see different details, and hover over specific components to learn about their functions. The visualization shows how different elements interact with each other in real-time.`;
                                if ('speechSynthesis' in window) {
                                  const utterance = new SpeechSynthesisUtterance(explanation);
                                  utterance.rate = 0.9;
                                  window.speechSynthesis.speak(utterance);
                                }
                              }}
                              className="flex items-center gap-2"
                            >
                              <Video className="h-4 w-4" />
                              Play Audio Explanation
                            </Button>
                            <Button 
                              variant="outline"
                              onClick={() => {
                                const detailedExplanation = `Let me explain the detailed workings of ${concept.title}. This concept involves multiple interconnected components that work together to demonstrate the underlying principles. Each part of the visualization represents a different aspect of the theory, and you can explore them individually or see how they work together as a complete system.`;
                                if ('speechSynthesis' in window) {
                                  const utterance = new SpeechSynthesisUtterance(detailedExplanation);
                                  utterance.rate = 0.9;
                                  window.speechSynthesis.speak(utterance);
                                }
                              }}
                            >
                              Detailed Explanation
                            </Button>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Study Materials
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Access additional study materials and resources for this concept.
                          </p>
                          <Button variant="outline" size="sm" className="mt-2">
                            View Materials
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
                            toast({
                              title: "Test completed!",
                              description: `You scored ${score}% on the ${concept.title} recall test.`,
                            });
                          }}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="notes" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-green-600" />
                        My Notes for {concept.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <NoteSection
                        userNotes={userNotes}
                        setUserNotes={setUserNotes}
                        handleSaveNotes={handleSaveNotes}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div className="lg:col-span-1">
            <ConceptSidebar
              masteryLevel={concept.masteryLevel || 75}
              relatedConcepts={[
                { id: '1', title: 'Related Concept 1', masteryLevel: 80 },
                { id: '2', title: 'Related Concept 2', masteryLevel: 65 },
                { id: '3', title: 'Related Concept 3', masteryLevel: 90 }
              ]}
              examReady={concept.masteryLevel >= 80}
              onRelatedConceptClick={(conceptId) => {
                navigate(`/dashboard/student/concepts/${conceptId}`);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptDetailPage;
