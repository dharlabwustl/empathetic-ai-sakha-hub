import React from 'react';
import { MoodType } from '@/types/student/todaysPlan';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Book, Coffee, Dumbbell, Zap, Brain, HeartPulse, Sparkles } from 'lucide-react';

interface MoodBasedSuggestionsProps {
  currentMood?: MoodType;
}

interface SuggestionItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionText: string;
  actionLink: string;
}

const MoodBasedSuggestions: React.FC<MoodBasedSuggestionsProps> = ({ currentMood }) => {
  if (!currentMood) {
    return (
      <div className="text-center p-6">
        <p className="mb-4">Select your current mood to get personalized suggestions!</p>
        <div className="flex justify-center">
          <Link to="/dashboard/student/wellness">
            <Button>Explore Wellness Resources</Button>
          </Link>
        </div>
      </div>
    );
  }

  const suggestions = getMoodBasedSuggestions(currentMood);

  return (
    <div className="space-y-4">
      <div className={`p-4 rounded-lg ${getMoodBackgroundClass(currentMood)}`}>
        <p className="mb-2 font-medium">{getMoodMessage(currentMood)}</p>
        <p className="text-sm">{getMoodAdvice(currentMood)}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {suggestions.map((suggestion, index) => (
          <Card key={index} className="p-4 border hover:shadow-md transition-shadow">
            <div className="flex gap-3">
              <div className={`p-2 rounded-full ${getMoodIconBackground(currentMood)}`}>
                {suggestion.icon}
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">{suggestion.title}</h3>
                <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                <Link to={suggestion.actionLink}>
                  <Button size="sm" variant="outline" className="mt-1">
                    {suggestion.actionText}
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const getMoodBackgroundClass = (mood: MoodType): string => {
  switch (mood) {
    case 'happy': return 'bg-green-50 border border-green-200 text-green-800';
    case 'focused': return 'bg-blue-50 border border-blue-200 text-blue-800';
    case 'motivated': return 'bg-purple-50 border border-purple-200 text-purple-800';
    case 'tired': return 'bg-amber-50 border border-amber-200 text-amber-800';
    case 'stressed': return 'bg-red-50 border border-red-200 text-red-800';
    case 'anxious': return 'bg-indigo-50 border border-indigo-200 text-indigo-800';
    case 'okay': return 'bg-gray-50 border border-gray-200 text-gray-800';
    default: return 'bg-blue-50 border border-blue-200 text-blue-800';
  }
};

const getMoodIconBackground = (mood: MoodType): string => {
  switch (mood) {
    case 'happy': return 'bg-green-100 text-green-700';
    case 'focused': return 'bg-blue-100 text-blue-700';
    case 'motivated': return 'bg-purple-100 text-purple-700';
    case 'tired': return 'bg-amber-100 text-amber-700';
    case 'stressed': return 'bg-red-100 text-red-700';
    case 'anxious': return 'bg-indigo-100 text-indigo-700';
    case 'okay': return 'bg-gray-100 text-gray-700';
    default: return 'bg-blue-100 text-blue-700';
  }
};

const getMoodMessage = (mood: MoodType): string => {
  switch (mood) {
    case 'happy': return "You're feeling happy today!";
    case 'focused': return "You're in a focused state of mind!";
    case 'motivated': return "You're feeling motivated today!";
    case 'tired': return "You're feeling a bit tired today.";
    case 'stressed': return "You're feeling stressed right now.";
    case 'anxious': return "You're feeling anxious today.";
    case 'okay': return "You're feeling okay today.";
    default: return "How are you feeling today?";
  }
};

const getMoodAdvice = (mood: MoodType): string => {
  switch (mood) {
    case 'happy':
      return 'Great time to tackle challenging concepts or catch up on difficult material while your mood is positive!';
    case 'focused':
      return 'Perfect time for deep work! Try to minimize distractions and tackle your most important tasks.';
    case 'motivated':
      return 'Channel this motivation into tackling your most challenging subjects or clearing your backlog.';
    case 'tired':
      return 'Take it easy today. Focus on review rather than new concepts, and remember to take regular breaks.';
    case 'stressed':
      return 'Take some deep breaths and consider a quick break. Maybe try a short mindfulness exercise to calm your mind.';
    case 'anxious':
      return "It's okay to feel anxious before exams. Try breaking your work into smaller, manageable parts.";
    case 'okay':
      return "You're in a balanced state - good for steady progress through your study materials.";
    default:
      return 'Based on your mood, here are some personalized suggestions.';
  }
};

const getMoodBasedSuggestions = (mood: MoodType): SuggestionItem[] => {
  switch (mood) {
    case 'happy':
      return [
        {
          icon: <Book className="h-5 w-5" />,
          title: "Learn Something Advanced",
          description: "Your positive mood is perfect for tackling advanced topics!",
          actionText: "Find Advanced Concepts",
          actionLink: "/dashboard/student/concepts"
        },
        {
          icon: <Zap className="h-5 w-5" />,
          title: "Set a Study Challenge",
          description: "Challenge yourself to complete an extra practice exam today.",
          actionText: "Take a Practice Test",
          actionLink: "/dashboard/student/practice"
        }
      ];
    case 'focused':
      return [
        {
          icon: <Brain className="h-5 w-5" />,
          title: "Deep Learning Session",
          description: "Your focused state is perfect for complex topics that need concentration.",
          actionText: "Start Deep Learning",
          actionLink: "/dashboard/student/concepts"
        },
        {
          icon: <Book className="h-5 w-5" />,
          title: "Clear Your Backlog",
          description: "Great time to tackle those pending items in your study list.",
          actionText: "View Backlog",
          actionLink: "/dashboard/student/backlog"
        }
      ];
    case 'motivated':
      return [
        {
          icon: <Sparkles className="h-5 w-5" />,
          title: "Advance Your Study Plan",
          description: "Get ahead of schedule while your motivation is high!",
          actionText: "Go to Study Plan",
          actionLink: "/dashboard/student/studyplan"
        },
        {
          icon: <Dumbbell className="h-5 w-5" />,
          title: "Challenge Yourself",
          description: "Try a difficult practice exam to test your knowledge limits.",
          actionText: "Try a Challenge",
          actionLink: "/dashboard/student/practice"
        }
      ];
    case 'tired':
      return [
        {
          icon: <Coffee className="h-5 w-5" />,
          title: "Light Review Session",
          description: "Try reviewing flashcards instead of learning new concepts.",
          actionText: "Review Flashcards",
          actionLink: "/dashboard/student/flashcards"
        },
        {
          icon: <HeartPulse className="h-5 w-5" />,
          title: "Take a Rejuvenating Break",
          description: "Watch a short relaxing video or try a quick meditation.",
          actionText: "Feel Good Corner",
          actionLink: "/dashboard/student/wellness"
        }
      ];
    case 'stressed':
      return [
        {
          icon: <HeartPulse className="h-5 w-5" />,
          title: "Stress Relief Activities",
          description: "Take a break with guided breathing or light stretching.",
          actionText: "Try Stress Relief",
          actionLink: "/dashboard/student/wellness"
        },
        {
          icon: <Book className="h-5 w-5" />,
          title: "Review Familiar Topics",
          description: "Stick to concepts you're already comfortable with today.",
          actionText: "Find Easy Topics",
          actionLink: "/dashboard/student/concepts"
        }
      ];
    case 'anxious':
      return [
        {
          icon: <Brain className="h-5 w-5" />,
          title: "Anxiety Management",
          description: "Try our guided anxiety reduction exercises or mindfulness techniques.",
          actionText: "Reduce Anxiety",
          actionLink: "/dashboard/student/wellness"
        },
        {
          icon: <Book className="h-5 w-5" />,
          title: "Confidence Building",
          description: "Practice with topics you've already mastered to build confidence.",
          actionText: "Mastered Topics",
          actionLink: "/dashboard/student/concepts"
        }
      ];
    case 'okay':
      return [
        {
          icon: <Book className="h-5 w-5" />,
          title: "Balanced Learning",
          description: "A good day for a mix of review and learning new concepts.",
          actionText: "Today's Plan",
          actionLink: "/dashboard/student/today"
        },
        {
          icon: <Zap className="h-5 w-5" />,
          title: "Energy Boost",
          description: "Consider a quick motivational video to elevate your mood.",
          actionText: "Get Motivated",
          actionLink: "/dashboard/student/wellness"
        }
      ];
    default:
      return [
        {
          icon: <Book className="h-5 w-5" />,
          title: "General Study",
          description: "Continue with your regular study plan.",
          actionText: "View Study Plan",
          actionLink: "/dashboard/student/today"
        },
        {
          icon: <Sparkles className="h-5 w-5" />,
          title: "Explore Resources",
          description: "Check out our various study resources.",
          actionText: "Explore",
          actionLink: "/dashboard/student/concepts"
        }
      ];
  }
};

export default MoodBasedSuggestions;
