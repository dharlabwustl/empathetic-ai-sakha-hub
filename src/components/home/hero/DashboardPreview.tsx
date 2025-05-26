
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, TrendingUp, Award, BookOpen, Target, Calendar, Clock } from 'lucide-react';

const DashboardPreview = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const dashboardSlides = [
    {
      title: "Smart Study Dashboard",
      content: (
        <div className="h-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-6 rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-between mb-4 md:mb-6">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white">Good Morning, Rahul! 🌟</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Ready to ace your JEE preparation?</p>
            </div>
            <div className="text-xs md:text-sm text-gray-500 mt-2 md:mt-0">Week 8/12</div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-4 md:mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-2 md:p-3 text-center shadow-sm">
              <div className="text-xl md:text-2xl font-bold text-blue-600">87%</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Physics Mastery</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-2 md:p-3 text-center shadow-sm">
              <div className="text-xl md:text-2xl font-bold text-green-600">42</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Study Streak</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-2 md:p-3 text-center shadow-sm">
              <div className="text-xl md:text-2xl font-bold text-purple-600">6.8h</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Today</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-2 md:p-3 text-center shadow-sm">
              <div className="text-xl md:text-2xl font-bold text-orange-600">92%</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Mock Score</div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 md:p-4 shadow-sm">
            <h4 className="font-semibold text-sm md:text-base mb-2 md:mb-3">Today's Focus Areas</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs md:text-sm">Thermodynamics - Heat Engines</span>
                <div className="w-12 md:w-16 bg-gray-200 rounded-full h-1.5 md:h-2">
                  <div className="bg-blue-600 h-1.5 md:h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs md:text-sm">Organic Chemistry - Reactions</span>
                <div className="w-12 md:w-16 bg-gray-200 rounded-full h-1.5 md:h-2">
                  <div className="bg-green-600 h-1.5 md:h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "AI Academic Advisor",
      content: (
        <div className="h-full bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-6 rounded-lg">
          <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm md:text-base font-bold">AI</span>
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold">Sakha AI Advisor</h3>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Your personal study companion</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 md:p-4 mb-3 md:mb-4 shadow-sm">
            <div className="flex items-start gap-2 md:gap-3">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 text-xs md:text-sm">🤖</span>
              </div>
              <div className="flex-1">
                <p className="text-xs md:text-sm text-gray-800 dark:text-white">
                  "Based on your recent mock test, I recommend focusing on Electromagnetic Induction. You've improved 15% this week!"
                </p>
                <div className="flex gap-1 md:gap-2 mt-2">
                  <button className="bg-purple-100 text-purple-600 px-2 py-1 rounded text-xs">View Concepts</button>
                  <button className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">Practice Now</button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
            <div className="bg-white dark:bg-gray-800 rounded p-2 md:p-3 text-center shadow-sm">
              <div className="text-lg md:text-xl font-bold text-purple-600">24</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">AI Suggestions</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded p-2 md:p-3 text-center shadow-sm">
              <div className="text-lg md:text-xl font-bold text-pink-600">95%</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Accuracy</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Interactive Practice",
      content: (
        <div className="h-full bg-gradient-to-br from-green-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-6 rounded-lg">
          <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6">Practice Session</h3>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 md:p-4 mb-3 md:mb-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm md:text-base font-semibold">Newton's Laws - Question 5/10</span>
              <span className="text-xs md:text-sm text-green-600">85% correct</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 md:h-2 mb-3">
              <div className="bg-green-600 h-1.5 md:h-2 rounded-full" style={{ width: '50%' }}></div>
            </div>
            <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300">
              A block of mass 5kg is pushed with a force of 20N...
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 md:gap-3">
            <div className="bg-white dark:bg-gray-800 rounded p-2 md:p-3 text-center shadow-sm">
              <div className="text-lg md:text-xl font-bold text-green-600">156</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Questions Solved</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded p-2 md:p-3 text-center shadow-sm">
              <div className="text-lg md:text-xl font-bold text-teal-600">⏱️ 2:45</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Avg Time</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Performance Analytics",
      content: (
        <div className="h-full bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-6 rounded-lg">
          <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6">Your Progress</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-semibold">Weekly Growth</span>
              </div>
              <div className="text-xl md:text-2xl font-bold text-orange-600">+18%</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">vs last week</div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-red-600" />
                <span className="text-sm font-semibold">JEE Rank</span>
              </div>
              <div className="text-xl md:text-2xl font-bold text-red-600">#2,847</div>
              <div className="text-xs text-green-600">↑ 1,283 positions</div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
            <h4 className="font-semibold text-sm mb-2">Subject Performance</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs">Physics</span>
                <span className="text-xs font-bold text-green-600">87%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs">Mathematics</span>
                <span className="text-xs font-bold text-blue-600">82%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs">Chemistry</span>
                <span className="text-xs font-bold text-orange-600">74%</span>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % dashboardSlides.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, dashboardSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % dashboardSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + dashboardSlides.length) % dashboardSlides.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative w-full max-w-2xl mx-auto"
    >
      {/* Device Frame */}
      <div className="relative bg-gray-800 rounded-[2rem] p-2 shadow-2xl">
        {/* Screen */}
        <div className="bg-white dark:bg-gray-900 rounded-[1.5rem] overflow-hidden relative">
          {/* Status Bar */}
          <div className="bg-gray-900 text-white px-4 py-2 flex justify-between items-center text-xs">
            <span>9:41</span>
            <span className="font-semibold">PREPZR</span>
            <span>100% 🔋</span>
          </div>

          {/* Dashboard Content */}
          <div className="h-80 md:h-96 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                {dashboardSlides[currentSlide].content}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">
            <button
              onClick={prevSlide}
              className="text-white hover:text-gray-300 transition-colors p-1"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <div className="flex gap-2">
              {dashboardSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-white hover:text-gray-300 transition-colors p-1"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            
            <button
              onClick={nextSlide}
              className="text-white hover:text-gray-300 transition-colors p-1"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Slide Title */}
      <motion.div
        key={currentSlide}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center mt-4"
      >
        <h4 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white">
          {dashboardSlides[currentSlide].title}
        </h4>
      </motion.div>
    </motion.div>
  );
};

export default DashboardPreview;
