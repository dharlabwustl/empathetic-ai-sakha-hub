
import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  BarChart3, 
  Heart, 
  GraduationCap,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface FeaturePoint {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  delay: number;
}

const FeatureHighlights = () => {
  const featurePoints: FeaturePoint[] = [
    {
      icon: <BookOpen className="text-indigo-500" size={20} />,
      title: "Personalized Smart Study Plan",
      description: "Micro concepts, flashcards, revision techniques",
      color: "from-indigo-500 to-blue-400",
      delay: 0
    },
    {
      icon: <BarChart3 className="text-purple-500" size={20} />,
      title: "Real-Time Performance Dashboard",
      description: "Peer comparisons, progress metrics for your learning style",
      color: "from-purple-500 to-pink-400",
      delay: 0.1
    },
    {
      icon: <Heart className="text-rose-500" size={20} />,
      title: "Mood & Wellness Tracker",
      description: "Confidence & stress boosters, influence meter",
      color: "from-rose-500 to-orange-400",
      delay: 0.2
    },
    {
      icon: <GraduationCap className="text-emerald-500" size={20} />,
      title: "One Platform, All Exams",
      description: "Complete preparation system for any competitive exam",
      color: "from-emerald-500 to-teal-400",
      delay: 0.3
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12
      }
    }
  };

  const hoverAnimation = {
    scale: 1.03,
    y: -5,
    boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 10
    }
  };

  const iconAnimation = {
    rotate: [0, -10, 10, -5, 0],
    scale: [1, 1.2, 1],
    transition: { 
      duration: 0.5,
      ease: "easeInOut"
    }
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
          whileHover={hoverAnimation}
          className="bg-white/95 backdrop-blur-sm dark:bg-slate-800/95 rounded-xl p-5 shadow-lg border border-indigo-100 dark:border-indigo-900/30 transform transition-all relative overflow-hidden"
          style={{ originY: 0.5, originX: 0.5 }}
        >
          {/* Background gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${point.color} opacity-5 dark:opacity-10`}></div>
          
          {/* Animated sparkle */}
          <motion.div 
            className="absolute -right-2 -top-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              repeatDelay: 3 + index,
              delay: point.delay * 2
            }}
          >
            <Sparkles className="text-indigo-400" size={16} />
          </motion.div>
          
          <div className="flex items-start gap-3">
            <motion.div 
              whileHover={iconAnimation}
              className={`rounded-full bg-gradient-to-br ${point.color} p-2.5 flex-shrink-0 shadow-md`}
            >
              {point.icon}
              <motion.div 
                className="absolute inset-0 rounded-full"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: [0, 0.5, 0], 
                  scale: [0.8, 1.5, 1.8]
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity,
                  repeatDelay: 1,
                  delay: point.delay
                }}
                style={{ 
                  background: `radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)`,
                }}
              />
            </motion.div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: 0.5 + point.delay,
                    type: "spring",
                    stiffness: 300,
                    damping: 10
                  }}
                >
                  <CheckCircle2 size={14} className="text-green-500" />
                </motion.div>
                {point.title}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-1.5">
                {point.description}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FeatureHighlights;
