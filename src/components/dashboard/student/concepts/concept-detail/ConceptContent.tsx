
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Volume2, VolumeX, Save, BookOpen, PenLine } from 'lucide-react';
import { motion } from 'framer-motion';
import DOMPurify from 'dompurify';

interface ConceptContentProps {
  content: string;
  formulas?: Array<{ id: string; formula: string; description: string }>;
  conceptId: string;
  userNotes: string;
  setUserNotes: (notes: string) => void;
  handleSaveNotes: () => void;
  isReadingAloud: boolean;
  setIsReadingAloud: (isReading: boolean) => void;
}

const ConceptContent: React.FC<ConceptContentProps> = ({
  content,
  formulas,
  conceptId,
  userNotes,
  setUserNotes,
  handleSaveNotes,
  isReadingAloud,
  setIsReadingAloud
}) => {
  // Text-to-speech functionality
  const toggleReadAloud = () => {
    if (isReadingAloud) {
      window.speechSynthesis.cancel();
      setIsReadingAloud(false);
    } else {
      // Strip HTML tags for better speech
      const textContent = new DOMParser().parseFromString(content, 'text/html').body.textContent || '';
      const utterance = new SpeechSynthesis.SpeechSynthesisUtterance(textContent);
      window.speechSynthesis.speak(utterance);
      setIsReadingAloud(true);
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Content and interactivity tabs */}
      <Tabs defaultValue="read" className="w-full">
        <TabsList className="mb-4 w-full justify-start">
          <TabsTrigger value="read" className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" /> Read
          </TabsTrigger>
          <TabsTrigger value="notes" className="flex items-center gap-1">
            <PenLine className="h-4 w-4" /> Take Notes
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="read">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardContent className="pt-6 relative">
                {/* Text-to-speech button */}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={toggleReadAloud}
                  className="absolute top-2 right-2"
                >
                  {isReadingAloud ? (
                    <>
                      <VolumeX className="h-4 w-4 mr-1" /> Stop Reading
                    </>
                  ) : (
                    <>
                      <Volume2 className="h-4 w-4 mr-1" /> Read Aloud
                    </>
                  )}
                </Button>
                
                {/* Content display */}
                <div 
                  className="concept-content prose prose-blue dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
                />
                
                {/* Formulas section */}
                {formulas && formulas.length > 0 && (
                  <div className="mt-6 pt-6 border-t">
                    <h3 className="text-lg font-semibold mb-4">Key Formulas</h3>
                    <div className="space-y-4">
                      {formulas.map(formula => (
                        <div key={formula.id} className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
                          <div className="text-center font-mono text-xl mb-2">{formula.formula}</div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{formula.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="notes">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Your Notes</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Taking notes improves retention by up to 34%. Use this space to summarize key points in your own words.
                  </p>
                </div>
                
                <Textarea 
                  value={userNotes}
                  onChange={(e) => setUserNotes(e.target.value)}
                  placeholder="Write your notes here..."
                  className="min-h-[200px]"
                />
                
                <div className="mt-4 flex justify-end">
                  <Button onClick={handleSaveNotes} className="flex items-center">
                    <Save className="h-4 w-4 mr-1" /> Save Notes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConceptContent;
