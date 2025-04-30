
import { MoodType } from "@/types/user/base";

export function getMoodEmoji(mood: MoodType): string {
  switch (mood) {
    case MoodType.Happy:
      return "😊";
    case MoodType.Focused:
      return "🎯";
    case MoodType.Tired:
      return "😴";
    case MoodType.Stressed:
      return "😖";
    case MoodType.Curious:
      return "🧐";
    case MoodType.Okay:
      return "😐";
    case MoodType.Overwhelmed:
      return "😵";
    case MoodType.Anxious:
      return "😰";
    case MoodType.Motivated:
      return "💪";
    case MoodType.Confused:
      return "🤔";
    default:
      return "😐";
  }
}

export function getMoodColor(mood: MoodType): string {
  switch (mood) {
    case MoodType.Happy:
      return "#FFD700";
    case MoodType.Focused:
      return "#4CAF50";
    case MoodType.Tired:
      return "#607D8B";
    case MoodType.Stressed:
      return "#F44336";
    case MoodType.Curious:
      return "#2196F3";
    case MoodType.Okay:
      return "#9E9E9E";
    case MoodType.Overwhelmed:
      return "#9C27B0";
    case MoodType.Anxious:
      return "#FF9800";
    case MoodType.Motivated:
      return "#673AB7";
    case MoodType.Confused:
      return "#009688";
    default:
      return "#9E9E9E";
  }
}

export function getMoodRecommendation(mood: MoodType): string {
  switch (mood) {
    case MoodType.Happy:
      return "Great mood for creative tasks and tackling challenging concepts!";
    case MoodType.Focused:
      return "Perfect time to work on complex problems and detailed study.";
    case MoodType.Tired:
      return "Try shorter study sessions with frequent breaks. Consider reviewing familiar material.";
    case MoodType.Stressed:
      return "Take a few deep breaths. Start with something easy to build momentum.";
    case MoodType.Curious:
      return "Great time to explore new concepts or dive into interesting topics!";
    case MoodType.Okay:
      return "Good state for consistent progress. Mix easy and challenging tasks.";
    case MoodType.Overwhelmed:
      return "Break tasks into smaller chunks. Focus on one thing at a time.";
    case MoodType.Anxious:
      return "Try a quick mindfulness exercise. Start with familiar material to build confidence.";
    case MoodType.Motivated:
      return "Excellent time to tackle your most challenging subjects!";
    case MoodType.Confused:
      return "Start by reviewing fundamentals. Don't hesitate to seek clarification.";
    default:
      return "Try to identify what you need most right now - a break, a change of topic, or a different approach.";
  }
}

export function getGradientForMood(mood: MoodType): string {
  switch (mood) {
    case MoodType.Happy:
      return "from-yellow-300 to-amber-500";
    case MoodType.Focused:
      return "from-green-500 to-green-700";
    case MoodType.Tired:
      return "from-gray-400 to-gray-600";
    case MoodType.Stressed:
      return "from-red-500 to-red-700";
    case MoodType.Curious:
      return "from-blue-400 to-blue-600";
    case MoodType.Okay:
      return "from-gray-300 to-gray-500";
    case MoodType.Overwhelmed:
      return "from-purple-500 to-purple-800";
    case MoodType.Anxious:
      return "from-orange-400 to-orange-600";
    case MoodType.Motivated:
      return "from-indigo-400 to-indigo-700";
    case MoodType.Confused:
      return "from-teal-400 to-teal-600";
    default:
      return "from-gray-300 to-gray-500";
  }
}
