
import { MoodType } from '@/types/user/base';

export interface MoodTheme {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  darkBackgroundColor: string;
  darkTextColor: string;
  darkBorderColor: string;
  emoji: string;
  message: string;
  studyTip: string;
  colors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export interface MoodThemes {
  [MoodType.Happy]: MoodTheme;
  [MoodType.Stressed]: MoodTheme;
  [MoodType.Motivated]: MoodTheme;
  [MoodType.Tired]: MoodTheme;
  [MoodType.Focused]: MoodTheme;
  [MoodType.Confused]: MoodTheme;
  [MoodType.Calm]: MoodTheme;
  [MoodType.Overwhelmed]: MoodTheme;
  [MoodType.Okay]: MoodTheme;
}
