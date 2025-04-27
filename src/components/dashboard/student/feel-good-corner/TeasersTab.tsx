
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, RefreshCw, HelpCircle, ThumbsUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TeasersTab = () => {
  const { toast } = useToast();
  const [currentTeaser, setCurrentTeaser] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  
  const brainTeasers = [
    {
      id: 'teaser1',
      question: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
      answer: "An echo",
      difficulty: "Easy",
      hint: "Think about sounds that come back to you"
    },
    {
      id: 'teaser2',
      question: "What has keys but no locks, space but no room, and you can enter but not go in?",
      answer: "A keyboard",
      difficulty: "Medium", 
      hint: "You're using one right now"
    },
    {
      id: 'teaser3',
      question: "The more you take, the more you leave behind. What am I?",
      answer: "Footsteps",
      difficulty: "Medium",
      hint: "Think about walking"
    },
    {
      id: 'teaser4',
      question: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?",
      answer: "A map",
      difficulty: "Medium",
      hint: "You use it for navigation"
    },
    {
      id: 'teaser5',
      question: "What can travel around the world while staying in a corner?",
      answer: "A stamp",
      difficulty: "Hard",
      hint: "It helps letters travel"
    }
  ];

  const handleNextTeaser = () => {
    setLoading(true);
    setShowAnswer(false);
    setUserAnswer('');
    
    // Simulate delay
    setTimeout(() => {
      let next = currentTeaser + 1;
      if (next >= brainTeasers.length) {
        next = 0;
      }
      setCurrentTeaser(next);
      setLoading(false);
    }, 600);
  };

  const checkAnswer = () => {
    if (!userAnswer.trim()) {
      toast({
        title: "Empty Answer",
        description: "Please enter your solution first",
        variant: "destructive"
      });
      return;
    }
    
    const teaser = brainTeasers[currentTeaser];
    const isCorrect = userAnswer.toLowerCase().includes(teaser.answer.toLowerCase());
    
    if (isCorrect) {
      toast({
        title: "Correct!",
        description: "Great job solving the brain teaser!",
        variant: "default"
      });
    } else {
      toast({
        title: "Not Quite Right",
        description: "Try again or check the answer",
        variant: "default"
      });
    }
  };

  const teaser = brainTeasers[currentTeaser];

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">Brain Teasers</h3>
        <p className="text-muted-foreground">
          Challenge your mind with these brain teasers and give your brain a different kind of workout.
        </p>
      </div>

      <Card className="overflow-hidden border-2 border-purple-100 dark:border-purple-900">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 text-xs font-medium px-2.5 py-0.5 rounded">
              {teaser.difficulty}
            </span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleNextTeaser} 
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Loading...' : 'Next Teaser'}
            </Button>
          </div>
          
          <div className="space-y-6 py-4">
            <p className="text-lg font-medium">{teaser.question}</p>
            
            <div className="mt-6">
              <label htmlFor="answer" className="block text-sm font-medium mb-2">
                Your Answer:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="answer"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Type your answer here..."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                />
                <Button onClick={checkAnswer}>
                  <Check className="h-4 w-4 mr-1" />
                  Check
                </Button>
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm" onClick={() => toast({
                title: "Hint",
                description: teaser.hint,
                variant: "default"
              })}>
                <HelpCircle className="h-4 w-4 mr-1" />
                Hint
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowAnswer(!showAnswer)}
              >
                {showAnswer ? "Hide Answer" : "Show Answer"}
              </Button>
            </div>
            
            {showAnswer && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30 rounded-md p-3 mt-4">
                <p className="font-medium text-green-800 dark:text-green-200">
                  Answer: {teaser.answer}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800/30">
        <p className="text-sm text-purple-800 dark:text-purple-300">
          <strong>Brain Boost:</strong> Solving puzzles and brain teasers helps improve cognitive flexibility and creative thinking, which can help you approach your studies from new angles!
        </p>
      </div>
    </div>
  );
};

export default TeasersTab;
