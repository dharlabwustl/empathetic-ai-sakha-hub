
export enum MoodType {
  HAPPY = 'happy',
  FOCUSED = 'focused',
  MOTIVATED = 'motivated',
  TIRED = 'tired',
  STRESSED = 'stressed',
  ANXIOUS = 'anxious'
}

export interface MoodEntry {
  date: string;
  mood: MoodType;
  note?: string;
  studyPlanAdjustment?: string;
}

export interface MoodTheme {
  background: string;
  text: string;
  icon: string;
}
