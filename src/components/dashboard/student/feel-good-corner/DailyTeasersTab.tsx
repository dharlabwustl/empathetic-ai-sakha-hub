
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Award, Clock, Brain, Check, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from "@/hooks/use-toast";

interface DailyTeaserWinner {
  name: string;
  avatar: string;
  title: string;
  description: string;
}

interface DailyTeasersTabProps {
  winner: DailyTeaserWinner;
}

const DailyTeasersTab: React.FC<DailyTeasersTabProps> = ({ winner }) => {
  const { toast } = useToast();
  const [selectedTeaser, setSelectedTeaser] = useState<number>(0);
  const [answer, setAnswer] = useState<string>('');
  const [hasAnswered, setHasAnswered] = useState<boolean[]>([false, false, false]);
  const [correctAnswers, setCorrectAnswers] = useState<boolean[]>([false, false, false]);
  
  const dailyTeasers = [
    {
      id: 1,
      category: 'Math',
      question: 'If 3x + 7 = 22, what is the value of x?',
      answer: '5',
      difficulty: 'Easy',
      timeLimit: '1 minute',
      attempts: 156,
      solvedBy: 124
    },
    {
      id: 2,
      category: 'Logic',
      question: 'What comes next in the sequence: 2, 6, 12, 20, ?',
      answer: '30',
      difficulty: 'Medium',
      timeLimit: '2 minutes',
      attempts: 93,
      solvedBy: 61
    },
    {
      id: 3,
      category: 'Physics',
      question: 'If light travels at approximately 3 × 10^8 m/s, how long does it take light to travel 150 million kilometers?',
      answer: '500 seconds',
      difficulty: 'Hard',
      timeLimit: '3 minutes',
      attempts: 72,
      solvedBy: 28
    }
  ];

  const handleAnswerSubmit = () => {
    if (!answer) {
      toast({
        title: "Please enter an answer",
        variant: "destructive"
      });
      return;
    }
    
    const newHasAnswered = [...hasAnswered];
    newHasAnswered[selectedTeaser] = true;
    setHasAnswered(newHasAnswered);
    
    const isCorrect = answer.toLowerCase() === dailyTeasers[selectedTeaser].answer.toLowerCase();
    const newCorrectAnswers = [...correctAnswers];
    newCorrectAnswers[selectedTeaser] = isCorrect;
    setCorrectAnswers(newCorrectAnswers);
    
    if (isCorrect) {
      toast({
        title: "Correct!",
        description: "Well done, that's the right answer!",
        variant: "default"
      });
    } else {
      toast({
        title: "Not quite right",
        description: `The correct answer is: ${dailyTeasers[selectedTeaser].answer}`,
        variant: "destructive"
      });
    }
    
    setAnswer('');
  };
  
  const resetTeaser = () => {
    const newHasAnswered = [...hasAnswered];
    newHasAnswered[selectedTeaser] = false;
    setHasAnswered(newHasAnswered);
    setAnswer('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-lg">Daily Brain Teasers</h3>
        <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
          New teasers daily!
        </Badge>
      </div>
      
      <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-200 dark:border-amber-800 flex items-center gap-3">
        <Award className="h-5 w-5 text-amber-600" />
        <div>
          <p className="font-medium text-sm">Today's Teaser Winner: {winner.name}</p>
          <p className="text-xs text-muted-foreground">{winner.title} - {winner.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {dailyTeasers.map((teaser, index) => (
          <Button 
            key={teaser.id}
            variant={selectedTeaser === index ? "default" : "outline"}
            className={`h-auto py-2 flex flex-col items-center gap-1 ${
              hasAnswered[index] 
                ? correctAnswers[index] 
                  ? "border-green-500 dark:border-green-600" 
                  : "border-red-500 dark:border-red-600"
                : ""
            }`}
            onClick={() => setSelectedTeaser(index)}
          >
            <span className="font-medium">{teaser.category}</span>
            <Badge variant="outline" className="text-xs">
              {teaser.difficulty}
            </Badge>
            {hasAnswered[index] && (
              correctAnswers[index] 
                ? <Check size={14} className="text-green-500" /> 
                : <X size={14} className="text-red-500" />
            )}
          </Button>
        ))}
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              <span>{dailyTeasers[selectedTeaser].category} Teaser</span>
            </CardTitle>
            <Badge className="flex items-center gap-1">
              <Clock size={12} />
              <span>{dailyTeasers[selectedTeaser].timeLimit}</span>
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="mb-4">{dailyTeasers[selectedTeaser].question}</p>
          
          {!hasAnswered[selectedTeaser] ? (
            <div className="flex items-center gap-2">
              <Input
                placeholder="Your answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <Button onClick={handleAnswerSubmit}>
                Submit
              </Button>
            </div>
          ) : (
            <div className={`p-3 rounded-lg ${
              correctAnswers[selectedTeaser] 
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200" 
                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
            }`}>
              <div className="flex items-center gap-2">
                {correctAnswers[selectedTeaser] 
                  ? <Check size={18} className="text-green-600 dark:text-green-400" />
                  : <X size={18} className="text-red-600 dark:text-red-400" />
                }
                <span className="font-medium">
                  {correctAnswers[selectedTeaser] ? "Correct!" : "Incorrect!"}
                </span>
              </div>
              <p className="text-sm mt-1">The answer is: {dailyTeasers[selectedTeaser].answer}</p>
              <Button variant="ghost" size="sm" className="mt-2" onClick={resetTeaser}>
                Try Again
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
          <div>Attempted by {dailyTeasers[selectedTeaser].attempts} students</div>
          <div>Solved by {dailyTeasers[selectedTeaser].solvedBy} students</div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DailyTeasersTab;
