
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
import { motion } from 'framer-motion';

const ConceptDetailPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { conceptCards } = useUserStudyPlan();
  const [activeTab, setActiveTab] = useState('learn');
  const [concept, setConcept] = useState<ConceptCard | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);

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

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // Global play/pause logic will be handled by individual tabs
  };

  const handleReset = () => {
    setIsPlaying(false);
    // Reset logic will be handled by individual tabs
  };

  const handleAudioToggle = () => {
    setAudioEnabled(!audioEnabled);
    if (!audioEnabled && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
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
          
          {/* Global Controls */}
          <div className="flex items-center gap-2 ml-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={handleAudioToggle}
              className="flex items-center gap-2"
            >
              {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              {audioEnabled ? 'Audio On' : 'Audio Off'}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handlePlayPause}
              className="flex items-center gap-2"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isPlaying ? 'Pause' : 'Play'}
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
          </div>
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
            
            <motion.div 
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-6 bg-white dark:bg-gray-800 rounded-xl p-1">
                  <TabsTrigger value="learn" className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                    <BookOpen className="h-4 w-4" />
                    Learn
                  </TabsTrigger>
                  <TabsTrigger value="diagrams" className="flex items-center gap-2 data-[state=active]:bg-green-500 data-[state=active]:text-white">
                    <Eye className="h-4 w-4" />
                    Diagrams
                  </TabsTrigger>
                  <TabsTrigger value="3d" className="flex items-center gap-2 data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                    <Brain className="h-4 w-4" />
                    Advanced 3D Interactive Lab
                  </TabsTrigger>
                  <TabsTrigger value="tools" className="flex items-center gap-2 data-[state=active]:bg-amber-500 data-[state=active]:text-white">
                    <Lightbulb className="h-4 w-4" />
                    Learning Tools
                  </TabsTrigger>
                  <TabsTrigger value="notes" className="flex items-center gap-2 data-[state=active]:bg-gray-500 data-[state=active]:text-white">
                    <FileText className="h-4 w-4" />
                    Notes
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="learn" className="mt-0">
                  <EnhancedLearnTab 
                    conceptName={concept.title} 
                    isPlaying={isPlaying}
                    audioEnabled={audioEnabled}
                    onPlayStateChange={setIsPlaying}
                  />
                </TabsContent>

                <TabsContent value="diagrams" className="mt-0">
                  <EnhancedDiagramsTab 
                    conceptName={concept.title}
                    subject={concept.subject}
                    isPlaying={isPlaying}
                    audioEnabled={audioEnabled}
                    onPlayStateChange={setIsPlaying}
                  />
                </TabsContent>

                <TabsContent value="3d" className="mt-0">
                  <Enhanced3DTab 
                    conceptName={concept.title}
                    subject={concept.subject}
                    isPlaying={isPlaying}
                    audioEnabled={audioEnabled}
                    onPlayStateChange={setIsPlaying}
                  />
                </TabsContent>

                <TabsContent value="tools" className="mt-0">
                  <div className="space-y-6">
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
            </motion.div>
          </div>

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
