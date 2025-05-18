
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ShareIcon, BookOpen, Video, FileText, Brain, Bookmark, BookmarkPlus, Volume, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ConceptCard } from '@/types/user/conceptCard';
import VideoLessonsTab from './VideoLessonsTab';
import NotesTab from './NotesTab';
import PracticeTab from './PracticeTab';
import ResourcesTab from './ResourcesTab';
import { useConceptDetail } from '@/hooks/useConceptDetail';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorState from '@/components/common/ErrorState';
import ConceptMasteryCard from './ConceptMasteryCard';
import { SharedPageLayout } from '../SharedPageLayout';

const ConceptCardDetailPage = () => {
  const { toast } = useToast();
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isReading, setIsReading] = useState(false);

  // Fetch concept details
  const {
    concept,
    loading,
    error,
    updateNotes,
    incrementViews,
    toggleBookmark,
    updateMastery
  } = useConceptDetail(conceptId || 'concept-1');

  // Handle component mount
  useEffect(() => {
    if (conceptId) {
      incrementViews();
    }
  }, [conceptId, incrementViews]);

  // Handle bookmark action
  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
    toggleBookmark();
    
    toast({
      title: isBookmarked ? "Bookmark removed" : "Concept bookmarked",
      description: isBookmarked 
        ? "Removed from your saved items" 
        : "Added to your saved concepts",
    });
  };

  // Navigate to formula practice lab
  const handleOpenFormulaLab = () => {
    if (conceptId) {
      navigate(`/dashboard/student/concepts/${conceptId}/formula-lab`);
    }
  };

  // Start reading the concept content aloud
  const handleReadAloud = () => {
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      return;
    }
    
    if (concept) {
      const textToRead = `${concept.title}. ${concept.description}. ${concept.content}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 0.9;
      utterance.onend = () => setIsReading(false);
      window.speechSynthesis.speak(utterance);
      setIsReading(true);
    }
  };

  // Handle notes addition
  const handleAddNote = (note: string) => {
    if (concept && note.trim()) {
      const updatedNotes = [...(concept.notes || []), note];
      updateNotes(updatedNotes);
      
      toast({
        title: "Note added",
        description: "Your note has been saved to this concept"
      });
    }
  };

  // If loading, show loading spinner
  if (loading) {
    return <LoadingSpinner message="Loading concept details..." />;
  }

  // If error, show error state
  if (error || !concept) {
    return (
      <ErrorState 
        title="Could not load concept" 
        message={error || "Concept not found"} 
        action={<Button onClick={() => navigate(-1)}>Go Back</Button>}
      />
    );
  }

  // Format concept key points for display
  const formattedKeyPoints = concept.keyPoints?.length 
    ? concept.keyPoints 
    : concept.description?.split('. ').filter(point => point.trim().length > 0);

  return (
    <SharedPageLayout
      title={concept.title}
      subtitle={`${concept.subject} › ${concept.chapter || 'Chapter'}`}
      showBackButton={true}
      backButtonUrl="/dashboard/student/concepts"
    >
      <div className="space-y-6">
        {/* Concept intro card */}
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-violet-100 to-blue-50 dark:from-violet-950/50 dark:to-blue-950/30">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xl">{concept.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {concept.subject} · {concept.difficulty} · {concept.chapter}
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleReadAloud}
                  title={isReading ? "Stop reading" : "Read aloud"}
                >
                  <Volume className={isReading ? "text-green-500" : ""} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleBookmarkToggle}
                  title={isBookmarked ? "Remove bookmark" : "Bookmark this concept"}
                >
                  {isBookmarked ? <Bookmark className="text-blue-500" /> : <BookmarkPlus />}
                </Button>
                <Button variant="ghost" size="icon" title="Share concept">
                  <ShareIcon />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="grid gap-6 md:grid-cols-12">
              {/* Left content */}
              <div className="space-y-4 md:col-span-8">
                <div>
                  <h3 className="text-lg font-medium mb-2">Description</h3>
                  <p className="text-muted-foreground">{concept.description}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Key Points</h3>
                  <ul className="space-y-2 list-disc pl-5">
                    {formattedKeyPoints?.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
                
                {concept.formulas && concept.formulas.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium mb-2">Key Formulas</h3>
                      <Button variant="ghost" size="sm" onClick={handleOpenFormulaLab}>
                        Practice formulas
                      </Button>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-md p-3 font-mono text-sm">
                      {concept.formulas.map((formula, index) => (
                        <div key={index} className="py-1">
                          {formula}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Right sidebar */}
              <div className="md:col-span-4 space-y-4">
                <ConceptMasteryCard 
                  mastery={concept.mastery || { level: 'Beginner', percentage: 20 }}
                  onPractice={() => setActiveTab('practice')}
                />
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">Exam Relevance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{concept.examRelevance || "High importance for NEET exams. Frequently appears in MCQs and numerical questions."}</p>
                    <div className="mt-2 flex gap-2 flex-wrap">
                      <Badge variant="secondary">High Importance</Badge>
                      <Badge variant="outline">10+ Questions/Year</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="bg-slate-50 dark:bg-slate-900 px-6 py-4">
            <div className="w-full">
              <p className="text-sm text-muted-foreground mb-2">Your mastery progress</p>
              <div className="flex items-center gap-4">
                <Progress value={concept.mastery?.percentage || 20} className="flex-1" />
                <span className="text-sm font-medium">{concept.mastery?.percentage || 20}%</span>
              </div>
            </div>
          </CardFooter>
        </Card>
        
        {/* Learning tabs */}
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="overview" className="flex gap-1">
              <BookOpen className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex gap-1">
              <Video className="h-4 w-4" />
              <span>Video Lessons</span>
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex gap-1">
              <FileText className="h-4 w-4" />
              <span>Notes</span>
            </TabsTrigger>
            <TabsTrigger value="practice" className="flex gap-1">
              <Brain className="h-4 w-4" />
              <span>Practice</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex gap-1">
              <MessageCircle className="h-4 w-4" />
              <span>Resources</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Overview tab */}
          <TabsContent value="overview" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <div className="prose dark:prose-invert max-w-none">
                  <h3>Content</h3>
                  {concept.content.split('\n\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                  
                  {concept.examples && concept.examples.length > 0 && (
                    <>
                      <h3>Examples</h3>
                      {concept.examples.map((example, i) => (
                        <div key={i} className="bg-slate-50 dark:bg-slate-900 p-4 rounded-md my-2">
                          <p>{example}</p>
                        </div>
                      ))}
                    </>
                  )}
                  
                  {concept.commonMistakes && concept.commonMistakes.length > 0 && (
                    <>
                      <h3>Common Mistakes</h3>
                      <ul>
                        {concept.commonMistakes.map((mistake, i) => (
                          <li key={i}>{mistake}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Video lessons tab */}
          <TabsContent value="videos" className="mt-4">
            <VideoLessonsTab 
              videos={concept.videos || [
                {
                  id: "vid-1",
                  title: "Introduction to " + concept.title,
                  url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                  duration: "10:21",
                  thumbnail: "https://picsum.photos/640/360"
                }
              ]} 
            />
          </TabsContent>
          
          {/* Notes tab */}
          <TabsContent value="notes" className="mt-4">
            <NotesTab 
              notes={concept.notes || []} 
              onAddNote={handleAddNote}
            />
          </TabsContent>
          
          {/* Practice tab */}
          <TabsContent value="practice" className="mt-4">
            <PracticeTab
              conceptId={concept.id}
              questions={concept.practiceQuestions || []}
              onMasteryUpdate={(percentage) => updateMastery(percentage)}
            />
          </TabsContent>
          
          {/* Resources tab */}
          <TabsContent value="resources" className="mt-4">
            <ResourcesTab 
              resources={concept.resources || []}
              conceptId={concept.id}
            />
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default ConceptCardDetailPage;
