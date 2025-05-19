
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PenLine } from 'lucide-react';

interface NoteSectionProps {
  userNotes: string;
  setUserNotes: (notes: string) => void;
  handleSaveNotes: () => void;
}

const NoteSection: React.FC<NoteSectionProps> = ({ userNotes, setUserNotes, handleSaveNotes }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold flex items-center">
            <PenLine className="h-4 w-4 mr-2" /> My Notes
          </h3>
        </div>
        
        <textarea
          className="w-full border rounded-md p-3 min-h-[200px] text-sm"
          placeholder="Add your notes here..."
          value={userNotes}
          onChange={(e) => setUserNotes(e.target.value)}
        />
        
        <div className="mt-4 flex justify-end">
          <Button onClick={handleSaveNotes} className="flex items-center gap-1">
            Save Notes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NoteSection;
