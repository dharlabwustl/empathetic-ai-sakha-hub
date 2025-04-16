
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { MoodType } from "@/types/user";

export interface MotivationCardProps {
  currentMood: MoodType;
  streak?: number;
  target?: string;
  progress?: number;
}

const MotivationCard: React.FC<MotivationCardProps> = ({
  currentMood,
  streak = 0,
  target = '',
  progress = 0
}) => {
  const getMoodMessage = () => {
    switch(currentMood) {
      case "motivated":
        return {
          title: "You're on fire today!",
          message: "Let's channel this energy into something amazing.",
          theme: "bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border-amber-100"
        };
      case "curious":
        return {
          title: "Curiosity drives knowledge!",
          message: "Want to explore something new today?",
          theme: "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-100"
        };
      case "neutral":
        return {
          title: "Every step counts",
          message: "Small steps still move you forward. Pick one task to focus on.",
          theme: "bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20 border-gray-200"
        };
      case "tired":
        return {
          title: "Rest is important too",
          message: "Take it slow today, maybe focus on review rather than new content?",
          theme: "bg-gradient-to-r from-blue-50 to-slate-50 dark:from-blue-900/20 dark:to-slate-900/20 border-blue-100"
        };
      case "stressed":
      case "overwhelmed":
        return {
          title: "Let's take a breath",
          message: "It's okay to feel overwhelmed. Break things down into smaller steps.",
          theme: "bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-purple-100"
        };
      case "happy":
        return {
          title: "Happiness boosts learning!",
          message: "Great mood today! Perfect time to tackle something challenging.",
          theme: "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-100"
        };
      case "sad":
        return {
          title: "It's okay to feel down",
          message: "Learning can help shift your mood. Start with something you enjoy.",
          theme: "bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-100"
        };
      case "focused":
        return {
          title: "Focus is your superpower!",
          message: "Great time to tackle complex topics and deep work.",
          theme: "bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-900/20 dark:to-violet-900/20 border-indigo-100"
        };
      case "okay":
        return {
          title: "Ready for progress",
          message: "You're in a good place to make steady progress today.",
          theme: "bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 border-teal-100"
        };
      default:
        return {
          title: "Welcome back",
          message: "Ready to continue your learning journey?",
          theme: "bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-100"
        };
    }
  };

  const moodData = getMoodMessage();

  return (
    <Card className={`${moodData.theme} border shadow-sm`}>
      <CardContent className="py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium">{moodData.title}</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">{moodData.message}</p>
          </div>
          
          {streak > 0 && (
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-sm">
              <div className="text-amber-500">🔥</div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Study Streak</p>
                <p className="font-medium">{streak} days</p>
              </div>
            </div>
          )}
          
          {target && (
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-sm">
              <div className="text-blue-500">🎯</div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Target</p>
                <p className="font-medium">{target}</p>
              </div>
            </div>
          )}
          
          {progress > 0 && (
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-sm">
              <div className="text-green-500">📊</div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Progress</p>
                <p className="font-medium">{progress}%</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MotivationCard;
