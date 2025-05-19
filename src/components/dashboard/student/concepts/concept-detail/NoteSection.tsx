
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PenLine, Save, Clock, CheckCircle, Bookmark, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

interface NoteSectionProps {
  userNotes: string;
  setUserNotes: (notes: string) => void;
  handleSaveNotes: () => void;
}

const NoteSection: React.FC<NoteSectionProps> = ({ userNotes, setUserNotes, handleSaveNotes }) => {
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(false);
  const [autoSaveInterval, setAutoSaveInterval] = useState<NodeJS.Timeout | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const { toast } = useToast();
  
  // Calculate word count
  useEffect(() => {
    const words = userNotes.trim() ? userNotes.trim().split(/\s+/).length : 0;
    setWordCount(words);
  }, [userNotes]);
  
  // Auto-save functionality
  useEffect(() => {
    if (autoSaveEnabled && !autoSaveInterval) {
      const interval = setInterval(() => {
        if (userNotes.trim()) {
          handleSave(true);
        }
      }, 30000); // Auto-save every 30 seconds
      
      setAutoSaveInterval(interval);
    } else if (!autoSaveEnabled && autoSaveInterval) {
      clearInterval(autoSaveInterval);
      setAutoSaveInterval(null);
    }
    
    return () => {
      if (autoSaveInterval) {
        clearInterval(autoSaveInterval);
      }
    };
  }, [autoSaveEnabled, userNotes]);
  
  const handleSave = (isAuto: boolean = false) => {
    setIsSaving(true);
    
    // Simulate save operation
    setTimeout(() => {
      handleSaveNotes();
      setLastSaved(new Date().toLocaleTimeString());
      setIsSaving(false);
      
      if (!isAuto) {
        toast({
          title: "Notes saved successfully",
          description: "Your notes have been saved for this concept.",
        });
      }
    }, 300);
  };
  
  const toggleAutoSave = () => {
    setAutoSaveEnabled(!autoSaveEnabled);
    toast({
      title: !autoSaveEnabled ? "Auto-save enabled" : "Auto-save disabled",
      description: !autoSaveEnabled 
        ? "Your notes will be automatically saved every 30 seconds."
        : "Auto-save has been turned off.",
    });
  };
  
  return (
    <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/30 dark:to-gray-900">
      <div className="absolute top-0 left-0 w-2 h-full bg-indigo-600"></div>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-xl font-bold">
          <FileText className="h-5 w-5 mr-2 text-indigo-600" /> 
          Study Notes
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            {lastSaved && (
              <Badge variant="outline" className="flex items-center gap-1 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800">
                <Clock className="h-3 w-3" /> Last saved at {lastSaved}
              </Badge>
            )}
          </div>
          <Button 
            variant={autoSaveEnabled ? "default" : "outline"} 
            size="sm" 
            className={`text-xs ${autoSaveEnabled ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'hover:bg-indigo-50 hover:text-indigo-700 dark:hover:bg-indigo-900/20'}`}
            onClick={toggleAutoSave}
          >
            {autoSaveEnabled ? 'Auto-save On' : 'Auto-save Off'}
          </Button>
        </div>
        
        <div className="relative">
          <textarea
            className="w-full border rounded-lg p-4 min-h-[220px] text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm"
            placeholder="Write your notes here to strengthen your understanding of this concept..."
            value={userNotes}
            onChange={(e) => setUserNotes(e.target.value)}
            style={{ resize: 'vertical' }}
          />
          <div className="absolute bottom-2 right-2 text-xs text-gray-500 dark:text-gray-400 bg-white/80 dark:bg-gray-800/50 px-2 py-1 rounded-md backdrop-blur-sm">
            {wordCount} words
          </div>
        </div>
        
        <div className="mt-4 space-y-3">
          <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
            <span>Note completeness</span>
            <span>{Math.min(Math.floor(wordCount / 5), 100)}%</span>
          </div>
          <Progress value={Math.min(wordCount / 5, 100)} className="h-1.5 bg-gray-200 dark:bg-gray-700">
            <div className="h-full bg-indigo-600 rounded-full"></div>
          </Progress>
          
          <div className="text-xs text-gray-500 mt-2 italic">
            Tip: Detailed notes in your own words significantly improves retention and understanding
          </div>
          
          <Button 
            onClick={() => handleSave()} 
            disabled={isSaving}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 mt-2"
          >
            {isSaving ? (
              <>
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Notes
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NoteSection;
