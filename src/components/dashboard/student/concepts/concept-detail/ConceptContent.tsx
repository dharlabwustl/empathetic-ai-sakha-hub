
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PenLine, Volume2 } from 'lucide-react';
import ReadAloudSection from './ReadAloudSection';
import NoteSection from './NoteSection';

interface ConceptContentProps {
  content: string;
  conceptId: string;
  userNotes: string;
  setUserNotes: (notes: string) => void;
  handleSaveNotes: () => void;
  isReadingAloud: boolean;
  setIsReadingAloud: (isReading: boolean) => void;
}

const ConceptContent: React.FC<ConceptContentProps> = ({
  content,
  conceptId,
  userNotes,
  setUserNotes,
  handleSaveNotes,
  isReadingAloud,
  setIsReadingAloud
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Main content column */}
      <div className="md:col-span-2 space-y-6">
        <Card>
          <CardContent className="p-6">
            {/* Content with read aloud button */}
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-semibold">Concept Overview</h2>
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1"
                onClick={() => setIsReadingAloud(!isReadingAloud)}
              >
                <Volume2 className="h-4 w-4" />
                {isReadingAloud ? 'Stop Reading' : 'Read Aloud'}
              </Button>
            </div>

            <div className="prose dark:prose-invert max-w-none">
              <p className="whitespace-pre-wrap">{content}</p>
            </div>

            {isReadingAloud && (
              <ReadAloudSection 
                text={content} 
                isActive={isReadingAloud}
                onStop={() => setIsReadingAloud(false)}
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Notes column */}
      <div className="space-y-6">
        <NoteSection 
          userNotes={userNotes} 
          setUserNotes={setUserNotes} 
          handleSaveNotes={handleSaveNotes} 
        />
      </div>
    </div>
  );
};

export default ConceptContent;
