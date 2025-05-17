
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { 
  BookOpen, 
  Check, 
  Clock, 
  Star, 
  BookOpen as Book,
  Volume, 
  BookmarkPlus,
  Lightning,
  Pencil,
  Link,
  Brain,
  GraduationCap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { useConceptCardDetails } from '@/hooks/useUserStudyPlan';
import ConceptCardDetail from './ConceptCardDetail';
import { ConceptMasterySection } from './ConceptMasterySection';
import { ConceptNotesSection } from './ConceptNotesSection';
import { LinkedConceptsSection } from './LinkedConceptsSection';
import { ConceptFlashcardsSection } from './ConceptFlashcardsSection';
import { ConceptExamSection } from './ConceptExamSection';

const ConceptCardDetailPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { conceptCard, loading } = useConceptCardDetails(conceptId || '');
  const [activeTab, setActiveTab] = useState('overview');
  const [bookmarked, setBookmarked] = useState<boolean>(false);

  useEffect(() => {
    if (conceptId) {
      console.log("Loading concept details for:", conceptId);
    }
  }, [conceptId]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const toggleBookmark = () => {
    setBookmarked(!bookmarked);
    toast({
      title: bookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: bookmarked 
        ? "This concept has been removed from your bookmarks" 
        : "This concept has been added to your bookmarks",
    });
  };

  const handleStudyNow = () => {
    toast({
      title: "Study session started",
      description: "Beginning focused study session for this concept",
    });
    // You would navigate to a study mode or start a timer here
  };

  const difficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'medium': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-t-blue-600 border-blue-200 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold text-primary">Loading Concept</h2>
          <p className="text-muted-foreground mt-2">Please wait while we prepare your concept details...</p>
        </div>
      </div>
    );
  }

  if (!conceptCard) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] p-4">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-600">Concept Not Found</h2>
          <p className="text-gray-500 mt-2 mb-6">The concept you're looking for doesn't seem to exist.</p>
          <Button onClick={handleBackClick}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  // Calculate mastery percentage based on recallAccuracy, quizScore, and completion status
  const masteryPercent = conceptCard.recallAccuracy || 
    (conceptCard.quizScore || 
    (conceptCard.progress ? conceptCard.progress : 0));

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      {/* Back button and page title */}
      <div className="mb-6 flex items-center">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleBackClick}
          className="mr-4"
        >
          ← Back
        </Button>
        <h1 className="text-2xl font-bold">Concept Details</h1>
      </div>

      {/* Concept header card */}
      <Card className="mb-8 overflow-hidden border-t-4 border-t-blue-600 shadow-md">
        <div className="bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-950/50 dark:to-violet-950/50 p-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge className={difficultyColor(conceptCard.difficulty)}>
                  {conceptCard.difficulty.charAt(0).toUpperCase() + conceptCard.difficulty.slice(1)}
                </Badge>
                <Badge variant="outline" className="border-blue-300 text-blue-700 dark:text-blue-400">
                  {conceptCard.subject}
                </Badge>
                {conceptCard.chapter && (
                  <Badge variant="outline" className="border-purple-300 text-purple-700 dark:text-purple-400">
                    {conceptCard.chapter}
                  </Badge>
                )}
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{conceptCard.title}</h1>
              <p className="text-muted-foreground mb-4">{conceptCard.description}</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                {conceptCard.timeSuggestion && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">{conceptCard.timeSuggestion} min</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-purple-600" />
                  <span className="text-sm">
                    {masteryPercent ? `${Math.round(masteryPercent)}% mastery` : 'Not studied yet'}
                  </span>
                </div>
                
                {conceptCard.examReady !== undefined && (
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-green-600" />
                    <span className="text-sm">
                      {conceptCard.examReady ? 'Exam ready' : 'Needs review'}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex flex-col items-center sm:items-end gap-3">
              <div className="w-24 h-24 relative">
                <div className="w-full h-full rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                      {masteryPercent ? Math.round(masteryPercent) : 0}%
                    </div>
                    <div className="text-xs text-blue-600 dark:text-blue-500">Mastery</div>
                  </div>
                </div>
                <svg className="w-24 h-24 absolute top-0 left-0 -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50" cy="50" r="45" 
                    className="stroke-blue-200 dark:stroke-blue-800/50 fill-none"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50" cy="50" r="45" 
                    className="stroke-blue-600 dark:stroke-blue-500 fill-none"
                    strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    strokeDashoffset={`${2 * Math.PI * 45 * (1 - (masteryPercent || 0) / 100)}`}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={toggleBookmark} 
                  variant={bookmarked ? "default" : "outline"} 
                  size="sm"
                  className={bookmarked ? "bg-amber-600 hover:bg-amber-700" : ""}
                >
                  <BookmarkPlus className="h-4 w-4 mr-1" />
                  {bookmarked ? 'Bookmarked' : 'Bookmark'}
                </Button>
                
                <Button onClick={handleStudyNow}>
                  <Lightning className="h-4 w-4 mr-1" />
                  Study Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-6 mb-6">
          <TabsTrigger value="overview" className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="notes" className="flex items-center gap-1">
            <Pencil className="h-4 w-4" />
            <span className="hidden sm:inline">Notes</span>
          </TabsTrigger>
          <TabsTrigger value="mastery" className="flex items-center gap-1">
            <Star className="h-4 w-4" />
            <span className="hidden sm:inline">Mastery</span>
          </TabsTrigger>
          <TabsTrigger value="linked" className="flex items-center gap-1">
            <Link className="h-4 w-4" />
            <span className="hidden sm:inline">Related</span>
          </TabsTrigger>
          <TabsTrigger value="flashcards" className="flex items-center gap-1">
            <Book className="h-4 w-4" />
            <span className="hidden sm:inline">Flashcards</span>
          </TabsTrigger>
          <TabsTrigger value="exams" className="flex items-center gap-1">
            <GraduationCap className="h-4 w-4" />
            <span className="hidden sm:inline">Exams</span>
          </TabsTrigger>
        </TabsList>
        
        <div className="bg-white dark:bg-gray-800/40 rounded-lg shadow-sm border p-1">
          <TabsContent value="overview" className="mt-0 focus:outline-none">
            <ConceptCardDetail conceptCard={conceptCard} />
          </TabsContent>
          
          <TabsContent value="notes" className="mt-0 focus:outline-none">
            <ConceptNotesSection conceptId={conceptCard.id} conceptTitle={conceptCard.title} />
          </TabsContent>
          
          <TabsContent value="mastery" className="mt-0 focus:outline-none">
            <ConceptMasterySection 
              conceptId={conceptCard.id} 
              recallAccuracy={conceptCard.recallAccuracy}
              lastPracticed={conceptCard.lastPracticed}
              quizScore={conceptCard.quizScore} 
            />
          </TabsContent>
          
          <TabsContent value="linked" className="mt-0 focus:outline-none">
            <LinkedConceptsSection 
              conceptId={conceptCard.id}
              relatedConcepts={conceptCard.relatedConcepts} 
            />
          </TabsContent>
          
          <TabsContent value="flashcards" className="mt-0 focus:outline-none">
            <ConceptFlashcardsSection 
              conceptId={conceptCard.id}
              conceptTitle={conceptCard.title}
              flashcardsTotal={conceptCard.flashcardsTotal}
              flashcardsCompleted={conceptCard.flashcardsCompleted}
            />
          </TabsContent>
          
          <TabsContent value="exams" className="mt-0 focus:outline-none">
            <ConceptExamSection 
              conceptId={conceptCard.id}
              conceptTitle={conceptCard.title}
              examReady={conceptCard.examReady}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ConceptCardDetailPage;
