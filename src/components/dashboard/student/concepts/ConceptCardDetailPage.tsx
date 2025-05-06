
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  BookOpen, 
  Brain, 
  FileText, 
  CheckCircle, 
  Play, 
  PlusCircle, 
  Timer, 
  Award
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useConceptCards } from '@/hooks/useConceptCards';
import { useFlashcardDecks } from '@/hooks/useFlashcardDecks';
import { usePracticeExams } from '@/hooks/usePracticeExams';
import RelatedConceptCards from './RelatedConceptCards';
import ConceptCardSkeleton from './ConceptCardSkeleton';
import SmartStudyTips from './SmartStudyTips';
import RevisionReminder from './RevisionReminder';

// Simplified model of the concept card
interface ConceptCard {
  id: string;
  title: string;
  subject: string;
  topic: string;
  subtopic?: string;
  content: string;
  difficulty: 'easy' | 'medium' | 'hard';
  importance: 'high' | 'medium' | 'low';
  status: 'not-started' | 'in-progress' | 'completed';
  lastStudied?: string;
  timeSpent?: number;
  studyCount?: number;
  recallAccuracy?: number;
  relatedConcepts?: string[];
  summary?: string;
  imageUrl?: string;
  videoUrl?: string;
}

const ConceptCardDetailPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [conceptCard, setConceptCard] = useState<ConceptCard | null>(null);
  const [relatedCards, setRelatedCards] = useState<ConceptCard[]>([]);
  
  const { getConceptCardById, getRelatedConceptCards } = useConceptCards();
  const { hasDeckForConcept } = useFlashcardDecks();
  const { hasExamsForConcept } = usePracticeExams();
  
  const [hasFlashcards, setHasFlashcards] = useState(false);
  const [hasPracticeExams, setHasPracticeExams] = useState(false);
  
  // Load concept card and related data
  useEffect(() => {
    const loadData = async () => {
      if (!conceptId) return;
      
      setIsLoading(true);
      try {
        // In a real app, these would be API calls
        const card = await getConceptCardById(conceptId);
        const related = await getRelatedConceptCards(conceptId);
        const hasFlashcardsResult = await hasDeckForConcept(conceptId);
        const hasExamsResult = await hasExamsForConcept(conceptId);
        
        setConceptCard(card);
        setRelatedCards(related);
        setHasFlashcards(hasFlashcardsResult);
        setHasPracticeExams(hasExamsResult);
      } catch (error) {
        console.error("Error loading concept card:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [conceptId, getConceptCardById, getRelatedConceptCards, hasDeckForConcept, hasExamsForConcept]);
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  const handleStartStudying = () => {
    // Update to navigate to the proper study page
    navigate(`/dashboard/student/concepts/${conceptId}/study`);
  };
  
  const handleCreateFlashcards = () => {
    navigate(`/dashboard/student/flashcards/create?conceptId=${conceptId}`);
  };
  
  const handlePracticeFlashcards = () => {
    navigate(`/dashboard/student/flashcards/${conceptId}`);
  };
  
  const handleDoPracticeExam = () => {
    navigate(`/dashboard/student/practice-exam/${conceptId}/start`);
  };
  
  if (isLoading) {
    return <ConceptCardSkeleton />;
  }
  
  if (!conceptCard) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold mb-4">Concept Card Not Found</h2>
        <p className="text-muted-foreground mb-4">Sorry, we couldn't find the concept card you were looking for.</p>
        <Button onClick={handleGoBack}>Go Back</Button>
      </div>
    );
  }

  // Calculate mastery percentage (would typically come from backend)
  const masteryPercentage = 
    conceptCard.status === 'completed' ? 100 :
    conceptCard.status === 'in-progress' ? 
      (conceptCard.recallAccuracy || Math.floor(Math.random() * 50) + 30) : 0;
  
  return (
    <div className="container max-w-4xl mx-auto p-4 sm:p-6">
      {/* Back button & Header */}
      <div className="mb-6">
        <Button variant="ghost" size="sm" onClick={handleGoBack} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">{conceptCard.title}</h1>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                {conceptCard.subject}
              </Badge>
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                {conceptCard.topic}
              </Badge>
              {conceptCard.subtopic && (
                <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200">
                  {conceptCard.subtopic}
                </Badge>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={handleStartStudying} className="gap-2">
              <Play className="h-4 w-4" />
              Study Now
            </Button>
          </div>
        </div>
      </div>

      {/* Mastery Progress */}
      <Card className="mb-6 overflow-hidden">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-6 items-center justify-between">
            <div className="w-full sm:w-3/4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Concept Mastery</h3>
                <span className="text-sm font-semibold">
                  {masteryPercentage}%
                </span>
              </div>
              <Progress value={masteryPercentage} className="h-2" />
              
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Not Started</span>
                <span>In Progress</span>
                <span>Mastered</span>
              </div>
            </div>
            
            <div className="flex sm:flex-col items-center sm:items-end gap-4 sm:gap-1 text-center sm:text-right">
              <div className="text-xs text-gray-500">Last studied</div>
              <div className="font-medium">
                {conceptCard.lastStudied || 'Never'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="w-full sm:w-auto grid grid-cols-3 h-auto p-1">
          <TabsTrigger value="overview" className="py-2">Overview</TabsTrigger>
          <TabsTrigger value="study" className="py-2">Study</TabsTrigger>
          <TabsTrigger value="related" className="py-2">Related</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-4">
          <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: conceptCard.content || '<p>No content available</p>' }} />
          </div>
          
          {conceptCard.videoUrl && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Video Explanation</h3>
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <iframe 
                  src={conceptCard.videoUrl} 
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                  title={`Video for ${conceptCard.title}`}
                ></iframe>
              </div>
            </div>
          )}
          
          {conceptCard.summary && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Key Takeaways</h3>
              <p className="text-sm text-gray-700">{conceptCard.summary}</p>
            </div>
          )}
        </TabsContent>
        
        {/* Study Tab */}
        <TabsContent value="study" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Main Study Action */}
            <Card className="p-4 border-2 border-blue-200 bg-blue-50">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium mb-2">Study This Concept</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Interactive study mode with explanations, examples, and self-assessment.
                  </p>
                  <Button 
                    onClick={handleStartStudying} 
                    className="w-full"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Start Studying
                  </Button>
                </div>
              </div>
            </Card>
            
            {/* Flashcards */}
            <Card className="p-4">
              <div className="flex items-start gap-4">
                <div className="bg-violet-100 p-3 rounded-full">
                  <Brain className="h-6 w-6 text-violet-600" />
                </div>
                <div>
                  <h3 className="font-medium mb-2">Flashcards</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {hasFlashcards 
                      ? 'Practice with flashcards to improve recall'
                      : 'No flashcards yet for this concept'}
                  </p>
                  {hasFlashcards ? (
                    <Button 
                      onClick={handlePracticeFlashcards} 
                      variant="outline" 
                      className="w-full"
                    >
                      <Brain className="mr-2 h-4 w-4" />
                      Practice Flashcards
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleCreateFlashcards} 
                      variant="outline" 
                      className="w-full"
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create Flashcards
                    </Button>
                  )}
                </div>
              </div>
            </Card>
            
            {/* Practice Exam */}
            <Card className="p-4">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium mb-2">Practice Questions</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {hasPracticeExams 
                      ? 'Test your understanding with practice questions'
                      : 'No practice questions available yet'}
                  </p>
                  <Button 
                    onClick={handleDoPracticeExam} 
                    variant="outline" 
                    disabled={!hasPracticeExams}
                    className="w-full"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Take Practice Test
                  </Button>
                </div>
              </div>
            </Card>
            
            {/* Mark Complete */}
            <Card className="p-4">
              <div className="flex items-start gap-4">
                <div className="bg-amber-100 p-3 rounded-full">
                  <Award className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-medium mb-2">Track Progress</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {conceptCard.status === 'completed'
                      ? 'You have mastered this concept!'
                      : 'Mark as complete when you feel confident'}
                  </p>
                  <Button 
                    variant={conceptCard.status === 'completed' ? "outline" : "default"}
                    className="w-full"
                    disabled={conceptCard.status === 'completed'}
                  >
                    {conceptCard.status === 'completed' ? (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Completed
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Mark as Complete
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <SmartStudyTips conceptName={conceptCard.title} subject={conceptCard.subject} />
            <RevisionReminder conceptName={conceptCard.title} lastStudied={conceptCard.lastStudied} />
          </div>
        </TabsContent>
        
        {/* Related Tab */}
        <TabsContent value="related" className="mt-4">
          <RelatedConceptCards cards={relatedCards} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConceptCardDetailPage;
