
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoodType } from "@/types/user/base";
import { Heart, Zap, Target, Star } from 'lucide-react';

interface MotivationCardProps {
  mood?: MoodType;
  userName?: string;
}

const MotivationCard: React.FC<MotivationCardProps> = ({ mood, userName = "Student" }) => {
  const getMotivationalMessage = () => {
    switch (mood) {
      case MoodType.Happy:
        return {
          title: "You're glowing today! ✨",
          message: `${userName}, your positive energy is contagious! Let's channel this happiness into productive learning.`,
          icon: <Heart className="h-5 w-5 text-pink-500" />,
          action: "Keep the momentum going!"
        };
      case MoodType.Motivated:
        return {
          title: "On fire today! 🔥",
          message: `${userName}, your motivation is inspiring! This is the perfect time to tackle challenging concepts.`,
          icon: <Zap className="h-5 w-5 text-yellow-500" />,
          action: "Let's achieve greatness!"
        };
      case MoodType.Focused:
        return {
          title: "Laser focus mode activated! 🎯",
          message: `${userName}, your focus is your superpower today. Let's make every minute count!`,
          icon: <Target className="h-5 w-5 text-blue-500" />,
          action: "Dive deep into learning!"
        };
      case MoodType.Neutral:
        return {
          title: "Steady and consistent! 📚",
          message: `${userName}, sometimes the best progress comes from steady, consistent effort. You're building strong foundations.`,
          icon: <Star className="h-5 w-5 text-purple-500" />,
          action: "Small steps, big results!"
        };
      case MoodType.Stressed:
        return {
          title: "Take a deep breath 🌸",
          message: `${userName}, it's okay to feel stressed. Let's break things down into manageable chunks today.`,
          icon: <Heart className="h-5 w-5 text-green-500" />,
          action: "One step at a time!"
        };
      case MoodType.Sad:
        return {
          title: "You're stronger than you know 💪",
          message: `${userName}, tough days don't last, but resilient learners do. Let's find small wins today.`,
          icon: <Heart className="h-5 w-5 text-blue-400" />,
          action: "Every small step counts!"
        };
      default:
        return {
          title: "Ready to learn! 🚀",
          message: `${userName}, every learning session is a step toward your goals. Let's make today count!`,
          icon: <Star className="h-5 w-5 text-indigo-500" />,
          action: "Let's get started!"
        };
    }
  };

  const motivation = getMotivationalMessage();

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          {motivation.icon}
          {motivation.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
          {motivation.message}
        </p>
        <Button 
          size="sm" 
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
        >
          {motivation.action}
        </Button>
      </CardContent>
    </Card>
  );
};

export default MotivationCard;
