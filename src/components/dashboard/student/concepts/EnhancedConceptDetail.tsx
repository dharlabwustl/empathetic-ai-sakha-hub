
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Book, BookOpen, MessageCircle, Bookmark, Volume2, PenLine, FlaskConical, RefreshCw, Flag, Brain, CheckCircle, FileText } from 'lucide-react';
import useUserNotes from '@/hooks/useUserNotes';
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
  const [validationCompleted, setValidationCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

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

  const handleToggleFlag = () => {
    setIsFlagged(!isFlagged);
    toast({
      title: isFlagged ? "Removed from revision" : "Flagged for revision",
      description: isFlagged 
        ? "This concept has been removed from your revision list" 
        : "This concept has been added to your revision list",
      variant: isFlagged ? "default" : "default",
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

  return (
    <div className="space-y-6 p-1">
      {/* Action buttons on top */}
      <div className="flex flex-wrap gap-2 justify-end">
        <Button 
          size="sm" 
          variant="outline"
          onClick={handleToggleFlag}
          className={isFlagged ? "border-amber-500 text-amber-500" : ""}
        >
          <Flag className="h-4 w-4 mr-1" /> 
          {isFlagged ? "Remove Flag" : "Flag for Revision"}
        </Button>

        {validationCompleted && quizScore !== null && (
          <Button 
            size="sm" 
            variant="outline"
            className="border-green-500 text-green-500"
          >
            <CheckCircle className="h-4 w-4 mr-1" /> 
            Validated: {quizScore}%
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs defaultValue="content" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 mb-4">
              <TabsTrigger value="content" className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" /> Content
              </TabsTrigger>
              <TabsTrigger value="formulas" className="flex items-center gap-1">
                <FlaskConical className="h-4 w-4" /> Formulas
              </TabsTrigger>
              <TabsTrigger value="recall" className="flex items-center gap-1">
                <Brain className="h-4 w-4" /> Practice
              </TabsTrigger>
              <TabsTrigger value="linked" className="flex items-center gap-1">
                <RefreshCw className="h-4 w-4" /> Related
              </TabsTrigger>
              <TabsTrigger value="tutor" className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" /> Ask Tutor
              </TabsTrigger>
            </TabsList>

            <TabsContent value="content">
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

            <TabsContent value="formulas">
              <FormulaTabContent 
                conceptId={conceptId} 
                conceptTitle={title}
                handleOpenFormulaLab={handleOpenFormulaLab}
              />
            </TabsContent>

            <TabsContent value="recall">
              <QuickRecallSection 
                conceptId={conceptId} 
                title={title} 
                content={content}
                onQuizComplete={handleQuizComplete}
              />
            </TabsContent>

            <TabsContent value="linked">
              <LinkedConceptsSection 
                conceptId={conceptId}
                subject={subject}
                topic={topic}
              />
            </TabsContent>

            <TabsContent value="tutor">
              <AskTutorSection 
                conceptId={conceptId}
                title={title}
                subject={subject}
                topic={topic}
              />
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          {/* Mastery Progress Bar */}
          <div className="p-4 border rounded-lg bg-white shadow-sm dark:bg-gray-800/50">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium flex items-center">
                <Brain className="h-4 w-4 mr-2 text-blue-600" /> Concept Mastery Progress
              </h3>
              <span className="text-sm font-medium">{masteryLevel}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${
                  masteryLevel > 80 ? 'bg-green-500' : 
                  masteryLevel > 50 ? 'bg-blue-500' : 
                  masteryLevel > 30 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${masteryLevel}%` }}
              />
            </div>
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {masteryLevel < 30 && "You're just getting started. Continue learning to improve mastery."}
              {masteryLevel >= 30 && masteryLevel < 50 && "You're making progress. Keep practicing to strengthen your understanding."}
              {masteryLevel >= 50 && masteryLevel < 80 && "Good understanding! Complete the practice quizzes to validate your knowledge."}
              {masteryLevel >= 80 && "Excellent mastery! You can now focus on related concepts."}
            </div>
          </div>
          
          {/* Revision Section */}
          <RevisionSection 
            conceptId={conceptId}
            isFlagged={isFlagged}
            onToggleFlag={handleToggleFlag}
          />
        </div>
      </div>
    </div>
  );
};

export default EnhancedConceptDetail;
