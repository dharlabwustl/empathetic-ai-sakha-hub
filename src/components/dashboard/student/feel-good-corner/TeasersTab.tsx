
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Lightbulb } from "lucide-react";

const brainTeasers = [
  {
    question: "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?",
    answer: "An Echo",
    hint: "Think about sounds that come back to you."
  },
  {
    question: "The more you take, the more you leave behind. What am I?",
    answer: "Footsteps",
    hint: "Think about walking."
  },
  {
    question: "What has a head, a tail, is brown, and has no legs?",
    answer: "A Penny",
    hint: "It's a coin."
  },
  {
    question: "A man who was outside in the rain without an umbrella or hat didn't get a single hair on his head wet. Why?",
    answer: "He was bald",
    hint: "Think about his hair."
  },
  {
    question: "What can travel around the world while staying in a corner?",
    answer: "A Stamp",
    hint: "It goes on envelopes."
  },
  {
    question: "What has keys but no locks, space but no room, and you can enter but not go in?",
    answer: "A Keyboard",
    hint: "You're using one right now."
  },
  {
    question: "If you drop me I'm sure to crack, but give me a smile and I'll smile right back. What am I?",
    answer: "A Mirror",
    hint: "It shows your reflection."
  },
];

const TeasersTab: React.FC = () => {
  const [currentTeaser, setCurrentTeaser] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showHint, setShowHint] = useState(false);
  
  const handleNext = () => {
    setShowAnswer(false);
    setShowHint(false);
    setCurrentTeaser((prev) => (prev + 1) % brainTeasers.length);
  };
  
  const teaser = brainTeasers[currentTeaser];

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTeaser}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="min-h-[120px] flex flex-col justify-between p-4 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-lg border border-amber-100 dark:border-amber-800/30"
        >
          <div>
            <div className="flex items-start gap-3 mb-4">
              <Lightbulb className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0" />
              <p className="font-medium text-amber-800 dark:text-amber-300">
                {teaser.question}
              </p>
            </div>
            
            {showHint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="mb-4 bg-white/50 dark:bg-gray-800/50 p-2 rounded border border-amber-200 dark:border-amber-700/30"
              >
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  <span className="font-medium">Hint:</span> {teaser.hint}
                </p>
              </motion.div>
            )}
            
            {showAnswer && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="mb-2 bg-white/80 dark:bg-gray-800/50 p-2 rounded border border-green-200 dark:border-green-700/30"
              >
                <p className="font-medium text-green-700 dark:text-green-300">
                  Answer: {teaser.answer}
                </p>
              </motion.div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2 justify-between mt-4">
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-amber-200 text-amber-700"
                onClick={() => setShowHint(!showHint)}
              >
                {showHint ? "Hide Hint" : "Show Hint"}
                {showHint ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-amber-200 text-amber-700"
                onClick={() => setShowAnswer(!showAnswer)}
              >
                {showAnswer ? "Hide Answer" : "Show Answer"}
                {showAnswer ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
              </Button>
            </div>
            <Button 
              size="sm" 
              onClick={handleNext}
              className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white"
            >
              Next Teaser
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TeasersTab;
