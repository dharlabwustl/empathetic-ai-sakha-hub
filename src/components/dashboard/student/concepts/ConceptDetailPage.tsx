
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Eye, Brain, Lightbulb, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUserStudyPlan } from '@/hooks/useUserStudyPlan';
import { ConceptCard } from '@/types/user/conceptCard';
import EnhancedLearnTab from './EnhancedLearnTab';
import InteractiveVisualizationsTab from './InteractiveVisualizationsTab';
import Enhanced3DLabsTab from './Enhanced3DLabsTab';
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
          <div className="text-center py-8">
            <p className="text-gray-500">Concept not found or loading...</p>
          </div>
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
                    Tools
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
                  <InteractiveVisualizationsTab conceptName={concept.title} />
                </TabsContent>

                <TabsContent value="3d" className="mt-0">
                  <Enhanced3DLabsTab conceptName={concept.title} />
                </TabsContent>

                <TabsContent value="tools" className="mt-0">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-8 rounded-lg">
                    <p className="text-center text-gray-600 dark:text-gray-400">
                      Additional learning tools for {concept.title} will be available here.
                    </p>
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
