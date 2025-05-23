
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import ReadAloudSection from './ReadAloudSection';
import { Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ConceptContentProps {
  content: string;
}

const ConceptContent: React.FC<ConceptContentProps> = ({ content }) => {
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  
  const handleStartReading = () => {
    setIsReadingAloud(true);
    
    // Start speech synthesis
    const utterance = new SpeechSynthesisUtterance(
      // Remove HTML tags for clean speech
      content.replace(/<[^>]*>?/gm, '')
    );
    utterance.rate = 0.95; // Slightly slower than default
    speechSynthesis.speak(utterance);
  };
  
  const handleStopReading = () => {
    setIsReadingAloud(false);
    speechSynthesis.cancel();
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        {isReadingAloud && (
          <ReadAloudSection 
            text={content.replace(/<[^>]*>?/gm, '')}
            isActive={isReadingAloud}
            onStop={handleStopReading}
          />
        )}
        
        <CardContent className="p-6 relative">
          {!isReadingAloud && (
            <Button 
              variant="outline" 
              size="sm"
              className="absolute top-3 right-3 flex items-center gap-2"
              onClick={handleStartReading}
            >
              <Volume2 className="h-4 w-4" />
              <span>Read Aloud</span>
            </Button>
          )}
          
          <div 
            className="prose dark:prose-invert max-w-none mt-4" 
            dangerouslySetInnerHTML={{ __html: content }} 
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ConceptContent;
