
import React, { useState } from 'react';
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
  Star
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';
import ConceptContent from './concept-detail/ConceptContent';
import FormulaTabContent from './concept-detail/FormulaTabContent';
import AskTutorSection from './concept-detail/AskTutorSection';
import ConceptFlashcards from './concept-detail/ConceptFlashcards';
import ConceptExercises from './concept-detail/ConceptExercises';
import ConceptResources from './concept-detail/ConceptResources';

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
  userNotes: string;
  setUserNotes: (notes: string) => void;
  handleSaveNotes: () => void;
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
  handleOpenFormulaLab,
  userNotes,
  setUserNotes,
  handleSaveNotes
}) => {
  const [activeTab, setActiveTab] = useState('content');
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [isFlagged, setIsFlagged] = useState(false);
  const isMobile = useIsMobile();

  const { toast } = useToast();

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

  // Main content area - Tabs and content display
  return (
    <div className="space-y-6">
      {/* Progress bar section */}
      <div className="mt-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
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
                  value="practice" 
                  className="flex items-center gap-1 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
                >
                  <Brain className="h-4 w-4" /> {!isMobile && "Practice"}
                </TabsTrigger>
                <TabsTrigger 
                  value="resources" 
                  className="flex items-center gap-1 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
                >
                  <RefreshCw className="h-4 w-4" /> {!isMobile && "Resources"}
                </TabsTrigger>
                <TabsTrigger 
                  value="tutor" 
                  className="flex items-center gap-1 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
                >
                  <MessageCircle className="h-4 w-4" /> {!isMobile && "Ask Tutor"}
                </TabsTrigger>
              </TabsList>
              
              <div className="p-0">
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
                
                <TabsContent value="practice" className="mt-0">
                  <ConceptExercises 
                    conceptId={conceptId}
                    conceptTitle={title}
                    recallAccuracy={65}
                    lastPracticed="2023-05-10"
                    quizScore={75}
                  />
                </TabsContent>
                
                <TabsContent value="resources" className="mt-0">
                  <ConceptResources conceptId={conceptId} />
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
                {isReadingAloud ? (
                  <>
                    <span className="sr-only">Stop reading</span>
                    Stop Reading
                  </>
                ) : (
                  <>
                    <span className="sr-only">Read aloud</span>
                    Read Aloud
                  </>
                )}
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className={`justify-start ${isFlagged ? 'border-amber-500 text-amber-600 dark:border-amber-700 dark:text-amber-400' : ''}`}
                onClick={handleToggleFlag}
              >
                <Flag className="h-4 w-4 mr-2" />
                {isFlagged ? "Remove from Revision" : "Flag for Revision"}
              </Button>
            </div>
          </div>
          
          {/* Flashcards preview */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Flashcards</h3>
            <ConceptFlashcards 
              flashcardsTotal={8} 
              flashcardsCompleted={3} 
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EnhancedConceptDetail;
