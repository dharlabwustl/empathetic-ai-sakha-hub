
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DashboardPreview = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      id: 'dynamic-plans',
      title: 'Dynamic Study Plans',
      subtitle: 'AI-powered plans that adapt to your learning profile',
      content: (
        <div className="space-y-4">
          <motion.div 
            className="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 rounded-xl border border-blue-200 shadow-lg transform perspective-1000 rotate-x-2"
            whileHover={{ scale: 1.02, rotateX: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 mb-3">
              <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                Your Learning Profile
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-blue-700">Learning Style:</span>
                  <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Visual + Analytical</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-blue-700">Pace:</span>
                  <span className="font-bold text-emerald-600">Moderate</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-blue-700">Best Study Time:</span>
                  <span className="font-bold text-orange-600">Morning</span>
                </div>
              </div>
            </div>
            <motion.div 
              className="bg-gradient-to-r from-emerald-50 to-green-100 p-3 rounded-lg border border-emerald-200"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <p className="text-sm text-emerald-800 font-medium flex items-center gap-2">
                <span className="text-green-500 text-lg">✓</span>
                Plan automatically adjusts based on your performance
              </p>
            </motion.div>
          </motion.div>
        </div>
      )
    },
    {
      id: 'adaptive-daily',
      title: 'Daily Adaptive Plans',
      subtitle: 'Every day is personalized based on your progress',
      content: (
        <div className="space-y-3">
          <motion.div 
            className="bg-gradient-to-br from-purple-50 to-pink-100 p-4 rounded-xl border border-purple-200 shadow-lg transform perspective-1000 rotate-y-1"
            whileHover={{ scale: 1.02, rotateY: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3">
              <h4 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"></div>
                Today's Schedule
              </h4>
              <div className="space-y-3 text-sm">
                <motion.div 
                  className="flex items-center gap-3 p-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full shadow-lg"></div>
                  <span className="font-medium text-purple-900">Physics: Newton's Laws (30 min)</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-3 p-2 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                >
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-lg"></div>
                  <span className="font-medium text-blue-900">Chemistry: Bonds (25 min)</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-3 p-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2, delay: 0.2 }}
                >
                  <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-lg"></div>
                  <span className="font-medium text-green-900">Math: Algebra Practice (20 min)</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
          <motion.div 
            className="bg-gradient-to-r from-amber-50 to-orange-100 p-3 rounded-xl border border-amber-200"
            animate={{ glow: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <p className="text-sm text-amber-800 font-medium flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              Adjusted for your current mood: <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent font-bold">Focused</span>
            </p>
          </motion.div>
        </div>
      )
    },
    {
      id: 'concept-mastery',
      title: 'Multi-Modal Concept Mastery',
      subtitle: '3D visuals, videos, summaries - learn your way',
      content: (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <motion.div 
              className="bg-gradient-to-br from-blue-50 to-cyan-100 p-4 rounded-xl text-center border border-blue-200 shadow-lg transform perspective-1000"
              whileHover={{ scale: 1.05, rotateY: 5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="text-3xl mb-2"
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                🧊
              </motion.div>
              <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">3D Models</span>
            </motion.div>
            <motion.div 
              className="bg-gradient-to-br from-green-50 to-emerald-100 p-4 rounded-xl text-center border border-green-200 shadow-lg"
              whileHover={{ scale: 1.05, rotateY: -5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="text-3xl mb-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                👁️
              </motion.div>
              <span className="text-sm font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Visual Diagrams</span>
            </motion.div>
            <motion.div 
              className="bg-gradient-to-br from-purple-50 to-pink-100 p-4 rounded-xl text-center border border-purple-200 shadow-lg"
              whileHover={{ scale: 1.05, rotateX: 5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="text-3xl mb-2"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🎥
              </motion.div>
              <span className="text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Video Lessons</span>
            </motion.div>
            <motion.div 
              className="bg-gradient-to-br from-orange-50 to-amber-100 p-4 rounded-xl text-center border border-orange-200 shadow-lg"
              whileHover={{ scale: 1.05, rotateX: -5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="text-3xl mb-2"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                📝
              </motion.div>
              <span className="text-sm font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Smart Summaries</span>
            </motion.div>
          </div>
          <motion.div 
            className="bg-gradient-to-r from-indigo-50 to-purple-100 p-3 rounded-xl border border-indigo-200 shadow-lg"
            animate={{ boxShadow: ["0 4px 20px rgba(99, 102, 241, 0.1)", "0 8px 30px rgba(99, 102, 241, 0.2)", "0 4px 20px rgba(99, 102, 241, 0.1)"] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <p className="text-sm text-indigo-800 font-medium flex items-center gap-2">
              <span className="text-xl">💡</span>
              AI chooses the best method for each concept
            </p>
          </motion.div>
        </div>
      )
    },
    {
      id: 'spaced-repetition',
      title: 'Interactive Spaced Repetition',
      subtitle: 'Smart recall system that never lets you forget',
      content: (
        <div className="space-y-3">
          <motion.div 
            className="bg-gradient-to-br from-pink-50 to-rose-100 p-4 rounded-xl border border-pink-200 shadow-lg transform perspective-1000"
            whileHover={{ scale: 1.02, rotateZ: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3">
              <h4 className="font-bold text-rose-900 mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full animate-ping"></div>
                Recall Schedule
              </h4>
              <div className="space-y-2 text-sm">
                <motion.div 
                  className="flex justify-between items-center p-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg"
                  whileHover={{ x: 3 }}
                >
                  <span className="font-medium text-gray-700">Thermodynamics</span>
                  <span className="font-bold text-green-600 px-2 py-1 bg-green-200 rounded-full text-xs">Due now</span>
                </motion.div>
                <motion.div 
                  className="flex justify-between items-center p-2 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg"
                  whileHover={{ x: 3 }}
                >
                  <span className="font-medium text-gray-700">Atomic Structure</span>
                  <span className="font-bold text-blue-600 px-2 py-1 bg-blue-200 rounded-full text-xs">In 2 days</span>
                </motion.div>
                <motion.div 
                  className="flex justify-between items-center p-2 bg-gradient-to-r from-gray-100 to-slate-100 rounded-lg"
                  whileHover={{ x: 3 }}
                >
                  <span className="font-medium text-gray-700">Kinematics</span>
                  <span className="font-bold text-gray-600 px-2 py-1 bg-gray-200 rounded-full text-xs">In 1 week</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
          <motion.div 
            className="bg-gradient-to-r from-emerald-50 to-green-100 p-3 rounded-xl border border-emerald-200"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <p className="text-sm text-emerald-800 font-medium flex items-center gap-2">
              <span className="text-xl">🧠</span>
              <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent font-bold">98% retention rate</span> achieved
            </p>
          </motion.div>
        </div>
      )
    },
    {
      id: 'formula-practice',
      title: 'Formula Practice',
      subtitle: 'Master formulas with interactive problem solving',
      content: (
        <div className="space-y-3">
          <motion.div 
            className="bg-gradient-to-br from-slate-50 to-gray-100 p-4 rounded-xl border border-slate-200 shadow-lg transform perspective-1000"
            whileHover={{ scale: 1.02, rotateX: 2 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3">
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-slate-500 to-gray-500 rounded-full animate-pulse"></div>
                Current Formula
              </h4>
              <div className="text-center">
                <motion.div 
                  className="text-2xl font-mono bg-gradient-to-r from-white to-gray-50 p-4 rounded-lg border border-gray-200 shadow-inner"
                  animate={{ 
                    boxShadow: [
                      "inset 0 2px 4px rgba(0,0,0,0.1)", 
                      "inset 0 4px 8px rgba(0,0,0,0.15)", 
                      "inset 0 2px 4px rgba(0,0,0,0.1)"
                    ] 
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">F = ma</span>
                </motion.div>
                <p className="text-sm text-gray-600 mt-2 font-medium">Newton's Second Law</p>
              </div>
            </div>
          </motion.div>
          <div className="grid grid-cols-3 gap-3 text-xs">
            <motion.div 
              className="bg-gradient-to-br from-blue-50 to-cyan-100 p-3 rounded-xl text-center border border-blue-200 shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div 
                className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
              >
                25
              </motion.div>
              <div className="text-blue-600 font-medium">Practiced</div>
            </motion.div>
            <motion.div 
              className="bg-gradient-to-br from-green-50 to-emerald-100 p-3 rounded-xl text-center border border-green-200 shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div 
                className="font-bold text-2xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                92%
              </motion.div>
              <div className="text-green-600 font-medium">Accuracy</div>
            </motion.div>
            <motion.div 
              className="bg-gradient-to-br from-purple-50 to-pink-100 p-3 rounded-xl text-center border border-purple-200 shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div 
                className="font-bold text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                A+
              </motion.div>
              <div className="text-purple-600 font-medium">Grade</div>
            </motion.div>
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-md mx-auto bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950 rounded-2xl shadow-2xl border border-blue-200/50 dark:border-blue-800/50 overflow-hidden transform perspective-1000 rotate-y-3"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white p-4">
        <div className="flex items-center justify-between mb-2">
          <motion.div 
            className="w-3 h-3 bg-green-400 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
        </div>
        <motion.h3 
          className="font-bold text-lg"
          key={currentSlide}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {slides[currentSlide].title}
        </motion.h3>
        <motion.p 
          className="text-sm text-blue-100"
          key={`${currentSlide}-subtitle`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {slides[currentSlide].subtitle}
        </motion.p>
      </div>

      {/* Content */}
      <div className="p-4 min-h-[300px]">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
        >
          {slides[currentSlide].content}
        </motion.div>
      </div>

      {/* Controls */}
      <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={prevSlide}
            className="hover:bg-blue-100 dark:hover:bg-blue-900"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center space-x-2">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-blue-600 w-6'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                onClick={() => setCurrentSlide(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="hover:bg-blue-100 dark:hover:bg-blue-900"
            >
              {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={nextSlide}
              className="hover:bg-blue-100 dark:hover:bg-blue-900"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardPreview;
