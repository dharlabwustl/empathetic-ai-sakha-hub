
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Volume2, VolumeX, BookmarkPlus, Copy, Bookmark, BookOpen, MessageCircle, Highlighter, Microphone } from "lucide-react";
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
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const contentRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Track sections in content for the navigation helper
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (contentRef.current) {
      const headings = contentRef.current.querySelectorAll('h2, h3');
      headings.forEach(heading => {
        if (heading.id) {
          observer.observe(heading);
        }
      });
    }

    return () => {
      if (contentRef.current) {
        const headings = contentRef.current.querySelectorAll('h2, h3');
        headings.forEach(heading => {
          if (heading.id) {
            observer.unobserve(heading);
          }
        });
      }
    };
  }, [content]);
  
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

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: isBookmarked 
        ? "This section has been removed from your saved items" 
        : "This section has been added to your saved items",
    });
  };

  // Extract sections from content for the navigation helper
  const getSections = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headings = Array.from(doc.querySelectorAll('h2, h3'));
    
    return headings.map(heading => ({
      id: heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, '-') || '',
      text: heading.textContent || '',
      level: heading.tagName === 'H2' ? 2 : 3
    }));
  };
  
  const sections = getSections();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  // Enhance content with ids for navigation
  const enhanceContent = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    
    const headings = doc.querySelectorAll('h2, h3');
    headings.forEach(heading => {
      const id = heading.textContent?.toLowerCase().replace(/\s+/g, '-') || '';
      heading.setAttribute('id', id);
    });
    
    return doc.body.innerHTML;
  };
  
  const enhancedContent = enhanceContent();

  return (
    <div className="p-0">
      <Tabs defaultValue="content" value={activeTab} onValueChange={(value) => setActiveTab(value as "content" | "notes")} className="w-full">
        <div className="flex items-center justify-between px-6 pt-4 border-b border-gray-200 dark:border-gray-700">
          <TabsList className="bg-transparent border-b-0 p-0">
            <TabsTrigger 
              value="content" 
              className="pb-2 px-4 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 rounded-none bg-transparent"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Content
            </TabsTrigger>
            <TabsTrigger 
              value="notes" 
              className="pb-2 px-4 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 rounded-none bg-transparent"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              My Notes
            </TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 rounded-full"
              onClick={toggleBookmark}
            >
              {isBookmarked ? <Bookmark className="h-4 w-4 fill-indigo-500 text-indigo-500" /> : <BookmarkPlus className="h-4 w-4" />}
            </Button>
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
          <div className="relative flex">
            {/* Navigation sidebar for sections */}
            <div className="hidden md:block sticky top-4 h-fit w-48 overflow-auto p-4 bg-gray-50 dark:bg-gray-800/50 rounded-r-lg border-r border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">In This Concept</h4>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-2 py-1 text-sm rounded-md transition-colors ${
                      activeSection === section.id
                        ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                    } ${section.level === 3 ? 'pl-4' : ''}`}
                  >
                    {section.text}
                  </button>
                ))}
              </nav>
            </div>
            
            {/* Main content area */}
            <div className="flex-1">
              {isReadingAloud && (
                <div className="mb-4 p-4 border-b border-blue-100 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-900/20">
                  <ReadAloudSection 
                    text={content.replace(/<[^>]*>?/gm, '')}
                    isActive={isReadingAloud}
                    onStop={() => setIsReadingAloud(false)}
                  />
                </div>
              )}
              
              <div ref={contentRef} className="prose dark:prose-invert max-w-none p-6">
                <div dangerouslySetInnerHTML={{ __html: enhancedContent }} />
              </div>
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
