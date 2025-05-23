import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Video, Calculator, Eye, Brain, Lightbulb, FileText, Users, MessageSquare, Bookmark, BookmarkCheck } from 'lucide-react';
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
import QuickRecallTest from './QuickRecallTest';

const ConceptDetailPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { conceptCards } = useUserStudyPlan();
  const { getNoteForConcept, saveNote } = useUserNotes();
  const [activeTab, setActiveTab] = useState('learn');
  const [concept, setConcept] = useState<ConceptCard | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [userNotes, setUserNotes] = useState('');

  useEffect(() => {
    if (conceptId && conceptCards.length > 0) {
      const foundConcept = conceptCards.find(card => card.id === conceptId);
      if (foundConcept) {
        setConcept(foundConcept);
        setIsBookmarked(foundConcept.bookmarked || false);
        setUserNotes(getNoteForConcept(conceptId));
      }
    }
  }, [conceptId, conceptCards, getNoteForConcept]);

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: isBookmarked ? "Concept removed from revision list" : "Concept bookmarked for revision",
    });
  };

  const handleSaveNotes = () => {
    if (conceptId) {
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
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard/student')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          
          <Button
            variant={isBookmarked ? "default" : "outline"}
            onClick={handleBookmarkToggle}
            className="flex items-center gap-2"
          >
            {isBookmarked ? (
              <BookmarkCheck className="h-4 w-4" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
            {isBookmarked ? "Bookmarked" : "Bookmark"}
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
                        {/* Force Vector Visualization */}
                        <div className="bg-purple-50 dark:bg-purple-950/30 p-6 rounded-lg">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Force Vector Visualization</h3>
                            <Button 
                              onClick={() => {
                                const audioExplanation = `This visualization demonstrates how forces act as vectors in ${concept.title}. You can see the magnitude and direction of forces represented by arrows. The length of each arrow represents the force magnitude, while the direction shows where the force is applied.`;
                                if ('speechSynthesis' in window) {
                                  const utterance = new SpeechSynthesisUtterance(audioExplanation);
                                  utterance.rate = 0.9;
                                  window.speechSynthesis.speak(utterance);
                                }
                              }}
                              className="flex items-center gap-2"
                              size="sm"
                            >
                              <Video className="h-4 w-4" />
                              Explain
                            </Button>
                          </div>
                          
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg min-h-[200px] flex items-center justify-center">
                            <div className="relative w-full h-48">
                              {/* Simulated force vectors */}
                              <svg className="w-full h-full" viewBox="0 0 400 200">
                                <defs>
                                  <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                                          refX="0" refY="3.5" orient="auto">
                                    <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
                                  </marker>
                                </defs>
                                
                                {/* Object */}
                                <rect x="180" y="80" width="40" height="40" fill="#ef4444" stroke="#dc2626" strokeWidth="2" rx="4"/>
                                <text x="200" y="105" textAnchor="middle" className="fill-white text-sm font-bold">Mass</text>
                                
                                {/* Force vectors */}
                                <line x1="200" y1="100" x2="280" y2="100" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowhead)"/>
                                <text x="240" y="95" textAnchor="middle" className="fill-blue-600 text-sm font-bold">F₁ = 50N</text>
                                
                                <line x1="200" y1="100" x2="120" y2="100" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowhead)"/>
                                <text x="160" y="95" textAnchor="middle" className="fill-green-600 text-sm font-bold">F₂ = 30N</text>
                                
                                <line x1="200" y1="100" x2="200" y2="40" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrowhead)"/>
                                <text x="220" y="70" className="fill-amber-600 text-sm font-bold">F₃ = 20N</text>
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* Mass-Acceleration Relationship */}
                        <div className="bg-green-50 dark:bg-green-950/30 p-6 rounded-lg">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Mass-Acceleration Relationship</h3>
                            <Button 
                              onClick={() => {
                                const audioExplanation = `This graph shows the inverse relationship between mass and acceleration in ${concept.title}. As you can see, when mass increases, acceleration decreases for the same applied force. This demonstrates Newton's Second Law: F equals m times a.`;
                                if ('speechSynthesis' in window) {
                                  const utterance = new SpeechSynthesisUtterance(audioExplanation);
                                  utterance.rate = 0.9;
                                  window.speechSynthesis.speak(utterance);
                                }
                              }}
                              className="flex items-center gap-2"
                              size="sm"
                            >
                              <Video className="h-4 w-4" />
                              Explain
                            </Button>
                          </div>
                          
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                            <svg className="w-full h-64" viewBox="0 0 400 250">
                              {/* Axes */}
                              <line x1="50" y1="200" x2="350" y2="200" stroke="currentColor" strokeWidth="2"/>
                              <line x1="50" y1="200" x2="50" y2="50" stroke="currentColor" strokeWidth="2"/>
                              
                              {/* Labels */}
                              <text x="200" y="230" textAnchor="middle" className="text-sm">Mass (kg)</text>
                              <text x="25" y="125" textAnchor="middle" className="text-sm" transform="rotate(-90 25 125)">Acceleration (m/s²)</text>
                              
                              {/* Curve */}
                              <path d="M 60 70 Q 150 80 200 120 T 340 180" stroke="#3b82f6" strokeWidth="3" fill="none"/>
                              
                              {/* Data points */}
                              <circle cx="80" cy="75" r="4" fill="#ef4444"/>
                              <circle cx="150" cy="100" r="4" fill="#ef4444"/>
                              <circle cx="220" cy="140" r="4" fill="#ef4444"/>
                              <circle cx="290" cy="170" r="4" fill="#ef4444"/>
                            </svg>
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

                    {/* Quick Recall Test Section */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Brain className="h-5 w-5 text-blue-600" />
                          Quick Recall Test
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <QuickRecallTest 
                          conceptName={concept.title}
                          onComplete={(score) => {
                            console.log(`Quiz completed with score: ${score}`);
                            toast({
                              title: "Test Complete!",
                              description: `You scored ${score}% on the recall test.`,
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
