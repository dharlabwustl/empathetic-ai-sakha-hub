
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lightbulb, Sparkles, Rocket } from 'lucide-react';

interface Puzzle {
  id: number;
  question: string;
  answer: string;
  hint?: string;
}

interface Fact {
  id: number;
  content: string;
  source?: string;
}

interface Quote {
  id: number;
  text: string;
  author: string;
}

const DailyTeasers: React.FC = () => {
  const [revealedPuzzles, setRevealedPuzzles] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState('brainteasers');
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const puzzles: Puzzle[] = [
    {
      id: 1,
      question: "I'm tall when I'm young, and I'm short when I'm old. What am I?",
      answer: "A candle",
      hint: "Think about something that burns"
    },
    {
      id: 2,
      question: "What has a head and a tail, but no body?",
      answer: "A coin",
      hint: "It's in your wallet"
    },
    {
      id: 3,
      question: "What gets wet while drying?",
      answer: "A towel",
      hint: "You use it after a shower"
    }
  ];

  const funFacts: Fact[] = [
    {
      id: 1,
      content: "The human brain uses 20% of the body's total oxygen and energy, despite only accounting for about 2% of its weight.",
      source: "Neuroscience Journal"
    },
    {
      id: 2,
      content: "Taking a short nap after learning something new can help improve memory retention by up to 30%.",
      source: "Sleep Research Institute"
    },
    {
      id: 3,
      content: "Your brain generates about 12-25 watts of electricity while you're awake – enough to power a low-wattage LED light.",
      source: "Cognitive Neuroscience Society"
    }
  ];

  const quotes: Quote[] = [
    {
      id: 1,
      text: "The beautiful thing about learning is that no one can take it away from you.",
      author: "B.B. King"
    },
    {
      id: 2,
      text: "Education is not the filling of a pail, but the lighting of a fire.",
      author: "W.B. Yeats"
    },
    {
      id: 3,
      text: "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.",
      author: "Brian Herbert"
    }
  ];

  const toggleReveal = (id: number) => {
    if (revealedPuzzles.includes(id)) {
      setRevealedPuzzles(revealedPuzzles.filter(puzzleId => puzzleId !== id));
    } else {
      setRevealedPuzzles([...revealedPuzzles, id]);
      toast({
        title: "Answer revealed!",
        description: "Don't forget to try solving it yourself next time!"
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "You can now share this with friends!"
    });
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold mb-1`}>Daily Mental Refreshers</h3>
        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
          Give your brain a different kind of workout between study sessions
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="brainteasers" className={isMobile ? 'text-xs' : ''}>
            <Lightbulb className="h-3 w-3 mr-1" />
            Brain Teasers
          </TabsTrigger>
          <TabsTrigger value="funfacts" className={isMobile ? 'text-xs' : ''}>
            <Sparkles className="h-3 w-3 mr-1" />
            Fun Facts
          </TabsTrigger>
          <TabsTrigger value="quotes" className={isMobile ? 'text-xs' : ''}>
            <Rocket className="h-3 w-3 mr-1" />
            Motivational
          </TabsTrigger>
        </TabsList>

        <TabsContent value="brainteasers">
          <div className="space-y-3">
            {puzzles.map((puzzle) => (
              <Card key={puzzle.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <h4 className={`${isMobile ? 'text-sm' : 'text-base'} font-medium mb-2`}>
                    {puzzle.question}
                  </h4>
                  
                  {revealedPuzzles.includes(puzzle.id) ? (
                    <div className="mt-2 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-md">
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-indigo-700 dark:text-indigo-300`}>
                        Answer: {puzzle.answer}
                      </p>
                    </div>
                  ) : (
                    puzzle.hint && (
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-500 dark:text-gray-400 italic`}>
                        Hint: {puzzle.hint}
                      </p>
                    )
                  )}
                  
                  <div className="mt-3 flex justify-end">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => toggleReveal(puzzle.id)}
                      className={isMobile ? 'text-xs' : ''}
                    >
                      {revealedPuzzles.includes(puzzle.id) ? 'Hide Answer' : 'Reveal Answer'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="funfacts">
          <div className="space-y-3">
            {funFacts.map((fact) => (
              <Card key={fact.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'}`}>
                    {fact.content}
                  </p>
                  
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      Source: {fact.source}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => copyToClipboard(fact.content)}
                      className={isMobile ? 'text-xs' : ''}
                    >
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quotes">
          <div className="space-y-3">
            {quotes.map((quote) => (
              <Card key={quote.id} className={`overflow-hidden ${
                quote.id % 2 === 0 
                  ? 'bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10' 
                  : 'bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10'
              }`}>
                <CardContent className="p-4">
                  <p className={`${isMobile ? 'text-sm' : 'text-base'} font-medium italic`}>
                    "{quote.text}"
                  </p>
                  
                  <div className="mt-3 flex justify-between items-center">
                    <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600 dark:text-gray-400`}>
                      — {quote.author}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => copyToClipboard(`"${quote.text}" — ${quote.author}`)}
                      className={isMobile ? 'text-xs' : ''}
                    >
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center mt-6">
        <Button size={isMobile ? "sm" : "default"} className={isMobile ? 'text-xs' : ''}>
          View More
        </Button>
      </div>
    </div>
  );
};

export default DailyTeasers;
