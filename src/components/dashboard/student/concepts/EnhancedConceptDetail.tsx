
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  BookOpen, 
  MessageCircle, 
  Flag, 
  Brain, 
  CheckCircle, 
  FlaskConical, 
  RefreshCw, 
  Star,
  Volume2, 
  VolumeX,
  FileText,
  Clock,
  Share2,
  Download,
  Bookmark,
  Award,
  ChevronLeft,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';
import ConceptFlashcards from './concept-detail/ConceptFlashcards';
import FormulaReference from './concept-detail/FormulaReference';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export interface ConceptDetailProps {
  conceptId: string;
  title: string;
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  content: string;
  masteryLevel?: number;
  onMasteryUpdate?: (newLevel: number) => void;
  handleOpenFormulaLab?: () => void;
}

const EnhancedConceptDetail: React.FC<ConceptDetailProps> = ({ 
  conceptId, 
  title, 
  subject, 
  topic, 
  difficulty,
  content,
  masteryLevel = 0,
  onMasteryUpdate,
  handleOpenFormulaLab
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [isFlagged, setIsFlagged] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [showRelatedConcepts, setShowRelatedConcepts] = useState(false);
  const [userNotes, setUserNotes] = useState('');
  const [timeSpent, setTimeSpent] = useState(0);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  // Track time spent on the concept
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Mock data for related concepts
  const relatedConcepts = [
    { id: 'concept-2', title: 'Conservation of Momentum', subject: 'Physics', difficulty: 'medium' as 'easy' | 'medium' | 'hard' },
    { id: 'concept-3', title: 'Force and Acceleration', subject: 'Physics', difficulty: 'easy' as 'easy' | 'medium' | 'hard' },
    { id: 'concept-4', title: 'Work and Energy', subject: 'Physics', difficulty: 'medium' as 'easy' | 'medium' | 'hard' },
  ];

  // Mock data for formulas
  const formulas = [
    { id: 'formula-1', name: 'First Law', latex: 'F = 0 \\implies v = \\text{constant}', description: 'An object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.' },
    { id: 'formula-2', name: 'Second Law', latex: 'F = ma', description: 'The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.' },
    { id: 'formula-3', name: 'Third Law', latex: 'F_{A\\text{ on }B} = -F_{B\\text{ on }A}', description: 'For every action, there is an equal and opposite reaction.' },
  ];

  // Mock data for flashcards
  const flashcards = [
    { id: 'fc-1', front: 'What is Newton\'s First Law?', back: 'An object will remain at rest or in uniform motion in a straight line unless acted upon by an external force.' },
    { id: 'fc-2', front: 'What is Newton\'s Second Law?', back: 'The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass (F = ma).' },
    { id: 'fc-3', front: 'What is Newton\'s Third Law?', back: 'For every action, there is an equal and opposite reaction.' },
    { id: 'fc-4', front: 'What is inertia?', back: 'The tendency of an object to resist changes in its state of motion. Mass is a measure of inertia.' },
  ];

  const handleSaveNotes = () => {
    toast({
      title: "Notes saved",
      description: "Your notes have been saved for this concept.",
    });
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: isBookmarked ? "Concept removed from your bookmarks" : "Concept added to your bookmarks",
    });
  };

  const toggleFlag = () => {
    setIsFlagged(!isFlagged);
    toast({
      title: isFlagged ? "Removed from review list" : "Added to review list",
      description: isFlagged ? "Concept removed from your review list" : "Concept added to your review list for later revision",
    });
  };

  const toggleReadAloud = () => {
    setIsReadingAloud(!isReadingAloud);
    
    if (!isReadingAloud) {
      // Start reading
      const cleanText = content.replace(/<[^>]*>?/gm, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 0.95;
      utterance.onend = () => setIsReadingAloud(false);
      speechSynthesis.speak(utterance);
    } else {
      // Stop reading
      speechSynthesis.cancel();
    }
  };

  const formatTimeSpent = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getDifficultyColor = (diff: string) => {
    switch(diff) {
      case 'easy': return 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400';
      case 'medium': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'hard': return 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const handleNextConcept = () => {
    toast({
      title: "Navigating to next concept",
      description: "Loading the next concept in this topic...",
    });
    // In a real app, navigate to the next concept
  };

  const handlePreviousConcept = () => {
    toast({
      title: "Navigating to previous concept",
      description: "Loading the previous concept in this topic...",
    });
    // In a real app, navigate to the previous concept
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Concept Header with navigation controls */}
      <div className="flex justify-between items-center">
        <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard/student/concepts')} className="flex items-center gap-1">
          <ChevronLeft className="h-4 w-4" />
          <span>Back to Concepts</span>
        </Button>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handlePreviousConcept} className="flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>
          
          <Button variant="outline" size="sm" onClick={handleNextConcept} className="flex items-center gap-1">
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Main content area with tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left sidebar */}
        <div className="lg:col-span-1 space-y-4">
          {/* Concept Info Card */}
          <Card className="overflow-hidden border border-indigo-100 dark:border-indigo-900">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
              <h2 className="text-xl font-bold text-white">{title}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="bg-white/20 text-white border-0">
                  {subject}
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-0">
                  {topic}
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Difficulty</p>
                  <Badge className={`mt-1 ${getDifficultyColor(difficulty)}`}>
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </Badge>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Mastery</p>
                  <div className="flex items-center justify-center mt-1">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-indigo-600 rounded-full" 
                        style={{ width: `${masteryLevel}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium ml-1">{masteryLevel}%</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Time spent:</span>
                  <span className="font-medium">{formatTimeSpent(timeSpent)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={toggleBookmark}>
                          <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{isBookmarked ? 'Remove bookmark' : 'Bookmark this concept'}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={toggleFlag}>
                          <Flag className={`h-4 w-4 ${isFlagged ? 'fill-red-400 text-red-400' : ''}`} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{isFlagged ? 'Remove from review list' : 'Flag for review'}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={toggleReadAloud}>
                          {isReadingAloud ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{isReadingAloud ? 'Stop reading' : 'Read aloud'}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => {
                          toast({
                            title: "Content downloaded",
                            description: "Concept materials have been downloaded"
                          });
                        }}>
                          <Download className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Download materials</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => {
                          toast({
                            title: "Link copied",
                            description: "Concept link copied to clipboard"
                          });
                        }}>
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Share concept</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Quick navigation */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-medium mb-3 flex items-center">
                <Brain className="h-4 w-4 mr-2 text-indigo-600" />
                Learning Tools
              </h3>
              
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab('flashcards')}
                >
                  <Award className="h-4 w-4 mr-2 text-amber-500" />
                  <span>Practice with Flashcards</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab('formulas')}
                >
                  <FlaskConical className="h-4 w-4 mr-2 text-blue-500" />
                  <span>View Formulas & Equations</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab('related')}
                >
                  <RefreshCw className="h-4 w-4 mr-2 text-green-500" />
                  <span>Explore Related Concepts</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab('quiz')}
                >
                  <Brain className="h-4 w-4 mr-2 text-purple-500" />
                  <span>Take a Quick Quiz</span>
                </Button>
              </div>
              
              <Button 
                className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                onClick={() => {
                  if (handleOpenFormulaLab) {
                    handleOpenFormulaLab();
                  }
                }}
              >
                <FlaskConical className="h-4 w-4 mr-2" />
                <span>Open Formula Lab</span>
              </Button>
            </CardContent>
          </Card>
          
          {/* Related concepts */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium flex items-center">
                  <RefreshCw className="h-4 w-4 mr-2 text-indigo-600" />
                  Related Concepts
                </h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => setShowRelatedConcepts(!showRelatedConcepts)}
                >
                  {showRelatedConcepts ? 'View Less' : 'View All'}
                </Button>
              </div>
              
              <div className="space-y-2">
                {relatedConcepts.slice(0, showRelatedConcepts ? undefined : 2).map((concept) => (
                  <Card key={concept.id} className="bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700">
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-sm font-medium">{concept.title}</h4>
                          <div className="flex items-center gap-1 mt-1">
                            <Badge variant="outline" className="text-xs py-0 px-1 h-4">
                              {concept.subject}
                            </Badge>
                            <Badge variant="outline" className={`text-xs py-0 px-1 h-4 ${getDifficultyColor(concept.difficulty)}`}>
                              {concept.difficulty}
                            </Badge>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-7 w-7 p-0" 
                          onClick={() => navigate(`/dashboard/student/concepts/${concept.id}`)}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main content */}
        <div className="lg:col-span-3">
          <Card className="overflow-hidden border-0 shadow-md">
            {/* Tabs for different content sections */}
            <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <TabsList className="flex h-auto p-0 bg-transparent justify-start w-full overflow-x-auto">
                  <TabsTrigger 
                    value="overview" 
                    className="flex items-center gap-1 py-3 px-4 rounded-none border-b-2 border-transparent text-gray-500 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
                  >
                    <BookOpen className="h-4 w-4" /> Overview
                  </TabsTrigger>
                  <TabsTrigger 
                    value="flashcards" 
                    className="flex items-center gap-1 py-3 px-4 rounded-none border-b-2 border-transparent text-gray-500 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
                  >
                    <Award className="h-4 w-4" /> Flashcards
                  </TabsTrigger>
                  <TabsTrigger 
                    value="formulas" 
                    className="flex items-center gap-1 py-3 px-4 rounded-none border-b-2 border-transparent text-gray-500 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
                  >
                    <FlaskConical className="h-4 w-4" /> Formulas
                  </TabsTrigger>
                  <TabsTrigger 
                    value="quiz" 
                    className="flex items-center gap-1 py-3 px-4 rounded-none border-b-2 border-transparent text-gray-500 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
                  >
                    <Brain className="h-4 w-4" /> Quiz
                  </TabsTrigger>
                  <TabsTrigger 
                    value="notes" 
                    className="flex items-center gap-1 py-3 px-4 rounded-none border-b-2 border-transparent text-gray-500 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
                  >
                    <FileText className="h-4 w-4" /> Notes
                  </TabsTrigger>
                  <TabsTrigger 
                    value="related" 
                    className="flex items-center gap-1 py-3 px-4 rounded-none border-b-2 border-transparent text-gray-500 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
                  >
                    <RefreshCw className="h-4 w-4" /> Related
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <div>
                {/* Overview tab content */}
                <TabsContent value="overview" className="p-6 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                  <div className="prose prose-indigo dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
                  
                  <div className="mt-6 flex justify-between">
                    <Button variant="outline" onClick={() => setActiveTab('notes')} className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      <span>Take Notes</span>
                    </Button>
                    
                    <div className="flex gap-2">
                      <Button variant="ghost" onClick={toggleReadAloud} className="flex items-center gap-1">
                        {isReadingAloud ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                        <span>{isReadingAloud ? 'Stop Reading' : 'Read Aloud'}</span>
                      </Button>
                      
                      <Button onClick={() => setActiveTab('flashcards')} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                        <span>Practice with Flashcards</span>
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Flashcards tab content */}
                <TabsContent value="flashcards" className="focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                  <ConceptFlashcards flashcards={flashcards} />
                </TabsContent>
                
                {/* Formulas tab content */}
                <TabsContent value="formulas" className="p-6 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                  <FormulaReference 
                    formulas={formulas} 
                    conceptTitle={title} 
                    handleOpenFormulaLab={handleOpenFormulaLab}
                  />
                </TabsContent>
                
                {/* Quiz tab content */}
                <TabsContent value="quiz" className="p-6 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                  <div className="text-center p-8">
                    <h3 className="text-xl font-bold mb-2">Ready to test your knowledge?</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Take a quick quiz on {title} to assess your understanding and boost your mastery level.
                    </p>
                    <Button 
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                      onClick={() => {
                        toast({
                          title: "Quiz started",
                          description: "Starting concept quiz...",
                        });
                      }}
                    >
                      <Brain className="h-4 w-4 mr-2" />
                      <span>Start Quiz</span>
                    </Button>
                  </div>
                </TabsContent>
                
                {/* Notes tab content */}
                <TabsContent value="notes" className="p-6 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">My Notes</h3>
                    <textarea
                      className="w-full h-64 p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800"
                      placeholder="Take notes on this concept..."
                      value={userNotes}
                      onChange={(e) => setUserNotes(e.target.value)}
                    />
                    <div className="flex justify-end">
                      <Button onClick={handleSaveNotes} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                        Save Notes
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Related concepts tab content */}
                <TabsContent value="related" className="p-6 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                  <h3 className="text-lg font-medium mb-4">Related Concepts</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {relatedConcepts.map((concept) => (
                      <Card key={concept.id} className="overflow-hidden border border-gray-200 dark:border-gray-700">
                        <div className="p-4 flex flex-col h-full">
                          <h4 className="font-medium text-lg mb-1">{concept.title}</h4>
                          
                          <div className="flex items-center gap-2 mb-3">
                            <Badge>{concept.subject}</Badge>
                            <Badge className={getDifficultyColor(concept.difficulty)}>
                              {concept.difficulty.charAt(0).toUpperCase() + concept.difficulty.slice(1)}
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Learn about {concept.title} and how it relates to {title}.
                          </p>
                          
                          <div className="mt-auto">
                            <Button 
                              onClick={() => navigate(`/dashboard/student/concepts/${concept.id}`)} 
                              className="w-full"
                            >
                              Explore Concept
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EnhancedConceptDetail;
