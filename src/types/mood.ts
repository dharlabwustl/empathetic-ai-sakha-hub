
export enum MoodType {
  HAPPY = 'happy',
  FOCUSED = 'focused', 
  TIRED = 'tired',
  STRESSED = 'stressed',
  CURIOUS = 'curious',
  OKAY = 'okay',
  OVERWHELMED = 'overwhelmed',
  ANXIOUS = 'anxious',
  MOTIVATED = 'motivated',
  CONFUSED = 'confused',
  NEUTRAL = 'neutral',
  SAD = 'sad'
}

export interface MoodEntry {
  id: string;
  mood: MoodType;
  timestamp: Date;
  note?: string;
}
