
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";

const JokesTab = () => {
  const [currentJoke, setCurrentJoke] = useState({
    setup: "Why did the student eat his homework?",
    punchline: "Because the teacher said it was a piece of cake!"
  });
  const [showPunchline, setShowPunchline] = useState(false);
  const [liked, setLiked] = useState<boolean | null>(null);

  const jokes = [
    {
      setup: "Why couldn't the math book solve its own problems?",
      punchline: "It had too many X's!"
    },
    {
      setup: "What do you call a fish that wears a crown?",
      punchline: "King mackerel!"
    },
    {
      setup: "What's a computer's favorite snack?",
      punchline: "Microchips!"
    },
    {
      setup: "Why don't scientists trust atoms?",
      punchline: "Because they make up everything!"
    },
    {
      setup: "What did one wall say to the other wall?",
      punchline: "I'll meet you at the corner!"
    }
  ];

  const getNewJoke = () => {
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    setCurrentJoke(randomJoke);
    setShowPunchline(false);
    setLiked(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 p-4 mb-4">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">{currentJoke.setup}</h3>
          
          {showPunchline ? (
            <motion.p 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }}
              className="text-xl font-bold my-4 text-amber-800 dark:text-amber-300"
            >
              {currentJoke.punchline}
            </motion.p>
          ) : (
            <Button 
              variant="outline" 
              className="my-4"
              onClick={() => setShowPunchline(true)}
            >
              Reveal Punchline
            </Button>
          )}

          {showPunchline && (
            <div className="flex justify-center gap-2 mt-4">
              <Button
                variant="ghost"
                size="sm"
                className={`${liked === true ? 'bg-green-100 text-green-700' : ''}`}
                onClick={() => setLiked(true)}
              >
                <ThumbsUp className="h-4 w-4 mr-1" />
                Funny
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`${liked === false ? 'bg-red-100 text-red-700' : ''}`}
                onClick={() => setLiked(false)}
              >
                <ThumbsDown className="h-4 w-4 mr-1" />
                Not funny
              </Button>
            </div>
          )}
        </div>
      </Card>
      
      <div className="flex justify-center">
        <Button onClick={getNewJoke} variant="outline" size="sm">
          <RefreshCcw className="h-4 w-4 mr-1" />
          Another Joke
        </Button>
      </div>
    </motion.div>
  );
};

export default JokesTab;
