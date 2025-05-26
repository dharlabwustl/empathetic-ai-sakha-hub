
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, BarChart3, TrendingUp, Activity } from 'lucide-react';
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
            className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h4 
              className="font-medium text-blue-900"
              animate={{ color: ['#1e3a8a', '#3b82f6', '#1e3a8a'] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Your Learning Profile
            </motion.h4>
            <div className="mt-2 space-y-2">
              {[
                { label: 'Learning Style:', value: 'Visual + Analytical' },
                { label: 'Pace:', value: 'Moderate' },
                { label: 'Best Study Time:', value: 'Morning' }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex justify-between text-sm"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <span>{item.label}</span>
                  <motion.span 
                    className="font-medium"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  >
                    {item.value}
                  </motion.span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div 
            className="bg-green-50 p-3 rounded-lg"
            animate={{ 
              backgroundColor: ['rgb(240 253 244)', 'rgb(220 252 231)', 'rgb(240 253 244)'],
              scale: [1, 1.02, 1]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <p className="text-sm text-green-800">✓ Plan automatically adjusts based on your performance</p>
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
            className="bg-purple-50 p-3 rounded-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h4 className="font-medium text-purple-900">Today's Schedule</h4>
            <div className="mt-2 space-y-2 text-sm">
              {[
                { subject: 'Physics: Newton\'s Laws', time: '30 min', color: 'purple' },
                { subject: 'Chemistry: Bonds', time: '25 min', color: 'blue' },
                { subject: 'Math: Algebra Practice', time: '20 min', color: 'green' }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center gap-2"
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <motion.div 
                    className={`w-2 h-2 bg-${item.color}-500 rounded-full`}
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                  />
                  <span>{item.subject} ({item.time})</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div 
            className="bg-amber-50 p-3 rounded-lg"
            animate={{ 
              boxShadow: ['0 0 0 rgba(245, 158, 11, 0)', '0 0 20px rgba(245, 158, 11, 0.3)', '0 0 0 rgba(245, 158, 11, 0)']
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <p className="text-sm text-amber-800">🎯 Adjusted for your current mood: Focused</p>
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
          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: '🧊', label: '3D Models', color: 'blue' },
              { icon: '👁️', label: 'Visual Diagrams', color: 'green' },
              { icon: '🎥', label: 'Video Lessons', color: 'purple' },
              { icon: '📝', label: 'Smart Summaries', color: 'orange' }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className={`bg-${item.color}-50 p-3 rounded text-center`}
                whileHover={{ scale: 1.05 }}
                animate={{ 
                  y: [0, -5, 0],
                  rotate: [0, 2, 0, -2, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  delay: index * 0.5 
                }}
              >
                <motion.div 
                  className="text-2xl mb-1"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                >
                  {item.icon}
                </motion.div>
                <span className="text-xs font-medium">{item.label}</span>
              </motion.div>
            ))}
          </div>
          <motion.div 
            className="bg-gradient-to-r from-indigo-50 to-purple-50 p-3 rounded-lg"
            animate={{ 
              background: [
                'linear-gradient(to right, rgb(238 242 255), rgb(250 245 255))',
                'linear-gradient(to right, rgb(224 231 255), rgb(243 232 255))',
                'linear-gradient(to right, rgb(238 242 255), rgb(250 245 255))'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <p className="text-sm text-indigo-800">💡 AI chooses the best method for each concept</p>
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
            className="bg-gradient-to-r from-pink-50 to-rose-50 p-3 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h4 className="font-medium text-rose-900">Recall Schedule</h4>
            <div className="mt-2 space-y-1 text-sm">
              {[
                { topic: 'Thermodynamics', status: 'Due now', color: 'green' },
                { topic: 'Atomic Structure', status: 'In 2 days', color: 'blue' },
                { topic: 'Kinematics', status: 'In 1 week', color: 'gray' }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex justify-between"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <span>{item.topic}</span>
                  <motion.span 
                    className={`text-${item.color}-600 font-medium`}
                    animate={item.color === 'green' ? { 
                      scale: [1, 1.1, 1],
                      color: ['rgb(22 163 74)', 'rgb(34 197 94)', 'rgb(22 163 74)']
                    } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {item.status}
                  </motion.span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div 
            className="bg-emerald-50 p-3 rounded-lg"
            animate={{ 
              scale: [1, 1.02, 1],
              backgroundColor: ['rgb(236 253 245)', 'rgb(209 250 229)', 'rgb(236 253 245)']
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <p className="text-sm text-emerald-800">🧠 98% retention rate achieved</p>
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
            className="bg-slate-50 p-3 rounded-lg border"
            whileHover={{ scale: 1.02 }}
          >
            <h4 className="font-medium text-slate-900">Current Formula</h4>
            <div className="mt-2 text-center">
              <motion.div 
                className="text-lg font-mono bg-white p-2 rounded border"
                animate={{ 
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    '0 1px 3px rgba(0,0,0,0.1)',
                    '0 4px 6px rgba(0,0,0,0.15)',
                    '0 1px 3px rgba(0,0,0,0.1)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                F = ma
              </motion.div>
              <p className="text-sm text-gray-600 mt-1">Newton's Second Law</p>
            </div>
          </motion.div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            {[
              { label: 'Practiced', value: '25', color: 'blue' },
              { label: 'Accuracy', value: '92%', color: 'green' },
              { label: 'Time', value: '12m', color: 'purple' }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className={`bg-${stat.color}-50 p-2 rounded text-center`}
                animate={{ 
                  y: [0, -3, 0],
                  scale: [1, 1.02, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: index * 0.4 
                }}
              >
                <motion.div 
                  className={`font-bold text-${stat.color}-700`}
                  animate={{ 
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                >
                  {stat.value}
                </motion.div>
                <div className={`text-${stat.color}-600`}>{stat.label}</div>
              </motion.div>
            ))}
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
          <motion.div 
            className="bg-indigo-50 p-3 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h4 className="font-medium text-indigo-900">Latest Test Results</h4>
            <div className="mt-2 space-y-2">
              {[
                { test: 'Physics Mock Test #15', score: '85%', color: 'green' },
                { test: 'Chemistry Practice Set', score: '78%', color: 'blue' }
              ].map((result, index) => (
                <motion.div 
                  key={index}
                  className="flex justify-between text-sm"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <span>{result.test}</span>
                  <motion.span 
                    className={`font-medium text-${result.color}-600`}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                  >
                    {result.score}
                  </motion.span>
                </motion.div>
              ))}
              <motion.div 
                className="w-full bg-gray-200 rounded-full h-2 mt-2"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <motion.div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '82%' }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                />
              </motion.div>
              <motion.p 
                className="text-xs text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                Overall Progress: 82%
              </motion.p>
            </div>
          </motion.div>
        </div>
      )
    },
    {
      id: 'exam-readiness',
      title: 'Daily Exam Readiness',
      subtitle: 'Track your preparation progress every single day',
      content: (
        <div className="space-y-3">
          <motion.div 
            className="bg-gradient-to-r from-emerald-50 to-teal-50 p-3 rounded-lg"
            animate={{
              background: [
                'linear-gradient(to right, rgb(236 253 245), rgb(240 253 250))',
                'linear-gradient(to right, rgb(209 250 229), rgb(204 251 241))',
                'linear-gradient(to right, rgb(236 253 245), rgb(240 253 250))'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <h4 className="font-medium text-emerald-900">Readiness Score</h4>
            <div className="mt-2 text-center">
              <motion.div 
                className="text-3xl font-bold text-emerald-700"
                animate={{ 
                  scale: [1, 1.1, 1],
                  color: ['rgb(4 120 87)', 'rgb(34 197 94)', 'rgb(4 120 87)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                87%
              </motion.div>
              <p className="text-sm text-emerald-600">Ready for NEET</p>
            </div>
          </motion.div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <motion.div 
              className="bg-green-50 p-2 rounded"
              whileHover={{ scale: 1.05 }}
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="font-medium text-green-700">Strong Areas</div>
              <div className="text-green-600">Physics, Math</div>
            </motion.div>
            <motion.div 
              className="bg-orange-50 p-2 rounded"
              whileHover={{ scale: 1.05 }}
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              <div className="font-medium text-orange-700">Focus Areas</div>
              <div className="text-orange-600">Organic Chemistry</div>
            </motion.div>
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
          <motion.div 
            className="bg-gradient-to-r from-yellow-50 to-amber-50 p-3 rounded-lg"
            animate={{
              background: [
                'linear-gradient(to right, rgb(254 249 195), rgb(254 243 199))',
                'linear-gradient(to right, rgb(254 240 138), rgb(253 230 138))',
                'linear-gradient(to right, rgb(254 249 195), rgb(254 243 199))'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <h4 className="font-medium text-amber-900">Champion Stats</h4>
            <div className="mt-2 grid grid-cols-2 gap-3 text-sm">
              <motion.div 
                className="text-center"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div 
                  className="text-xl font-bold text-amber-700"
                  animate={{ rotate: [0, 10, 0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  🏆
                </motion.div>
                <div className="font-medium">Rank 1</div>
                <div className="text-xs text-amber-600">Mock Tests</div>
              </motion.div>
              <motion.div 
                className="text-center"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <motion.div 
                  className="text-xl font-bold text-amber-700"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ⚡
                </motion.div>
                <div className="font-medium">15 Day</div>
                <div className="text-xs text-amber-600">Study Streak</div>
              </motion.div>
            </div>
          </motion.div>
          <motion.div 
            className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg"
            animate={{
              scale: [1, 1.02, 1],
              boxShadow: [
                '0 1px 3px rgba(0,0,0,0.1)',
                '0 4px 12px rgba(168, 85, 247, 0.15)',
                '0 1px 3px rgba(0,0,0,0.1)'
              ]
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <p className="text-sm text-purple-800 text-center">
              "Achieved 95%ile in NEET with PREPZR!" - Arjun K.
            </p>
          </motion.div>
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
        {/* Enhanced 3D container with animated gradients */}
        <motion.div 
          className="relative w-full h-full bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-950/30 dark:to-purple-950/30 rounded-3xl shadow-2xl border-2 border-transparent bg-clip-padding"
          animate={{
            boxShadow: [
              '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              '0 25px 50px -12px rgba(59, 130, 246, 0.15)',
              '0 25px 50px -12px rgba(147, 51, 234, 0.15)',
              '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            ]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          {/* Animated gradient border effect */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl opacity-20 blur-sm -z-10"
            animate={{
              background: [
                'linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899)',
                'linear-gradient(to right, #06b6d4, #3b82f6, #8b5cf6)',
                'linear-gradient(to right, #8b5cf6, #ec4899, #06b6d4)',
                'linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899)'
              ]
            }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          
          {/* Enhanced browser header with animated elements */}
          <motion.div 
            className="h-8 bg-gradient-to-r from-gray-100 via-blue-50 to-purple-50 dark:from-gray-800 dark:via-blue-900/50 dark:to-purple-900/50 flex items-center px-4 border-b border-gradient-to-r from-blue-200 to-purple-200 dark:border-gradient-to-r dark:from-blue-700 dark:to-purple-700 rounded-t-3xl"
            animate={{
              background: [
                'linear-gradient(to right, rgb(243 244 246), rgb(239 246 255), rgb(250 245 255))',
                'linear-gradient(to right, rgb(239 246 255), rgb(224 231 255), rgb(243 232 255))',
                'linear-gradient(to right, rgb(243 244 246), rgb(239 246 255), rgb(250 245 255))'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="flex space-x-2">
              {['red', 'yellow', 'green'].map((color, index) => (
                <motion.div 
                  key={color}
                  className={`w-3 h-3 bg-gradient-to-r from-${color}-400 to-${color}-500 rounded-full shadow-lg`}
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    delay: index * 0.3 
                  }}
                />
              ))}
            </div>
            <motion.div 
              className="ml-4 flex-1 text-xs bg-gradient-to-r from-gray-500 to-blue-600 bg-clip-text text-transparent font-medium"
              animate={{
                background: [
                  'linear-gradient(to right, #6b7280, #2563eb)',
                  'linear-gradient(to right, #2563eb, #8b5cf6)',
                  'linear-gradient(to right, #6b7280, #2563eb)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              student.prepzr.com/dashboard
            </motion.div>
          </motion.div>

          {/* Enhanced dashboard content with smooth transitions */}
          <div className="h-[calc(100%-2rem)] relative overflow-hidden bg-gradient-to-br from-white/80 via-blue-50/50 to-purple-50/50 dark:from-gray-900/80 dark:via-blue-950/50 dark:to-purple-950/50 rounded-b-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 300, rotateY: 90 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -300, rotateY: -90 }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.645, 0.045, 0.355, 1.000]
                }}
                className="h-full p-6"
              >
                <div className="space-y-4">
                  <motion.div 
                    className="text-center space-y-2"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <motion.h3 
                      className="text-xl font-bold bg-gradient-to-r from-gray-900 via-blue-700 to-purple-700 bg-clip-text text-transparent dark:from-white dark:via-blue-300 dark:to-purple-300"
                      animate={{
                        background: [
                          'linear-gradient(to right, #111827, #1d4ed8, #7c3aed)',
                          'linear-gradient(to right, #1d4ed8, #7c3aed, #ec4899)',
                          'linear-gradient(to right, #111827, #1d4ed8, #7c3aed)'
                        ]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      {slides[currentSlide].title}
                    </motion.h3>
                    <motion.p 
                      className="text-sm bg-gradient-to-r from-gray-600 to-blue-600 bg-clip-text text-transparent dark:from-gray-400 dark:to-blue-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {slides[currentSlide].subtitle}
                    </motion.p>
                  </motion.div>
                  
                  <motion.div 
                    className="mt-6"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {slides[currentSlide].content}
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Enhanced navigation controls with glowing effects */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              {[
                { action: prevSlide, icon: ChevronLeft, gradient: 'from-blue-500/10 to-purple-500/10', border: 'border-blue-300', iconColor: 'text-blue-600' },
                { action: () => setIsAutoPlaying(!isAutoPlaying), icon: isAutoPlaying ? Pause : Play, gradient: 'from-purple-500/10 to-pink-500/10', border: 'border-purple-300', iconColor: 'text-purple-600' },
                { action: nextSlide, icon: ChevronRight, gradient: 'from-pink-500/10 to-red-500/10', border: 'border-pink-300', iconColor: 'text-pink-600' }
              ].map((btn, index) => (
                <motion.div key={index}>
                  <Button
                    variant="outline"
                    size="icon"
                    className={`h-8 w-8 bg-gradient-to-r ${btn.gradient} ${btn.border} hover:scale-110 shadow-lg backdrop-blur-sm`}
                    onClick={btn.action}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <btn.icon className={`h-4 w-4 ${btn.iconColor}`} />
                  </Button>
                </motion.div>
              ))}
            </div>

            {/* Enhanced slide indicators with pulsing effects */}
            <div className="absolute bottom-4 left-4 flex space-x-2">
              {slides.map((_, index) => (
                <motion.button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 shadow-lg ${
                    index === currentSlide 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-125 shadow-blue-300' 
                      : 'bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 hover:from-blue-300 hover:to-purple-300'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                  animate={index === currentSlide ? {
                    scale: [1.25, 1.4, 1.25],
                    boxShadow: [
                      '0 0 0 rgba(59, 130, 246, 0.5)',
                      '0 0 10px rgba(59, 130, 246, 0.8)',
                      '0 0 0 rgba(59, 130, 246, 0.5)'
                    ]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                  whileHover={{ scale: 1.3 }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Enhanced 3D shadow effects with animated colors */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/25 to-pink-500/20 rounded-3xl -z-10 blur-xl"
        style={{
          transform: 'perspective(1200px) rotateY(-12deg) rotateX(6deg) translateZ(-30px)',
        }}
        animate={{
          background: [
            'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.25), rgba(236, 72, 153, 0.2))',
            'linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(59, 130, 246, 0.25), rgba(147, 51, 234, 0.2))',
            'linear-gradient(135deg, rgba(147, 51, 234, 0.3), rgba(236, 72, 153, 0.25), rgba(6, 182, 212, 0.2))',
            'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.25), rgba(236, 72, 153, 0.2))'
          ]
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />
    </div>
  );
};

export default DashboardPreview;
