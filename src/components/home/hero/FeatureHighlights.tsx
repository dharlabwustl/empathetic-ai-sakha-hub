
import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  BarChart3, 
  Heart, 
  GraduationCap,
  CheckCircle2
} from 'lucide-react';

interface FeaturePoint {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureHighlights = () => {
  const featurePoints: FeaturePoint[] = [
    {
      icon: <BookOpen className="text-indigo-500" size={18} />,
      title: "Personalized Smart Study Plan",
      description: "Micro concepts, flashcards, revision techniques"
    },
    {
      icon: <BarChart3 className="text-indigo-500" size={18} />,
      title: "Real-Time Performance Dashboard",
      description: "Peer comparisons, progress metrics for your learning style"
    },
    {
      icon: <Heart className="text-indigo-500" size={18} />,
      title: "Mood & Wellness Tracker",
      description: "Confidence & stress boosters, influence meter"
    },
    {
      icon: <GraduationCap className="text-indigo-500" size={18} />,
      title: "One Platform, All Exams",
      description: "Complete preparation system for any competitive exam"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show" 
      className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto"
    >
      {featurePoints.map((point, index) => (
        <motion.div
          key={index}
          variants={item}
          className="bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 rounded-xl p-4 shadow-sm border border-indigo-100 dark:border-indigo-900/30 flex items-start gap-3 transform transition-all hover:shadow-md hover:-translate-y-1"
        >
          <div className="rounded-full bg-indigo-50 dark:bg-indigo-900/30 p-2 flex-shrink-0">
            {point.icon}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-1">
              <CheckCircle2 size={14} className="text-green-500" />
              {point.title}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{point.description}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FeatureHighlights;
