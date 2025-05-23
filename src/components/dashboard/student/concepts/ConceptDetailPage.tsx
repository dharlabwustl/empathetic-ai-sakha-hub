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
import EnhancedLearnTab from './EnhancedLearnTab';
import Visual3DContent from './Visual3DContent';
import QuickRecallSection from './concept-detail/QuickRecallSection';
import ConceptHeader from './concept-detail/ConceptHeader';
import ConceptSidebar from './concept-detail/ConceptSidebar';
import NoteSection from './concept-detail/NoteSection';
import { toast } from '@/hooks/use-toast';

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
        // Load user notes
        const notes = getNoteForConcept(conceptId);
        setUserNotes(notes);
        // Load bookmark status from localStorage
        const bookmarks = JSON.parse(localStorage.getItem('conceptBookmarks') || '{}');
        setIsBookmarked(bookmarks[conceptId] || false);
      }
    }
  }, [conceptId, conceptCards, getNoteForConcept]);

  const handleBookmarkToggle = () => {
    if (!conceptId) return;
    
    const bookmarks = JSON.parse(localStorage.getItem('conceptBookmarks') || '{}');
    const newBookmarkStatus = !isBookmarked;
    bookmarks[conceptId] = newBookmarkStatus;
    localStorage.setItem('conceptBookmarks', JSON.stringify(bookmarks));
    setIsBookmarked(newBookmarkStatus);
    
    toast({
      title: newBookmarkStatus ? "Bookmarked for revision" : "Removed from bookmarks",
      description: newBookmarkStatus ? "This concept has been added to your revision list" : "This concept has been removed from your revision list"
    });
  };

  const handleSaveNotes = () => {
    if (!conceptId) return;
    
    const success = saveNote(conceptId, userNotes);
    if (success) {
      toast({
        title: "Notes saved",
        description: "Your notes have been saved successfully"
      });
    } else {
      toast({
        title: "Error saving notes",
        description: "There was an error saving your notes. Please try again.",
        variant: "destructive"
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
          
          <Button
            variant={isBookmarked ? "default" : "outline"}
            onClick={handleBookmarkToggle}
            className="flex items-center gap-2"
          >
            {isBookmarked ? (
              <>
                <BookmarkCheck className="h-4 w-4" />
                Bookmarked for Revision
              </>
            ) : (
              <>
                <Bookmark className="h-4 w-4" />
                Bookmark for Revision
              </>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <ConceptHeader 
              title={concept.title}
              subject={concept.subject}
              topic={concept.topic}
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
                        {/* Force Vector Diagram */}
                        <div className="bg-purple-50 dark:bg-purple-950/30 p-6 rounded-lg">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Force Vector Analysis</h3>
                            <Button 
                              onClick={() => {
                                const explanation = `This interactive diagram shows force vectors for ${concept.title}. The arrows represent the direction and magnitude of forces. The blue arrow shows the applied force, the red arrow shows the resultant force, and the green arrow shows the acceleration direction. You can see how forces combine to create motion according to Newton's Second Law.`;
                                if ('speechSynthesis' in window) {
                                  window.speechSynthesis.cancel();
                                  const utterance = new SpeechSynthesisUtterance(explanation);
                                  utterance.rate = 0.9;
                                  window.speechSynthesis.speak(utterance);
                                }
                              }}
                              className="flex items-center gap-2"
                              variant="outline"
                              size="sm"
                            >
                              <Video className="h-4 w-4" />
                              Explain Diagram
                            </Button>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg min-h-[300px] flex items-center justify-center">
                            <svg width="400" height="250" viewBox="0 0 400 250">
                              {/* Object */}
                              <rect x="175" y="100" width="50" height="50" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2" rx="5"/>
                              <text x="200" y="130" textAnchor="middle" className="text-sm font-medium fill-white">Mass</text>
                              
                              {/* Force arrows */}
                              <defs>
                                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                                  <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
                                </marker>
                              </defs>
                              
                              {/* Applied Force */}
                              <line x1="100" y1="125" x2="170" y2="125" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrowhead)"/>
                              <text x="135" y="115" textAnchor="middle" className="text-sm font-medium fill-red-600">F = 20N</text>
                              
                              {/* Resultant acceleration */}
                              <line x1="230" y1="125" x2="300" y2="125" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowhead)"/>
                              <text x="265" y="115" textAnchor="middle" className="text-sm font-medium fill-green-600">a = 4 m/s²</text>
                              
                              {/* Labels */}
                              <text x="200" y="200" textAnchor="middle" className="text-lg font-bold fill-gray-700 dark:fill-gray-300">F = ma</text>
                              <text x="200" y="220" textAnchor="middle" className="text-sm fill-gray-600 dark:fill-gray-400">Force = Mass × Acceleration</text>
                            </svg>
                          </div>
                        </div>

                        {/* Motion Graph */}
                        <div className="bg-blue-50 dark:bg-blue-950/30 p-6 rounded-lg">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Motion Analysis Graph</h3>
                            <Button 
                              onClick={() => {
                                const explanation = `This graph demonstrates the relationship between force, mass, and acceleration over time. The blue line shows how velocity increases when a constant force is applied. The steeper the slope, the greater the acceleration. This directly relates to Newton's Second Law where F equals m times a.`;
                                if ('speechSynthesis' in window) {
                                  window.speechSynthesis.cancel();
                                  const utterance = new SpeechSynthesisUtterance(explanation);
                                  utterance.rate = 0.9;
                                  window.speechSynthesis.speak(utterance);
                                }
                              }}
                              className="flex items-center gap-2"
                              variant="outline"
                              size="sm"
                            >
                              <Video className="h-4 w-4" />
                              Explain Graph
                            </Button>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                            <svg width="400" height="250" viewBox="0 0 400 250">
                              {/* Axes */}
                              <line x1="50" y1="200" x2="350" y2="200" stroke="#6b7280" strokeWidth="2"/>
                              <line x1="50" y1="200" x2="50" y2="50" stroke="#6b7280" strokeWidth="2"/>
                              
                              {/* Grid lines */}
                              <defs>
                                <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
                                </pattern>
                              </defs>
                              <rect x="50" y="50" width="300" height="150" fill="url(#grid)"/>
                              
                              {/* Graph line */}
                              <path d="M 50 200 Q 150 150 250 100 T 350 80" stroke="#3b82f6" strokeWidth="3" fill="none"/>
                              
                              {/* Labels */}
                              <text x="200" y="230" textAnchor="middle" className="text-sm font-medium fill-gray-600">Time (s)</text>
                              <text x="25" y="125" textAnchor="middle" className="text-sm font-medium fill-gray-600" transform="rotate(-90 25 125)">Velocity (m/s)</text>
                              <text x="200" y="30" textAnchor="middle" className="text-lg font-bold fill-blue-600">Velocity vs Time</text>
                            </svg>
                          </div>
                        </div>

                        {/* Real-world Application */}
                        <div className="bg-green-50 dark:bg-green-950/30 p-6 rounded-lg">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Real-World Application</h3>
                            <Button 
                              onClick={() => {
                                const explanation = `This visualization shows a practical application of ${concept.title} in car braking. When brakes are applied, friction force opposes motion, causing deceleration. The greater the braking force, the greater the deceleration according to F equals m times a. The stopping distance depends on the mass of the car and the force applied.`;
                                if ('speechSynthesis' in window) {
                                  window.speechSynthesis.cancel();
                                  const utterance = new SpeechSynthesisUtterance(explanation);
                                  utterance.rate = 0.9;
                                  window.speechSynthesis.speak(utterance);
                                }
                              }}
                              className="flex items-center gap-2"
                              variant="outline"
                              size="sm"
                            >
                              <Video className="h-4 w-4" />
                              Explain Application
                            </Button>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg min-h-[200px] flex items-center justify-center">
                            <div className="text-center space-y-4">
                              <div className="text-4xl">🚗 ➡️ 🛑</div>
                              <h4 className="text-lg font-semibold">Car Braking System</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md">
                                When you press the brake pedal, friction forces are applied to the wheels. 
                                According to Newton's Second Law, this creates a deceleration that brings the car to a stop.
                              </p>
                              <div className="grid grid-cols-3 gap-4 text-sm">
                                <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded">
                                  <div className="font-semibold">Force</div>
                                  <div>Brake Friction</div>
                                </div>
                                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded">
                                  <div className="font-semibold">Mass</div>
                                  <div>Car Weight</div>
                                </div>
                                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded">
                                  <div className="font-semibold">Acceleration</div>
                                  <div>Deceleration</div>
                                </div>
                              </div>
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

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Study Groups
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Join study groups to discuss this concept with peers.
                          </p>
                          <Button variant="outline" size="sm" className="mt-2">
                            Find Groups
                          </Button>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Quick Recall Test Section - Moved here */}
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

                <TabsContent value="notes" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-green-600" />
                        Personal Notes
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
            <ConceptSidebar 
              masteryLevel={concept.masteryLevel || 65}
              relatedConcepts={[
                { id: '1', title: 'Newton\'s First Law', masteryLevel: 80 },
                { id: '2', title: 'Newton\'s Third Law', masteryLevel: 70 },
                { id: '3', title: 'Force and Motion', masteryLevel: 60 }
              ]}
              examReady={concept.masteryLevel >= 80}
              onRelatedConceptClick={(conceptId) => navigate(`/dashboard/student/concepts/${conceptId}`)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptDetailPage;
