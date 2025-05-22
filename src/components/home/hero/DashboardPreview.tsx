
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const DashboardPreview = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full max-w-md relative mb-8 rounded-2xl shadow-xl overflow-hidden border border-indigo-100 dark:border-indigo-900"
    >
      {/* Dashboard Preview Header */}
      <div className="h-10 bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-white text-xs font-medium">PREPZR Dashboard</div>
        <div className="text-xs text-white opacity-70">Student View</div>
      </div>
      
      {/* Dashboard Preview Content */}
      <div className="bg-white dark:bg-gray-900 p-3">
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="bg-indigo-50 dark:bg-indigo-900/30 h-20 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-indigo-600 dark:text-indigo-400 font-bold text-lg">86%</div>
              <div className="text-gray-500 dark:text-gray-400 text-xs">Progress</div>
            </div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/30 h-20 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-purple-600 dark:text-purple-400 font-bold text-lg">142</div>
              <div className="text-gray-500 dark:text-gray-400 text-xs">Problems</div>
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/30 h-20 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-blue-600 dark:text-blue-400 font-bold text-lg">12</div>
              <div className="text-gray-500 dark:text-gray-400 text-xs">Days Left</div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          <div className="h-4 w-4 bg-green-500 rounded-full flex items-center justify-center">
            <div className="h-2 w-2 bg-white rounded-full"></div>
          </div>
          <div className="text-sm font-medium">Today's Progress</div>
        </div>
        
        <div className="space-y-2 mb-3">
          <div className="bg-gray-100 dark:bg-gray-800 h-4 rounded-md w-full flex">
            <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-md" style={{ width: '65%' }}></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Physics: 65%</span>
            <span>4 hours today</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-xs bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded-full flex items-center">
            <Sparkles className="h-3 w-3 mr-1" />
            <span>Adaptive Learning</span>
          </div>
          
          <div className="text-xs bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full">
            AI Tutor
          </div>
        </div>
      </div>
      
      {/* Premium Badge overlay */}
      <motion.div
        className="absolute -top-1 -right-1"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
      >
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-xs text-white px-3 py-1 rounded-lg shadow-lg transform rotate-12">
          PREMIUM
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DashboardPreview;
