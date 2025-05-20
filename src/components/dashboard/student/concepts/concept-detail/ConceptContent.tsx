
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Volume2, VolumeX, Save, BookmarkIcon, Copy } from "lucide-react";
import NoteSection from './NoteSection';
import ReadAloudSection from './ReadAloudSection';
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
  const [activeTab, setActiveTab] = useState<"content" | "notes">("content");
  const { toast } = useToast();
  
  const handleCopyContent = () => {
    // Strip HTML tags for plain text copying
    const plainText = content.replace(/<[^>]*>?/gm, '');
    navigator.clipboard.writeText(plainText);
    toast({
      title: "Content copied",
      description: "Concept content copied to clipboard"
    });
  };
  
  const toggleReadAloud = () => {
    setIsReadingAloud(!isReadingAloud);
  };

  return (
    <div className="p-0">
      <Tabs defaultValue="content" value={activeTab} onValueChange={(value) => setActiveTab(value as "content" | "notes")} className="w-full">
        <div className="flex items-center justify-between px-6 pt-4 border-b border-gray-200 dark:border-gray-700">
          <TabsList className="bg-transparent border-b-0 p-0">
            <TabsTrigger 
              value="content" 
              className="pb-2 px-4 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 rounded-none bg-transparent"
            >
              Content
            </TabsTrigger>
            <TabsTrigger 
              value="notes" 
              className="pb-2 px-4 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 rounded-none bg-transparent"
            >
              My Notes
            </TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 rounded-full"
              onClick={toggleReadAloud}
            >
              {isReadingAloud ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="h-8 w-8 p-0 rounded-full"
              onClick={handleCopyContent}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <TabsContent value="content" className="mt-0 px-0">
          <div className="relative">
            {isReadingAloud && (
              <div className="mb-4">
                <ReadAloudSection 
                  text={content.replace(/<[^>]*>?/gm, '')}
                  isActive={isReadingAloud}
                  onStop={() => setIsReadingAloud(false)}
                />
              </div>
            )}
            
            <div className="prose dark:prose-invert max-w-none p-6">
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="notes" className="mt-0">
          <div className="p-6">
            <NoteSection 
              userNotes={userNotes}
              setUserNotes={setUserNotes}
              handleSaveNotes={handleSaveNotes}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConceptContent;
