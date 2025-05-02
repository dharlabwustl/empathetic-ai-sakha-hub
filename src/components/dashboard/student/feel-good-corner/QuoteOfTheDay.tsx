
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Quote } from 'lucide-react';

const quotes = [
  {
    text: "Believe in yourself. You are braver than you think, more talented than you know, and capable of more than you imagine.",
    author: "Roy T. Bennett"
  },
  {
    text: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson"
  },
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain"
  },
  {
    text: "It always seems impossible until it's done.",
    author: "Nelson Mandela"
  },
  {
    text: "Study while others are sleeping; work while others are loafing; prepare while others are playing; and dream while others are wishing.",
    author: "William Arthur Ward"
  }
];

const QuoteOfTheDay: React.FC = () => {
  const [currentQuote, setCurrentQuote] = React.useState(() => {
    // Choose a random quote initially
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  });

  const refreshQuote = () => {
    let newIndex = Math.floor(Math.random() * quotes.length);
    // Make sure we don't get the same quote twice in a row
    while (quotes[newIndex].text === currentQuote.text && quotes.length > 1) {
      newIndex = Math.floor(Math.random() * quotes.length);
    }
    setCurrentQuote(quotes[newIndex]);
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="pt-6 px-6 pb-4">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-full">
            <Quote className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          
          <div>
            <p className="text-lg font-medium italic">"{currentQuote.text}"</p>
            <p className="text-sm text-muted-foreground mt-2">- {currentQuote.author}</p>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-sm flex items-center gap-1" 
            onClick={refreshQuote}
          >
            <RefreshCw className="h-3 w-3" />
            <span>New Quote</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuoteOfTheDay;
