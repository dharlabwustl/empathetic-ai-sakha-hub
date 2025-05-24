
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Brain, Coffee, Book, Music, Moon } from 'lucide-react';
import { MoodType } from '@/types/user/base';

interface MoodBasedSuggestionsProps {
  currentMood?: MoodType;
  className?: string;
}

const MoodBasedSuggestions: React.FC<MoodBasedSuggestionsProps> = ({ 
  currentMood = MoodType.Neutral, 
  className = '' 
}) => {
  const getMoodSuggestions = (mood: MoodType) => {
    switch (mood) {
      case MoodType.Happy:
        return {
          title: "Great Energy!",
          suggestions: [
            { icon: <Brain className="h-4 w-4" />, text: "Tackle challenging problem sets", action: "Start Complex Topics" },
            { icon: <Book className="h-4 w-4" />, text: "Learn new advanced concepts", action: "Explore Advanced" },
            { icon: <Music className="h-4 w-4" />, text: "Study with upbeat background music", action: "Music Playlist" }
          ]
        };
      case MoodType.Motivated:
        return {
          title: "Perfect Focus Time!",
          suggestions: [
            { icon: <Brain className="h-4 w-4" />, text: "Start your most important subject", action: "Priority Study" },
            { icon: <Book className="h-4 w-4" />, text: "Set ambitious study goals", action: "Set Goals" },
            { icon: <Coffee className="h-4 w-4" />, text: "Extended study session", action: "Long Session" }
          ]
        };
      case MoodType.Focused:
        return {
          title: "Excellent Concentration!",
          suggestions: [
            { icon: <Brain className="h-4 w-4" />, text: "Dive deep into complex theories", action: "Deep Learning" },
            { icon: <Book className="h-4 w-4" />, text: "Practice difficult problems", action: "Hard Problems" },
            { icon: <Coffee className="h-4 w-4" />, text: "Continue current momentum", action: "Keep Going" }
          ]
        };
      case MoodType.Neutral:
        return {
          title: "Steady Progress",
          suggestions: [
            { icon: <Book className="h-4 w-4" />, text: "Review previous topics", action: "Review Mode" },
            { icon: <Brain className="h-4 w-4" />, text: "Medium difficulty exercises", action: "Practice" },
            { icon: <Coffee className="h-4 w-4" />, text: "Structured study plan", action: "Follow Plan" }
          ]
        };
      case MoodType.Tired:
        return {
          title: "Light Study Mode",
          suggestions: [
            { icon: <Book className="h-4 w-4" />, text: "Light reading and revision", action: "Light Reading" },
            { icon: <Music className="h-4 w-4" />, text: "Listen to educational podcasts", action: "Podcasts" },
            { icon: <Moon className="h-4 w-4" />, text: "Consider taking a break", action: "Rest Time" }
          ]
        };
      case MoodType.Anxious:
        return {
          title: "Calming Study",
          suggestions: [
            { icon: <Heart className="h-4 w-4" />, text: "Start with easier topics", action: "Easy Topics" },
            { icon: <Music className="h-4 w-4" />, text: "Relaxing background music", action: "Calm Music" },
            { icon: <Book className="h-4 w-4" />, text: "Short study intervals", action: "Quick Sessions" }
          ]
        };
      case MoodType.Stressed:
        return {
          title: "Stress Relief Study",
          suggestions: [
            { icon: <Heart className="h-4 w-4" />, text: "Break tasks into small chunks", action: "Small Tasks" },
            { icon: <Moon className="h-4 w-4" />, text: "Take regular breaks", action: "Break Timer" },
            { icon: <Music className="h-4 w-4" />, text: "Meditation before studying", action: "Meditate" }
          ]
        };
      case MoodType.Sad:
        return {
          title: "Gentle Learning",
          suggestions: [
            { icon: <Heart className="h-4 w-4" />, text: "Positive reinforcement content", action: "Motivational" },
            { icon: <Book className="h-4 w-4" />, text: "Familiar and comfortable topics", action: "Comfort Zone" },
            { icon: <Music className="h-4 w-4" />, text: "Inspiring educational videos", action: "Watch Videos" }
          ]
        };
      default:
        return {
          title: "Let's Get Started",
          suggestions: [
            { icon: <Book className="h-4 w-4" />, text: "Begin with your schedule", action: "Start Plan" },
            { icon: <Brain className="h-4 w-4" />, text: "Quick warm-up exercises", action: "Warm Up" },
            { icon: <Coffee className="h-4 w-4" />, text: "Set today's goals", action: "Set Goals" }
          ]
        };
    }
  };

  const moodData = getMoodSuggestions(currentMood);
  
  const getMoodColor = (mood: MoodType) => {
    switch (mood) {
      case MoodType.Happy: return 'bg-yellow-100 text-yellow-800';
      case MoodType.Motivated: return 'bg-green-100 text-green-800';
      case MoodType.Focused: return 'bg-blue-100 text-blue-800';
      case MoodType.Neutral: return 'bg-gray-100 text-gray-800';
      case MoodType.Tired: return 'bg-orange-100 text-orange-800';
      case MoodType.Anxious: return 'bg-purple-100 text-purple-800';
      case MoodType.Stressed: return 'bg-red-100 text-red-800';
      case MoodType.Sad: return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Mood-Based Study Suggestions</CardTitle>
          <Badge className={getMoodColor(currentMood)}>
            {currentMood}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <h3 className="font-medium text-center">{moodData.title}</h3>
          <div className="space-y-3">
            {moodData.suggestions.map((suggestion, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {suggestion.icon}
                  <span className="text-sm">{suggestion.text}</span>
                </div>
                <Button size="sm" variant="outline">
                  {suggestion.action}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodBasedSuggestions;
