
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Save, Info } from 'lucide-react';

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
    <div>
      <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-lg text-sm flex items-start">
        <Info className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
        <p className="text-blue-800 dark:text-blue-200">
          Take notes as you learn. Your notes will be saved automatically and you can access them anytime.
          Notes are a great way to reinforce your learning and help with exam revision.
        </p>
      </div>
      
      <Textarea
        value={userNotes}
        onChange={(e) => setUserNotes(e.target.value)}
        placeholder="Write your notes here..."
        className="min-h-[300px] mb-4"
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
    </div>
  );
};

export default NoteSection;
