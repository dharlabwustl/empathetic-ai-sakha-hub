
import { BookmarkPlus, PenLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

export default function SmartExtras() {
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 flex-1"
          onClick={() => setShowNotes(!showNotes)}
        >
          <PenLine className="h-4 w-4" />
          Study Notes
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 flex-1"
        >
          <BookmarkPlus className="h-4 w-4" />
          Bookmark
        </Button>
      </div>

      {showNotes && (
        <div className="space-y-2">
          <Textarea
            placeholder="Add your study notes here..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[100px]"
          />
          <Button size="sm" className="w-full">Save Notes</Button>
        </div>
      )}

      <Button 
        className="w-full bg-green-600 hover:bg-green-700"
      >
        I'm Done for Today
      </Button>
    </div>
  );
}
