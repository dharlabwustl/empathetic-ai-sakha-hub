
import { MoodType } from "@/types/user/base";

export const getMoodEmoji = (mood: MoodType): string => {
  switch (mood) {
    case MoodType.Happy:
      return "😄";
    case MoodType.Motivated:
      return "🔥";
    case MoodType.Focused:
      return "🎯";
    case MoodType.Neutral:
      return "😐";
    case MoodType.Tired:
      return "😴";
    case MoodType.Stressed:
      return "😰";
    case MoodType.Confused:
      return "🤔";
    case MoodType.Overwhelmed:
      return "😵";
    case MoodType.Calm:
      return "😌";
    default:
      return "😐";
  }
};

export const storeMoodInLocalStorage = (mood: MoodType) => {
  localStorage.setItem('userMood', mood.toString());
};

export const getCurrentMoodFromLocalStorage = (): MoodType | undefined => {
  const savedMood = localStorage.getItem('userMood');
  if (savedMood && Object.values(MoodType).includes(savedMood as MoodType)) {
    return savedMood as MoodType;
  }
  return undefined;
};
