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
  Zap,
  Pencil,
  Link,
  Brain,
  GraduationCap,
  ChevronLeft,
  Share2,
  Printer
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { useConceptCardDetails } from '@/hooks/useUserStudyPlan';
import ConceptCardDetail from './ConceptCardDetail';
import { ConceptMasterySection } from './ConceptMasterySection';
import { ConceptNotesSection } from './ConceptNotesSection';
import { LinkedConceptsSection } from './LinkedConceptsSection';
import { ConceptFlashcardsSection } from './ConceptFlashcardsSection';
import { ConceptExamSection } from './ConceptExamSection';
import FormulaTabContent from './FormulaTabContent';
import { ConceptCard as ConceptCardType } from '@/types/user/conceptCard';

const ConceptCardDetailPage: React.FC = () => {
  const { conceptId, id } = useParams<{ conceptId: string; id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const effectiveId = conceptId || id; // Use conceptId if available, otherwise use id
  
  const { conceptCard, loading } = useConceptCardDetails(effectiveId || '');
  const [activeTab, setActiveTab] = useState('overview');
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [showActions, setShowActions] = useState(false);

  useEffect(() => {
    console.log("ConceptCardDetailPage - Loaded with conceptId:", conceptId, "or id:", id);
    console.log("Current route path:", window.location.pathname);
    console.log("Effective ID for fetching details:", effectiveId);
    
    if (!effectiveId) {
      console.error("No concept ID found in URL parameters");
      toast({
        title: "Error",
        description: "Couldn't load concept details - missing ID",
        variant: "destructive",
      });
      navigate('/dashboard/student/concepts');
    }
    
    // Initialize bookmarked state if available in concept card
    if (conceptCard && 'bookmarked' in conceptCard) {
      setBookmarked(Boolean(conceptCard.bookmarked));
    }
  }, [conceptId, id, navigate, toast, conceptCard, effectiveId]);

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
  
  const handleOpenFormulaLab = () => {
    toast({
      title: "Formula Lab",
      description: "Opening interactive formula practice environment",
    });
    // You would navigate to the formula lab or open a modal here
    if (effectiveId) {
      navigate(`/dashboard/student/concepts/${effectiveId}/formula-lab`);
    }
  };

  const difficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'medium': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    }
  };

  const speakContent = () => {
    if (conceptCard && conceptCard.content && 'speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      // Create utterance with proper PREPZR pronunciation
      const correctedText = conceptCard.content
        .replace(/PREPZR/gi, 'Prep-zer')
        .replace(/prepzr/gi, 'Prep-zer')
        .replace(/Prepzr/g, 'Prep-zer');
      
      const utterance = new SpeechSynthesisUtterance(correctedText);
      
      // Use voices API to find an appropriate Hindi/Indian voice
      const voices = window.speechSynthesis.getVoices();
      let selectedVoice = null;
      
      // Try to find a Hindi voice first
      selectedVoice = voices.find(v => v.lang === 'hi-IN');
      
      // If no Hindi voice found, try for Indian English voice
      if (!selectedVoice) {
        selectedVoice = voices.find(v => v.lang === 'en-IN');
      }
      
      // If still no match, use any available voice
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      
      // Set properties
      utterance.rate = 0.9; // Slightly slower for better comprehension
      utterance.pitch = 1.1; // Slightly higher pitch for female voice
      utterance.volume = 0.8;
      
      // Speak the message
      window.speechSynthesis.speak(utterance);
      
      toast({
        title: "Reading concept content",
        description: "Listening to concept explanation",
      });
    }
  };

  const toggleActions = () => {
    setShowActions(!showActions);
  };

  const printContent = () => {
    window.print();
    toast({
      title: "Print initiated",
      description: "Preparing concept for printing",
    });
  };

  const shareContent = () => {
    // Implement share functionality (e.g., copy link, export PDF, etc.)
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Concept link copied to clipboard",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh] bg-gradient-to-b from-blue-50/50 to-white dark:from-gray-900/20 dark:to-gray-900">
        <div className="text-center">
          <div className="h-16 w-16 border-4 border-t-primary border-primary/30 rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-semibold text-primary">Loading Concept</h2>
          <p className="text-muted-foreground mt-2">Please wait while we prepare your concept details...</p>
        </div>
      </div>
    );
  }

  if (!conceptCard) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] p-4 bg-gradient-to-b from-blue-50/50 to-white dark:from-gray-900/20 dark:to-gray-900">
        <div className="text-center">
          <BookOpen className="h-20 w-20 text-gray-400 mx-auto mb-6" />
          <h2 className="text-3xl font-semibold text-gray-600 mb-3">Concept Not Found</h2>
          <p className="text-gray-500 mt-2 mb-6 max-w-md">The concept you're looking for doesn't seem to exist or might have been moved.</p>
          <Button onClick={handleBackClick} size="lg">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  // Calculate mastery percentage based on available metrics
  const masteryPercent = (conceptCard as any).recallAccuracy || 
    (conceptCard as any).quizScore || 
    (conceptCard.progress ? conceptCard.progress : 0);

  // Safe access to extended properties
  const extendedCard = conceptCard as any;
  const timeSuggestion = extendedCard.timeSuggestion || conceptCard.estimatedTime;
  const examReady = extendedCard.examReady;
  const recallAccuracy = extendedCard.recallAccuracy;
  const lastPracticed = extendedCard.lastPracticed;
  const quizScore = extendedCard.quizScore;
  const flashcardsTotal = extendedCard.flashcardsTotal;
  const flashcardsCompleted = extendedCard.flashcardsCompleted;

  return (
    <div className="container max-w-7xl mx-auto px-4 py-6 bg-gradient-to-b from-blue-50/50 to-white dark:from-gray-900/20 dark:to-gray-900">
      {/* Back button and page title with action menu */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleBackClick}
            className="mr-2 group flex items-center gap-1 hover:bg-primary/10"
          >
            <ChevronLeft className="h-5 w-5 mr-1 group-hover:transform group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back</span>
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Concept Details
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={speakContent}
            className="text-primary"
          >
            <Volume className="h-4 w-4 mr-2" />
            Listen
          </Button>
          
          <div className="relative">
            <Button 
              variant="outline" 
              size="sm"
              onClick={toggleActions}
              className={showActions ? "bg-primary/10" : ""}
            >
              More Actions
            </Button>
            
            {showActions && (
              <div className="absolute right-0 top-10 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2 z-10 min-w-48 border">
                <div className="flex flex-col gap-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={shareContent}
                    className="justify-start"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Concept
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={printContent}
                    className="justify-start"
                  >
                    <Printer className="h-4 w-4 mr-2" />
                    Print Content
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Concept header card */}
      <Card className="mb-8 overflow-hidden border-none shadow-lg bg-gradient-to-br from-white to-blue-50/70 dark:from-gray-800 dark:to-gray-900/90">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge className={`${difficultyColor(conceptCard.difficulty)} font-medium px-3 py-1`}>
                  {conceptCard.difficulty.charAt(0).toUpperCase() + conceptCard.difficulty.slice(1)}
                </Badge>
                <Badge variant="outline" className="border-blue-300 text-blue-700 dark:text-blue-400 px-3 py-1">
                  {conceptCard.subject}
                </Badge>
                {conceptCard.chapter && (
                  <Badge variant="outline" className="border-purple-300 text-purple-700 dark:text-purple-400 px-3 py-1">
                    {conceptCard.chapter}
                  </Badge>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900 dark:text-white">
                {conceptCard.title}
              </h1>
              <p className="text-muted-foreground text-lg mb-5 max-w-3xl">
                {conceptCard.description}
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6 mt-5">
                {timeSuggestion !== undefined && (
                  <div className="bg-blue-50/80 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800 flex items-center gap-3">
                    <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full">
                      <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">Study Time</div>
                      <div className="text-lg font-semibold">{timeSuggestion} min</div>
                    </div>
                  </div>
                )}
                
                <div className="bg-purple-50/80 dark:bg-purple-900/20 p-3 rounded-lg border border-purple-100 dark:border-purple-800 flex items-center gap-3">
                  <div className="bg-purple-100 dark:bg-purple-800 p-2 rounded-full">
                    <Brain className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm text-purple-600 dark:text-purple-400 font-medium">Mastery Level</div>
                    <div className="text-lg font-semibold">
                      {masteryPercent ? `${Math.round(masteryPercent)}%` : 'Not studied yet'}
                    </div>
                  </div>
                </div>
                
                {examReady !== undefined && (
                  <div className={`${examReady ? 'bg-green-50/80 dark:bg-green-900/20 border-green-100 dark:border-green-800' : 'bg-amber-50/80 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800'} p-3 rounded-lg border flex items-center gap-3`}>
                    <div className={`${examReady ? 'bg-green-100 dark:bg-green-800' : 'bg-amber-100 dark:bg-amber-800'} p-2 rounded-full`}>
                      <GraduationCap className={`h-5 w-5 ${examReady ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`} />
                    </div>
                    <div>
                      <div className={`text-sm font-medium ${examReady ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`}>
                        Exam Status
                      </div>
                      <div className="text-lg font-semibold">
                        {examReady ? 'Ready' : 'Needs practice'}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex flex-col items-center sm:items-end gap-4">
              {/* Mastery circle  */}
              <div className="w-32 h-32 relative">
                <div className="w-full h-full rounded-full bg-blue-100/50 dark:bg-blue-900/30 flex items-center justify-center shadow-inner">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-700 dark:text-blue-400">
                      {masteryPercent ? Math.round(masteryPercent) : 0}%
                    </div>
                    <div className="text-sm text-blue-600 dark:text-blue-500">Mastery</div>
                  </div>
                </div>
                <svg className="w-32 h-32 absolute top-0 left-0 -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50" cy="50" r="46" 
                    className="stroke-blue-200 dark:stroke-blue-800/50 fill-none"
                    strokeWidth="6"
                  />
                  <circle
                    cx="50" cy="50" r="46" 
                    className="stroke-blue-600 dark:stroke-blue-500 fill-none"
                    strokeWidth="6"
                    strokeDasharray={`${2 * Math.PI * 46}`}
                    strokeDashoffset={`${2 * Math.PI * 46 * (1 - (masteryPercent || 0) / 100)}`}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={toggleBookmark} 
                  variant={bookmarked ? "default" : "outline"} 
                  size="sm"
                  className={`${bookmarked ? "bg-amber-600 hover:bg-amber-700" : ""} transition-all duration-300 px-4`}
                >
                  <BookmarkPlus className={`h-5 w-5 mr-2 ${bookmarked ? "animate-bounce" : ""}`} />
                  {bookmarked ? 'Bookmarked' : 'Bookmark'}
                </Button>
                
                <Button 
                  onClick={handleStudyNow} 
                  className="bg-gradient-to-br from-primary to-primary-dark hover:from-primary-dark hover:to-primary transition-all duration-300 px-6"
                >
                  <Zap className="h-5 w-5 mr-2" />
                  Study Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="bg-white dark:bg-gray-800/80 shadow-sm rounded-t-lg border p-2">
          <TabsList className="grid grid-cols-3 lg:grid-cols-7 gap-1">
            <TabsTrigger value="overview" className="flex items-center gap-2 py-2.5">
              <BookOpen className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="formulas" className="flex items-center gap-2 py-2.5">
              <Book className="h-4 w-4" />
              <span>Formulas</span>
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex items-center gap-2 py-2.5">
              <Pencil className="h-4 w-4" />
              <span>Notes</span>
            </TabsTrigger>
            <TabsTrigger value="mastery" className="flex items-center gap-2 py-2.5">
              <Star className="h-4 w-4" />
              <span>Mastery</span>
            </TabsTrigger>
            <TabsTrigger value="linked" className="flex items-center gap-2 py-2.5">
              <Link className="h-4 w-4" />
              <span>Related</span>
            </TabsTrigger>
            <TabsTrigger value="flashcards" className="flex items-center gap-2 py-2.5">
              <Book className="h-4 w-4" />
              <span>Flashcards</span>
            </TabsTrigger>
            <TabsTrigger value="exams" className="flex items-center gap-2 py-2.5">
              <GraduationCap className="h-4 w-4" />
              <span>Exams</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <div className="bg-white dark:bg-gray-800/80 rounded-b-lg shadow-lg border border-t-0 p-0">
          <TabsContent value="overview" className="mt-0 focus:outline-none animate-in fade-in-50 duration-300">
            <ConceptCardDetail conceptCard={conceptCard as ConceptCardType} />
          </TabsContent>
          
          <TabsContent value="formulas" className="mt-0 focus:outline-none animate-in fade-in-50 duration-300">
            <FormulaTabContent 
              conceptId={conceptCard.id} 
              conceptTitle={conceptCard.title} 
              handleOpenFormulaLab={handleOpenFormulaLab} 
            />
          </TabsContent>
          
          <TabsContent value="notes" className="mt-0 focus:outline-none animate-in fade-in-50 duration-300">
            <ConceptNotesSection conceptId={conceptCard.id} conceptTitle={conceptCard.title} />
          </TabsContent>
          
          <TabsContent value="mastery" className="mt-0 focus:outline-none animate-in fade-in-50 duration-300">
            <ConceptMasterySection 
              conceptId={conceptCard.id} 
              recallAccuracy={recallAccuracy}
              lastPracticed={lastPracticed}
              quizScore={quizScore} 
            />
          </TabsContent>
          
          <TabsContent value="linked" className="mt-0 focus:outline-none animate-in fade-in-50 duration-300">
            <LinkedConceptsSection 
              conceptId={conceptCard.id}
              relatedConcepts={conceptCard.relatedConcepts} 
            />
          </TabsContent>
          
          <TabsContent value="flashcards" className="mt-0 focus:outline-none animate-in fade-in-50 duration-300">
            <ConceptFlashcardsSection 
              conceptId={conceptCard.id}
              conceptTitle={conceptCard.title}
              flashcardsTotal={flashcardsTotal}
              flashcardsCompleted={flashcardsCompleted}
            />
          </TabsContent>
          
          <TabsContent value="exams" className="mt-0 focus:outline-none animate-in fade-in-50 duration-300">
            <ConceptExamSection 
              conceptId={conceptCard.id}
              conceptTitle={conceptCard.title}
              examReady={examReady}
            />
          </TabsContent>
        </div>
      </Tabs>

      {/* Add debug info that will be shown during development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-0 right-0 bg-black/80 text-white p-2 text-xs max-w-xs overflow-auto m-2 rounded">
          <p>Route: {window.location.pathname}</p>
          <p>conceptId: {conceptId}</p>
          <p>id: {id}</p>
          <p>effectiveId: {effectiveId}</p>
          <p>cardId: {conceptCard.id}</p>
        </div>
      )}
    </div>
  );
};

export default ConceptCardDetailPage;
