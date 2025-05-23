
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Save, Trash } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useParams } from 'react-router-dom';
import { useUserNotes } from '@/hooks/useUserNotes';
import { motion } from 'framer-motion';

interface NoteSectionProps {
  userNotes: string;
  setUserNotes: (notes: string) => void;
  handleSaveNotes: () => void;
}

const NoteSection: React.FC<NoteSectionProps> = ({
  userNotes,
  setUserNotes,
  handleSaveNotes
}) => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const { saveNote, getNoteForConcept, deleteNote } = useUserNotes();
  const [notesChanged, setNotesChanged] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (conceptId) {
      const savedNotes = getNoteForConcept(conceptId);
      if (savedNotes) {
        setUserNotes(savedNotes);
      }
    }
  }, [conceptId, getNoteForConcept, setUserNotes]);

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserNotes(e.target.value);
    setNotesChanged(true);
  };

  const handleSave = () => {
    if (!notesChanged || !conceptId) return;
    
    setIsSaving(true);
    // Save to localStorage via custom hook
    const success = saveNote(conceptId, userNotes);
    
    if (success) {
      // Show a success notification or feedback
      setNotesChanged(false);
    }
    
    setTimeout(() => {
      setIsSaving(false);
    }, 600);
  };

  const handleClear = () => {
    if (conceptId) {
      deleteNote(conceptId);
      setUserNotes('');
      setNotesChanged(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex justify-between items-center">
            <span>My Notes</span>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleClear}
                className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                <Trash className="h-4 w-4 mr-1" /> Clear
              </Button>
              <Button 
                onClick={handleSave} 
                size="sm"
                disabled={!notesChanged || isSaving}
                className={notesChanged ? "bg-green-600 hover:bg-green-700" : ""}
              >
                <Save className="h-4 w-4 mr-1" /> {isSaving ? "Saving..." : "Save Notes"}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Take notes about this concept here..."
            className="min-h-[200px] resize-y"
            value={userNotes}
            onChange={handleNotesChange}
          />
          <p className="text-sm text-muted-foreground mt-2">
            Your notes are saved locally and will be available when you return to this concept.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default NoteSection;
