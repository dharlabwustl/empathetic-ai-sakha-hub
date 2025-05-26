
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
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200 shadow-sm">
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
          <div className="bg-green-50 p-3 rounded-lg border border-green-200 shadow-sm">
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
          <div className="bg-purple-50 p-3 rounded-lg border border-purple-200 shadow-sm">
            <h4 className="font-medium text-purple-900">Today's Schedule</h4>
            <div className="mt-2 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full shadow-sm"></div>
                <span>Physics: Newton's Laws (30 min)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full shadow-sm"></div>
                <span>Chemistry: Bonds (25 min)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full shadow-sm"></div>
                <span>Math: Algebra Practice (20 min)</span>
              </div>
            </div>
          </div>
          <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 shadow-sm">
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
            <div className="bg-blue-50 p-3 rounded-lg text-center border border-blue-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-2xl mb-1">🧊</div>
              <span className="text-xs font-medium">3D Models</span>
            </div>
            <div className="bg-green-50 p-3 rounded-lg text-center border border-green-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-2xl mb-1">👁️</div>
              <span className="text-xs font-medium">Visual Diagrams</span>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg text-center border border-purple-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-2xl mb-1">🎥</div>
              <span className="text-xs font-medium">Video Lessons</span>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg text-center border border-orange-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-2xl mb-1">📝</div>
              <span className="text-xs font-medium">Smart Summaries</span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-3 rounded-lg border border-indigo-200 shadow-sm">
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
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-3 rounded-lg border border-pink-200 shadow-sm">
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
          <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200 shadow-sm">
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
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 shadow-sm">
            <h4 className="font-medium text-slate-900">Current Formula</h4>
            <div className="mt-2 text-center">
              <div className="text-lg font-mono bg-white p-2 rounded border border-slate-300 shadow-sm">
                F = ma
              </div>
              <p className="text-sm text-gray-600 mt-1">Newton's Second Law</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="bg-blue-50 p-2 rounded text-center border border-blue-200 shadow-sm">
              <div className="font-bold text-blue-700">25</div>
              <div className="text-blue-600">Practiced</div>
            </div>
            <div className="bg-green-50 p-2 rounded text-center border border-green-200 shadow-sm">
              <div className="font-bold text-green-700">92%</div>
              <div className="text-green-600">Accuracy</div>
            </div>
            <div className="bg-purple-50 p-2 rounded text-center border border-purple-200 shadow-sm">
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
          <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-200 shadow-sm">
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
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full shadow-sm" style={{width: '82%'}}></div>
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
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-3 rounded-lg border border-emerald-200 shadow-lg">
            <h4 className="font-medium text-emerald-900">Readiness Score</h4>
            <div className="mt-2 text-center">
              <div className="text-3xl font-bold text-emerald-700 drop-shadow-sm">87%</div>
              <p className="text-sm text-emerald-600">Ready for NEET</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-green-50 p-2 rounded border border-green-200 shadow-sm">
              <div className="font-medium text-green-700">Strong Areas</div>
              <div className="text-green-600">Physics, Math</div>
            </div>
            <div className="bg-orange-50 p-2 rounded border border-orange-200 shadow-sm">
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
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-3 rounded-lg border border-yellow-200 shadow-lg">
            <h4 className="font-medium text-amber-900">Champion Stats</h4>
            <div className="mt-2 grid grid-cols-2 gap-3 text-sm">
              <div className="text-center">
                <div className="text-xl font-bold text-amber-700 drop-shadow-sm">🏆</div>
                <div className="font-medium">Rank 1</div>
                <div className="text-xs text-amber-600">Mock Tests</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-amber-700 drop-shadow-sm">⚡</div>
                <div className="font-medium">15 Day</div>
                <div className="text-xs text-amber-600">Study Streak</div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg border border-purple-200 shadow-sm">
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
        className="relative bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 rounded-2xl shadow-2xl border-2 border-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-700 dark:to-purple-700 overflow-hidden backdrop-blur-sm"
        style={{ 
          width: '600px', 
          height: '400px',
          transform: 'perspective(1200px) rotateY(-8deg) rotateX(4deg)',
          transformStyle: 'preserve-3d',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Enhanced browser header with gradient */}
        <div className="h-8 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 flex items-center px-4 border-b border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-gradient-to-br from-red-400 to-red-500 rounded-full shadow-sm"></div>
            <div className="w-3 h-3 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full shadow-sm"></div>
            <div className="w-3 h-3 bg-gradient-to-br from-green-400 to-green-500 rounded-full shadow-sm"></div>
          </div>
          <div className="ml-4 flex-1 text-xs text-gray-500 dark:text-gray-400 font-medium">
            student.prepzr.com/dashboard
          </div>
        </div>

        {/* Enhanced dashboard content with vibrant gradients */}
        <div className="h-[calc(100%-2rem)] relative overflow-hidden bg-gradient-to-br from-blue-50/50 via-white/80 to-purple-50/50 dark:from-blue-900/30 dark:via-gray-900/80 dark:to-purple-900/30">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.98 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full p-6"
          >
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent drop-shadow-sm">
                  {slides[currentSlide].title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {slides[currentSlide].subtitle}
                </p>
              </div>
              
              <div className="mt-6">
                {slides[currentSlide].content}
              </div>
            </div>
          </motion.div>

          {/* Enhanced navigation controls with gradients */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg border-white/50"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg border-white/50"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            >
              {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg border-white/50"
              onClick={nextSlide}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Enhanced slide indicators with gradients */}
          <div className="absolute bottom-4 left-4 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 shadow-sm ${
                  index === currentSlide 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg transform scale-125' 
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Enhanced 3D effect shadow with multiple layers */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-pink-500/30 rounded-2xl -z-10"
        style={{
          transform: 'perspective(1200px) rotateY(-8deg) rotateX(4deg) translateZ(-30px)',
          filter: 'blur(25px)'
        }}
      />
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl -z-20"
        style={{
          transform: 'perspective(1200px) rotateY(-8deg) rotateX(4deg) translateZ(-50px)',
          filter: 'blur(40px)'
        }}
      />
    </div>
  );
};

export default DashboardPreview;
