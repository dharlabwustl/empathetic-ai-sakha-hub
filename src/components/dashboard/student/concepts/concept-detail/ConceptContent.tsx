
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Pencil, Bookmark, BookmarkCheck } from "lucide-react";
import NoteSection from './NoteSection';
import ReadAloudSection from './ReadAloudSection';

interface ConceptContentProps {
  content: string;
  conceptId: string;
  userNotes: string;
  setUserNotes: (notes: string) => void;
  handleSaveNotes: () => void;
  isReadingAloud: boolean;
  setIsReadingAloud: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [showNotesForm, setShowNotesForm] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  const toggleNotesForm = () => {
    setShowNotesForm(!showNotesForm);
  };
  
  const toggleReadAloud = () => {
    setIsReadingAloud(!isReadingAloud);
  };

  const handleStopReadAloud = () => {
    setIsReadingAloud(false);
  };
  
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };
  
  return (
    <div className="p-4">
      {/* Read Aloud Section */}
      {isReadingAloud && (
        <ReadAloudSection 
          text={content.replace(/<[^>]*>?/gm, '')} 
          isActive={isReadingAloud}
          onStop={handleStopReadAloud}
        />
      )}
      
      {/* Content toolbar */}
      <div className="flex items-center justify-end space-x-2 mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs flex items-center gap-1"
          onClick={toggleBookmark}
        >
          {isBookmarked ? (
            <>
              <BookmarkCheck className="h-4 w-4 text-green-500" /> Bookmarked
            </>
          ) : (
            <>
              <Bookmark className="h-4 w-4" /> Bookmark
            </>
          )}
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs flex items-center gap-1"
          onClick={toggleReadAloud}
        >
          {isReadingAloud ? (
            <>
              <VolumeX className="h-4 w-4" /> Stop Reading
            </>
          ) : (
            <>
              <Volume2 className="h-4 w-4" /> Read Aloud
            </>
          )}
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          className="text-xs flex items-center gap-1"
          onClick={toggleNotesForm}
        >
          <Pencil className="h-4 w-4" />
          {userNotes ? "Edit Notes" : "Add Notes"}
        </Button>
      </div>
      
      {/* Notes form */}
      {showNotesForm && (
        <NoteSection 
          userNotes={userNotes} 
          setUserNotes={setUserNotes} 
          handleSaveNotes={handleSaveNotes}
          onClose={() => setShowNotesForm(false)}
        />
      )}
      
      {/* Main content */}
      <div 
        className="prose prose-sm max-w-none dark:prose-invert prose-headings:text-gray-800 dark:prose-headings:text-gray-100 prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-li:text-gray-600 dark:prose-li:text-gray-300"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default ConceptContent;
