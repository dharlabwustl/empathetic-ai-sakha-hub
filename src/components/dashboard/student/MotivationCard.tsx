// Update at the top of the file to import MoodType from the correct location
import { MoodType } from "@/types/user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Smile, Meh, Frown } from "lucide-react";

interface MotivationCardProps {
  currentMood?: MoodType;
}

const MotivationCard: React.FC<MotivationCardProps> = ({ currentMood }) => {
  const getMoodMessage = (mood?: MoodType) => {
    switch (mood) {
      case 'happy':
        return "Keep that positive energy flowing! You're doing great!";
      case 'motivated':
        return "Awesome! Harness that motivation to achieve your goals.";
      case 'neutral':
        return "It's okay to feel neutral. Take a moment to reflect and recharge.";
      case 'sad':
        return "I'm sorry you're feeling down. Remember, it's temporary. Reach out if you need support.";
      case 'stressed':
        return "Take a deep breath. Prioritize tasks and tackle them one at a time.";
      case 'tired':
        return "Rest is productive. Ensure you get enough sleep to recharge.";
      case 'curious':
        return "Embrace your curiosity! It's the first step to learning something new.";
      case 'okay':
        return "It's okay to feel just okay. Sometimes that's more than enough.";
      case 'Focused':
        return "Stay locked in! You're in the zone.";
      case 'Overwhelmed':
        return "Feeling overwhelmed? Break tasks into smaller steps.";
      case 'Tired':
        return "Time for a power nap! Recharge those batteries.";
      case 'Happy':
        return "Spread the joy! Your positivity is contagious.";
      default:
        return "How are you feeling today? Take a moment to check in with yourself.";
    }
  };

  const getMoodIcon = (mood?: MoodType) => {
    switch (mood) {
      case 'happy':
      case 'motivated':
        return <Smile className="text-yellow-500" size={20} />;
      case 'neutral':
      case 'okay':
        return <Meh className="text-gray-500" size={20} />;
      case 'sad':
      case 'stressed':
      case 'tired':
        return <Frown className="text-red-500" size={20} />;
      default:
        return null;
    }
  };

  const moodMessage = getMoodMessage(currentMood);
  const moodIcon = getMoodIcon(currentMood);

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Your Mood Today</CardTitle>
      </CardHeader>
      <CardContent className="py-4">
        <div className="flex items-center gap-3">
          {moodIcon && <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">{moodIcon}</div>}
          <p className="text-sm text-gray-700 dark:text-gray-300">{moodMessage}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MotivationCard;
