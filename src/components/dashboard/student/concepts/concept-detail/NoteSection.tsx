
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { X, Save } from 'lucide-react';

interface NoteSectionProps {
  userNotes: string;
  setUserNotes: (notes: string) => void;
  handleSaveNotes: () => void;
  onClose: () => void;
}

const NoteSection: React.FC<NoteSectionProps> = ({
  userNotes,
  setUserNotes,
  handleSaveNotes,
  onClose
}) => {
  const handleSave = () => {
    handleSaveNotes();
    onClose();
  };
  
  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg mb-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Your Notes</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <Textarea
        value={userNotes}
        onChange={(e) => setUserNotes(e.target.value)}
        placeholder="Add your notes about this concept here..."
        className="min-h-[120px] text-sm mb-3"
      />
      
      <Button 
        size="sm" 
        onClick={handleSave}
        className="flex items-center gap-1"
      >
        <Save className="h-4 w-4" />
        Save Notes
      </Button>
    </div>
  );
};

export default NoteSection;
