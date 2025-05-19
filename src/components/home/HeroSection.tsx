
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              We Understand Your Mindset,
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
                Not Just The Exam
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl">
              Our emotionally intelligent platform adapts to your unique learning style, creating a personalized 
              study experience that traditional coaching centers can't match.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => navigate('/signup')}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Start Your Journey
              </Button>
              <Button 
                onClick={() => navigate('/free-trial')}
                variant="outline"
                className="border-purple-500 text-purple-600 dark:text-purple-400 dark:border-purple-400 px-8 py-6 rounded-lg text-lg hover:bg-purple-50 dark:hover:bg-purple-900/20"
              >
                Try For Free
              </Button>
            </div>
          </motion.div>
          
          {/* Right side - Animated avatar journey visualization */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative h-[400px] md:h-[500px]"
          >
            <div className="absolute w-full h-full">
              {/* Journey Path */}
              <svg className="absolute w-full h-full" viewBox="0 0 500 500" preserveAspectRatio="xMidYMid meet">
                <path 
                  d="M50,250 Q125,100 250,250 Q375,400 450,250" 
                  fill="none" 
                  stroke="url(#gradient)" 
                  strokeWidth="4" 
                  strokeDasharray="10,5"
                  className="path-animation"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#9b87f5" />
                    <stop offset="100%" stopColor="#7dd3fc" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Student Avatar - Starting position */}
              <motion.div 
                className="absolute left-0 top-[45%] w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg"
                initial={{ x: 50, y: 250 }}
                animate={{ 
                  x: [50, 125, 250, 375, 450], 
                  y: [250, 100, 250, 400, 250] 
                }}
                transition={{ 
                  duration: 8, 
                  times: [0, 0.25, 0.5, 0.75, 1],
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <span className="text-2xl font-bold text-white">👤</span>
              </motion.div>
              
              {/* Journey Milestones */}
              <div className="absolute left-[10%] top-[50%] transform -translate-y-1/2">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md">
                  <p className="font-medium">Starting Point</p>
                </div>
              </div>
              
              <div className="absolute left-[25%] top-[20%] transform -translate-y-1/2">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md">
                  <p className="font-medium">Learning Concepts</p>
                </div>
              </div>
              
              <div className="absolute left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md">
                  <p className="font-medium">Practice &amp; Mastery</p>
                </div>
              </div>
              
              <div className="absolute left-[75%] top-[80%] transform -translate-y-1/2">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md">
                  <p className="font-medium">Exam Simulation</p>
                </div>
              </div>
              
              <div className="absolute left-[90%] top-[50%] transform -translate-y-1/2">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md">
                  <p className="font-medium">Success!</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Student statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">94%</p>
            <p className="text-gray-600 dark:text-gray-300">Pass Rate</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">5x</p>
            <p className="text-gray-600 dark:text-gray-300">Learning Speed</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">87%</p>
            <p className="text-gray-600 dark:text-gray-300">Stress Reduction</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">25K+</p>
            <p className="text-gray-600 dark:text-gray-300">Students</p>
          </div>
        </motion.div>
      </div>
      
      <style jsx>{`
        .path-animation {
          stroke-dashoffset: 1000;
          animation: dash 15s linear infinite;
        }
        
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
