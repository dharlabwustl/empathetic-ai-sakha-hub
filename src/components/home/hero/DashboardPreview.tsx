
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
        className="relative overflow-hidden"
        style={{ 
          width: '600px', 
          height: '400px',
          transform: 'perspective(1200px) rotateY(-12deg) rotateX(6deg)',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Enhanced 3D container with vibrant gradient borders */}
        <div className="relative w-full h-full bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-950/30 dark:to-purple-950/30 rounded-3xl shadow-2xl border-2 border-transparent bg-clip-padding">
          {/* Vibrant gradient border effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl opacity-20 blur-sm -z-10" />
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-violet-500/20 to-fuchsia-500/20 rounded-3xl -z-5" />
          
          {/* Enhanced browser header with vibrant colors */}
          <div className="h-8 bg-gradient-to-r from-gray-100 via-blue-50 to-purple-50 dark:from-gray-800 dark:via-blue-900/50 dark:to-purple-900/50 flex items-center px-4 border-b border-gradient-to-r from-blue-200 to-purple-200 dark:border-gradient-to-r dark:from-blue-700 dark:to-purple-700 rounded-t-3xl">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-red-500 rounded-full shadow-lg"></div>
              <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full shadow-lg"></div>
              <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full shadow-lg"></div>
            </div>
            <div className="ml-4 flex-1 text-xs bg-gradient-to-r from-gray-500 to-blue-600 bg-clip-text text-transparent font-medium">
              student.prepzr.com/dashboard
            </div>
          </div>

          {/* Enhanced dashboard content with vibrant backgrounds */}
          <div className="h-[calc(100%-2rem)] relative overflow-hidden bg-gradient-to-br from-white/80 via-blue-50/50 to-purple-50/50 dark:from-gray-900/80 dark:via-blue-950/50 dark:to-purple-950/50 rounded-b-3xl">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20, rotateY: 10 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -20, rotateY: -10 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-full p-6"
            >
              <div className="space-y-4">
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 via-blue-700 to-purple-700 bg-clip-text text-transparent dark:from-white dark:via-blue-300 dark:to-purple-300">
                    {slides[currentSlide].title}
                  </h3>
                  <p className="text-sm bg-gradient-to-r from-gray-600 to-blue-600 bg-clip-text text-transparent dark:from-gray-400 dark:to-blue-400">
                    {slides[currentSlide].subtitle}
                  </p>
                </div>
                
                <div className="mt-6">
                  {slides[currentSlide].content}
                </div>
              </div>
            </motion.div>

            {/* Enhanced navigation controls with vibrant styling */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-300 hover:from-blue-500/20 hover:to-purple-500/20 shadow-lg backdrop-blur-sm"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-4 w-4 text-blue-600" />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-300 hover:from-purple-500/20 hover:to-pink-500/20 shadow-lg backdrop-blur-sm"
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              >
                {isAutoPlaying ? <Pause className="h-4 w-4 text-purple-600" /> : <Play className="h-4 w-4 text-purple-600" />}
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-gradient-to-r from-pink-500/10 to-red-500/10 border-pink-300 hover:from-pink-500/20 hover:to-red-500/20 shadow-lg backdrop-blur-sm"
                onClick={nextSlide}
              >
                <ChevronRight className="h-4 w-4 text-pink-600" />
              </Button>
            </div>

            {/* Enhanced slide indicators with vibrant colors */}
            <div className="absolute bottom-4 left-4 flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 shadow-lg ${
                    index === currentSlide 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-125 shadow-blue-300' 
                      : 'bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 hover:from-blue-300 hover:to-purple-300'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced 3D shadow effects with vibrant colors */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/25 to-pink-500/20 rounded-3xl -z-10 blur-xl"
        style={{
          transform: 'perspective(1200px) rotateY(-12deg) rotateX(6deg) translateZ(-30px)',
        }}
      />
      <div 
        className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-violet-500/15 to-fuchsia-500/10 rounded-3xl -z-20 blur-2xl"
        style={{
          transform: 'perspective(1200px) rotateY(-12deg) rotateX(6deg) translateZ(-50px)',
        }}
      />
    </div>
  );
};

export default DashboardPreview;
