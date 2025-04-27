
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Medal, ArrowRight, Check, Award, Trophy, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TeasersTab = () => {
  const { toast } = useToast();
  const [userAnswer, setUserAnswer] = useState('');
  const [hasAnswered, setHasAnswered] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  
  // Mock daily teaser - would come from an API in a real app
  const dailyTeaser = {
    id: 1,
    question: "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?",
    answer: "echo",
    difficulty: "medium",
    pointsValue: 25
  };
  
  // Mock leaderboard data - would come from an API in a real app
  const leaderboard = [
    { rank: 1, name: "Priya K.", avatar: "https://via.placeholder.com/40", points: 275, streak: 11 },
    { rank: 2, name: "Arjun S.", avatar: "https://via.placeholder.com/40", points: 230, streak: 9 },
    { rank: 3, name: "Neha M.", avatar: "https://via.placeholder.com/40", points: 195, streak: 7 },
    { rank: 4, name: "Vikram D.", avatar: "https://via.placeholder.com/40", points: 180, streak: 5 },
    { rank: 5, name: "You", avatar: "https://via.placeholder.com/40", points: 150, streak: 6 },
  ];
  
  const handleSubmitAnswer = () => {
    if (!userAnswer.trim()) {
      toast({
        title: "Empty Answer",
        description: "Please enter your answer before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    setHasAnswered(true);
    
    if (userAnswer.toLowerCase().trim() === dailyTeaser.answer) {
      toast({
        title: "Correct Answer!",
        description: `You earned ${dailyTeaser.pointsValue} points!`,
      });
    } else {
      toast({
        title: "Not Quite Right",
        description: "Try again with a different answer!",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-amber-500" />
          Daily Brain Teaser
        </h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowLeaderboard(!showLeaderboard)}
        >
          {showLeaderboard ? 'Hide Leaderboard' : 'Show Leaderboard'}
          {!showLeaderboard && <Medal className="ml-1 h-4 w-4 text-amber-500" />}
        </Button>
      </div>
      
      {!showLeaderboard ? (
        <Card className="border-2 border-amber-200 dark:border-amber-800">
          <CardHeader className="bg-amber-50 dark:bg-amber-950/30">
            <div className="flex justify-between">
              <CardTitle className="text-lg">Daily Challenge</CardTitle>
              <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200">
                {dailyTeaser.difficulty}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-center text-lg mb-8">{dailyTeaser.question}</p>
            
            <div className="flex gap-2">
              <Input
                placeholder="Enter your answer..."
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                disabled={hasAnswered && userAnswer.toLowerCase().trim() === dailyTeaser.answer}
                className={hasAnswered && userAnswer.toLowerCase().trim() === dailyTeaser.answer ? 'bg-green-50 border-green-300' : ''}
              />
              <Button 
                onClick={handleSubmitAnswer} 
                disabled={hasAnswered && userAnswer.toLowerCase().trim() === dailyTeaser.answer}
              >
                {hasAnswered && userAnswer.toLowerCase().trim() === dailyTeaser.answer ? (
                  <>
                    <Check className="mr-1 h-4 w-4" />
                    Correct!
                  </>
                ) : (
                  'Submit'
                )}
              </Button>
            </div>
            
            {hasAnswered && userAnswer.toLowerCase().trim() === dailyTeaser.answer && (
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-950/20 rounded-md text-center">
                <p className="text-green-700 dark:text-green-300 flex items-center justify-center gap-1">
                  <Award className="h-5 w-5" />
                  <span>You earned {dailyTeaser.pointsValue} points!</span>
                </p>
              </div>
            )}
            
            {hasAnswered && userAnswer.toLowerCase().trim() !== dailyTeaser.answer && (
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-950/20 rounded-md text-center">
                <p className="text-red-700 dark:text-red-300">
                  Not quite right. Try again!
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter className="bg-amber-50 dark:bg-amber-950/30 justify-between text-sm">
            <span className="flex items-center gap-1">
              <Trophy className="h-4 w-4 text-amber-600" />
              Points: {dailyTeaser.pointsValue}
            </span>
            <Button variant="ghost" size="sm" className="text-amber-700" onClick={() => setShowLeaderboard(true)}>
              View Leaderboard
              <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader className="bg-amber-50 dark:bg-amber-950/30">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-600" />
                Teaser Leaderboard
              </CardTitle>
              <Badge variant="outline" className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{leaderboard.length} participants</span>
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {leaderboard.map((user) => (
                <div 
                  key={user.rank} 
                  className={`flex items-center p-4 ${user.name === 'You' ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                >
                  <div className="w-8 font-semibold text-lg">{user.rank}</div>
                  <div className="flex items-center gap-3 flex-1">
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-8 h-8 rounded-full bg-gray-200"
                    />
                    <span className={user.name === 'You' ? 'font-medium' : ''}>{user.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-amber-600 font-medium">{user.points} pts</div>
                    <div className="flex items-center gap-1">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {user.streak} day streak
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="p-4 border-t">
            <Button 
              variant="outline"
              className="w-full"
              onClick={() => setShowLeaderboard(false)}
            >
              Back to Today's Challenge
            </Button>
          </CardFooter>
        </Card>
      )}
      
      <div>
        <h3 className="font-semibold mb-3">Past Challenges</h3>
        <div className="space-y-2">
          <Card>
            <CardContent className="p-3">
              <div className="flex justify-between items-center">
                <p className="line-clamp-1 flex-1">If you drop me I'm sure to crack, but give me a smile and I'll always smile back. What am I?</p>
                <Badge className="ml-2">Completed</Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <div className="flex justify-between items-center">
                <p className="line-clamp-1 flex-1">I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?</p>
                <Badge className="ml-2">Completed</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeasersTab;
