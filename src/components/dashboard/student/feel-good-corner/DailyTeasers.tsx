
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Award, Trophy, Send, RefreshCw, Brain, Crown, Gift, Star } from "lucide-react";
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface DailyWinner {
  name: string;
  avatar: string;
  content: string;
}

interface PrizeWinner {
  name: string;
  avatar: string;
  prize: string;
  date: string;
  prizeImage: string;
}

interface DailyTeasersProps {
  onLike: () => void;
  dailyWinner: DailyWinner;
}

const DailyTeasers: React.FC<DailyTeasersProps> = ({ onLike, dailyWinner }) => {
  const { toast } = useToast();
  const [selectedTeaser, setSelectedTeaser] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [submitted, setSubmitted] = useState<boolean[]>([false, false, false]);

  // Mock data for weekly and monthly winners with prize images
  const weeklyWinner: PrizeWinner = {
    name: "Priya Singh",
    avatar: "/avatars/02.png",
    prize: "PREPZR Backpack & Study Kit",
    date: "Week 47, 2024",
    prizeImage: "/lovable-uploads/a15af77c-622c-408a-9ebb-7ee56d9b2e42.png"
  };

  const monthlyWinner: PrizeWinner = {
    name: "Rahul Kumar",
    avatar: "/avatars/03.png", 
    prize: "Laptop",
    date: "November 2024",
    prizeImage: "/lovable-uploads/525745a8-28be-41e6-bfbb-ffb5d3b3ef39.png"
  };

  // Weekly prizes showcase
  const weeklyPrizes = [
    { name: "PREPZR T-Shirt", image: "/lovable-uploads/43080c8f-4487-46b8-a789-d44d122d3d98.png" },
    { name: "PREPZR Bags", image: "/lovable-uploads/f5761d30-2499-4bc1-9813-e0c95e33e700.png" },
    { name: "Study Stationery", image: "/lovable-uploads/a802054f-3066-4d58-8534-d5849cba7ac9.png" },
    { name: "Laptop Bags", image: "/lovable-uploads/0825eb99-40ce-447c-825b-975e20fcfde3.png" }
  ];

  const teasers = [
    {
      type: "Chemistry",
      question: "I'm a compound essential for life. I contain carbon, hydrogen, and oxygen. I'm formed by the condensation of two molecules, releasing water. I'm found in pasta, bread, and rice. What am I?",
      answer: "Carbohydrate",
      hint: "I provide energy for the body and my simplest form is glucose.",
      difficulty: "Medium"
    },
    {
      type: "Physics", 
      question: "I am a fundamental concept in physics. I can be potential or kinetic. According to a famous law, I cannot be created or destroyed, only transformed. Einstein showed I'm related to mass. What am I?",
      answer: "Energy",
      hint: "Think about E=mc² and the law of conservation.",
      difficulty: "Easy"
    },
    {
      type: "Biology",
      question: "I'm the powerhouse of the cell. I have my own DNA and double membrane. I produce ATP through cellular respiration. Without me, complex life wouldn't exist. What am I?",
      answer: "Mitochondria",
      hint: "I'm often called the powerhouse and I'm involved in energy production.",
      difficulty: "Medium"
    }
  ];

  const handleSubmit = (index: number) => {
    const newSubmitted = [...submitted];
    newSubmitted[index] = true;
    setSubmitted(newSubmitted);
    
    toast({
      title: "Answer Submitted!",
      description: "Your answer has been recorded. Check back later for results!",
    });
    setUserAnswer('');
  };

  const handleGetHint = (index: number) => {
    toast({
      title: "Hint",
      description: teasers[index].hint,
    });
  };

  const getNewTeaser = () => {
    toast({
      title: "Coming Soon!",
      description: "New teasers are added daily. Check back tomorrow!",
    });
  };

  return (
    <div className="space-y-6">
      {/* Prize Showcase Banner */}
      <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-amber-100 border-2 border-purple-300 rounded-xl p-6 mb-6">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-purple-800 mb-2">🎁 Amazing Prizes Await!</h2>
          <p className="text-purple-700">Solve brain teasers daily and win incredible PREPZR merchandise!</p>
        </div>
        
        {/* Weekly Prizes Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {weeklyPrizes.map((prize, index) => (
            <div key={index} className="bg-white rounded-lg p-3 shadow-sm border border-purple-200">
              <img 
                src={prize.image} 
                alt={prize.name}
                className="w-full h-20 object-contain mb-2"
              />
              <p className="text-xs font-medium text-purple-800 text-center">{prize.name}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Badge className="bg-purple-600 text-white px-4 py-1">
            Weekly: T-Shirts, Bags & More | Monthly: Laptops!
          </Badge>
        </div>
      </div>

      {/* Prize Winners Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Weekly Winner */}
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-purple-700">
              <Crown className="h-6 w-6 text-purple-600" />
              Weekly Champion
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Avatar className="h-14 w-14 border-3 border-purple-300">
                <AvatarImage src={weeklyWinner.avatar} alt={weeklyWinner.name} />
                <AvatarFallback className="bg-purple-100 text-purple-800 font-bold">
                  {weeklyWinner.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-bold text-purple-800">{weeklyWinner.name}</h4>
                <p className="text-sm text-purple-600">{weeklyWinner.date}</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 border-2 border-purple-200">
              <div className="flex items-center gap-3 mb-2">
                <img 
                  src={weeklyWinner.prizeImage} 
                  alt={weeklyWinner.prize}
                  className="w-12 h-12 object-contain"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <Gift className="h-4 w-4 text-purple-600" />
                    <span className="font-bold text-purple-800">{weeklyWinner.prize}</span>
                  </div>
                  <p className="text-xs text-purple-600 mt-1">Solved 15 teasers this week!</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Winner */}
        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-amber-700">
              <Trophy className="h-6 w-6 text-amber-600" />
              Monthly Mega Winner
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Avatar className="h-14 w-14 border-3 border-amber-300">
                <AvatarImage src={monthlyWinner.avatar} alt={monthlyWinner.name} />
                <AvatarFallback className="bg-amber-100 text-amber-800 font-bold">
                  {monthlyWinner.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-bold text-amber-800">{monthlyWinner.name}</h4>
                <p className="text-sm text-amber-600">{monthlyWinner.date}</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 border-2 border-amber-200">
              <div className="flex items-center gap-3 mb-2">
                <img 
                  src={monthlyWinner.prizeImage} 
                  alt={monthlyWinner.prize}
                  className="w-12 h-12 object-contain"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-amber-600" />
                    <span className="font-bold text-amber-800">{monthlyWinner.prize}</span>
                  </div>
                  <p className="text-xs text-amber-600 mt-1">60+ teasers solved this month!</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Winner Section */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 mb-4">
        <div className="flex items-start space-x-4">
          <Avatar className="h-10 w-10 border-2 border-green-300">
            <AvatarImage src={dailyWinner.avatar} alt={dailyWinner.name} />
            <AvatarFallback>{dailyWinner.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center">
              <h3 className="font-medium">🏆 Today's Teaser Champion</h3>
              <Trophy className="h-4 w-4 text-green-500 ml-2" />
            </div>
            <p className="text-sm text-green-700">{dailyWinner.name} solved the {dailyWinner.content} in record time!</p>
          </div>
        </div>
      </div>

      {/* Brain Teasers Section */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-600" />
          <h2 className="text-lg font-medium">Daily Brain Teasers</h2>
        </div>
        <Button variant="outline" size="sm" onClick={getNewTeaser} className="flex items-center gap-1">
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Get New Teasers</span>
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${
                teasers[selectedTeaser].type === 'Chemistry' ? 'bg-green-500' :
                teasers[selectedTeaser].type === 'Physics' ? 'bg-blue-500' : 'bg-orange-500'
              }`} />
              {teasers[selectedTeaser].type} Teaser
            </CardTitle>
            <Badge variant={teasers[selectedTeaser].difficulty === 'Easy' ? 'default' : 'secondary'}>
              {teasers[selectedTeaser].difficulty}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">{teasers[selectedTeaser].question}</p>
          
          <div className="pt-2">
            <Textarea 
              placeholder="Write your answer here..." 
              className="mb-3"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              disabled={submitted[selectedTeaser]}
            />
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleGetHint(selectedTeaser)}
                disabled={submitted[selectedTeaser]}
              >
                Get Hint
              </Button>
              <Button 
                size="sm"
                onClick={() => handleSubmit(selectedTeaser)}
                disabled={!userAnswer.trim() || submitted[selectedTeaser]}
                className="flex items-center gap-1"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Submit Answer</span>
              </Button>
            </div>
          </div>
          
          {submitted[selectedTeaser] && (
            <div className="mt-4 p-3 bg-green-50 text-green-800 border border-green-200 rounded-md">
              Thank you for your submission! Check back later to see if you're the daily winner.
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex gap-2 justify-center mt-4">
        {teasers.map((teaser, index) => (
          <Button
            key={index}
            variant={selectedTeaser === index ? "default" : "outline"} 
            size="sm"
            onClick={() => {
              setSelectedTeaser(index);
              setUserAnswer('');
            }}
            className="flex items-center gap-1"
          >
            <div className={`w-2 h-2 rounded-full ${
              teaser.type === 'Chemistry' ? 'bg-green-500' :
              teaser.type === 'Physics' ? 'bg-blue-500' : 'bg-orange-500'
            }`} />
            {teaser.type}
          </Button>
        ))}
      </div>

      <div className="flex justify-center pt-2">
        <Button variant="ghost" onClick={onLike} className="flex items-center">
          <Award className="mr-2 h-4 w-4" />
          I enjoyed these teasers!
        </Button>
      </div>
    </div>
  );
};

export default DailyTeasers;
