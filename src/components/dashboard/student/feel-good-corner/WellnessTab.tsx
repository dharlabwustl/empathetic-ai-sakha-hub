
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { wellnessHacks } from "./types";

export function WellnessTab() {
  const [currentWellness, setCurrentWellness] = useState(wellnessHacks[0]);

  const getRandomItem = <T,>(items: T[]): T => {
    return items[Math.floor(Math.random() * items.length)];
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <div className="text-center mb-4">
        <p className="text-sm font-medium">60-Second Wellness Hack:</p>
        <p className="text-xs my-2">{currentWellness}</p>
      </div>
      <Button 
        size="sm" 
        variant="outline"
        onClick={() => setCurrentWellness(getRandomItem(wellnessHacks))}
      >
        Try Another
      </Button>
    </div>
  );
}
