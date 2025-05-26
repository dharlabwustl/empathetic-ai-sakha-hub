
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
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border">
            <h4 className="font-medium text-blue-900">Your Learning Profile</h4>
            <div className="mt-2 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Learning Style:</span>
                <span className="font-medium">Visual + Analytical</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Pace:</span>
                <span className="font-medium">Moderate</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Best Study Time:</span>
                <span className="font-medium">Morning</span>
              </div>
            </div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-sm text-green-800">✓ Plan automatically adjusts based on your performance</p>
          </div>
        </div>
      )
    },
    {
      id: 'adaptive-daily',
      title: 'Daily Adaptive Plans',
      subtitle: 'Every day is personalized based on your progress',
      content: (
        <div className="space-y-3">
          <div className="bg-purple-50 p-3 rounded-lg">
            <h4 className="font-medium text-purple-900">Today's Schedule</h4>
            <div className="mt-2 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Physics: Newton's Laws (30 min)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Chemistry: Bonds (25 min)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Math: Algebra Practice (20 min)</span>
              </div>
            </div>
          </div>
          <div className="bg-amber-50 p-3 rounded-lg">
            <p className="text-sm text-amber-800">🎯 Adjusted for your current mood: Focused</p>
          </div>
        </div>
      )
    },
    {
      id: 'concept-mastery',
      title: 'Multi-Modal Concept Mastery',
      subtitle: '3D visuals, videos, summaries - learn your way',
      content: (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-blue-50 p-3 rounded text-center">
              <div className="text-2xl mb-1">🧊</div>
              <span className="text-xs font-medium">3D Models</span>
            </div>
            <div className="bg-green-50 p-3 rounded text-center">
              <div className="text-2xl mb-1">👁️</div>
              <span className="text-xs font-medium">Visual Diagrams</span>
            </div>
            <div className="bg-purple-50 p-3 rounded text-center">
              <div className="text-2xl mb-1">🎥</div>
              <span className="text-xs font-medium">Video Lessons</span>
            </div>
            <div className="bg-orange-50 p-3 rounded text-center">
              <div className="text-2xl mb-1">📝</div>
              <span className="text-xs font-medium">Smart Summaries</span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-3 rounded-lg">
            <p className="text-sm text-indigo-800">💡 AI chooses the best method for each concept</p>
          </div>
        </div>
      )
    },
    {
      id: 'spaced-repetition',
      title: 'Interactive Spaced Repetition',
      subtitle: 'Smart recall system that never lets you forget',
      content: (
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-3 rounded-lg">
            <h4 className="font-medium text-rose-900">Recall Schedule</h4>
            <div className="mt-2 space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Thermodynamics</span>
                <span className="text-green-600 font-medium">Due now</span>
              </div>
              <div className="flex justify-between">
                <span>Atomic Structure</span>
                <span className="text-blue-600 font-medium">In 2 days</span>
              </div>
              <div className="flex justify-between">
                <span>Kinematics</span>
                <span className="text-gray-600 font-medium">In 1 week</span>
              </div>
            </div>
          </div>
          <div className="bg-emerald-50 p-3 rounded-lg">
            <p className="text-sm text-emerald-800">🧠 98% retention rate achieved</p>
          </div>
        </div>
      )
    },
    {
      id: 'formula-practice',
      title: 'Formula Practice',
      subtitle: 'Master formulas with interactive problem solving',
      content: (
        <div className="space-y-3">
          <div className="bg-slate-50 p-3 rounded-lg border">
            <h4 className="font-medium text-slate-900">Current Formula</h4>
            <div className="mt-2 text-center">
              <div className="text-lg font-mono bg-white p-2 rounded border">
                F = ma
              </div>
              <p className="text-sm text-gray-600 mt-1">Newton's Second Law</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="bg-blue-50 p-2 rounded text-center">
              <div className="font-bold text-blue-700">25</div>
              <div className="text-blue-600">Practiced</div>
            </div>
            <div className="bg-green-50 p-2 rounded text-center">
              <div className="font-bold text-green-700">92%</div>
              <div className="text-green-600">Accuracy</div>
            </div>
            <div className="bg-purple-50 p-2 rounded text-center">
              <div className="font-bold text-purple-700">12m</div>
              <div className="text-purple-600">Time</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'practice-exams',
      title: 'Smart Practice Exams',
      subtitle: 'AI-generated tests that mirror real exam patterns',
      content: (
        <div className="space-y-3">
          <div className="bg-indigo-50 p-3 rounded-lg">
            <h4 className="font-medium text-indigo-900">Latest Test Results</h4>
            <div className="mt-2 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Physics Mock Test #15</span>
                <span className="font-medium text-green-600">85%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Chemistry Practice Set</span>
                <span className="font-medium text-blue-600">78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full" style={{width: '82%'}}></div>
              </div>
              <p className="text-xs text-gray-600">Overall Progress: 82%</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'exam-readiness',
      title: 'Daily Exam Readiness',
      subtitle: 'Track your preparation progress every single day',
      content: (
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-3 rounded-lg">
            <h4 className="font-medium text-emerald-900">Readiness Score</h4>
            <div className="mt-2 text-center">
              <div className="text-3xl font-bold text-emerald-700">87%</div>
              <p className="text-sm text-emerald-600">Ready for NEET</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-green-50 p-2 rounded">
              <div className="font-medium text-green-700">Strong Areas</div>
              <div className="text-green-600">Physics, Math</div>
            </div>
            <div className="bg-orange-50 p-2 rounded">
              <div className="font-medium text-orange-700">Focus Areas</div>
              <div className="text-orange-600">Organic Chemistry</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'exam-champion',
      title: 'Become an Exam Champion',
      subtitle: 'Join thousands who achieved their dream scores',
      content: (
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-3 rounded-lg">
            <h4 className="font-medium text-amber-900">Champion Stats</h4>
            <div className="mt-2 grid grid-cols-2 gap-3 text-sm">
              <div className="text-center">
                <div className="text-xl font-bold text-amber-700">🏆</div>
                <div className="font-medium">Rank 1</div>
                <div className="text-xs text-amber-600">Mock Tests</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-amber-700">⚡</div>
                <div className="font-medium">15 Day</div>
                <div className="text-xs text-amber-600">Study Streak</div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg">
            <p className="text-sm text-purple-800 text-center">
              "Achieved 95%ile in NEET with PREPZR!" - Arjun K.
            </p>
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
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        style={{ 
          width: '600px', 
          height: '400px',
          transform: 'perspective(1000px) rotateY(-8deg) rotateX(4deg)',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Mock browser header */}
        <div className="h-8 bg-gray-100 dark:bg-gray-800 flex items-center px-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
          <div className="ml-4 flex-1 text-xs text-gray-500 dark:text-gray-400">
            student.prepzr.com/dashboard
          </div>
        </div>

        {/* Dashboard content */}
        <div className="h-[calc(100%-2rem)] relative overflow-hidden">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="h-full p-6"
          >
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {slides[currentSlide].title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {slides[currentSlide].subtitle}
                </p>
              </div>
              
              <div className="mt-6">
                {slides[currentSlide].content}
              </div>
            </div>
          </motion.div>

          {/* Navigation controls */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            >
              {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={nextSlide}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Slide indicators */}
          <div className="absolute bottom-4 left-4 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentSlide 
                    ? 'bg-blue-500' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* 3D effect shadow */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl -z-10"
        style={{
          transform: 'perspective(1000px) rotateY(-8deg) rotateX(4deg) translateZ(-20px)',
          filter: 'blur(20px)'
        }}
      />
    </div>
  );
};

export default DashboardPreview;
