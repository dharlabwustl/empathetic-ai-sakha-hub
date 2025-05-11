
// Types for Feel Good Corner components

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  duration: string;
  category: 'relaxation' | 'motivation' | 'focus' | 'stress-relief';
}

export interface MindfulnessExercise {
  id: string;
  title: string;
  description: string;
  duration: number;
  steps: string[];
  benefits: string[];
  category: 'focus' | 'calm' | 'stress-relief' | 'energy';
}

export interface Quote {
  id: string;
  text: string;
  author: string;
  tags: string[];
}

export interface BreathingPattern {
  id: string;
  name: string;
  description: string;
  inhale: number; // seconds
  hold?: number; // seconds
  exhale: number; // seconds
  holdAfterExhale?: number; // seconds
  cycles: number;
  benefits: string[];
}
