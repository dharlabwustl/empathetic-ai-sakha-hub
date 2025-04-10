
import { ReactElement } from 'react';

export type MoodType = "Happy" | "Okay" | "Tired" | "Overwhelmed" | "Focused";

export interface Habit {
  id: string;
  name: string;
  icon: ReactElement;
  streak: number;
  target: number;
  unit: string;
  progress: number;
}

export interface MoodLog {
  date: string;
  mood: MoodType;
  note?: string;
}

export const getMoodIcon = (mood: MoodType) => {
  switch (mood) {
    case "Happy":
      return "text-green-500";
    case "Okay":
      return "text-blue-500";
    case "Tired":
      return "text-orange-500";
    case "Overwhelmed":
      return "text-red-500";
    case "Focused":
      return "text-purple-500";
    default:
      return "";
  }
};

export const getMotivationalQuote = () => {
  const quotes = [
    "The secret of getting ahead is getting started. – Mark Twain",
    "It always seems impossible until it's done. – Nelson Mandela",
    "The best way to predict your future is to create it. – Abraham Lincoln",
    "Don't watch the clock; do what it does. Keep going. – Sam Levenson",
    "Believe you can and you're halfway there. – Theodore Roosevelt"
  ];
  
  return quotes[Math.floor(Math.random() * quotes.length)];
};
