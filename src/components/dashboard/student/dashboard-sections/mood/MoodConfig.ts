
import { MoodType } from '@/types/user/base';
import { Smile, Target, Moon, Frown, Brain } from 'lucide-react';

export interface MoodConfigType {
  icon: React.ReactNode;
  suggestion: string;
  color: string;
  planAdjustment: string;
  voiceMessage: string;
}

export type MoodConfigMap = Record<MoodType, MoodConfigType>;

// Create a factory function for mood config to use in components
export const createMoodConfig = (): MoodConfigMap => ({
  motivated: {
    icon: <Smile className="w-5 h-5 text-amber-500" />,
    suggestion: "Perfect day to tackle a challenging concept! Add a bonus practice test today?",
    color: "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-700/50",
    planAdjustment: "Increased focus on new concepts",
    voiceMessage: "You're motivated! Let's tackle something challenging today. I've adjusted your plan to focus on new concepts."
  },
  focused: {
    icon: <Target className="w-5 h-5 text-emerald-500" />,
    suggestion: "Maximize this energy! Aim for 10% extra progress today.",
    color: "bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-700/50",
    planAdjustment: "Added challenging practice tests",
    voiceMessage: "Great focus! I've added some challenging practice tests to maximize your productivity."
  },
  tired: {
    icon: <Moon className="w-5 h-5 text-blue-500" />,
    suggestion: "Let's lighten today's plan. Focus only on Flashcards or Quick Revision.",
    color: "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700/50",
    planAdjustment: "Shorter study sessions with more breaks",
    voiceMessage: "I've adjusted your plan for today - shorter sessions with more breaks. Take it easy!"
  },
  stressed: {
    icon: <Frown className="w-5 h-5 text-purple-500" />,
    suggestion: "Breathe. Start with 1 simple concept you know well to build confidence.",
    color: "bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-700/50",
    planAdjustment: "Review of familiar content only",
    voiceMessage: "I notice you're stressed. Let's take a deep breath. I've adjusted your plan to focus on familiar content to build confidence."
  },
  anxious: {
    icon: <Frown className="w-5 h-5 text-purple-500" />,
    suggestion: "Let's break tasks into smaller chunks. Start with a 5-minute focus session.",
    color: "bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-700/50",
    planAdjustment: "Simplified study approach with frequent check-ins",
    voiceMessage: "I understand you're feeling anxious. I've simplified your plan with smaller, manageable tasks."
  },
  sad: {
    icon: <Frown className="w-5 h-5 text-blue-500" />,
    suggestion: "Let's boost your mood with some easier concepts you enjoy.",
    color: "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700/50",
    planAdjustment: "Focus on favorite subjects",
    voiceMessage: "I've adjusted your plan to focus on subjects you enjoy. Small wins can help improve your mood."
  },
  happy: {
    icon: <Smile className="w-5 h-5 text-amber-500" />,
    suggestion: "Your positive energy will help with creative problem solving today!",
    color: "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-700/50",
    planAdjustment: "Added creative problem-solving exercises",
    voiceMessage: "You're happy today! I've added some creative problem-solving exercises to take advantage of your positive energy."
  },
  neutral: {
    icon: <Brain className="w-5 h-5 text-gray-500" />,
    suggestion: "Good time for steady progress through your regular study plan.",
    color: "bg-gray-50 border-gray-200 dark:bg-gray-900/20 dark:border-gray-700/50",
    planAdjustment: "Balanced study approach",
    voiceMessage: "I've prepared a balanced study plan for today. Let's make steady progress together."
  }
});
