
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Lightbulb, ThumbsUp, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";

const TeasersTab = () => {
  const [currentTeaser, setCurrentTeaser] = useState({
    question: "I'm tall when I'm young, and I'm short when I'm old. What am I?",
    answer: "A candle"
  });
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const brainTeasers = [
    {
      question: "What has a head and a tail, but no body?",
      answer: "A coin"
    },
    {
      question: "What has many keys but can't open a single lock?",
      answer: "A piano"
    },
    {
      question: "What gets wetter as it dries?",
      answer: "A towel"
    },
    {
      question: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?",
      answer: "A map"
    },
    {
      question: "What has a bottom at the top?",
      answer: "Your legs"
    }
  ];

  const getNewTeaser = () => {
    const randomTeaser = brainTeasers[Math.floor(Math.random() * brainTeasers.length)];
    setCurrentTeaser(randomTeaser);
    setShowAnswer(false);
    setUserAnswer('');
    setIsCorrect(null);
  };

  const checkAnswer = () => {
    const normalizedUserAnswer = userAnswer.toLowerCase().trim();
    const normalizedCorrectAnswer = currentTeaser.answer.toLowerCase().trim();
    
    setIsCorrect(normalizedUserAnswer === normalizedCorrectAnswer);
    setTimeout(() => setShowAnswer(true), 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 mb-4">
        <div className="text-center">
          <Lightbulb className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
          <h3 className="text-lg font-medium mb-4">{currentTeaser.question}</h3>
          
          {!showAnswer ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Your answer"
                  className="flex-1 border rounded p-2"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                />
                <Button onClick={checkAnswer} disabled={!userAnswer.trim()}>
                  Check
                </Button>
              </div>
              
              {isCorrect === true && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 p-2 rounded"
                >
                  <ThumbsUp className="h-4 w-4 inline mr-1" />
                  That's right!
                </motion.div>
              )}
              
              {isCorrect === false && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 p-2 rounded"
                >
                  Not quite. Try again or reveal the answer.
                </motion.div>
              )}
              
              <Button 
                variant="outline"
                size="sm" 
                onClick={() => setShowAnswer(true)}
              >
                Reveal Answer
              </Button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <p className="font-medium text-lg text-purple-800 dark:text-purple-200">{currentTeaser.answer}</p>
              </div>
              
              <Button onClick={getNewTeaser} variant="default">
                <RefreshCcw className="h-4 w-4 mr-1" />
                Try Another Teaser
              </Button>
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default TeasersTab;
