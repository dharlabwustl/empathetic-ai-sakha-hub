
import { useState } from 'react';
import { BookmarkPlus, PenLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function SmartExtras() {
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');
  const { toast } = useToast();

  const handleSaveNotes = () => {
    if (notes.trim()) {
      toast({
        title: "Notes saved",
        description: "Your study notes have been saved."
      });
    }
  };

  const handleDoneForToday = () => {
    toast({
      title: "Study session complete",
      description: "Your progress has been recorded. Great work today!",
      variant: "success"
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-sm">Smart Extras</h3>
      
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
          <Button 
            size="sm" 
            className="w-full"
            onClick={handleSaveNotes}
          >
            Save Notes
          </Button>
        </div>
      )}

      <Button 
        className="w-full bg-green-600 hover:bg-green-700"
        onClick={handleDoneForToday}
      >
        I'm Done for Today
      </Button>
    </div>
  );
}
