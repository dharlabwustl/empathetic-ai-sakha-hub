
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { 
  BookOpen, 
  Check, 
  Clock, 
  Star, 
  BookOpen as Book,
  Volume2 as Volume, 
  BookmarkPlus,
  Zap,
  Pencil,
  Link,
  Brain,
  GraduationCap,
  ChevronLeft,
  Share2,
  Printer,
  BarChart4,
  FileDown,
  PanelRightOpen,
  PanelLeftOpen,
  FlaskConical,
  LucideIcon,
  BrainCircuit
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { useConceptCardDetails } from '@/hooks/useUserStudyPlan';
import ConceptCardDetail from './ConceptCardDetail';
import { ConceptMasterySection } from './ConceptMasterySection';
import { ConceptNotesSection } from './ConceptNotesSection';
import { LinkedConceptsSection } from './LinkedConceptsSection';
import { ConceptFlashcardsSection } from './ConceptFlashcardsSection';
import { ConceptExamSection } from './ConceptExamSection';
import FormulaTabContent from './FormulaTabContent';
import ConceptAnalyticsSection from './ConceptAnalyticsSection';
import AIInsightsSection from './AIInsightsSection';
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
  const [isExpanded, setIsExpanded] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isReading, setIsReading] = useState(false);

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
    setActiveTab('overview');
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleOpenFormulaLab = () => {
    toast({
      title: "Formula Lab",
      description: "Opening interactive formula practice environment",
    });
    // Navigate to the formula lab
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

  const handleReadAloud = () => {
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      return;
    }
    
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
      
      // Add event handlers
      utterance.onend = () => {
        setIsReading(false);
      };
      
      // Speak the message
      window.speechSynthesis.speak(utterance);
      setIsReading(true);
      
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
  
  const toggleExpandView = () => {
    setIsExpanded(!isExpanded);
  };
  
  const downloadContent = () => {
    if (!conceptCard) return;
    
    // Create a text file with the concept content
    const element = document.createElement('a');
    const content = `
# ${conceptCard.title}
## ${conceptCard.subject} - ${conceptCard.chapter}

${conceptCard.content}

## Examples
${conceptCard.examples ? conceptCard.examples.join('\n\n') : 'No examples available'}

## Common Mistakes
${conceptCard.commonMistakes ? conceptCard.commonMistakes.join('\n\n') : 'No common mistakes listed'}

## Exam Relevance
${conceptCard.examRelevance || 'No exam relevance information available'}
    `;
    
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${conceptCard.title.replace(/\s+/g, '_')}_concept_notes.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Download complete",
      description: "Concept notes have been downloaded",
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
  
  // Define tab items with icons for better visual representation
  interface TabItem {
    id: string;
    label: string;
    icon: LucideIcon;
  }
  
  const tabs: TabItem[] = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'formulas', label: 'Formulas', icon: FlaskConical },
    { id: 'notes', label: 'Notes', icon: Pencil },
    { id: 'mastery', label: 'Mastery', icon: Star },
    { id: 'linked', label: 'Related', icon: Link },
    { id: 'flashcards', label: 'Flashcards', icon: Book },
    { id: 'exams', label: 'Exams', icon: GraduationCap },
    { id: 'analytics', label: 'Analytics', icon: BarChart4 },
    { id: 'ai-insights', label: 'AI Insights', icon: BrainCircuit },
  ];

  return (
    <div 
      className="container max-w-7xl mx-auto bg-gradient-to-b from-blue-50/50 to-white dark:from-gray-900/20 dark:to-gray-900"
      ref={contentRef}
    >
      <div className="flex flex-col md:flex-row gap-6 print:gap-0">
        {/* Side panel with actions - only visible on larger screens */}
        {isExpanded && (
          <div className="hidden md:flex flex-col sticky top-24 h-[calc(100vh-120px)] w-64 p-4 bg-white dark:bg-gray-800/90 rounded-lg shadow-md border mb-6 space-y-4">
            <div className="flex flex-col space-y-1">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Subject</span>
              <span className="font-medium truncate">{conceptCard.subject}</span>
            </div>
            
            <div className="flex flex-col space-y-1">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Chapter</span>
              <span className="font-medium truncate">{conceptCard.chapter}</span>
            </div>
            
            <div className="flex flex-col space-y-1">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Difficulty</span>
              <Badge className={`${difficultyColor(conceptCard.difficulty)} w-fit`}>
                {conceptCard.difficulty}
              </Badge>
            </div>
            
            <div className="flex flex-col space-y-1">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Mastery</span>
              <div className="flex items-center gap-2">
                <div className="relative w-36 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full rounded-full bg-blue-600" 
                    style={{ width: `${masteryPercent}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium">{Math.round(masteryPercent)}%</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-2">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 block">Quick Actions</span>
              <div className="flex flex-col space-y-2">
                <Button 
                  onClick={handleReadAloud} 
                  variant="outline" 
                  size="sm" 
                  className={`justify-start ${isReading ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}`}
                >
                  <Volume className={`h-4 w-4 mr-2 ${isReading ? 'animate-pulse' : ''}`} />
                  {isReading ? 'Stop Reading' : 'Read Aloud'}
                </Button>
                
                <Button 
                  onClick={toggleBookmark} 
                  variant="outline" 
                  size="sm" 
                  className={`justify-start ${bookmarked ? 'bg-amber-50 text-amber-700 border-amber-200' : ''}`}
                >
                  <BookmarkPlus className="h-4 w-4 mr-2" />
                  {bookmarked ? 'Bookmarked' : 'Bookmark'}
                </Button>
                
                <Button 
                  onClick={downloadContent} 
                  variant="outline" 
                  size="sm" 
                  className="justify-start"
                >
                  <FileDown className="h-4 w-4 mr-2" />
                  Download Notes
                </Button>
                
                <Button 
                  onClick={printContent} 
                  variant="outline" 
                  size="sm" 
                  className="justify-start"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Print Content
                </Button>
                
                <Button 
                  onClick={shareContent} 
                  variant="outline" 
                  size="sm" 
                  className="justify-start"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Concept
                </Button>
              </div>
            </div>
            
            <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button onClick={handleStudyNow} className="w-full bg-blue-600 hover:bg-blue-700">
                <Zap className="h-4 w-4 mr-2" />
                Study Now
              </Button>
            </div>
          </div>
        )}
        
        {/* Main content area */}
        <div className={`flex-1 ${isExpanded ? 'md:ml-0' : ''}`}>
          {/* Back button and page title with action menu */}
          <div className="bg-white dark:bg-gray-800/90 rounded-lg shadow-md border p-4 mb-6 sticky top-4 z-10">
            <div className="flex items-center justify-between">
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
                <h1 className="text-xl md:text-2xl font-bold tracking-tight truncate max-w-[200px] md:max-w-md">
                  {conceptCard.title}
                </h1>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleReadAloud}
                  className={`md:flex items-center gap-1 hidden ${isReading ? 'bg-blue-50 border-blue-200 text-blue-700' : ''}`}
                >
                  <Volume className={`h-4 w-4 ${isReading ? 'animate-pulse' : ''}`} />
                  <span className="hidden md:inline">{isReading ? 'Stop' : 'Read Aloud'}</span>
                </Button>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleExpandView}
                  className="hidden md:flex"
                >
                  {isExpanded ? <PanelLeftOpen className="h-4 w-4" /> : <PanelRightOpen className="h-4 w-4" />}
                </Button>
                
                <div className="relative md:hidden">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={toggleActions}
                    className={showActions ? "bg-primary/10" : ""}
                  >
                    More
                  </Button>
                  
                  {showActions && (
                    <div className="absolute right-0 top-10 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2 z-10 min-w-48 border">
                      <div className="flex flex-col gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={handleReadAloud}
                          className="justify-start"
                        >
                          <Volume className="h-4 w-4 mr-2" />
                          {isReading ? 'Stop Reading' : 'Read Aloud'}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={toggleBookmark}
                          className="justify-start"
                        >
                          <BookmarkPlus className="h-4 w-4 mr-2" />
                          {bookmarked ? 'Bookmarked' : 'Bookmark'}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={shareContent}
                          className="justify-start"
                        >
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={printContent}
                          className="justify-start"
                        >
                          <Printer className="h-4 w-4 mr-2" />
                          Print
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Concept header card - key information */}
          <Card className="mb-6 overflow-hidden border-none shadow-lg bg-gradient-to-br from-white to-blue-50/70 dark:from-gray-800 dark:to-gray-900/90 print:shadow-none">
            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
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
                  
                  <p className="text-muted-foreground mb-5 max-w-3xl">
                    {conceptCard.description}
                  </p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-5">
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
                  
                  <div className="mt-6 flex flex-wrap gap-3 md:hidden">
                    <Button 
                      onClick={handleStudyNow} 
                      className="bg-gradient-to-br from-primary to-primary-dark hover:from-primary-dark hover:to-primary transition-all duration-300 px-6"
                    >
                      <Zap className="h-5 w-5 mr-2" />
                      Study Now
                    </Button>
                    
                    <Button 
                      onClick={toggleBookmark} 
                      variant={bookmarked ? "default" : "outline"} 
                      className={`${bookmarked ? "bg-amber-600 hover:bg-amber-700" : ""} transition-all duration-300 px-4`}
                    >
                      <BookmarkPlus className={`h-5 w-5 mr-2 ${bookmarked ? "animate-bounce" : ""}`} />
                      {bookmarked ? 'Bookmarked' : 'Bookmark'}
                    </Button>
                  </div>
                </div>
                
                <div className="hidden md:flex flex-col items-center justify-center">
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
                  
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Last practiced</p>
                    <p className="font-medium">{lastPracticed || 'Never'}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full print:hidden">
            <div className="bg-white dark:bg-gray-800/80 shadow-sm rounded-t-lg border p-2 overflow-x-auto">
              <TabsList className="grid min-w-max grid-cols-9 gap-1">
                {tabs.map((tab) => (
                  <TabsTrigger 
                    key={tab.id}
                    value={tab.id} 
                    className="flex items-center gap-2 py-2.5"
                  >
                    <tab.icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            <div className="bg-white dark:bg-gray-800/80 rounded-b-lg shadow-lg border border-t-0 p-0 min-h-[600px]">
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
              
              <TabsContent value="analytics" className="mt-0 focus:outline-none animate-in fade-in-50 duration-300">
                <ConceptAnalyticsSection
                  conceptId={conceptCard.id}
                  masteryPercent={masteryPercent}
                  recallAccuracy={recallAccuracy}
                  quizScore={quizScore}
                />
              </TabsContent>
              
              <TabsContent value="ai-insights" className="mt-0 focus:outline-none animate-in fade-in-50 duration-300">
                <AIInsightsSection
                  conceptId={conceptCard.id}
                  conceptTitle={conceptCard.title}
                />
              </TabsContent>
            </div>
          </Tabs>

          {/* Add debug info that will be shown during development */}
          {process.env.NODE_ENV === 'development' && (
            <div className="fixed bottom-0 right-0 bg-black/80 text-white p-2 text-xs max-w-xs overflow-auto m-2 rounded z-50">
              <p>Route: {window.location.pathname}</p>
              <p>conceptId: {conceptId}</p>
              <p>id: {id}</p>
              <p>effectiveId: {effectiveId}</p>
              <p>cardId: {conceptCard.id}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConceptCardDetailPage;
