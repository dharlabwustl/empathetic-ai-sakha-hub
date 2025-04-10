
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { brainTeasers } from "./types";

export function TeaserTab() {
  const [currentTeaser, setCurrentTeaser] = useState(brainTeasers[0]);
  const [showAnswer, setShowAnswer] = useState(false);

  const getRandomItem = <T,>(items: T[]): T => {
    return items[Math.floor(Math.random() * items.length)];
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <div className="text-center mb-4">
        <p className="text-sm font-medium">Brain Teaser:</p>
        <p className="text-xs my-2">{currentTeaser.question}</p>
        {showAnswer && (
          <p className="text-xs font-medium text-violet-600 dark:text-violet-400">
            Answer: {currentTeaser.answer}
          </p>
        )}
      </div>
      <div className="flex gap-2">
        <Button 
          size="sm" 
          variant={showAnswer ? "outline" : "default"}
          onClick={() => showAnswer ? setCurrentTeaser(getRandomItem(brainTeasers)) : setShowAnswer(true)}
          className={showAnswer ? "" : "bg-gradient-to-r from-violet-600 to-indigo-600"}
        >
          {showAnswer ? "Next Teaser" : "Reveal Answer"}
        </Button>
        {showAnswer && (
          <Button 
            size="sm"
            variant="ghost"
            className="flex items-center gap-1"
            onClick={() => setShowAnswer(false)}
          >
            Hide
          </Button>
        )}
      </div>
    </div>
  );
}
