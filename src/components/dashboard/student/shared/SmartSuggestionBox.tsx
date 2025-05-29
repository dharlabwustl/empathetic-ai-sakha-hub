
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Clock, Sun, Moon, Sunset, Coffee } from 'lucide-react';

interface SmartSuggestionBoxProps {
  userPerformance?: {
    accuracy: number;
    conceptProgress: number;
    streak: number;
  };
}

const SmartSuggestionBox: React.FC<SmartSuggestionBoxProps> = ({ userPerformance }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [suggestion, setSuggestion] = useState('');
  const [timeBasedIcon, setTimeBasedIcon] = useState(<Lightbulb className="h-5 w-5" />);
  const [timeOfDay, setTimeOfDay] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hour = currentTime.getHours();
    let currentTimeOfDay = '';
    let icon = <Lightbulb className="h-5 w-5" />;
    
    if (hour >= 5 && hour < 12) {
      currentTimeOfDay = 'morning';
      icon = <Sun className="h-5 w-5 text-yellow-500" />;
    } else if (hour >= 12 && hour < 17) {
      currentTimeOfDay = 'afternoon';
      icon = <Sun className="h-5 w-5 text-orange-500" />;
    } else if (hour >= 17 && hour < 20) {
      currentTimeOfDay = 'evening';
      icon = <Sunset className="h-5 w-5 text-orange-600" />;
    } else {
      currentTimeOfDay = 'night';
      icon = <Moon className="h-5 w-5 text-blue-400" />;
    }

    setTimeOfDay(currentTimeOfDay);
    setTimeBasedIcon(icon);

    // Generate time-based suggestions
    const timeBasedSuggestions = {
      morning: [
        "Good morning! Start your day with some challenging Physics concepts 🌅",
        "Morning energy is perfect for tackling difficult Math problems ☕",
        "Fresh mind, fresh start! Begin with your weakest subject today 🧠"
      ],
      afternoon: [
        "Afternoon focus session: Time for some Chemistry practice 🔬",
        "Perfect time for flashcard reviews and quick concepts 📚",
        "Midday momentum - tackle those pending practice exams 💪"
      ],
      evening: [
        "Evening revision time: Review today's learned concepts 📖",
        "Wind down with some Biology flashcards 🌿",
        "Perfect time for solving previous year questions 📝"
      ],
      night: [
        "Night owl mode: Light revision and formula practice 🌙",
        "Late night? Try some easy concept reviews ⭐",
        "Before bed: Quick biology terminology review 💤"
      ]
    };

    const suggestions = timeBasedSuggestions[currentTimeOfDay as keyof typeof timeBasedSuggestions];
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    setSuggestion(randomSuggestion);
  }, [currentTime]);

  const getTimeBasedAction = () => {
    const hour = currentTime.getHours();
    
    if (hour >= 5 && hour < 12) {
      return { text: "Start Morning Study", link: "/dashboard/student/concepts" };
    } else if (hour >= 12 && hour < 17) {
      return { text: "Afternoon Practice", link: "/dashboard/student/practice-exam" };
    } else if (hour >= 17 && hour < 20) {
      return { text: "Evening Review", link: "/dashboard/student/flashcards" };
    } else {
      return { text: "Night Study", link: "/dashboard/student/today" };
    }
  };

  const actionButton = getTimeBasedAction();

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800/30">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          {timeBasedIcon}
          Smart AI Coach
          <Badge variant="outline" className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
            Live • {timeOfDay}
          </Badge>
          <Clock className="h-4 w-4 text-gray-500" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800/50 p-4 rounded-lg border border-blue-100 dark:border-blue-800/30">
            <p className="text-sm text-gray-700 dark:text-gray-300">{suggestion}</p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Updated: {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <Button 
              size="sm"
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-md transition-all duration-200"
              onClick={() => window.location.href = actionButton.link}
            >
              {actionButton.text}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartSuggestionBox;
