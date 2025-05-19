
import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Clock, Book, Brain, Trophy, Star, Zap } from 'lucide-react';
import StudentAnimatedAvatar from './StudentAnimatedAvatar';

interface JourneyStepProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  stage: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  index: number;
}

const JourneyStep: React.FC<JourneyStepProps> = ({ title, description, icon, color, stage, index }) => {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1, 
        type: "spring",
        stiffness: 100
      }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {/* Connection line */}
      {index > 0 && (
        <div className="absolute left-7 -top-8 h-8 w-0.5 bg-gradient-to-b from-transparent via-violet-300 to-violet-500 dark:from-transparent dark:via-violet-700 dark:to-violet-600" />
      )}
      
      <div className="flex items-start gap-4">
        {/* Step bubble with animated icon */}
        <motion.div 
          className={`bg-gradient-to-br from-${color}-100 to-${color}-200 dark:from-${color}-900/30 dark:to-${color}-800/40 h-14 w-14 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg border border-${color}-200 dark:border-${color}-800/50`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          animate={{ 
            boxShadow: [
              `0 0 0 rgba(${color === 'violet' ? '124, 58, 237' : color === 'blue' ? '59, 130, 246' : '139, 92, 246'}, 0)`, 
              `0 0 15px rgba(${color === 'violet' ? '124, 58, 237' : color === 'blue' ? '59, 130, 246' : '139, 92, 246'}, 0.5)`, 
              `0 0 0 rgba(${color === 'violet' ? '124, 58, 237' : color === 'blue' ? '59, 130, 246' : '139, 92, 246'}, 0)`
            ]
          }}
          transition={{ 
            boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            scale: { type: "spring", stiffness: 300, damping: 10 }
          }}
          style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
        >
          <motion.div
            animate={{ rotateY: [0, 180, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className={`text-${color}-500 dark:text-${color}-300`}
          >
            {icon}
          </motion.div>
        </motion.div>
        
        {/* Step content with animated avatar */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <motion.h3 
              className="font-bold text-gray-800 dark:text-white text-lg"
              animate={{ 
                color: [
                  'rgba(31, 41, 55, 1)', 
                  `rgba(${color === 'violet' ? '124, 58, 237' : color === 'blue' ? '59, 130, 246' : '139, 92, 246'}, 1)`,
                  'rgba(31, 41, 55, 1)'
                ]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              {title}
            </motion.h3>
            
            <motion.div
              className="ml-auto"
              animate={{ y: [-2, 2, -2] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <StudentAnimatedAvatar stage={stage} size="sm" showJourneyIndicators={false} />
            </motion.div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const ImmersiveJourneyPath = () => {
  const journeySteps = [
    {
      title: "Begin Your Learning Path",
      description: "Register and set your academic goals with personalized AI guidance.",
      icon: <Book className="h-6 w-6" />,
      color: "blue",
      stage: "beginner" as const
    },
    {
      title: "Build Your Knowledge Foundation",
      description: "Master core concepts through interactive lessons and visual aids.",
      icon: <Brain className="h-6 w-6" />,
      color: "indigo",
      stage: "beginner" as const
    },
    {
      title: "Practice Makes Perfect",
      description: "Apply your knowledge with challenging exercises and instant feedback.",
      icon: <Zap className="h-6 w-6" />,
      color: "purple",
      stage: "intermediate" as const
    },
    {
      title: "Track Your Progress",
      description: "Monitor improvements with detailed analytics and performance insights.",
      icon: <Clock className="h-6 w-6" />,
      color: "violet",
      stage: "intermediate" as const
    },
    {
      title: "Master Advanced Topics",
      description: "Tackle complex subjects with confidence as your skills grow.",
      icon: <Star className="h-6 w-6" />,
      color: "purple",
      stage: "advanced" as const
    },
    {
      title: "Achieve Exam Excellence",
      description: "Ace your exams with comprehensive preparation and confidence.",
      icon: <Trophy className="h-6 w-6" />,
      color: "violet",
      stage: "expert" as const
    },
    {
      title: "Celebrate Your Success",
      description: "Graduate with the knowledge and skills to excel in your future.",
      icon: <GraduationCap className="h-6 w-6" />,
      color: "indigo",
      stage: "expert" as const
    }
  ];

  return (
    <div className="relative py-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-violet-50/5 dark:to-violet-950/5 -z-10" />
      
      {/* Animated floating shapes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-violet-300/10 to-blue-300/10 dark:from-violet-500/5 dark:to-blue-500/5 blur-xl"
          style={{
            width: Math.random() * 200 + 50,
            height: Math.random() * 200 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            zIndex: -1
          }}
          animate={{
            x: [0, Math.random() * 50 - 25],
            y: [0, Math.random() * 50 - 25],
            opacity: [0.3, 0.15, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 8 + Math.random() * 7,
            ease: "easeInOut",
            repeatType: "reverse",
          }}
        />
      ))}
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div 
            className="inline-block mb-6"
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <StudentAnimatedAvatar stage="expert" size="lg" showJourneyIndicators={true} />
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600"
            initial={{ y: -10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Your Immersive Learning Journey
          </motion.h2>
          
          <motion.p 
            className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ y: -10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Experience a personalized, engaging path from enrollment to exam success
          </motion.p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="space-y-8">
            {journeySteps.map((step, index) => (
              <JourneyStep 
                key={index} 
                {...step} 
                index={index} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImmersiveJourneyPath;
