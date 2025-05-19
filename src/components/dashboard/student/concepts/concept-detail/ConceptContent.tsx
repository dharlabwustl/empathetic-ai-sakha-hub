
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Volume2, BookOpen, Star, Share, Copy, Check, Eye, EyeOff, Bookmark, Sparkles } from 'lucide-react';
import ReadAloudSection from './ReadAloudSection';
import NoteSection from './NoteSection';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  const [activeMode, setActiveMode] = useState<'read' | 'notes'>('read');
  const [viewMode, setViewMode] = useState<'normal' | 'focus'>('normal');
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

  const toggleViewMode = () => {
    setViewMode(viewMode === 'normal' ? 'focus' : 'normal');
    toast({
      title: viewMode === 'normal' ? "Focus mode enabled" : "Focus mode disabled",
      description: viewMode === 'normal' 
        ? "Distractions reduced for better concentration" 
        : "Normal view restored",
    });
  };

  const saveToBookmarks = () => {
    toast({
      title: "Bookmarked",
      description: "This concept has been added to your bookmarks for quick access",
    });
  };

  return (
    <div className={`grid grid-cols-1 gap-6 transition-all duration-300 ${
      viewMode === 'focus' ? 'md:max-w-3xl mx-auto' : 'md:grid-cols-3'
    }`}>
      {/* Main content column */}
      <div className={viewMode === 'focus' ? 'col-span-1' : 'md:col-span-2'}>
        <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/30 dark:to-gray-900">
          <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
          <CardHeader className="pb-2 flex flex-row justify-between items-start">
            <CardTitle className="flex items-center text-xl font-bold">
              <BookOpen className="h-5 w-5 mr-2 text-blue-600" /> Concept Overview
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="rounded-full h-8 w-8 p-0"
                onClick={toggleViewMode}
              >
                {viewMode === 'normal' ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="rounded-full h-8 w-8 p-0"
                onClick={saveToBookmarks}
              >
                <Bookmark className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Tabs defaultValue="content" className="mb-6">
              <TabsList className="w-full grid grid-cols-3 mb-4">
                <TabsTrigger value="content" className="text-sm">Main Content</TabsTrigger>
                <TabsTrigger value="simplified" className="text-sm">Simplified</TabsTrigger>
                <TabsTrigger value="visual" className="text-sm">Visual Map</TabsTrigger>
              </TabsList>
              
              <TabsContent value="content">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Button 
                    variant={isHighlighted ? "default" : "outline"} 
                    size="sm"
                    className={`flex items-center gap-1 text-xs ${isHighlighted ? 'bg-amber-500 hover:bg-amber-600 border-amber-500' : ''}`}
                    onClick={toggleHighlight}
                  >
                    <Sparkles className="h-3 w-3" />
                    {isHighlighted ? 'Remove Highlights' : 'Highlight Key Points'}
                  </Button>
                  <Button 
                    variant={isReadingAloud ? "default" : "outline"}
                    size="sm"
                    className={`flex items-center gap-1 text-xs ${isReadingAloud ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                    onClick={() => setIsReadingAloud(!isReadingAloud)}
                  >
                    <Volume2 className="h-3 w-3" />
                    {isReadingAloud ? 'Stop Reading' : 'Read Aloud'}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-1 text-xs"
                    onClick={handleCopyContent}
                  >
                    {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-1 text-xs"
                    onClick={handleShare}
                  >
                    <Share className="h-3 w-3" />
                    Share
                  </Button>
                </div>

                <div className={`prose dark:prose-invert max-w-none px-4 py-3 rounded-lg bg-white/70 dark:bg-gray-800/30 backdrop-blur-sm ${isHighlighted ? 'concept-highlighted' : ''}`}>
                  {contentParagraphs.map((paragraph, index) => (
                    <p key={index} className="mb-4 text-base leading-relaxed">{paragraph}</p>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="simplified">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                  <p className="text-sm mb-3 text-blue-800 dark:text-blue-300 font-medium">Simplified Explanation:</p>
                  <p className="text-base leading-relaxed">
                    Cell division is how one cell becomes two cells. There are two main types: mitosis (for growth) and meiosis (for reproduction). 
                    Before dividing, cells go through phases where they grow and copy their DNA. 
                    Then, during division, they separate the DNA copies and split into new cells.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="visual">
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-100 dark:border-purple-800 text-center">
                  <p className="text-sm mb-3 text-purple-800 dark:text-purple-300 font-medium">Visual Concept Map:</p>
                  <div className="bg-white dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700 flex justify-center">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Concept map visualization would appear here in a production app
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {isReadingAloud && (
              <ReadAloudSection 
                text={content} 
                isActive={isReadingAloud}
                onStop={() => setIsReadingAloud(false)}
              />
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200">
                Reading Time: {Math.ceil(content.split(' ').length / 200)} min
              </Badge>
              <Badge variant="outline" className="bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400 border-purple-200">
                Complexity: Medium
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 border-green-200">
                Core Concept
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notes column - only show in normal view */}
      {viewMode === 'normal' && (
        <div className="space-y-6">
          <NoteSection 
            userNotes={userNotes} 
            setUserNotes={setUserNotes} 
            handleSaveNotes={handleSaveNotes} 
          />
        </div>
      )}

      <style>
        {`
          .concept-highlighted p {
            position: relative;
            background: linear-gradient(180deg, rgba(255,255,255,0) 50%, rgba(255,243,143,0.3) 50%);
          }
          .concept-highlighted strong, 
          .concept-highlighted em,
          .concept-highlighted b {
            color: #1e40af;
            background: rgba(219, 234, 254, 0.4);
            padding: 0 4px;
            border-radius: 3px;
          }
        `}
      </style>
    </div>
  );
};

export default ConceptContent;
