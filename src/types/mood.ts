
export enum MoodType {
  Happy = 'happy',
  Focused = 'focused', 
  Tired = 'tired',
  Stressed = 'stressed',
  Curious = 'curious',
  Okay = 'okay',
  Overwhelmed = 'overwhelmed',
  Anxious = 'anxious',
  Motivated = 'motivated',
  Confused = 'confused',
  Neutral = 'neutral',
  Sad = 'sad',
  Calm = 'calm'
}

export interface MoodEntry {
  id: string;
  mood: MoodType;
  timestamp: Date;
  note?: string;
}

// Helper type for string literal mood values
export type MoodTypeValue = 'happy' | 'focused' | 'tired' | 'stressed' | 'curious' | 'okay' | 'overwhelmed' | 'anxious' | 'motivated' | 'confused' | 'neutral' | 'sad' | 'calm';
