
import { ReactNode } from 'react';

export type MoodEmojiType = {
  value: string;
  label: string;
  description: string;
};

export type JokeType = string;

export type BrainTeaserType = {
  question: string;
  answer: string;
};

export type QuoteType = string;

export type WellnessHackType = string;

export type FeelGoodTabType = 'joke' | 'music' | 'teaser' | 'quote' | 'wellness';

// Data arrays for the different content types
export const moodEmojis: MoodEmojiType[] = [
  { value: "great", label: "😁", description: "Great" },
  { value: "good", label: "🙂", description: "Good" },
  { value: "okay", label: "😐", description: "Okay" },
  { value: "tired", label: "😴", description: "Tired" },
  { value: "stressed", label: "😫", description: "Stressed" },
  { value: "sad", label: "😔", description: "Sad" }
];

export const jokes: JokeType[] = [
  "Why don't scientists trust atoms? Because they make up everything!",
  "Why did the student eat his homework? Because the teacher said it was a piece of cake!",
  "What's a physicist's favorite food? Fission chips!",
  "What did one wall say to the other wall? I'll meet you at the corner!",
  "Why couldn't the bicycle stand up by itself? It was two tired!"
];

export const brainTeasers: BrainTeaserType[] = [
  {
    question: "I'm tall when I'm young, and I'm short when I'm old. What am I?",
    answer: "A candle"
  },
  {
    question: "What has keys but no locks, space but no room, and you can enter but not go in?",
    answer: "A keyboard"
  },
  {
    question: "What has a head and a tail, but no body?",
    answer: "A coin"
  }
];

export const quotes: QuoteType[] = [
  "Dream, dream, dream. Dreams transform into thoughts and thoughts result in action. - A.P.J. Abdul Kalam",
  "When you want something, all the universe conspires in helping you to achieve it. - Paulo Coelho",
  "Learn from yesterday, live for today, hope for tomorrow. - Albert Einstein",
  "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt"
];

export const wellnessHacks: WellnessHackType[] = [
  "Take 3 deep breaths with us 🌬️... Ready?",
  "Stand up and stretch your arms toward the ceiling for 30 seconds",
  "Drink a glass of water right now - hydration helps brain function!",
  "Roll your shoulders backward 5 times, then forward 5 times"
];
