
import React, { useState, useEffect, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, BookOpen, FileCheck, MessageCircle, Bookmark, Volume2, PenLine, FlaskConical, RefreshCw, Flag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import FormulaTabContent from './FormulaTabContent';
import useUserNotes from '@/hooks/useUserNotes';
import ConceptContent from './concept-detail/ConceptContent';
import NoteSection from './concept-detail/NoteSection';
import ReadAloudSection from './concept-detail/ReadAloudSection';
import QuickRecallSection from './concept-detail/QuickRecallSection';
import LinkedConceptsSection from './concept-detail/LinkedConceptsSection';
import RevisionSection from './concept-detail/RevisionSection';
import AskTutorSection from './concept-detail/AskTutorSection';

export interface ConceptDetailProps {
  conceptId: string;
  title: string;
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  content: string;
}

const EnhancedConceptDetail: React.FC<ConceptDetailProps> = ({ 
  conceptId, 
  title, 
  subject, 
  topic, 
  difficulty,
  content
}) => {
  const [activeTab, setActiveTab] = useState('content');
  const [isFormulaLabOpen, setIsFormulaLabOpen] = useState(false);
  const { saveNote, getNoteForConcept } = useUserNotes();
  const [userNotes, setUserNotes] = useState('');
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [isFlagged, setIsFlagged] = useState(false);

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

  return (
    <div className="space-y-6 p-1">
      {/* Header with concept info */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl font-bold">{title}</h1>
            <Badge variant={
              difficulty === 'easy' ? 'outline' :
              difficulty === 'medium' ? 'secondary' :
              'destructive'
            } className="ml-2">
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </Badge>
            {isFlagged && (
              <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400">
                Flagged for Revision
              </Badge>
            )}
          </div>
          <p className="text-gray-500 dark:text-gray-400">{subject} - {topic}</p>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            size="sm" 
            variant="outline"
            onClick={handleToggleFlag}
            className={isFlagged ? "border-amber-500 text-amber-500" : ""}
          >
            <Flag className="h-4 w-4 mr-1" /> 
            {isFlagged ? "Remove Flag" : "Flag for Revision"}
          </Button>
        </div>
      </div>

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
  );
};

export default EnhancedConceptDetail;
