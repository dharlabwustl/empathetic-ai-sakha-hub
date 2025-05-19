
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Brain } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
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
                asChild
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-6 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all"
              >
                <Link to="/free-trial" className="flex items-center gap-2">
                  <Sparkles size={20} className="text-yellow-300" />
                  <span>7 Days Free Trial</span>
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline"
                className="border-purple-500 text-purple-600 dark:text-purple-400 dark:border-purple-400 px-6 py-6 rounded-lg text-lg hover:bg-purple-50 dark:hover:bg-purple-900/20"
              >
                <Link to="/exam-readiness" className="flex items-center gap-2">
                  <Brain size={20} />
                  <span>Test Your Exam Readiness</span>
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
          </motion.div>
          
          {/* Right side - Student avatar journey animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative h-[400px] md:h-[500px] bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-2xl overflow-hidden"
          >
            {/* Student Journey Map */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-full h-full max-w-[90%] max-h-[90%]" viewBox="0 0 500 400" preserveAspectRatio="xMidYMid meet">
                {/* Journey Path */}
                <path 
                  d="M50,200 Q125,100 250,200 Q375,300 450,200" 
                  fill="none" 
                  stroke="url(#gradient)" 
                  strokeWidth="6" 
                  strokeLinecap="round"
                  strokeDasharray="12,6"
                  className="path-animation"
                />
                
                {/* Milestones dots */}
                <circle cx="50" cy="200" r="8" fill="#6d28d9" />
                <circle cx="150" cy="120" r="8" fill="#6d28d9" />
                <circle cx="250" cy="200" r="8" fill="#6d28d9" />
                <circle cx="350" cy="280" r="8" fill="#6d28d9" />
                <circle cx="450" cy="200" r="8" fill="#6d28d9" />
                
                {/* Milestone glow effects */}
                <circle cx="50" cy="200" r="12" fill="#6d28d9" fillOpacity="0.3" />
                <circle cx="150" cy="120" r="12" fill="#6d28d9" fillOpacity="0.3" />
                <circle cx="250" cy="200" r="12" fill="#6d28d9" fillOpacity="0.3" />
                <circle cx="350" cy="280" r="12" fill="#6d28d9" fillOpacity="0.3" />
                <circle cx="450" cy="200" r="12" fill="#6d28d9" fillOpacity="0.3" />
                
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#9b87f5" />
                    <stop offset="100%" stopColor="#7dd3fc" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Student Milestone Labels */}
              <div className="absolute left-[10%] top-[50%] transform -translate-y-1/2">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md">
                  <p className="font-medium">Starting Point</p>
                </div>
              </div>
              
              <div className="absolute left-[30%] top-[30%] transform -translate-y-1/2">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md">
                  <p className="font-medium">Learning Concepts</p>
                </div>
              </div>
              
              <div className="absolute left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md">
                  <p className="font-medium">Practice &amp; Mastery</p>
                </div>
              </div>
              
              <div className="absolute left-[70%] top-[70%] transform -translate-y-1/2">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md">
                  <p className="font-medium">Exam Simulation</p>
                </div>
              </div>
              
              <div className="absolute left-[90%] top-[50%] transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md">
                  <p className="font-medium">Success!</p>
                </div>
              </div>
            </div>
            
            {/* Animated Student Avatar */}
            <motion.div
              className="absolute w-16 h-16 z-10"
              initial={{ x: 50, y: 200 }}
              animate={{ 
                x: [50, 150, 250, 350, 450],
                y: [200, 120, 200, 280, 200],
                scale: [1, 1.1, 1, 1.1, 1.2],
              }}
              transition={{ 
                duration: 10, 
                times: [0, 0.25, 0.5, 0.75, 1],
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-indigo-600 to-blue-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-gray-800">
                <div className="text-white font-bold text-2xl">👤</div>
              </div>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-3 bg-black/20 rounded-full filter blur-sm"></div>
            </motion.div>
            
            {/* Animated Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Academic symbols floating animation */}
              <motion.div 
                className="absolute text-3xl"
                initial={{ x: "10%", y: "20%", opacity: 0.7 }}
                animate={{ x: "15%", y: "25%", opacity: 0.9 }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
              >
                📚
              </motion.div>
              <motion.div 
                className="absolute text-3xl"
                initial={{ x: "70%", y: "30%", opacity: 0.7 }}
                animate={{ x: "75%", y: "35%", opacity: 0.9 }}
                transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
              >
                🔬
              </motion.div>
              <motion.div 
                className="absolute text-3xl"
                initial={{ x: "60%", y: "70%", opacity: 0.7 }}
                animate={{ x: "65%", y: "65%", opacity: 0.9 }}
                transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
              >
                🎯
              </motion.div>
              <motion.div 
                className="absolute text-3xl"
                initial={{ x: "30%", y: "80%", opacity: 0.7 }}
                animate={{ x: "25%", y: "75%", opacity: 0.9 }}
                transition={{ duration: 3.5, repeat: Infinity, repeatType: "reverse" }}
              >
                🧠
              </motion.div>
              <motion.div 
                className="absolute text-3xl"
                initial={{ x: "40%", y: "15%", opacity: 0.7 }}
                animate={{ x: "35%", y: "20%", opacity: 0.9 }}
                transition={{ duration: 5.5, repeat: Infinity, repeatType: "reverse" }}
              >
                🏆
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Student statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
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
