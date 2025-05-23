
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Save } from 'lucide-react';

interface NoteSectionProps {
  userNotes: string;
  setUserNotes: (notes: string) => void;
  handleSaveNotes: () => void;
}

const NoteSection: React.FC<NoteSectionProps> = ({ userNotes, setUserNotes, handleSaveNotes }) => {
  return (
    <div className="space-y-4">
      <Textarea
        value={userNotes}
        onChange={(e) => setUserNotes(e.target.value)}
        placeholder="Take notes on this concept here..."
        className="min-h-[200px] p-4 text-base"
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
      
      <div className="text-sm text-muted-foreground">
        <p>Tips for effective note taking:</p>
        <ul className="list-disc ml-5 mt-1 space-y-1">
          <li>Focus on understanding the core concepts</li>
          <li>Write formulas and their applications</li>
          <li>Note any questions you have for further study</li>
          <li>Link this concept to other related concepts</li>
        </ul>
      </div>
    </div>
  );
};

export default NoteSection;
