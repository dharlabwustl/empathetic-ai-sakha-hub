
import React from "react";
import { MoodType } from "@/types/user/base";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Clock, BookOpen, Lightbulb, Brain } from "lucide-react";
import { Link } from "react-router-dom";

interface MoodSpecificContentProps {
  currentMood?: MoodType;
}

// Enhanced version with mood-specific content and adaptive study suggestions
const MoodSpecificContent: React.FC<MoodSpecificContentProps> = ({ currentMood }) => {
  if (!currentMood) return null;
  
  // Map of mood-specific messages with enhanced adaptive study suggestions
  const moodMessages: Record<string, { 
    title: string; 
    message: string; 
    studySuggestion: string;
    suggestedActivities: {
      label: string;
      description: string;
      icon: React.ReactNode;
      link: string;
    }[];
    uiTheme?: string;
  }> = {
    motivated: { 
      title: "You're feeling motivated!", 
      message: "Great time to tackle challenging problems or study difficult concepts.",
      studySuggestion: "Challenge yourself with advanced topics or longer study sessions",
      suggestedActivities: [
        {
          label: "Mock Test",
          description: "Take a full-length mock exam to test your knowledge",
          icon: <Brain className="h-4 w-4" />,
          link: "/dashboard/student/practice-exam"
        },
        {
          label: "Advanced Concepts",
          description: "Explore challenging topics in your weakest subjects",
          icon: <Lightbulb className="h-4 w-4" />,
          link: "/dashboard/student/concepts"
        }
      ]
    },
    curious: { 
      title: "You're feeling curious!", 
      message: "Perfect time to explore new topics or dive deeper into subjects that interest you.",
      studySuggestion: "Discover new concepts and connect ideas across subjects",
      suggestedActivities: [
        {
          label: "Explore Topics",
          description: "Discover new concepts in your study plan",
          icon: <BookOpen className="h-4 w-4" />,
          link: "/dashboard/student/concepts"
        },
        {
          label: "Interactive Learning",
          description: "Try interactive learning modules for better engagement",
          icon: <Brain className="h-4 w-4" />,
          link: "/dashboard/student/resources"
        }
      ]
    },
    neutral: { 
      title: "You're feeling neutral", 
      message: "Good time to review learned material or organize your notes.",
      studySuggestion: "Focus on consolidating knowledge and reviewing concepts",
      suggestedActivities: [
        {
          label: "Review Session",
          description: "Review previously learned concepts",
          icon: <BookOpen className="h-4 w-4" />,
          link: "/dashboard/student/today"
        },
        {
          label: "Quick Quiz",
          description: "Test your understanding with a short quiz",
          icon: <Lightbulb className="h-4 w-4" />,
          link: "/dashboard/student/quizzes"
        }
      ]
    },
    tired: { 
      title: "You're feeling tired", 
      message: "Consider taking a short break or focusing on lighter subjects.",
      studySuggestion: "Try shorter study sessions with frequent breaks",
      suggestedActivities: [
        {
          label: "Quick Flashcards",
          description: "Review flashcards in short bursts",
          icon: <Clock className="h-4 w-4" />,
          link: "/dashboard/student/flashcards"
        },
        {
          label: "Relax & Recharge",
          description: "Take a guided break with our Feel Good Corner",
          icon: <Brain className="h-4 w-4" />,
          link: "/dashboard/student/feel-good"
        }
      ],
      uiTheme: "chill-mode"
    },
    stressed: { 
      title: "You're feeling stressed", 
      message: "Try a short mindfulness exercise before continuing your studies.",
      studySuggestion: "Focus on review rather than new content today",
      suggestedActivities: [
        {
          label: "Breathing Exercise",
          description: "Try a 2-minute breathing exercise",
          icon: <Clock className="h-4 w-4" />,
          link: "/dashboard/student/feel-good"
        },
        {
          label: "Easy Review",
          description: "Review familiar concepts with no pressure",
          icon: <BookOpen className="h-4 w-4" />,
          link: "/dashboard/student/today"
        }
      ],
      uiTheme: "chill-mode"
    },
    focused: { 
      title: "You're feeling focused!", 
      message: "Great time to work on complex problems or dive into deep study.",
      studySuggestion: "Tackle your most challenging subjects or complex topics",
      suggestedActivities: [
        {
          label: "Deep Study",
          description: "Work on challenging concepts in your study plan",
          icon: <Brain className="h-4 w-4" />,
          link: "/dashboard/student/today"
        },
        {
          label: "Problem Solving",
          description: "Practice advanced problems in your weakest areas",
          icon: <Lightbulb className="h-4 w-4" />,
          link: "/dashboard/student/quizzes"
        }
      ]
    },
    happy: { 
      title: "You're feeling happy!", 
      message: "Your positive energy can help with creative thinking and problem solving.",
      studySuggestion: "Great time to tackle difficult concepts or try interactive learning",
      suggestedActivities: [
        {
          label: "Practice Test",
          description: "Take on a challenging practice test",
          icon: <Brain className="h-4 w-4" />,
          link: "/dashboard/student/practice-exam"
        },
        {
          label: "Group Study",
          description: "Engage with the community forum",
          icon: <BookOpen className="h-4 w-4" />,
          link: "/dashboard/student/community"
        }
      ]
    },
    okay: { 
      title: "You're feeling okay", 
      message: "A good balanced state for steady progress on your studies.",
      studySuggestion: "Continue with your regular study plan",
      suggestedActivities: [
        {
          label: "Today's Plan",
          description: "Follow your scheduled study plan",
          icon: <Clock className="h-4 w-4" />,
          link: "/dashboard/student/today"
        },
        {
          label: "Quick Practice",
          description: "Practice with some questions in your current topic",
          icon: <Lightbulb className="h-4 w-4" />,
          link: "/dashboard/student/quizzes"
        }
      ]
    },
    overwhelmed: { 
      title: "You're feeling overwhelmed", 
      message: "Break down your tasks into smaller, manageable chunks.",
      studySuggestion: "Focus on small wins today, not big challenges",
      suggestedActivities: [
        {
          label: "Break It Down",
          description: "Work on just one small concept today",
          icon: <BookOpen className="h-4 w-4" />,
          link: "/dashboard/student/today"
        },
        {
          label: "Calming Activity",
          description: "Try a guided relaxation activity",
          icon: <Clock className="h-4 w-4" />,
          link: "/dashboard/student/feel-good"
        }
      ],
      uiTheme: "chill-mode"
    },
    sad: { 
      title: "You're feeling sad", 
      message: "Consider a brief mood-boosting activity before returning to your studies.",
      studySuggestion: "Keep it light today with brief, enjoyable review sessions",
      suggestedActivities: [
        {
          label: "Mood Booster",
          description: "Try a quick mood-lifting activity",
          icon: <Brain className="h-4 w-4" />,
          link: "/dashboard/student/feel-good"
        },
        {
          label: "Light Review",
          description: "Review topics you already enjoy and understand",
          icon: <BookOpen className="h-4 w-4" />,
          link: "/dashboard/student/flashcards"
        }
      ],
      uiTheme: "chill-mode"
    }
  };

  const moodInfo = moodMessages[currentMood] || {
    title: "Thanks for sharing how you feel",
    message: "We'll tailor your experience accordingly.",
    studySuggestion: "Continue with your regular study plan",
    suggestedActivities: [
      {
        label: "Today's Plan",
        description: "Follow your regular study plan",
        icon: <Clock className="h-4 w-4" />,
        link: "/dashboard/student/today"
      }
    ]
  };
  
  // Apply chill mode theme if needed
  const needsChillMode = moodInfo.uiTheme === "chill-mode";
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentMood}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className={`mt-4 p-4 rounded-lg shadow-md border ${
          needsChillMode 
            ? "bg-blue-50 dark:bg-slate-800/50 border-blue-200 dark:border-blue-900" 
            : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
        }`}
      >
        <h3 className={`font-medium text-lg mb-2 ${needsChillMode ? "text-blue-800 dark:text-blue-300" : ""}`}>
          {moodInfo.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-3">
          {moodInfo.message}
        </p>
        
        <div className="my-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md border border-gray-100 dark:border-gray-600">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Adaptive Study Suggestion</h4>
          <p className="text-gray-600 dark:text-gray-400 text-sm">{moodInfo.studySuggestion}</p>
        </div>
        
        <div className="mt-4 space-y-3">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Recommended for your mood</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {moodInfo.suggestedActivities.map((activity, index) => (
              <Link 
                to={activity.link} 
                key={index}
                className="flex items-start p-2 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="mr-2 mt-1 bg-primary/10 p-1 rounded-full">
                  {activity.icon}
                </div>
                <div>
                  <h5 className="text-sm font-medium">{activity.label}</h5>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{activity.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MoodSpecificContent;
