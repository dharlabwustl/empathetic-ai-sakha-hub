
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Smile, RefreshCw, ThumbsUp, ThumbsDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const jokes = [
  {
    setup: "Why don't scientists trust atoms?",
    punchline: "Because they make up everything!"
  },
  {
    setup: "Why did the physics student break up with the biology student?",
    punchline: "There was no chemistry!"
  },
  {
    setup: "What did the scientist say when he found 2 isotopes of helium?",
    punchline: "HeHe"
  },
  {
    setup: "Why was the equal sign so humble?",
    punchline: "Because it knew it wasn't less than or greater than anyone else."
  },
  {
    setup: "What's a math teacher's favorite kind of tree?",
    punchline: "Geometry!"
  },
  {
    setup: "Did you hear about the mathematician who's afraid of negative numbers?",
    punchline: "He'll stop at nothing to avoid them!"
  }
];

const JokesTab: React.FC = () => {
  const [currentJoke, setCurrentJoke] = useState(0);
  const [showPunchline, setShowPunchline] = useState(false);
  const [likedJokes, setLikedJokes] = useState<number[]>([]);
  
  const handleNextJoke = () => {
    const nextJoke = (currentJoke + 1) % jokes.length;
    setCurrentJoke(nextJoke);
    setShowPunchline(false);
  };
  
  const handleTogglePunchline = () => {
    setShowPunchline(!showPunchline);
  };
  
  const handleLikeJoke = () => {
    if (!likedJokes.includes(currentJoke)) {
      setLikedJokes([...likedJokes, currentJoke]);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Smile className="h-5 w-5 text-amber-500" /> Study Jokes
        </h3>
        <Button variant="ghost" size="sm" onClick={handleNextJoke}>
          <RefreshCw className="h-4 w-4 mr-1" /> Next Joke
        </Button>
      </div>
      
      <Card className="p-6 bg-gradient-to-r from-amber-50 to-amber-100/50 dark:from-amber-950/20 dark:to-amber-900/20 border-amber-200 dark:border-amber-800/30">
        <motion.div
          key={currentJoke}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-lg font-medium mb-4">{jokes[currentJoke].setup}</p>
          
          <AnimatePresence>
            {showPunchline ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-xl font-bold text-amber-600 dark:text-amber-400 my-4">
                  {jokes[currentJoke].punchline}
                </p>
                
                <div className="flex justify-center gap-3 mt-6">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-amber-300 hover:bg-amber-100"
                    onClick={handleLikeJoke}
                  >
                    <ThumbsUp className="h-4 w-4 mr-1 text-amber-600" />
                    {likedJokes.includes(currentJoke) ? 'Liked!' : 'Like'}
                  </Button>
                  <Button 
                    variant="outline"
                    size="sm"
                    className="border-gray-200"
                    onClick={handleNextJoke}
                  >
                    <ThumbsDown className="h-4 w-4 mr-1" />
                    Next
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Button
                  className="bg-amber-500 hover:bg-amber-600 text-white"
                  onClick={handleTogglePunchline}
                >
                  Reveal Punchline
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </Card>
      
      <div className="text-center text-sm text-gray-500">
        <p>A good laugh helps reduce stress and improves cognition!</p>
      </div>
    </div>
  );
};

export default JokesTab;
