
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, BookOpen, Coffee, Lightbulb, Target, Heart, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MoodType } from '@/types/user/base';
import MoodLogButton from '../mood-tracking/MoodLogButton';

interface MoodBasedSuggestionsProps {
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const MoodBasedSuggestions: React.FC<MoodBasedSuggestionsProps> = ({ 
  currentMood, 
  onMoodChange 
}) => {
  const getMoodSuggestions = (mood?: MoodType) => {
    if (!mood) {
      return {
        title: "Track Your Mood First",
        description: "Log your current mood to get personalized study suggestions",
        suggestions: [
          { text: "General review", icon: <BookOpen className="h-4 w-4" />, link: "/dashboard/student/concepts" },
          { text: "Light practice", icon: <Brain className="h-4 w-4" />, link: "/dashboard/student/flashcards" }
        ],
        color: "gray"
      };
    }

    switch (mood) {
      case MoodType.HAPPY:
        return {
          title: "Perfect Mood for Learning!",
          description: "Your positive energy is ideal for tackling new concepts",
          suggestions: [
            { text: "Learn new concepts", icon: <Lightbulb className="h-4 w-4" />, link: "/dashboard/student/concepts" },
            { text: "Challenge yourself", icon: <Target className="h-4 w-4" />, link: "/dashboard/student/practice-exam" }
          ],
          color: "yellow"
        };
      case MoodType.MOTIVATED:
        return {
          title: "High Energy Detected!",
          description: "Channel this motivation into intensive study sessions",
          suggestions: [
            { text: "Intensive practice", icon: <Zap className="h-4 w-4" />, link: "/dashboard/student/practice-exam" },
            { text: "Complex problems", icon: <Brain className="h-4 w-4" />, link: "/dashboard/student/concepts" }
          ],
          color: "green"
        };
      case MoodType.FOCUSED:
        return {
          title: "Peak Focus State",
          description: "Perfect time for deep learning and complex topics",
          suggestions: [
            { text: "Deep dive concepts", icon: <Brain className="h-4 w-4" />, link: "/dashboard/student/concepts" },
            { text: "Formula practice", icon: <BookOpen className="h-4 w-4" />, link: "/dashboard/student/flashcards" }
          ],
          color: "blue"
        };
      case MoodType.TIRED:
        return {
          title: "Take It Easy",
          description: "Light activities and review work best right now",
          suggestions: [
            { text: "Quick flashcards", icon: <BookOpen className="h-4 w-4" />, link: "/dashboard/student/flashcards" },
            { text: "Take a break", icon: <Coffee className="h-4 w-4" />, link: "/dashboard/student/feel-good-corner" }
          ],
          color: "orange"
        };
      case MoodType.STRESSED:
        return {
          title: "Stress Relief Mode",
          description: "Focus on relaxation and light review",
          suggestions: [
            { text: "Meditation break", icon: <Heart className="h-4 w-4" />, link: "/dashboard/student/feel-good-corner" },
            { text: "Easy revision", icon: <BookOpen className="h-4 w-4" />, link: "/dashboard/student/flashcards" }
          ],
          color: "red"
        };
      default:
        return {
          title: "Steady Progress",
          description: "A balanced approach to learning works well",
          suggestions: [
            { text: "Mixed practice", icon: <BookOpen className="h-4 w-4" />, link: "/dashboard/student/concepts" },
            { text: "Review session", icon: <Brain className="h-4 w-4" />, link: "/dashboard/student/flashcards" }
          ],
          color: "gray"
        };
    }
  };

  const moodData = getMoodSuggestions(currentMood);

  const getColorClasses = (color: string) => {
    switch (color) {
      case "yellow": return "from-yellow-50/80 to-amber-100/60 border-yellow-200/50";
      case "green": return "from-green-50/80 to-emerald-100/60 border-green-200/50";
      case "blue": return "from-blue-50/80 to-indigo-100/60 border-blue-200/50";
      case "orange": return "from-orange-50/80 to-red-100/60 border-orange-200/50";
      case "red": return "from-red-50/80 to-pink-100/60 border-red-200/50";
      default: return "from-gray-50/80 to-slate-100/60 border-gray-200/50";
    }
  };

  return (
    <Card className={`bg-gradient-to-br ${getColorClasses(moodData.color)} dark:from-gray-950/30 dark:via-gray-900 dark:to-gray-800/20 border shadow-lg`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            Mood-Based Learning
          </CardTitle>
          <MoodLogButton 
            currentMood={currentMood}
            onMoodChange={onMoodChange}
            size="sm"
            showLabel={false}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-medium text-sm">{moodData.title}</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">{moodData.description}</p>
        </div>

        <div className="space-y-2">
          {moodData.suggestions.map((suggestion, index) => (
            <Link key={index} to={suggestion.link}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                  {suggestion.icon}
                  <span className="ml-2">{suggestion.text}</span>
                </Button>
              </motion.div>
            </Link>
          ))}
        </div>

        {currentMood && (
          <div className="pt-2 border-t">
            <Badge variant="outline" className="text-xs">
              Current: {currentMood} mood
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodBasedSuggestions;
