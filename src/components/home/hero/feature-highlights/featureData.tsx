
import React from 'react';
import { 
  BookOpen, 
  BarChart3, 
  Heart, 
  GraduationCap,
  Smile,
  Zap,
  Clock,
  Shield,
  Award
} from 'lucide-react';

export interface FeaturePoint {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  delay: number;
}

export interface TakeawayPoint {
  icon: React.ReactNode;
  title: string;
  color: string;
}

export const featurePoints: FeaturePoint[] = [
  {
    icon: <BookOpen className="text-white" size={24} />,
    title: "Personalized Smart Study Plan",
    description: "Micro concepts, flashcards, revision techniques",
    color: "from-purple-600 to-violet-500",
    delay: 0
  },
  {
    icon: <BarChart3 className="text-white" size={24} />,
    title: "Real-Time Performance Dashboard",
    description: "Peer comparisons, progress metrics for your learning style",
    color: "from-violet-500 to-fuchsia-500",
    delay: 0.1
  },
  {
    icon: <Heart className="text-white" size={24} />,
    title: "Mood & Wellness Tracker",
    description: "Confidence & stress boosters, influence meter",
    color: "from-fuchsia-500 to-purple-600",
    delay: 0.2
  },
  {
    icon: <GraduationCap className="text-white" size={24} />,
    title: "One Platform, All Exams",
    description: "Complete preparation system for any competitive exam",
    color: "from-purple-500 to-violet-600",
    delay: 0.3
  }
];

export const takeawayPoints: TakeawayPoint[] = [
  {
    icon: <Award className="text-white" size={18} />,
    title: "Confidence Builder",
    color: "from-green-500 to-emerald-600"
  },
  {
    icon: <GraduationCap className="text-white" size={18} />,
    title: "Exam Success",
    color: "from-blue-500 to-indigo-600"
  },
  {
    icon: <Clock className="text-white" size={18} />,
    title: "Time Saver",
    color: "from-amber-500 to-orange-600"
  },
  {
    icon: <Shield className="text-white" size={18} />,
    title: "Stress-Free",
    color: "from-purple-500 to-violet-600"
  },
  {
    icon: <Smile className="text-white" size={18} />,
    title: "Happy Learning",
    color: "from-pink-500 to-rose-600"
  }
];
