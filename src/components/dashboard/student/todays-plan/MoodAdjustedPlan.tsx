
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoodType } from '@/types/user/base';
import { Smile, BookOpen, Brain, FileText, Calendar, Clock } from 'lucide-react';

interface MoodAdjustedPlanProps {
  currentMood: MoodType;
  onMoodChange: (mood: MoodType) => void;
}

export function MoodAdjustedPlan({ currentMood, onMoodChange }: MoodAdjustedPlanProps) {
  const moodOptions: MoodType[] = ["happy", "focused", "tired", "stressed", "anxious", "motivated"];
  
  const getMoodEmoji = (mood: MoodType) => {
    switch (mood) {
      case "happy": return "😊";
      case "focused": return "🧠";
      case "tired": return "😴";
      case "stressed": return "😰";
      case "anxious": return "😟";
      case "motivated": return "💪";
      case "neutral": return "😐";
      case "sad": return "😔";
      default: return "😐";
    }
  };
  
  const getMoodColor = (mood: MoodType) => {
    switch (mood) {
      case "happy": return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800/50";
      case "focused": return "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800/50";
      case "tired": return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800/50";
      case "stressed": return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800/50";
      case "anxious": return "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800/50";
      case "motivated": return "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-800/50";
      case "neutral": return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800/50";
      case "sad": return "bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-900/20 dark:text-sky-300 dark:border-sky-800/50";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  
  const getMoodMessage = (mood: MoodType) => {
    switch (mood) {
      case "happy":
        return "You're in a great mood! We've added a bonus advanced topic to challenge you.";
      case "focused":
        return "You're focused today! Fast-track mode activated with additional flashcards.";
      case "tired":
        return "Taking it easy today. Simplified plan with just the essential concepts.";
      case "stressed":
        return "Stress-relief mode: Just 1 simple concept and quick flashcards today.";
      case "anxious":
        return "Anxiety management mode: Focusing on simple topics to build confidence.";
      case "motivated":
        return "You're motivated! We've optimized your plan for maximum productivity.";
      default:
        return "Your plan has been adjusted based on your current mood.";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Smile className="text-violet-500" size={18} />
          How are you feeling today?
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {moodOptions.map((mood) => (
            <Button
              key={mood}
              variant="outline"
              size="sm"
              className={`flex flex-col items-center py-3 px-2 ${currentMood === mood ? 'ring-2 ring-violet-500 ring-offset-2' : ''}`}
              onClick={() => onMoodChange(mood)}
            >
              <span className="text-xl mb-1">{getMoodEmoji(mood)}</span>
              <span className="text-xs capitalize">{mood}</span>
            </Button>
          ))}
        </div>
        
        {currentMood && (
          <div className={`p-3 rounded-lg border ${getMoodColor(currentMood)}`}>
            <p className="text-sm">{getMoodMessage(currentMood)}</p>
          </div>
        )}
        
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-md p-3 space-y-2">
          <h4 className="text-sm font-medium">Today's Adjusted Plan:</h4>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <BookOpen size={14} className="mr-1 text-blue-500" />
              <span>Concept Cards:</span>
            </div>
            <span className="font-medium">
              {currentMood === "tired" || currentMood === "stressed" || currentMood === "anxious" ? "2" : 
               currentMood === "happy" || currentMood === "motivated" ? "4" : "3"}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <Brain size={14} className="mr-1 text-amber-500" />
              <span>Flashcards:</span>
            </div>
            <span className="font-medium">
              {currentMood === "tired" || currentMood === "stressed" || currentMood === "anxious" ? "10" :
               currentMood === "focused" ? "25" : "20"}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <FileText size={14} className="mr-1 text-violet-500" />
              <span>Practice Exam:</span>
            </div>
            <span className="font-medium">
              {currentMood === "tired" || currentMood === "stressed" || currentMood === "anxious" ? "Optional" : "Yes"}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <Clock size={14} className="mr-1 text-indigo-500" />
              <span>Est. Time:</span>
            </div>
            <span className="font-medium">
              {currentMood === "tired" ? "45m" :
               currentMood === "stressed" || currentMood === "anxious" ? "30m" :
               currentMood === "focused" || currentMood === "motivated" ? "90m" : "60m"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
