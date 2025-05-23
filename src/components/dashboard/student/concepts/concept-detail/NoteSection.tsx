
import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

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
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">My Notes</h3>
      <p className="text-sm text-muted-foreground">
        Write down your own understanding and key points about this concept.
      </p>
      
      <Textarea 
        value={userNotes}
        onChange={(e) => setUserNotes(e.target.value)}
        placeholder="Start taking notes..."
        className="min-h-[200px]"
      />
      
      <div className="flex justify-end">
        <Button 
          onClick={handleSaveNotes}
          className="flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          Save Notes
        </Button>
      </div>
      
      <div className="mt-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/30 rounded-lg p-4">
        <h4 className="font-medium text-amber-700 dark:text-amber-400 mb-2">Tips for effective note-taking:</h4>
        <ul className="text-sm space-y-1 text-amber-800 dark:text-amber-300">
          <li>• Use your own words to improve understanding</li>
          <li>• Focus on key concepts rather than minor details</li>
          <li>• Create connections to concepts you already know</li>
          <li>• Use diagrams or visual aids when helpful</li>
        </ul>
      </div>
    </div>
  );
};

export default NoteSection;
