
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MoodType } from '@/types/user/base';
import { RefreshCw } from 'lucide-react';

interface MotivationCardProps {
  currentMood?: MoodType;
  onRefresh?: () => void;
}

const MotivationCard: React.FC<MotivationCardProps> = ({ 
  currentMood = 'neutral',
  onRefresh 
}) => {
  const getMoodBasedQuote = () => {
    const quotes: Record<MoodType | string, string[]> = {
      'happy': [
        "Fantastic! Channel your positive energy into your studies!",
        "Your good mood will help you learn better. Let's maximize it!",
        "Happiness enhances learning. You're all set to excel today!"
      ],
      'motivated': [
        "Your motivation is your superpower. Use it to achieve greatness!",
        "With your current drive, there's nothing you can't accomplish!",
        "That's the spirit! Keep that motivation flowing through your study session."
      ],
      'neutral': [
        "Every study session is a step forward. You're making progress!",
        "Small consistent efforts lead to big results. Keep going!",
        "Remember your goals. Each study session brings you closer."
      ],
      'curious': [
        "Curiosity is the engine of achievement. Explore and learn!",
        "Great minds are curious minds. Your questions lead to deeper understanding.",
        "Your curiosity will take you to exciting new knowledge territories!"
      ],
      'overwhelmed': [
        "Break it down into smaller parts. One step at a time.",
        "Take a deep breath. You've overcome challenges before, and you'll do it again.",
        "It's okay to feel overwhelmed. Start with just 5 minutes of focused work."
      ],
      'anxious': [
        "Remember, it's about progress, not perfection. You're doing great!",
        "Try some deep breathing. You've got this, and you're more prepared than you think.",
        "Anxiety is just excitement in disguise. Channel it into focused energy!"
      ],
      'sad': [
        "It's okay to have down days. Be kind to yourself and set small goals.",
        "Every cloud has a silver lining. Tomorrow is another opportunity.",
        "Small victories matter. Celebrate each step forward, no matter how small."
      ],
      'okay': [
        "You're doing fine! Remember why you started this journey.",
        "Consistency beats intensity. Keep showing up for yourself.",
        "Sometimes 'okay' is the perfect place to build from. You've got this!"
      ]
    };
    
    const moodQuotes = quotes[currentMood] || quotes.neutral;
    return moodQuotes[Math.floor(Math.random() * moodQuotes.length)];
  };
  
  const quote = getMoodBasedQuote();
  
  const getMoodColor = () => {
    switch (currentMood) {
      case 'happy': return 'from-green-100 to-green-50 dark:from-green-900/20 dark:to-green-900/5';
      case 'motivated': return 'from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-blue-900/5';
      case 'neutral': return 'from-gray-100 to-gray-50 dark:from-gray-900/20 dark:to-gray-900/5';
      case 'curious': return 'from-purple-100 to-purple-50 dark:from-purple-900/20 dark:to-purple-900/5';
      case 'overwhelmed': return 'from-orange-100 to-orange-50 dark:from-orange-900/20 dark:to-orange-900/5';
      case 'anxious': return 'from-yellow-100 to-yellow-50 dark:from-yellow-900/20 dark:to-yellow-900/5';
      case 'sad': return 'from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-blue-900/5';
      case 'okay': return 'from-indigo-100 to-indigo-50 dark:from-indigo-900/20 dark:to-indigo-900/5';
      default: return 'from-gray-100 to-gray-50 dark:from-gray-900/20 dark:to-gray-900/5';
    }
  };
  
  const getMoodEmoji = () => {
    switch (currentMood) {
      case 'happy': return '😊';
      case 'motivated': return '💪';
      case 'neutral': return '😐';
      case 'curious': return '🧐';
      case 'overwhelmed': return '😰';
      case 'anxious': return '😟';
      case 'sad': return '😢';
      case 'okay': return '🙂';
      default: return '🙂';
    }
  };

  return (
    <Card className={`bg-gradient-to-br ${getMoodColor()} border-none shadow-sm`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-md">Daily Motivation</CardTitle>
          <Badge variant="outline" className="font-normal">
            {getMoodEmoji()} {currentMood?.charAt(0).toUpperCase() + currentMood?.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-muted-foreground italic">"{quote}"</p>
      </CardContent>
      <CardFooter className="pt-0 flex justify-end">
        <Button variant="ghost" size="sm" onClick={onRefresh} className="text-xs">
          <RefreshCw className="h-3 w-3 mr-1" />
          Refresh
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MotivationCard;
