
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";
import { jokes } from "./types";

export function JokeTab() {
  const [currentJoke, setCurrentJoke] = useState(jokes[0]);

  const getRandomItem = <T,>(items: T[]): T => {
    return items[Math.floor(Math.random() * items.length)];
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <div className="text-center mb-4">
        <p className="text-sm italic">"{currentJoke}"</p>
      </div>
      <div className="flex gap-2">
        <Button 
          size="sm" 
          variant="outline"
          onClick={() => setCurrentJoke(getRandomItem(jokes))}
        >
          Next Joke
        </Button>
        <Button 
          size="sm"
          variant="ghost"
          className="flex items-center gap-1"
        >
          <ThumbsUp className="h-3.5 w-3.5" /> <span className="text-xs">12</span>
        </Button>
      </div>
    </div>
  );
}
