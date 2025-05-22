
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
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';
import ConceptContent from './concept-detail/ConceptContent';
import FormulaTabContent from './concept-detail/FormulaTabContent';
import QuickRecallSection from './concept-detail/QuickRecallSection';
import LinkedConceptsSection from './concept-detail/LinkedConceptsSection';
import AskTutorSection from './concept-detail/AskTutorSection';
import RevisionSection from './concept-detail/RevisionSection';

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
  const [activeTab, setActiveTab] = useState('content');
  const [isFormulaLabOpen, setIsFormulaLabOpen] = useState(false);
  const [userNotes, setUserNotes] = useState('');
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [isFlagged, setIsFlagged] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [validationCompleted, setValidationCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
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

  const handleSaveNotes = () => {
    toast({
      title: "Notes saved successfully",
      description: "Your notes have been saved for this concept.",
      variant: "default",
    });
  };

  const openFormulaLab = () => {
    if (handleOpenFormulaLab) {
      handleOpenFormulaLab();
    } else {
      setIsFormulaLabOpen(true);
      toast({
        title: "Formula Lab",
        description: "Opening formula lab...",
        variant: "default",
      });
    }
    // In a real app, you would navigate to the formula lab page
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: isBookmarked 
        ? "This concept has been removed from your saved items" 
        : "This concept has been added to your saved items",
      variant: "default",
    });
  };

  const handleToggleFlag = () => {
    setIsFlagged(!isFlagged);
    toast({
      title: isFlagged ? "Removed from revision" : "Flagged for revision",
      description: isFlagged 
        ? "This concept has been removed from your revision list" 
        : "This concept has been added to your revision list",
      variant: "default",
    });
  };

  // Handle quiz completion and mastery update
  const handleQuizComplete = (score: number) => {
    setQuizScore(score);
    setValidationCompleted(true);

    // Update mastery level based on quiz performance
    if (onMasteryUpdate) {
      // Calculate new mastery level (this is a simplified example)
      const improvement = score / 100 * 20; // Max 20% improvement based on score
      const newMasteryLevel = Math.min(100, Math.round(masteryLevel + improvement));
      onMasteryUpdate(newMasteryLevel);
    }

    toast({
      title: "Knowledge validation complete",
      description: `You scored ${score}% on the concept quiz.`,
      variant: "default",
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

  // Estimated read time (words per minute)
  const getEstimatedReadTime = () => {
    const cleanText = content.replace(/<[^>]*>?/gm, '');
    const wordCount = cleanText.split(/\s+/).length;
    const readTimeMinutes = Math.ceil(wordCount / 200);
    return `~${readTimeMinutes} min read`;
  };

  const getDifficultyColor = (diff: string) => {
    switch(diff) {
      case 'easy': return 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400';
      case 'medium': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'hard': return 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  // Main content area - Tabs and content display
  return (
    <div className="space-y-6">
      {/* Learning insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Mastery Level */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium flex items-center text-gray-700 dark:text-gray-300">
              <Brain className="h-4 w-4 mr-2 text-indigo-600 dark:text-indigo-400" /> 
              Concept Mastery
            </h3>
            <Badge variant="outline" className={`text-xs ${getDifficultyColor(difficulty)}`}>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </Badge>
          </div>
          <Progress 
            value={masteryLevel} 
            className="h-2 bg-gray-200 dark:bg-gray-700"
          />
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {masteryLevel < 30 && "You're just getting started. Continue learning to improve mastery."}
            {masteryLevel >= 30 && masteryLevel < 60 && "Making good progress. Keep practicing to reinforce your understanding."}
            {masteryLevel >= 60 && masteryLevel < 80 && "Good understanding! Complete the practice quizzes to validate your knowledge."}
            {masteryLevel >= 80 && "Excellent mastery! You've got a solid grasp of this concept."}
          </p>
        </div>

        {/* Reading Time */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium flex items-center text-gray-700 dark:text-gray-300">
              <Clock className="h-4 w-4 mr-2 text-indigo-600 dark:text-indigo-400" /> 
              Reading Time
            </h3>
            <span className="text-xs text-gray-500">{getEstimatedReadTime()}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm">Time spent:</div>
            <div className="text-sm font-medium">{formatTimeSpent(timeSpent)}</div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full mt-2 justify-center text-sm"
            onClick={toggleReadAloud}
          >
            {isReadingAloud ? <VolumeX className="h-4 w-4 mr-2" /> : <Volume2 className="h-4 w-4 mr-2" />}
            {isReadingAloud ? "Stop Reading" : "Read Aloud"}
          </Button>
        </div>

        {/* Subject Info */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
          <h3 className="text-sm font-medium flex items-center text-gray-700 dark:text-gray-300 mb-2">
            <FileText className="h-4 w-4 mr-2 text-indigo-600 dark:text-indigo-400" /> 
            Subject Information
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Subject:</span>
              <Badge variant="secondary" className="font-normal">{subject}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Topic:</span>
              <Badge variant="secondary" className="font-normal">{topic}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Last Updated:</span>
              <span className="text-xs text-gray-500">2 days ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content and sidebar layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main content area */}
        <motion.div 
          className="md:col-span-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
            <Tabs defaultValue="content" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="border-b border-gray-200 dark:border-gray-700">
                <TabsList className="flex h-auto p-0 bg-transparent">
                  <TabsTrigger 
                    value="content" 
                    className="flex items-center gap-1 py-3 px-4 rounded-none border-b-2 border-transparent text-gray-500 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
                  >
                    <BookOpen className="h-4 w-4" /> {!isMobile && "Content"}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="formulas" 
                    className="flex items-center gap-1 py-3 px-4 rounded-none border-b-2 border-transparent text-gray-500 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
                  >
                    <FlaskConical className="h-4 w-4" /> {!isMobile && "Formulas"}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="recall" 
                    className="flex items-center gap-1 py-3 px-4 rounded-none border-b-2 border-transparent text-gray-500 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
                  >
                    <Brain className="h-4 w-4" /> {!isMobile && "Practice"}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="linked" 
                    className="flex items-center gap-1 py-3 px-4 rounded-none border-b-2 border-transparent text-gray-500 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
                  >
                    <RefreshCw className="h-4 w-4" /> {!isMobile && "Related"}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="tutor" 
                    className="flex items-center gap-1 py-3 px-4 rounded-none border-b-2 border-transparent text-gray-500 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
                  >
                    <MessageCircle className="h-4 w-4" /> {!isMobile && "Ask Tutor"}
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <div className="p-0">
                <TabsContent value="content" className="m-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                  <ConceptContent 
                    content={content}
                    conceptId={conceptId}
                    userNotes={userNotes}
                    setUserNotes={setUserNotes}
                    handleSaveNotes={handleSaveNotes}
                    isReadingAloud={isReadingAloud}
                    setIsReadingAloud={setIsReadingAloud}
                  />
                </TabsContent>
                
                <TabsContent value="formulas" className="m-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                  <FormulaTabContent 
                    conceptId={conceptId} 
                    conceptTitle={title}
                    handleOpenFormulaLab={openFormulaLab}
                  />
                </TabsContent>
                
                <TabsContent value="recall" className="m-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                  <QuickRecallSection 
                    conceptId={conceptId} 
                    title={title} 
                    content={content}
                    onQuizComplete={handleQuizComplete}
                  />
                </TabsContent>
                
                <TabsContent value="linked" className="m-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                  <LinkedConceptsSection 
                    conceptId={conceptId}
                    subject={subject}
                    topic={topic}
                  />
                </TabsContent>
                
                <TabsContent value="tutor" className="m-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                  <AskTutorSection 
                    conceptId={conceptId}
                    title={title}
                    subject={subject}
                    topic={topic}
                  />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </motion.div>
        
        {/* Right sidebar */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Quick actions card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Learning Tools</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="justify-start"
                onClick={toggleReadAloud}
              >
                {isReadingAloud ? <VolumeX className="h-4 w-4 mr-2" /> : <Volume2 className="h-4 w-4 mr-2" />}
                {isReadingAloud ? "Stop" : "Read Aloud"}
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className={`justify-start ${isBookmarked ? 'border-blue-500 text-blue-600 dark:border-blue-700 dark:text-blue-400' : ''}`}
                onClick={handleBookmark}
              >
                <Star className="h-4 w-4 mr-2" />
                {isBookmarked ? "Bookmarked" : "Bookmark"}
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className={`justify-start ${isFlagged ? 'border-amber-500 text-amber-600 dark:border-amber-700 dark:text-amber-400' : ''}`}
                onClick={handleToggleFlag}
              >
                <Flag className="h-4 w-4 mr-2" />
                {isFlagged ? "Flagged" : "Flag"}
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="justify-start"
                onClick={() => setActiveTab('tutor')}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Ask Tutor
              </Button>
            </div>
            
            {validationCompleted && quizScore !== null && (
              <div className="flex items-center justify-between px-2 py-1.5 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-md mt-3">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-500 mr-2" />
                  <span className="text-xs font-medium text-green-700 dark:text-green-400">
                    Validation Score
                  </span>
                </div>
                <Badge variant="outline" className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700">
                  {quizScore}%
                </Badge>
              </div>
            )}
          </div>
        
          {/* Revision Section */}
          <RevisionSection 
            conceptId={conceptId}
            isFlagged={isFlagged}
            onToggleFlag={handleToggleFlag}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default EnhancedConceptDetail;
