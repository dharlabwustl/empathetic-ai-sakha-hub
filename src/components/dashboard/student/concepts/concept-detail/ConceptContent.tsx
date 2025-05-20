
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, Copy, BookOpen, Highlighter, Speaker } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

interface ConceptContentProps {
  title: string;
  content: string;
  subtopics?: string[];
  relatedFormulas?: string[];
  examples?: {
    question: string;
    solution: string;
  }[];
}

const ConceptContent: React.FC<ConceptContentProps> = ({
  title,
  content,
  subtopics = [],
  relatedFormulas = [],
  examples = []
}) => {
  const [activeTab, setActiveTab] = useState("content");
  const [copied, setCopied] = useState(false);
  const [highlightedText, setHighlightedText] = useState<string>('');
  const [contentWithHighlights, setContentWithHighlights] = useState(content);
  
  const { toast } = useToast();
  
  const handleCopyContent = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    
    toast({
      title: "Content copied",
      description: "The concept content has been copied to clipboard."
    });
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  const handleTextSelection = useCallback(() => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      setHighlightedText(selection.toString());
    }
  }, []);
  
  const highlightSelectedText = useCallback(() => {
    if (highlightedText && highlightedText.length > 0) {
      // Create a highlighted version with a span
      const highlightedContent = contentWithHighlights.replace(
        new RegExp(highlightedText, 'g'),
        `<span class="bg-yellow-200 dark:bg-yellow-800">${highlightedText}</span>`
      );
      
      setContentWithHighlights(highlightedContent);
      
      toast({
        title: "Text highlighted",
        description: "The selected text has been highlighted."
      });
      
      // Clear the selection
      setHighlightedText('');
    } else {
      toast({
        title: "No text selected",
        description: "Please select text to highlight.",
        variant: "destructive"
      });
    }
  }, [highlightedText, contentWithHighlights, toast]);
  
  const readContentAloud = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(content);
      utterance.rate = 0.9; // Slightly slower rate for better comprehension
      speechSynthesis.speak(utterance);
      
      toast({
        title: "Reading content",
        description: "The concept content is being read aloud."
      });
    } else {
      toast({
        title: "Not supported",
        description: "Text-to-speech is not supported in your browser.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="space-y-4">
      <Card className="overflow-hidden">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)}>
          <div className="flex items-center justify-between bg-muted/40 px-4 py-2">
            <TabsList className="bg-transparent">
              <TabsTrigger value="content" className="text-sm">Content</TabsTrigger>
              <TabsTrigger value="examples" className="text-sm">Examples</TabsTrigger>
              <TabsTrigger value="related" className="text-sm">Related</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={highlightSelectedText}
                disabled={!highlightedText}
                className="h-8 w-8 p-0"
              >
                <Highlighter className="h-4 w-4" />
                <span className="sr-only">Highlight text</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={readContentAloud}
                className="h-8 w-8 p-0"
              >
                <Speaker className="h-4 w-4" />
                <span className="sr-only">Read aloud</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleCopyContent}
                className="h-8 w-8 p-0"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span className="sr-only">Copy content</span>
              </Button>
            </div>
          </div>
          
          <TabsContent value="content" className="m-0">
            <ScrollArea className="h-[500px] p-4 md:p-6" onMouseUp={handleTextSelection}>
              <div
                className="prose prose-sm md:prose-base dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: contentWithHighlights }}
              />
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="examples" className="m-0">
            <ScrollArea className="h-[500px] p-4 md:p-6">
              {examples.length > 0 ? (
                <div className="space-y-6">
                  {examples.map((example, index) => (
                    <div key={index} className="space-y-2">
                      <h3 className="text-lg font-medium">Example {index + 1}</h3>
                      <div className="bg-muted/30 p-3 rounded-md">
                        <h4 className="text-sm font-medium">Question:</h4>
                        <p className="text-sm mt-1">{example.question}</p>
                      </div>
                      <div className="bg-muted/10 p-3 rounded-md border">
                        <h4 className="text-sm font-medium">Solution:</h4>
                        <p className="text-sm mt-1">{example.solution}</p>
                      </div>
                      {index < examples.length - 1 && <Separator className="my-4" />}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <BookOpen className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                    <h3 className="text-lg font-medium">No examples available</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Examples for this concept will be added soon.
                    </p>
                  </div>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="related" className="m-0">
            <ScrollArea className="h-[500px] p-4 md:p-6">
              <div className="space-y-6">
                {subtopics.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-2">Related Subtopics</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {subtopics.map((subtopic, index) => (
                        <li key={index} className="text-sm">{subtopic}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {relatedFormulas.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-2">Related Formulas</h3>
                    <div className="space-y-2">
                      {relatedFormulas.map((formula, index) => (
                        <div key={index} className="bg-muted/20 p-3 rounded-md text-center">
                          <p className="text-sm font-mono">{formula}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {subtopics.length === 0 && relatedFormulas.length === 0 && (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <BookOpen className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                      <h3 className="text-lg font-medium">No related content</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Related concepts and formulas will be added soon.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default ConceptContent;
