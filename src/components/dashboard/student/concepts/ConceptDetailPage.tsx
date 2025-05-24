
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Video, Calculator, Eye, Brain, Lightbulb, FileText, Users, MessageSquare, Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useUserStudyPlan } from '@/hooks/useUserStudyPlan';
import { ConceptCard } from '@/types/user/conceptCard';
import EnhancedLearnTab from './EnhancedLearnTab';
import EnhancedDiagramsTab from './EnhancedDiagramsTab';
import Enhanced3DTab from './Enhanced3DTab';
import QuickRecallSection from './concept-detail/QuickRecallSection';
import ConceptHeader from './concept-detail/ConceptHeader';
import ConceptSidebar from './concept-detail/ConceptSidebar';
import NotesSection from './NotesSection';

const ConceptDetailPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { conceptCards } = useUserStudyPlan();
  const [activeTab, setActiveTab] = useState('learn');
  const [concept, setConcept] = useState<ConceptCard | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  // Global audio controls state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

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

  // Global audio control functions
  const handlePlayPause = () => {
    if (isPlaying) {
      currentAudio?.pause();
      setIsPlaying(false);
    } else {
      if (currentAudio) {
        currentAudio.play();
        setIsPlaying(true);
      } else {
        // Start audio explanation for current tab
        startAudioForTab(activeTab);
      }
    }
  };

  const handleReset = () => {
    if (currentAudio) {
      currentAudio.currentTime = 0;
      if (isPlaying) {
        currentAudio.play();
      }
    }
  };

  const handleAudioToggle = () => {
    setIsAudioEnabled(!isAudioEnabled);
    if (!isAudioEnabled && currentAudio) {
      currentAudio.pause();
      setIsPlaying(false);
    }
  };

  const startAudioForTab = (tab: string) => {
    if (!isAudioEnabled) return;

    // Stop current audio
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.removeEventListener('ended', handleAudioEnd);
    }

    // Create new audio based on tab
    const audioContent = getAudioContentForTab(tab);
    if (audioContent && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(audioContent);
      utterance.rate = 0.9;
      utterance.volume = 0.8;
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const getAudioContentForTab = (tab: string): string => {
    const conceptName = concept?.title || "this concept";
    
    switch (tab) {
      case 'learn':
        return `Welcome to the learn section for ${conceptName}. This section provides comprehensive explanations starting from basic concepts to advanced analysis. You can choose between basic understanding, detailed explanations with examples, or advanced mathematical analysis.`;
      case 'diagrams':
        return `In the diagrams section for ${conceptName}, you'll find interactive visual representations that help illustrate key concepts. Each diagram includes hotspots and annotations for detailed exploration.`;
      case '3d':
        return `The Advanced 3D Interactive Lab for ${conceptName} provides immersive simulations and real-time parameter controls. Experiment with different variables to see how they affect the concept in real-time.`;
      case 'tools':
        return `The learning tools section offers practice quizzes, quick recall tests, and additional resources to reinforce your understanding of ${conceptName}.`;
      case 'notes':
        return `Use the notes section to create personal annotations and summaries for ${conceptName}. Your notes are automatically saved and can be accessed anytime.`;
      default:
        return `Exploring ${conceptName} with interactive content and explanations.`;
    }
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
  };

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.removeEventListener('ended', handleAudioEnd);
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentAudio]);

  // Start audio when tab changes
  useEffect(() => {
    if (concept) {
      startAudioForTab(activeTab);
    }
  }, [activeTab, concept]);

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
        <div className="flex items-center justify-between gap-4 mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard/student')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>

          {/* Global Audio Controls */}
          <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg p-2 shadow-lg">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePlayPause}
              className="flex items-center gap-2"
            >
              {isPlaying ? (
                <>
                  <Pause className="h-4 w-4" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Play
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleAudioToggle}
              className={`flex items-center gap-2 ${!isAudioEnabled ? 'bg-red-50 border-red-200' : ''}`}
            >
              {isAudioEnabled ? (
                <>
                  <Volume2 className="h-4 w-4" />
                  Audio On
                </>
              ) : (
                <>
                  <VolumeX className="h-4 w-4" />
                  Audio Off
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
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
                  <TabsTrigger value="diagrams" className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Diagrams
                  </TabsTrigger>
                  <TabsTrigger value="3d" className="flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    Advanced 3D Interactive Lab
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
                  <EnhancedLearnTab 
                    conceptName={concept.title}
                    isPlaying={isPlaying}
                    isAudioEnabled={isAudioEnabled}
                  />
                </TabsContent>

                <TabsContent value="diagrams" className="mt-0">
                  <EnhancedDiagramsTab 
                    conceptName={concept.title}
                    subject={concept.subject}
                    isPlaying={isPlaying}
                    isAudioEnabled={isAudioEnabled}
                  />
                </TabsContent>

                <TabsContent value="3d" className="mt-0">
                  <Enhanced3DTab 
                    conceptName={concept.title}
                    subject={concept.subject}
                    isPlaying={isPlaying}
                    isAudioEnabled={isAudioEnabled}
                  />
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

                    {/* AI Tutor Integration */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <MessageSquare className="h-5 w-5 text-purple-600" />
                          AI Tutor Support
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
                          <p className="text-sm text-purple-800 dark:text-purple-300 mb-3">
                            Get personalized help with {concept.title} from our AI tutor. Ask questions about specific concepts, request examples, or get explanations tailored to your learning style.
                          </p>
                          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                            Chat with AI Tutor
                          </Button>
                        </div>
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

          {/* Sidebar */}
          <div className="lg:col-span-1">
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
    </div>
  );
};

export default ConceptDetailPage;
