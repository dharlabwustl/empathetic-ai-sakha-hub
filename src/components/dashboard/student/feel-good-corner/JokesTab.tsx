
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { shuffle } from "lodash";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw } from "lucide-react";

// Jokes appropriate for students
const jokes = [
  "Why did the physics book break up with the math book? There was just too much tension!",
  "What did the calculator say to the student? You can count on me!",
  "Why don't scientists trust atoms? Because they make up everything!",
  "I told my chemistry joke, but there was no reaction.",
  "What do you call a parade of rabbits jumping backward? A receding hare line!",
  "I used to be a baker, but I couldn't make enough dough.",
  "Why did the scarecrow win an award? Because he was outstanding in his field!",
  "Where do boats go when they're sick? To the dock!",
  "Why don't eggs tell jokes? They'd crack each other up!",
  "What did one wall say to the other? I'll meet you at the corner!",
  "Why did the student eat his homework? Because the teacher said it was a piece of cake!",
  "What's a computer's favorite snack? Microchips!",
  "Why was the math book sad? It had too many problems.",
  "I would tell you a chemistry joke but I know I wouldn't get a reaction.",
  "What's the difference between a poorly dressed man on a trampoline and a well-dressed man on a trampoline? Attire!",
];

const JokesTab: React.FC = () => {
  const [currentJoke, setCurrentJoke] = useState(jokes[0]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const getNewJoke = () => {
    setIsRefreshing(true);
    
    // Get a random joke different from the current one
    let newJoke;
    do {
      newJoke = jokes[Math.floor(Math.random() * jokes.length)];
    } while (newJoke === currentJoke && jokes.length > 1);
    
    // Simulate network request
    setTimeout(() => {
      setCurrentJoke(newJoke);
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentJoke}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="min-h-[100px] flex items-center justify-center p-4 bg-gradient-to-r from-violet-50 to-blue-50 dark:from-violet-900/20 dark:to-blue-900/20 rounded-lg border border-violet-100 dark:border-violet-800/30"
        >
          <p className="text-center font-medium text-violet-800 dark:text-violet-300">
            {currentJoke}
          </p>
        </motion.div>
      </AnimatePresence>
      
      <div className="flex justify-center">
        <Button 
          onClick={getNewJoke} 
          disabled={isRefreshing}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Finding a joke...' : 'Another One!'}
        </Button>
      </div>
    </div>
  );
};

export default JokesTab;
