
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PenLine, Volume2, BookOpen, Star, Share, Copy, Check } from 'lucide-react';
import ReadAloudSection from './ReadAloudSection';
import NoteSection from './NoteSection';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

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
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  // Split content into paragraphs for better readability
  const contentParagraphs = content.split('\n\n').filter(paragraph => paragraph.trim() !== '');

  const toggleHighlight = () => {
    setIsHighlighted(!isHighlighted);
    toast({
      title: isHighlighted ? "Highlights removed" : "Key points highlighted",
      description: isHighlighted 
        ? "Text highlighting has been removed" 
        : "Important concepts have been highlighted for easier studying",
    });
  };

  const handleCopyContent = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    toast({
      title: "Content copied",
      description: "The concept content has been copied to your clipboard",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    // In a real app, this would open a share dialog or generate a link
    toast({
      title: "Share feature",
      description: "Share functionality would be implemented here in a production app",
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Main content column */}
      <div className="md:col-span-2 space-y-6">
        <Card className="border-2 border-blue-100 dark:border-blue-900/30 shadow-sm overflow-hidden">
          <CardContent className="p-6">
            {/* Content with read aloud button */}
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-blue-600" /> Concept Overview
              </h2>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className={`flex items-center gap-1 ${isHighlighted ? 'border-yellow-400 text-yellow-600' : ''}`}
                  onClick={toggleHighlight}
                >
                  <Star className="h-4 w-4" />
                  {isHighlighted ? 'Remove Highlights' : 'Highlight Key Points'}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className={`flex items-center gap-1 ${isReadingAloud ? 'border-blue-400 text-blue-600' : ''}`}
                  onClick={() => setIsReadingAloud(!isReadingAloud)}
                >
                  <Volume2 className="h-4 w-4" />
                  {isReadingAloud ? 'Stop Reading' : 'Read Aloud'}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={handleCopyContent}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={handleShare}
                >
                  <Share className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>

            <div className={`prose dark:prose-invert max-w-none ${isHighlighted ? 'concept-highlighted' : ''}`}>
              {contentParagraphs.map((paragraph, index) => (
                <p key={index} className="mb-4 text-base leading-relaxed">{paragraph}</p>
              ))}
            </div>

            {isReadingAloud && (
              <ReadAloudSection 
                text={content} 
                isActive={isReadingAloud}
                onStop={() => setIsReadingAloud(false)}
              />
            )}

            <div className="mt-6 flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                Reading Time: {Math.ceil(content.split(' ').length / 200)} min
              </Badge>
              <Badge variant="outline" className="bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400">
                Complexity: Medium
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                Core Concept
              </Badge>
            </div>

            <style>
              {`
                .concept-highlighted p {
                  position: relative;
                  background: linear-gradient(180deg, rgba(255,255,255,0) 50%, rgba(255,243,143,0.2) 50%);
                }
              `}
            </style>
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
