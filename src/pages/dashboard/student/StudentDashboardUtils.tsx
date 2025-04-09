
import { ReactNode } from "react";
import { MessageSquare, Calendar, Activity, Brain, BookOpen, Heart, Target, 
  Code, Video, Users, Bell } from "lucide-react";

export const getFeatures = () => {
  return [
    {
      icon: <MessageSquare />,
      title: "24/7 Tutor",
      description: "Get instant help with any subject. Ask questions and receive detailed explanations.",
      path: "/dashboard/student/tutor",
      isPremium: false,
    },
    {
      icon: <Calendar />,
      title: "Academic Advisor",
      description: "Get personalized study plans based on your goals and schedule.",
      path: "/dashboard/student/academic",
      isPremium: false,
    },
    {
      icon: <Activity />,
      title: "Motivation Coach",
      description: "Track your mood and habits. Get daily motivation to stay on track.",
      path: "/dashboard/student/motivation",
      isPremium: true,
    },
    {
      icon: <Brain />,
      title: "Flashcards & Revision",
      description: "Built-in flashcard system to improve memorization and revision.",
      path: "/dashboard/student/flashcards",
      isPremium: false,
    },
    {
      icon: <BookOpen />,
      title: "Practice Exams",
      description: "Take subject-specific mock tests and track your progress.",
      path: "/dashboard/student/exams",
      isPremium: false,
    },
    {
      icon: <Target />,
      title: "Goal Tracking",
      description: "Set and track your academic goals with AI-powered insights.",
      path: "/dashboard/student/goals",
      isPremium: false,
    },
    {
      icon: <Heart />,
      title: "Mental Health Zone",
      description: "Track mood, manage stress, and prevent burnout.",
      path: "/dashboard/student/wellness",
      isPremium: true,
    },
    {
      icon: <Code />,
      title: "My Materials Vault",
      description: "Upload and organize your study materials with AI tagging.",
      path: "/dashboard/student/materials",
      isPremium: true,
    },
    {
      icon: <Video />,
      title: "Live Tutors",
      description: "Connect with expert tutors for personalized 1:1 sessions.",
      path: "/dashboard/student/live-tutors",
      isPremium: true,
    },
    {
      icon: <Users />,
      title: "Collaborative Forum",
      description: "Join or create study groups with peers preparing for similar exams.",
      path: "/dashboard/student/forum",
      isPremium: true,
    },
    {
      icon: <Video />,
      title: "Video Library",
      description: "Access curated educational videos for your exam preparation.",
      path: "/dashboard/student/videos",
      isPremium: false,
    },
    {
      icon: <Bell />,
      title: "Smart Notifications",
      description: "Get personalized reminders via app, SMS, email, or WhatsApp.",
      path: "/dashboard/student/notifications",
      isPremium: false,
    }
  ];
};

export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
};
