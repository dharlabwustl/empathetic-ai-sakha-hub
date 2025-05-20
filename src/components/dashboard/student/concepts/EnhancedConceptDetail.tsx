
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
  VolumeX
} from 'lucide-react';
import { motion } from 'framer-motion';
import useUserNotes from '@/hooks/useUserNotes';
import ConceptContent from './concept-detail/ConceptContent';
import FormulaTabContent from './concept-detail/FormulaTabContent';
import QuickRecallSection from './concept-detail/QuickRecallSection';
import LinkedConceptsSection from './concept-detail/LinkedConceptsSection';
import AskTutorSection from './concept-detail/AskTutorSection';
import RevisionSection from './concept-detail/RevisionSection';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useIsMobile } from '@/hooks/use-mobile';

export interface ConceptDetailProps {
  conceptId: string;
  title: string;
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  content: string;
  masteryLevel?: number;
  onMasteryUpdate?: (newLevel: number) => void;
}

const EnhancedConceptDetail: React.FC<ConceptDetailProps> = ({ 
  conceptId, 
  title, 
  subject, 
  topic, 
  difficulty,
  content,
  masteryLevel = 0,
  onMasteryUpdate
}) => {
  const [activeTab, setActiveTab] = useState('content');
  const [isFormulaLabOpen, setIsFormulaLabOpen] = useState(false);
  const { saveNote, getNoteForConcept } = useUserNotes();
  const [userNotes, setUserNotes] = useState('');
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [isFlagged, setIsFlagged] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [validationCompleted, setValidationCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const isMobile = useIsMobile();

  const { toast } = useToast();

  // Load saved notes
  useEffect(() => {
    const savedNotes = getNoteForConcept(conceptId);
    setUserNotes(savedNotes);
  }, [conceptId, getNoteForConcept]);

  // Save notes and show toast
  const handleSaveNotes = () => {
    const success = saveNote(conceptId, userNotes);
    if (success) {
      toast({
        title: "Notes saved successfully",
        description: "Your notes have been saved for this concept.",
        variant: "default",
      });
    } else {
      toast({
        title: "Error saving notes",
        description: "There was a problem saving your notes. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleOpenFormulaLab = () => {
    setIsFormulaLabOpen(true);
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

  return (
    <div className="space-y-6">
      {/* Concept header with glass morphism effect */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 backdrop-blur-sm rounded-xl border border-indigo-100/50 dark:border-indigo-800/30 shadow-lg p-6"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                difficulty === 'easy' ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400' :
                difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-400' :
                'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-400'
              }`}>
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{subject} • {topic}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">{title}</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant={isFlagged ? "outline" : "ghost"} 
              size="sm"
              onClick={handleToggleFlag}
              className={`flex items-center gap-1 ${isFlagged ? 'border-amber-500 text-amber-600 dark:border-amber-700 dark:text-amber-400' : ''}`}
            >
              <Flag className="h-4 w-4" />
              {isFlagged ? 'Flagged' : 'Flag for Revision'}
            </Button>
            
            <Button 
              variant={isBookmarked ? "default" : "outline"} 
              size="sm"
              className={`flex items-center gap-1 ${isBookmarked ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
              onClick={handleBookmark}
            >
              <Star className="h-4 w-4" />
              {isBookmarked ? 'Bookmarked' : 'Bookmark'}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleReadAloud}
              className={isReadingAloud ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400" : ""}
            >
              {isReadingAloud ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium flex items-center text-gray-700 dark:text-gray-300">
              <Brain className="h-4 w-4 mr-2 text-indigo-600 dark:text-indigo-400" /> 
              Concept Mastery
            </h3>
            <span className="text-sm font-medium">{masteryLevel}%</span>
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
      </motion.div>

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
              <TabsList className="grid grid-cols-5 p-0 h-auto">
                <TabsTrigger 
                  value="content" 
                  className="flex items-center gap-1 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
                >
                  <BookOpen className="h-4 w-4" /> {!isMobile && "Content"}
                </TabsTrigger>
                <TabsTrigger 
                  value="formulas" 
                  className="flex items-center gap-1 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
                >
                  <FlaskConical className="h-4 w-4" /> {!isMobile && "Formulas"}
                </TabsTrigger>
                <TabsTrigger 
                  value="recall" 
                  className="flex items-center gap-1 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
                >
                  <Brain className="h-4 w-4" /> {!isMobile && "Practice"}
                </TabsTrigger>
                <TabsTrigger 
                  value="linked" 
                  className="flex items-center gap-1 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
                >
                  <RefreshCw className="h-4 w-4" /> {!isMobile && "Related"}
                </TabsTrigger>
                <TabsTrigger 
                  value="tutor" 
                  className="flex items-center gap-1 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
                >
                  <MessageCircle className="h-4 w-4" /> {!isMobile && "Ask Tutor"}
                </TabsTrigger>
              </TabsList>
              
              <div className="p-6">
                <TabsContent value="content" className="mt-0">
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
                
                <TabsContent value="formulas" className="mt-0">
                  <FormulaTabContent 
                    conceptId={conceptId} 
                    conceptTitle={title}
                    handleOpenFormulaLab={handleOpenFormulaLab}
                  />
                </TabsContent>
                
                <TabsContent value="recall" className="mt-0">
                  <QuickRecallSection 
                    conceptId={conceptId} 
                    title={title} 
                    content={content}
                    onQuizComplete={handleQuizComplete}
                  />
                </TabsContent>
                
                <TabsContent value="linked" className="mt-0">
                  <LinkedConceptsSection 
                    conceptId={conceptId}
                    subject={subject}
                    topic={topic}
                  />
                </TabsContent>
                
                <TabsContent value="tutor" className="mt-0">
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
            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Quick Actions</h3>
            <div className="flex flex-col gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="justify-start"
                onClick={toggleReadAloud}
              >
                {isReadingAloud ? <VolumeX className="h-4 w-4 mr-2" /> : <Volume2 className="h-4 w-4 mr-2" />}
                {isReadingAloud ? "Stop Reading" : "Read Aloud"}
              </Button>
              
              {validationCompleted && quizScore !== null && (
                <div className="flex items-center justify-between px-2 py-1.5 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-md">
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
