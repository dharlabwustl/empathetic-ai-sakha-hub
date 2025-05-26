
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, Sparkles, Zap, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DashboardPreview = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      id: 'dynamic-plans',
      title: 'AI-Powered Dynamic Study Plans',
      subtitle: 'Plans that evolve with your learning style',
      gradient: 'from-blue-500 via-purple-500 to-indigo-600',
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"></div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-5 w-5 text-blue-600" />
              <h4 className="font-semibold text-blue-900">Your AI Learning Profile</h4>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-700">Learning Style:</span>
                <span className="font-medium text-blue-900 bg-blue-100 px-2 py-1 rounded-full text-xs">Visual + Analytical</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-700">Optimal Pace:</span>
                <div className="w-20 h-2 bg-blue-200 rounded-full">
                  <div className="w-3/4 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-700">Peak Hours:</span>
                <span className="font-medium text-blue-900">🌅 Morning</span>
              </div>
            </div>
          </div>
          <motion.div 
            className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg border border-green-200"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <p className="text-sm text-green-800 flex items-center gap-2">
              <Zap className="h-4 w-4 text-green-600" />
              AI adjusts your plan in real-time based on performance
            </p>
          </motion.div>
        </div>
      )
    },
    {
      id: 'adaptive-daily',
      title: 'Smart Daily Adaptive Plans',
      subtitle: 'Every day perfectly tailored to your needs',
      gradient: 'from-purple-500 via-pink-500 to-rose-500',
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-3">Today's Personalized Schedule</h4>
            <div className="space-y-3">
              {[
                { subject: 'Physics: Newton\'s Laws', time: '30 min', color: 'purple', progress: 75 },
                { subject: 'Chemistry: Molecular Bonds', time: '25 min', color: 'blue', progress: 50 },
                { subject: 'Math: Algebra Practice', time: '20 min', color: 'green', progress: 90 }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center gap-3 p-2 bg-white rounded-lg shadow-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className={`w-3 h-3 bg-${item.color}-500 rounded-full animate-pulse`}></div>
                  <div className="flex-1">
                    <span className="text-sm font-medium text-gray-800">{item.subject}</span>
                    <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                      <div 
                        className={`bg-gradient-to-r from-${item.color}-400 to-${item.color}-600 h-1 rounded-full transition-all duration-1000`}
                        style={{width: `${item.progress}%`}}
                      ></div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-600">{item.time}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-3 rounded-lg border border-amber-200">
            <p className="text-sm text-amber-800 flex items-center gap-2">
              🎯 <span className="font-medium">Mood-Adapted:</span> Optimized for your focused state
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'concept-mastery',
      title: 'Multi-Modal Concept Mastery',
      subtitle: 'Learn through 3D visuals, videos, and AI summaries',
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: '🧊', label: '3D Models', color: 'blue' },
              { icon: '👁️', label: 'Visual Diagrams', color: 'green' },
              { icon: '🎥', label: 'Video Lessons', color: 'purple' },
              { icon: '🤖', label: 'AI Summaries', color: 'orange' }
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`bg-gradient-to-br from-${item.color}-50 to-${item.color}-100 p-4 rounded-xl text-center border border-${item.color}-200 relative overflow-hidden`}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <span className="text-xs font-semibold text-gray-700">{item.label}</span>
                <div className={`absolute inset-0 bg-gradient-to-r from-${item.color}-400/10 to-transparent rounded-xl`}></div>
              </motion.div>
            ))}
          </div>
          <motion.div 
            className="bg-gradient-to-r from-indigo-50 to-purple-50 p-3 rounded-xl border border-indigo-200"
            animate={{ boxShadow: ['0 0 0 0 rgba(99, 102, 241, 0)', '0 0 0 10px rgba(99, 102, 241, 0.1)', '0 0 0 0 rgba(99, 102, 241, 0)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <p className="text-sm text-indigo-800 flex items-center gap-2">
              💡 <span className="font-medium">Smart AI:</span> Chooses the best learning method for each concept
            </p>
          </motion.div>
        </div>
      )
    },
    {
      id: 'spaced-repetition',
      title: 'AI Spaced Repetition System',
      subtitle: 'Never forget with intelligent recall scheduling',
      gradient: 'from-rose-500 via-pink-500 to-purple-500',
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-4 rounded-xl border border-pink-200">
            <h4 className="font-semibold text-rose-900 mb-3 flex items-center gap-2">
              🧠 Smart Recall Schedule
            </h4>
            <div className="space-y-2">
              {[
                { topic: 'Thermodynamics', status: 'Due now', color: 'red', urgency: 'high' },
                { topic: 'Atomic Structure', status: 'In 2 days', color: 'blue', urgency: 'medium' },
                { topic: 'Kinematics', status: 'In 1 week', color: 'gray', urgency: 'low' }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex justify-between items-center p-2 bg-white rounded-lg shadow-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.15 }}
                >
                  <span className="text-sm font-medium text-gray-800">{item.topic}</span>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    item.urgency === 'high' ? 'bg-red-100 text-red-700' :
                    item.urgency === 'medium' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {item.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-3 rounded-lg border border-emerald-200">
            <p className="text-sm text-emerald-800 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="font-bold">98.5%</span> retention rate achieved with our system
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'exam-readiness',
      title: 'Real-Time Exam Readiness',
      subtitle: 'Track your preparation progress with AI insights',
      gradient: 'from-green-500 via-emerald-500 to-teal-500',
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-xl border border-emerald-200 relative">
            <div className="absolute top-2 right-2 text-2xl animate-bounce">🎯</div>
            <h4 className="font-semibold text-emerald-900 mb-3">Current Readiness Score</h4>
            <div className="text-center">
              <motion.div 
                className="text-4xl font-bold text-emerald-700 mb-1"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                87%
              </motion.div>
              <p className="text-sm text-emerald-600 font-medium">Ready for NEET 2024</p>
              <div className="w-full bg-emerald-200 rounded-full h-3 mt-3">
                <motion.div 
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '87%' }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                ></motion.div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
              <div className="font-medium text-green-700 text-sm mb-1">Strong Areas</div>
              <div className="text-green-600 text-xs">Physics • Math</div>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
              <div className="font-medium text-orange-700 text-sm mb-1">Focus Areas</div>
              <div className="text-orange-600 text-xs">Organic Chemistry</div>
            </div>
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
    <div className="relative flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        style={{ 
          width: '700px', 
          height: '500px',
          transform: 'perspective(1200px) rotateY(-5deg) rotateX(2deg)',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Animated background glow */}
        <motion.div 
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              'linear-gradient(45deg, #3b82f6, #8b5cf6)',
              'linear-gradient(45deg, #8b5cf6, #ec4899)',
              'linear-gradient(45deg, #ec4899, #10b981)',
              'linear-gradient(45deg, #10b981, #3b82f6)'
            ]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        {/* Enhanced browser header */}
        <div className="h-10 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center px-4 border-b border-gray-200 dark:border-gray-600 relative">
          <div className="flex space-x-2">
            <motion.div 
              className="w-3 h-3 bg-red-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div 
              className="w-3 h-3 bg-yellow-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            />
            <motion.div 
              className="w-3 h-3 bg-green-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
            />
          </div>
          <div className="ml-4 flex-1 text-sm text-gray-600 dark:text-gray-300 font-mono">
            student.prepzr.com/dashboard
          </div>
          <div className="flex items-center gap-1">
            <motion.div 
              className="w-2 h-2 bg-green-500 rounded-full"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-xs text-green-600">Live</span>
          </div>
        </div>

        {/* Enhanced dashboard content */}
        <div className="h-[calc(100%-2.5rem)] relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 300, rotateY: 90 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -300, rotateY: -90 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="h-full p-6"
            >
              {/* Slide header with gradient */}
              <div className="text-center space-y-3 mb-6">
                <motion.div
                  className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${slides[currentSlide].gradient} text-white text-sm font-medium shadow-lg`}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {slides[currentSlide].title}
                </motion.div>
                <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                  {slides[currentSlide].subtitle}
                </p>
              </div>
              
              <div className="max-h-80 overflow-y-auto">
                {slides[currentSlide].content}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Enhanced navigation controls */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            >
              {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg"
              onClick={nextSlide}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Enhanced slide indicators */}
          <div className="absolute bottom-4 left-4 flex space-x-2">
            {slides.map((slide, index) => (
              <motion.button
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'w-8 bg-gradient-to-r from-blue-500 to-purple-500' 
                    : 'w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                }`}
                onClick={() => setCurrentSlide(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Enhanced 3D effect shadows */}
      <div 
        className="absolute inset-0 rounded-3xl -z-10"
        style={{
          background: `linear-gradient(135deg, ${slides[currentSlide].gradient.replace('from-', '').replace('via-', '').replace('to-', '').split(' ').map(c => `var(--${c})`).join(', ')})`,
          transform: 'perspective(1200px) rotateY(-5deg) rotateX(2deg) translateZ(-30px)',
          filter: 'blur(25px)',
          opacity: 0.3
        }}
      />
    </div>
  );
};

export default DashboardPreview;
