
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PenLine, Save, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface NoteSectionProps {
  userNotes: string;
  setUserNotes: (notes: string) => void;
  handleSaveNotes: () => void;
}

const NoteSection: React.FC<NoteSectionProps> = ({ userNotes, setUserNotes, handleSaveNotes }) => {
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  
  const handleSave = () => {
    handleSaveNotes();
    setLastSaved(new Date().toLocaleTimeString());
  };
  
  return (
    <Card className="border-2 border-blue-100 dark:border-blue-900/30 shadow-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold flex items-center text-lg">
            <PenLine className="h-5 w-5 mr-2 text-blue-600" /> My Notes
          </h3>
          {lastSaved && (
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> Saved at {lastSaved}
            </Badge>
          )}
        </div>
        
        <textarea
          className="w-full border rounded-md p-3 min-h-[200px] text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800"
          placeholder="Add your notes here to reinforce your understanding of this concept..."
          value={userNotes}
          onChange={(e) => setUserNotes(e.target.value)}
        />
        
        <div className="mt-4 flex justify-end">
          <Button onClick={handleSave} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
            <Save className="h-4 w-4" />
            Save Notes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NoteSection;
