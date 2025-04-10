
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { quotes } from "./types";

export function QuoteTab() {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);

  const getRandomItem = <T,>(items: T[]): T => {
    return items[Math.floor(Math.random() * items.length)];
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <div className="text-center mb-4">
        <p className="text-sm italic">"{currentQuote}"</p>
      </div>
      <Button 
        size="sm" 
        variant="outline"
        onClick={() => setCurrentQuote(getRandomItem(quotes))}
      >
        Another Quote
      </Button>
    </div>
  );
}
