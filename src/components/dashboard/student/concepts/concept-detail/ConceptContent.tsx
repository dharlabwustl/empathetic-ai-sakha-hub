
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Volume2, VolumeX } from 'lucide-react';
import ReadAloudSection from './ReadAloudSection';

interface ConceptContentProps {
  content: string;
  conceptId: string;
  userNotes: string;
  setUserNotes: (notes: string) => void;
  handleSaveNotes: () => void;
  isReadingAloud: boolean;
  setIsReadingAloud: (reading: boolean) => void;
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
  const [showNotes, setShowNotes] = useState(false);

  const toggleReadAloud = () => {
    setIsReadingAloud(!isReadingAloud);
    
    if (!isReadingAloud) {
      // Start reading
      const cleanText = content.replace(/<[^>]*>?/gm, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 0.95;
      utterance.onend = () => setIsReadingAloud(false);
      speechSynthesis.speak(utterance);
    } else {
      // Stop reading
      speechSynthesis.cancel();
    }
  };

  return (
    <div className="flex flex-col">
      {/* Reading controls at the top */}
      <div className="px-4 py-3 flex items-center justify-between bg-blue-50/50 dark:bg-blue-900/10 border-b border-blue-100 dark:border-blue-800/30">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-100/50 flex items-center gap-1.5"
            onClick={toggleReadAloud}
          >
            {isReadingAloud ? (
              <>
                <VolumeX className="h-4 w-4" />
                Stop Reading
              </>
            ) : (
              <>
                <Volume2 className="h-4 w-4" />
                Read Aloud
              </>
            )}
          </Button>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-100/50"
          onClick={() => setShowNotes(!showNotes)}
        >
          {showNotes ? "Hide Notes" : "Take Notes"}
        </Button>
      </div>

      {/* Read aloud section - conditionally shown when active */}
      {isReadingAloud && (
        <ReadAloudSection 
          text={content.replace(/<[^>]*>?/gm, '')} 
          isActive={isReadingAloud} 
          onStop={() => setIsReadingAloud(false)} 
        />
      )}
      
      {/* Content and Notes section */}
      <div className={`grid grid-cols-1 ${showNotes ? 'md:grid-cols-7' : ''} gap-4`}>
        {/* Main content area */}
        <div 
          className={`p-4 space-y-4 concept-content overflow-y-auto ${showNotes ? 'md:col-span-4' : ''}`}
          style={{ maxHeight: '70vh' }}
        >
          <div 
            className="prose prose-sm md:prose-base dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
        
        {/* Notes section */}
        {showNotes && (
          <>
            <div className="hidden md:block md:col-span-1">
              <Separator orientation="vertical" className="h-full mx-auto" />
            </div>
            
            <div className="p-4 md:col-span-2 bg-amber-50/30 dark:bg-amber-900/10 rounded-lg border border-amber-100 dark:border-amber-800/30">
              <div className="mb-3">
                <h3 className="text-sm font-medium mb-1">Your Notes</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Add your personal notes for this concept
                </p>
              </div>
              
              <textarea
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
                className="w-full h-64 p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-sm"
                placeholder="Type your notes here..."
              />
              
              <div className="flex justify-end mt-2">
                <Button 
                  size="sm" 
                  variant="secondary" 
                  onClick={handleSaveNotes}
                  className="text-xs"
                >
                  Save Notes
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ConceptContent;
