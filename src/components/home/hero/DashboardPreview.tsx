
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, Activity, BookOpen, Zap, Brain } from 'lucide-react';

interface DashboardPreviewProps {
  activeFeature: number;
  setActiveFeature: (index: number) => void;
}

const features = [
  {
    id: "smart-dashboard",
    title: "Smart Dashboard",
    description: "AI-driven analytics of your performance and personalized recommendations",
    icon: Activity,
    color: "bg-blue-500"
  },
  {
    id: "adaptive-plan",
    title: "Adaptive Study Plan",
    description: "Adjusts to your learning pace and optimizes study sessions",
    icon: Calendar,
    color: "bg-indigo-500"
  },
  {
    id: "flashcard-recall",
    title: "Flashcard Recall",
    description: "Spaced repetition system for maximum knowledge retention",
    icon: Brain,
    color: "bg-violet-500"
  },
  {
    id: "formula-practice",
    title: "Formula Practice",
    description: "Interactive formula drills with context-based applications",
    icon: Zap,
    color: "bg-blue-500"
  },
  {
    id: "syllabus-tracker",
    title: "Syllabus Integration",
    description: "Complete tracking of syllabus coverage and mastery level",
    icon: BookOpen,
    color: "bg-indigo-500"
  }
];

const DashboardPreview: React.FC<DashboardPreviewProps> = ({ activeFeature, setActiveFeature }) => {
  const [progress, setProgress] = useState(0);
  const [examReadiness, setExamReadiness] = useState(40);
  
  // Animate progress when active feature changes
  useEffect(() => {
    setProgress(0);
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 50);
    
    return () => clearInterval(timer);
  }, [activeFeature]);
  
  // Increase exam readiness over time
  useEffect(() => {
    if (examReadiness < 78) {
      const interval = setInterval(() => {
        setExamReadiness(prev => Math.min(prev + 1, 78));
      }, 300);
      
      return () => clearInterval(interval);
    }
  }, [examReadiness]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="w-full lg:w-1/2 mt-8 lg:mt-0"
    >
      <div className="relative perspective-1000">
        {/* Dashboard Card */}
        <motion.div
          className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden relative border border-blue-200 dark:border-blue-800/30 preserve-3d"
          animate={{
            rotateX: [-1, 1, -1],
            rotateY: [-1, 2, -1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 text-white flex justify-between items-center">
            <h3 className="font-bold text-lg">Student Dashboard</h3>
            <div className="flex items-center gap-2">
              <motion.div
                className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
              >
                <span className="text-xs font-bold">?</span>
              </motion.div>
              <motion.div 
                className="avatar-glow w-10 h-10 rounded-full bg-white/90 flex items-center justify-center"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1601412436009-d964bd02edbc?auto=format&fit=crop&w=100&h=100" 
                  alt="Student Avatar" 
                  className="w-9 h-9 rounded-full object-cover"
                />
              </motion.div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="p-4 h-[340px] md:h-[400px]">
            {/* Exam Readiness Score */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-gray-700 dark:text-gray-300">Exam Readiness Score</h4>
                <motion.span 
                  className="text-xl font-bold text-blue-600 dark:text-blue-400"
                  animate={{ scale: examReadiness > 74 ? [1, 1.1, 1] : 1 }}
                  transition={{ duration: 1, repeat: examReadiness > 74 ? 1 : 0 }}
                >
                  {examReadiness}%
                </motion.span>
              </div>
              <div className="w-full h-3 bg-blue-100 dark:bg-blue-900/30 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                  style={{ width: `${examReadiness}%` }}
                  animate={{ 
                    backgroundColor: examReadiness > 74 ? ['#3B82F6', '#10B981', '#3B82F6'] : undefined
                  }}
                  transition={{ duration: 2, repeat: examReadiness > 74 ? Infinity : 0 }}
                ></motion.div>
              </div>
              {examReadiness > 74 && (
                <motion.div 
                  className="mt-1 text-xs text-green-500 flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <CheckCircle className="w-3 h-3 mr-1" />
                  You're making excellent progress!
                </motion.div>
              )}
            </div>
            
            {/* Feature Showcase */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
              <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-2">{features[activeFeature].title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{features[activeFeature].description}</p>
              
              {/* Feature-specific content */}
              <div className="min-h-[150px]">
                {activeFeature === 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    <motion.div 
                      className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="text-xs text-gray-500 dark:text-gray-400">Attention Score</div>
                      <div className="text-lg font-bold text-blue-600 dark:text-blue-400">87%</div>
                      <div className="text-xs text-green-500 flex items-center">
                        <span className="text-xs mr-1">↑</span> 4% this week
                      </div>
                    </motion.div>
                    <motion.div 
                      className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="text-xs text-gray-500 dark:text-gray-400">Retention Rate</div>
                      <div className="text-lg font-bold text-blue-600 dark:text-blue-400">73%</div>
                      <div className="text-xs text-green-500 flex items-center">
                        <span className="text-xs mr-1">↑</span> 7% this week
                      </div>
                    </motion.div>
                    <motion.div 
                      className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="text-xs text-gray-500 dark:text-gray-400">Study Streak</div>
                      <div className="text-lg font-bold text-amber-500">12 days</div>
                    </motion.div>
                    <motion.div 
                      className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="text-xs text-gray-500 dark:text-gray-400">Focus Time</div>
                      <div className="text-lg font-bold text-indigo-500">3.4 hrs</div>
                    </motion.div>
                  </div>
                )}
                
                {activeFeature === 1 && (
                  <div>
                    <motion.div 
                      className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded-lg mb-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="w-2 h-10 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">Physics: Optics</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Today, 10:30 AM • 45 min</div>
                      </div>
                      <div className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs rounded-full">High Priority</div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded-lg mb-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="w-2 h-10 bg-indigo-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">Chemistry: Organic Compounds</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Today, 2:00 PM • 60 min</div>
                      </div>
                      <div className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs rounded-full">Medium</div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded-lg"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="w-2 h-10 bg-violet-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">Biology: Cell Division</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Today, 4:30 PM • 50 min</div>
                      </div>
                      <div className="px-2 py-1 bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300 text-xs rounded-full">Review</div>
                    </motion.div>
                  </div>
                )}
                
                {activeFeature === 2 && (
                  <div>
                    <div className="flex justify-between mb-3">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Today's Recall Progress</span>
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">24/30</span>
                    </div>
                    
                    <motion.div
                      className="relative perspective-500 h-32 mb-2"
                      initial={{ rotateY: 0 }}
                      animate={{ rotateY: [0, 10, 0, -10, 0] }}
                      transition={{ duration: 5, repeat: Infinity, repeatType: "loop" }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white p-4 shadow-lg">
                        <div className="text-center">
                          <div className="text-lg font-bold">Mitochondria</div>
                          <div className="text-xs opacity-70">(tap to reveal answer)</div>
                        </div>
                      </div>
                    </motion.div>
                    
                    <div className="flex justify-between">
                      <motion.button 
                        className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Need Review
                      </motion.button>
                      
                      <motion.button 
                        className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-sm rounded-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Got It!
                      </motion.button>
                    </div>
                  </div>
                )}
                
                {activeFeature === 3 && (
                  <div>
                    <motion.div 
                      className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm mb-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-sm font-medium">Physics Formula</div>
                        <div className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">Advanced</div>
                      </div>
                      <div className="text-lg font-bold mb-1 text-center">F = ma</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 text-center mb-2">Force equals mass times acceleration</div>
                      <div className="flex justify-center gap-4">
                        <motion.div 
                          className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 cursor-pointer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className="text-lg">F</span>
                        </motion.div>
                        <motion.div 
                          className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 cursor-pointer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className="text-lg">m</span>
                        </motion.div>
                        <motion.div 
                          className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 cursor-pointer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className="text-lg">a</span>
                        </motion.div>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-center text-xs text-gray-500 dark:text-gray-400"
                    >
                      Practice with interactive problems and derivations
                    </motion.div>
                  </div>
                )}
                
                {activeFeature === 4 && (
                  <div>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <motion.div 
                        className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <div className="text-xs text-gray-500 dark:text-gray-400">Physics</div>
                        <div className="text-sm font-bold text-blue-600 dark:text-blue-400">78% complete</div>
                        <div className="w-full h-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full mt-1">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: '78%' }}></div>
                        </div>
                      </motion.div>
                      <motion.div 
                        className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="text-xs text-gray-500 dark:text-gray-400">Chemistry</div>
                        <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400">65% complete</div>
                        <div className="w-full h-1.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mt-1">
                          <div className="h-full bg-indigo-500 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                      </motion.div>
                    </div>
                    
                    <motion.div 
                      className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="text-sm font-medium mb-2">Next Topics to Master</div>
                      <div className="space-y-2">
                        <div className="flex items-center text-xs">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                          <span className="flex-1">Wave Optics: Interference Patterns</span>
                          <span className="text-blue-600 dark:text-blue-400 font-medium">Physics</span>
                        </div>
                        <div className="flex items-center text-xs">
                          <div className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></div>
                          <span className="flex-1">Organic Chemistry: Reaction Mechanisms</span>
                          <span className="text-indigo-600 dark:text-indigo-400 font-medium">Chemistry</span>
                        </div>
                        <div className="flex items-center text-xs">
                          <div className="w-2 h-2 bg-violet-500 rounded-full mr-2"></div>
                          <span className="flex-1">Human Physiology: Cardiovascular System</span>
                          <span className="text-violet-600 dark:text-violet-400 font-medium">Biology</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Dashboard Navigation */}
            <div className="flex gap-1 justify-center">
              {features.map((feature, idx) => (
                <motion.button
                  key={feature.id}
                  className={`w-2 h-2 rounded-full ${idx === activeFeature ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                  onClick={() => setActiveFeature(idx)}
                  whileHover={{ scale: 1.2 }}
                  animate={{ 
                    scale: idx === activeFeature ? [1, 1.2, 1] : 1,
                    backgroundColor: idx === activeFeature ? ['#3B82F6', '#4F46E5', '#3B82F6'] : ''
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: idx === activeFeature ? Infinity : 0,
                    repeatType: "reverse"
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Happy Student Avatar */}
          <motion.div
            className="absolute bottom-4 right-4 w-12 h-12"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: examReadiness > 74 ? 1 : 0, 
              scale: examReadiness > 74 ? 1 : 0,
              y: examReadiness > 74 ? [0, -5, 0] : 0
            }}
            transition={{ 
              duration: 2, 
              repeat: examReadiness > 74 ? Infinity : 0,
              repeatType: "reverse"
            }}
          >
            <img 
              src="https://images.unsplash.com/photo-1601412436009-d964bd02edbc?auto=format&fit=crop&w=100&h=100" 
              alt="Happy Student" 
              className="w-12 h-12 rounded-full border-2 border-green-500"
            />
            <div className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-[8px]">✓</span>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Decorative Elements */}
        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-200/50 dark:bg-blue-900/20 rounded-full filter blur-xl z-[-1]"></div>
        <div className="absolute -top-6 -left-6 w-24 h-24 bg-indigo-200/50 dark:bg-indigo-900/20 rounded-full filter blur-xl z-[-1]"></div>
      </div>
    </motion.div>
  );
};

export default DashboardPreview;
