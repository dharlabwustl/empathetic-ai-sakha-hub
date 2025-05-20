
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Volume2, VolumeX, PenLine, Save } from "lucide-react";
import { motion } from "framer-motion";

interface Formula {
  id: string;
  formula: string;
  description: string;
}

interface ConceptContentProps {
  content: string;
  formulas?: Formula[];
  conceptId: string;
  userNotes: string;
  setUserNotes: React.Dispatch<React.SetStateAction<string>>;
  handleSaveNotes: () => void;
  isReadingAloud: boolean;
  setIsReadingAloud: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConceptContent: React.FC<ConceptContentProps> = ({ 
  content, 
  formulas = [], 
  conceptId,
  userNotes,
  setUserNotes,
  handleSaveNotes,
  isReadingAloud,
  setIsReadingAloud
}) => {
  // Effect for text-to-speech
  useEffect(() => {
    if (isReadingAloud) {
      const cleanText = content.replace(/<[^>]*>?/gm, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 0.95;
      utterance.onend = () => setIsReadingAloud(false);
      speechSynthesis.speak(utterance);
    } else {
      speechSynthesis.cancel();
    }

    return () => {
      speechSynthesis.cancel();
    };
  }, [isReadingAloud, content, setIsReadingAloud]);

  return (
    <div className="space-y-6">
      {/* Control bar */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Concept Details</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsReadingAloud(!isReadingAloud)}
          className={isReadingAloud ? "bg-blue-50 text-blue-700 border-blue-300 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-700" : ""}
        >
          {isReadingAloud ? (
            <>
              <VolumeX className="h-4 w-4 mr-2" />
              Stop Reading
            </>
          ) : (
            <>
              <Volume2 className="h-4 w-4 mr-2" />
              Read Aloud
            </>
          )}
        </Button>
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="prose prose-indigo dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* Key formulas section */}
      {formulas && formulas.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Key Formulas
          </h3>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {formulas.map((formula) => (
              <Card key={formula.id} className="overflow-hidden border border-indigo-100 dark:border-indigo-900/50 bg-gradient-to-br from-white to-indigo-50/30 dark:from-gray-800 dark:to-indigo-950/30">
                <CardContent className="p-4">
                  <div className="text-lg font-mono text-center py-2 my-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-md">
                    {formula.formula}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-2">
                    {formula.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      )}

      {/* Notes section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-8"
      >
        <div className="flex items-center gap-2 mb-4">
          <PenLine className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Your Notes
          </h3>
        </div>
        
        <Textarea 
          value={userNotes} 
          onChange={(e) => setUserNotes(e.target.value)}
          placeholder="Write your notes about this concept here..."
          className="min-h-[150px] resize-y border-indigo-200 dark:border-indigo-900 focus:border-indigo-300 focus:ring-indigo-300"
        />
        
        <div className="flex justify-end mt-3">
          <Button 
            onClick={handleSaveNotes}
            className="flex items-center gap-2"
            size="sm"
          >
            <Save className="h-4 w-4" />
            Save Notes
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ConceptContent;
