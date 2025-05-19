
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PenLine, Save, Clock, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  
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
    <Card className="border-2 border-blue-100 dark:border-blue-900/30 shadow-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold flex items-center text-lg">
            <PenLine className="h-5 w-5 mr-2 text-blue-600" /> My Notes
          </h3>
          <div className="flex items-center gap-2">
            {lastSaved && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> Saved at {lastSaved}
              </Badge>
            )}
            <Button 
              variant="outline" 
              size="sm" 
              className={`text-xs ${autoSaveEnabled ? 'bg-blue-50 border-blue-300 text-blue-600 dark:bg-blue-900/20 dark:border-blue-800' : ''}`}
              onClick={toggleAutoSave}
            >
              {autoSaveEnabled ? 'Auto-save On' : 'Auto-save Off'}
            </Button>
          </div>
        </div>
        
        <textarea
          className="w-full border rounded-md p-3 min-h-[200px] text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800"
          placeholder="Add your notes here to reinforce your understanding of this concept..."
          value={userNotes}
          onChange={(e) => setUserNotes(e.target.value)}
        />
        
        <div className="mt-4 flex justify-between items-center">
          <div className="text-xs text-gray-500">
            Tip: Taking notes in your own words helps improve retention and understanding
          </div>
          <Button 
            onClick={() => handleSave()} 
            disabled={isSaving}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
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
