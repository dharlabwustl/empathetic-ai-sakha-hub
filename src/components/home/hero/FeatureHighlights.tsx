
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
      icon: <BookOpen className="text-white" size={20} />,
      title: "Personalized Smart Study Plan",
      description: "Micro concepts, flashcards, revision techniques",
      color: "from-purple-600 to-violet-500",
      delay: 0
    },
    {
      icon: <BarChart3 className="text-white" size={20} />,
      title: "Real-Time Performance Dashboard",
      description: "Peer comparisons, progress metrics for your learning style",
      color: "from-violet-500 to-fuchsia-500",
      delay: 0.1
    },
    {
      icon: <Heart className="text-white" size={20} />,
      title: "Mood & Wellness Tracker",
      description: "Confidence & stress boosters, influence meter",
      color: "from-fuchsia-500 to-purple-600",
      delay: 0.2
    },
    {
      icon: <GraduationCap className="text-white" size={20} />,
      title: "One Platform, All Exams",
      description: "Complete preparation system for any competitive exam",
      color: "from-purple-500 to-violet-600",
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
    scale: 1.05,
    y: -8,
    boxShadow: "0 15px 30px -5px rgba(139, 92, 246, 0.5)",
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

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto"
    >
      {featurePoints.map((point, index) => (
        <motion.div
          key={index}
          variants={item}
          whileHover={hoverAnimation}
          className="bg-white/95 backdrop-blur-sm dark:bg-slate-800/95 rounded-xl p-5 shadow-lg border border-purple-100 dark:border-purple-900/30 transform transition-all relative overflow-hidden"
          style={{ originY: 0.5, originX: 0.5 }}
        >
          {/* Background gradient */}
          <motion.div 
            className={`absolute inset-0 bg-gradient-to-br ${point.color} opacity-10 dark:opacity-15`}
            variants={pulseVariants}
            animate="pulse"
          ></motion.div>
          
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
            <Sparkles className="text-purple-400" size={16} />
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
              <h3 className="text-sm font-semibold text-white dark:text-white flex items-center gap-1.5">
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
                <span className="font-bold">{point.title}</span>
              </h3>
              <p className="text-xs text-white/80 dark:text-white/80 mt-1.5 font-medium">
                {point.description}
              </p>
            </div>
          </div>

          {/* Animated border overlay */}
          <motion.div 
            className="absolute inset-0 rounded-xl pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ 
              boxShadow: ['0 0 0 0 rgba(139, 92, 246, 0)', '0 0 0 2px rgba(139, 92, 246, 0.3)', '0 0 0 0 rgba(139, 92, 246, 0)'],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              repeatDelay: 2 + index,
              delay: point.delay * 3
            }}
          />

          {/* Bottom corner decoration */}
          <motion.div
            className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-purple-500/20 to-violet-500/20 rounded-full blur-md"
            animate={{ 
              scale: [1, 1.2, 1], 
              opacity: [0.5, 0.8, 0.5] 
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              delay: index * 0.5
            }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FeatureHighlights;
