
import React from 'react';
import { motion } from 'framer-motion';

const HeroDashboard = () => {
  return (
    <motion.div
      className="relative w-full max-w-3xl mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {/* Dashboard frame */}
      <div className="relative rounded-2xl bg-gradient-to-r from-gray-800 to-gray-900 p-1 shadow-2xl border border-blue-500/20">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-t-xl p-2 flex items-center">
          <div className="flex gap-1.5 ml-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex-1 text-center">
            <div className="text-xs text-gray-400 font-mono">PREPZR Dashboard</div>
          </div>
        </div>
        
        {/* Dashboard content */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950 rounded-b-xl overflow-hidden">
          <img 
            src="/lovable-uploads/c160b4d6-0d19-4442-9def-5dabcfbe1bd7.png" 
            alt="Student Dashboard" 
            className="w-full h-auto" 
            style={{ minHeight: "480px", objectFit: "cover" }}
          />
        </div>
      </div>
      
      {/* Animated elements */}
      <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500 rounded-full opacity-75 blur-md animate-pulse"></div>
      <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-purple-500 rounded-full opacity-75 blur-md animate-pulse"></div>
      
      {/* Floating metrics */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute -left-5 top-20 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 border border-blue-200 dark:border-blue-800 transform -rotate-3"
      >
        <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">Exam Readiness</div>
        <div className="text-xl font-bold text-blue-600 dark:text-blue-400">78%</div>
        <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mt-1">
          <div className="h-full bg-blue-500 rounded-full" style={{ width: '78%' }}></div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.5 }}
        className="absolute right-8 bottom-28 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 border border-green-200 dark:border-green-800 transform rotate-2"
      >
        <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">Daily Progress</div>
        <div className="text-xl font-bold text-green-600 dark:text-green-400">+12%</div>
        <svg className="w-16 h-8" viewBox="0 0 100 30">
          <path 
            d="M0,30 L10,25 L20,28 L30,20 L40,15 L50,18 L60,10 L70,15 L80,5 L90,8 L100,0" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            className="text-green-500"
          />
        </svg>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute -right-4 top-1/4 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 border border-purple-200 dark:border-purple-800 transform rotate-3"
      >
        <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">Study Streak</div>
        <div className="flex items-center gap-1">
          <div className="text-xl font-bold text-purple-600 dark:text-purple-400">7</div>
          <div className="text-xs text-purple-500">days</div>
        </div>
        <div className="flex gap-0.5 mt-1">
          {[...Array(7)].map((_, i) => (
            <div 
              key={i} 
              className="w-3 h-3 rounded-full bg-purple-500"
              style={{ opacity: (i + 3) / 10 + 0.5 }}
            ></div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HeroDashboard;
