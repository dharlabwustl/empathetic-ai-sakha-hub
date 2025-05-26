
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  Clock, 
  Target,
  Trophy,
  Brain,
  Heart,
  Star,
  Zap,
  Calendar,
  BookOpen,
  Award
} from 'lucide-react';

interface DashboardSlide {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: React.ElementType;
  stats: Array<{
    label: string;
    value: string;
    change?: string;
    color: string;
  }>;
}

const Enhanced3DDashboardPreview = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const slides: DashboardSlide[] = [
    {
      id: 'academic-performance',
      title: 'Academic Performance',
      description: 'Track your progress across all subjects',
      color: 'from-blue-500 to-indigo-600',
      icon: TrendingUp,
      stats: [
        { label: 'Overall Score', value: '87%', change: '+12%', color: 'text-green-600' },
        { label: 'Concepts Mastered', value: '124', change: '+8', color: 'text-blue-600' },
        { label: 'Study Streak', value: '15 days', color: 'text-purple-600' }
      ]
    },
    {
      id: 'study-analytics',
      title: 'Study Analytics',
      description: 'Detailed insights into your learning patterns',
      color: 'from-purple-500 to-pink-600',
      icon: Brain,
      stats: [
        { label: 'Study Time', value: '6.5h', change: '+2h', color: 'text-blue-600' },
        { label: 'Efficiency Rate', value: '92%', change: '+5%', color: 'text-green-600' },
        { label: 'Focus Score', value: '8.4/10', color: 'text-purple-600' }
      ]
    },
    {
      id: 'exam-readiness',
      title: 'Exam Readiness',
      description: 'Your preparation status for upcoming exams',
      color: 'from-green-500 to-emerald-600',
      icon: Target,
      stats: [
        { label: 'Readiness Score', value: '78%', change: '+15%', color: 'text-green-600' },
        { label: 'Mock Tests', value: '12/15', color: 'text-blue-600' },
        { label: 'Weak Areas', value: '3', change: '-2', color: 'text-orange-600' }
      ]
    },
    {
      id: 'exam-champion',
      title: 'Exam Champion',
      description: 'Your journey to becoming an exam champion',
      color: 'from-orange-500 to-red-600',
      icon: Trophy,
      stats: [
        { label: 'Champion Score', value: '85%', change: '+18%', color: 'text-gold-600' },
        { label: 'Achievements', value: '24', change: '+3', color: 'text-purple-600' },
        { label: 'Rank Position', value: '#42', change: '↑8', color: 'text-green-600' }
      ]
    },
    {
      id: 'motivation-meter',
      title: 'Motivation Meter',
      description: 'Track your mood and motivation levels',
      color: 'from-pink-500 to-rose-600',
      icon: Heart,
      stats: [
        { label: 'Motivation', value: '8.7/10', change: '+0.5', color: 'text-pink-600' },
        { label: 'Mood Score', value: 'Great', color: 'text-green-600' },
        { label: 'Energy Level', value: '85%', color: 'text-orange-600' }
      ]
    }
  ];

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isHovered, slides.length]);

  const currentSlideData = slides[currentSlide];
  const IconComponent = currentSlideData.icon;

  return (
    <div 
      className="relative w-full max-w-md mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Container */}
      <motion.div
        className="relative"
        initial={{ rotateY: 0 }}
        animate={{ 
          rotateY: isHovered ? 5 : 0,
          scale: isHovered ? 1.02 : 1
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ 
          perspective: '1000px',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Main Dashboard Card */}
        <motion.div
          className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800"
          style={{ 
            transform: 'translateZ(20px)',
            transformStyle: 'preserve-3d'
          }}
          whileHover={{ 
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            y: -5
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <div className={`h-20 bg-gradient-to-r ${currentSlideData.color} relative overflow-hidden`}>
            <div className="absolute inset-0 bg-black/10" />
            <motion.div 
              className="relative z-10 p-4 h-full flex items-center justify-between text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                  <IconComponent className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{currentSlideData.title}</h3>
                  <p className="text-xs opacity-90">{currentSlideData.description}</p>
                </div>
              </div>
            </motion.div>
            
            {/* Floating elements */}
            <motion.div
              className="absolute top-2 right-4 w-4 h-4 bg-white/30 rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                {currentSlideData.stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </span>
                      {stat.change && (
                        <span className={`text-xs font-medium ${stat.color}`}>
                          {stat.change}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 p-4 pt-0">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === currentSlide 
                    ? 'bg-gray-800 dark:bg-white' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
                onClick={() => setCurrentSlide(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Floating Achievement Badge */}
        <motion.div
          className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-2 rounded-full shadow-lg"
          style={{ transform: 'translateZ(40px)' }}
          animate={{ 
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Award className="h-4 w-4" />
        </motion.div>

        {/* Background glow effect */}
        <div 
          className={`absolute inset-0 bg-gradient-to-r ${currentSlideData.color} opacity-20 blur-xl rounded-2xl -z-10`}
          style={{ transform: 'translateZ(-20px) scale(1.1)' }}
        />
      </motion.div>

      {/* Interactive Elements */}
      <motion.div
        className="absolute -bottom-4 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
            Live Dashboard Preview
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default Enhanced3DDashboardPreview;
