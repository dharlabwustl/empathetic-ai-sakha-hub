
import React from 'react';
import { motion } from 'framer-motion';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Save } from "lucide-react";

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
  setIsReadingAloud,
}) => {
  const toggleReadAloud = () => {
    if (isReadingAloud) {
      speechSynthesis.cancel();
    } else {
      const cleanText = content.replace(/<[^>]*>?/gm, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 0.95;
      utterance.onend = () => setIsReadingAloud(false);
      speechSynthesis.speak(utterance);
    }
    setIsReadingAloud(!isReadingAloud);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Concept Explanation</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={toggleReadAloud}
          className="flex items-center gap-2"
        >
          {isReadingAloud ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          {isReadingAloud ? "Stop Reading" : "Read Aloud"}
        </Button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-gray-50 dark:bg-gray-850 rounded-lg p-6 prose prose-slate dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <div className="mt-8 space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Your Notes</h3>
          <Button size="sm" className="flex items-center gap-2" onClick={handleSaveNotes}>
            <Save className="h-4 w-4" />
            Save Notes
          </Button>
        </div>
        <Textarea
          placeholder="Take notes on this concept..."
          value={userNotes}
          onChange={(e) => setUserNotes(e.target.value)}
          className="min-h-[150px] resize-y"
        />
      </div>
    </div>
  );
};

export default ConceptContent;
