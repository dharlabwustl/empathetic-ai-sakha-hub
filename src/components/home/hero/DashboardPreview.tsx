
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, BookOpen, Clock, TrendingUp, User, Brain, Target, Calendar } from 'lucide-react';

const DashboardPreview = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative"
    >
      {/* Dashboard Container */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-500">
        {/* Dashboard Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Welcome back, Priya!</h3>
                <p className="text-blue-100 text-sm">Ready for today's study plan?</p>
              </div>
            </div>
            <div className="text-white text-right">
              <div className="text-sm opacity-80">NEET 2025</div>
              <div className="text-xs opacity-60">142 days left</div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Progress Section */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800"
            >
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-700 dark:text-green-300">Overall Progress</span>
              </div>
              <div className="text-2xl font-bold text-green-800 dark:text-green-200">78%</div>
              <div className="w-full bg-green-200 dark:bg-green-800 rounded-full h-2 mt-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "78%" }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="bg-green-500 h-2 rounded-full"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800"
            >
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Study Streak</span>
              </div>
              <div className="text-2xl font-bold text-blue-800 dark:text-blue-200">15 days</div>
              <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">Personal best!</div>
            </motion.div>
          </div>

          {/* Today's Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-gray-600" />
              <h4 className="font-semibold text-gray-800 dark:text-gray-200">Today's Plan</h4>
            </div>
            
            {[
              { subject: "Physics", topic: "Electromagnetic Induction", time: "45 min", completed: true },
              { subject: "Chemistry", topic: "Organic Compounds", time: "30 min", completed: true },
              { subject: "Biology", topic: "Human Physiology", time: "40 min", completed: false }
            ].map((task, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  task.completed 
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                    : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    task.completed ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                  <div>
                    <div className="font-medium text-sm text-gray-800 dark:text-gray-200">
                      {task.subject}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {task.topic}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {task.time}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="grid grid-cols-3 gap-4"
          >
            {[
              { icon: <BookOpen className="w-4 h-4" />, value: "24", label: "Cards Studied" },
              { icon: <Clock className="w-4 h-4" />, value: "3.2h", label: "Study Time" },
              { icon: <TrendingUp className="w-4 h-4" />, value: "92%", label: "Accuracy" }
            ].map((stat, index) => (
              <div key={index} className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex justify-center mb-1 text-gray-600 dark:text-gray-400">
                  {stat.icon}
                </div>
                <div className="font-bold text-gray-800 dark:text-gray-200">{stat.value}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        className="absolute -top-4 -right-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg"
      >
        Live Preview
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.7 }}
        className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 rounded-xl shadow-lg"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">AI Assistant Active</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DashboardPreview;
