
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, ThumbsUp, MessageSquare, Share, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DailyTeasersTabProps {
  winner?: {
    name: string;
    avatar: string;
    title: string;
    description: string;
  };
}

const DailyTeasersTab: React.FC<DailyTeasersTabProps> = ({ winner }) => {
  const [showAnswers, setShowAnswers] = useState<Record<string, boolean>>({});
  
  const teasers = [
    {
      id: "teaser-1",
      category: "math",
      question: "If 3x + 5 = 20, what is the value of x?",
      answer: "x = 5",
      difficulty: "easy"
    },
    {
      id: "teaser-2",
      category: "riddle",
      question: "I'm tall when I'm young, and I'm short when I'm old. What am I?",
      answer: "A candle",
      difficulty: "medium"
    },
    {
      id: "teaser-3",
      category: "logic",
      question: "A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost?",
      answer: "The ball costs $0.05 and the bat costs $1.05",
      difficulty: "hard"
    }
  ];
  
  const toggleAnswer = (id: string) => {
    setShowAnswers(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };
  
  return (
    <div className="space-y-6">
      {winner && (
        <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800 mb-6">
          <div className="flex items-center gap-3">
            <Award className="h-5 w-5 text-amber-600" />
            <div>
              <p className="font-medium text-sm">Today's Teaser Winner: {winner.name}</p>
              <p className="text-xs text-muted-foreground">{winner.title} - {winner.description}</p>
            </div>
          </div>
        </div>
      )}
      
      <h3 className="font-medium text-lg mb-4">Daily Brain Teasers</h3>
      
      <div className="grid gap-4">
        {teasers.map((teaser) => (
          <Card key={teaser.id} className="overflow-hidden">
            <CardHeader className="pb-2 pt-4">
              <div className="flex items-center justify-between">
                <Badge className={getDifficultyColor(teaser.difficulty)}>
                  {teaser.difficulty.charAt(0).toUpperCase() + teaser.difficulty.slice(1)}
                </Badge>
                <Badge variant="outline">{teaser.category}</Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-4">
              <p className="mb-4">{teaser.question}</p>
              
              {showAnswers[teaser.id] ? (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                  <p className="text-sm font-medium">Answer: {teaser.answer}</p>
                </div>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full"
                  onClick={() => toggleAnswer(teaser.id)}
                >
                  Reveal Answer
                </Button>
              )}
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <button className="text-gray-500 hover:text-blue-500">
                    <ThumbsUp className="h-4 w-4" />
                  </button>
                  <button className="text-gray-500 hover:text-purple-500">
                    <MessageSquare className="h-4 w-4" />
                  </button>
                  <button className="text-gray-500 hover:text-green-500">
                    <Share className="h-4 w-4" />
                  </button>
                </div>
                <button className="text-blue-600 text-xs flex items-center">
                  Discuss <ArrowRight className="h-3 w-3 ml-1" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-center">
        <Button>Load More Teasers</Button>
      </div>
    </div>
  );
};

export default DailyTeasersTab;
