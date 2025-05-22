
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Activity, BarChart3, FlaskConical, 
  Brain, Calendar, CheckCircle, LayoutGrid 
} from 'lucide-react';

interface DashboardPreviewProps {
  activeFeature: number;
  setActiveFeature: React.Dispatch<React.SetStateAction<number>>;
}

const DashboardPreview: React.FC<DashboardPreviewProps> = ({ activeFeature, setActiveFeature }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const features = [
    { 
      id: 0, 
      name: "Smart Dashboard", 
      icon: LayoutGrid,
      content: (
        <div className="bg-white rounded-lg shadow-xl overflow-hidden h-full">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4">
            <h3 className="text-lg font-semibold">Welcome back, Student!</h3>
            <p className="text-xs opacity-90">Your personalized dashboard</p>
          </div>
          
          <div className="p-4 space-y-4">
            <div className="bg-indigo-50 p-3 rounded-lg">
              <h4 className="text-sm font-medium text-indigo-800">Today's Study Overview</h4>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <div className="bg-white p-2 rounded border border-gray-100 flex items-center">
                  <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-2">
                    <CheckCircle size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Tasks Completed</p>
                    <p className="font-medium">3/5</p>
                  </div>
                </div>
                <div className="bg-white p-2 rounded border border-gray-100 flex items-center">
                  <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-2">
                    <Activity size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Study Time</p>
                    <p className="font-medium">1h 45m</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg border border-gray-200 p-3">
              <h4 className="text-sm font-medium text-gray-700 flex items-center">
                <BarChart3 size={16} className="mr-1 text-purple-500" />
                Exam Readiness Score
              </h4>
              <div className="mt-2 space-y-2">
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-500"
                    initial={{ width: "0%" }}
                    animate={{ width: "68%" }}
                    transition={{ duration: 1.5, delay: 0.2 }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Current: 68%</span>
                  <span>Target: 85%</span>
                </div>
                <motion.p 
                  className="text-xs text-green-600 font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.8 }}
                >
                  +5% improvement since last week!
                </motion.p>
              </div>
            </div>
            
            <div className="rounded-lg border border-gray-200 p-3">
              <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Calendar size={16} className="mr-1 text-blue-500" />
                Today's Study Plan
              </h4>
              <ul className="space-y-1 text-xs">
                <li className="flex items-center">
                  <span className="h-1.5 w-1.5 bg-indigo-500 rounded-full mr-1"></span>
                  <span>10:00 AM - Organic Chemistry [Revision]</span>
                </li>
                <li className="flex items-center">
                  <span className="h-1.5 w-1.5 bg-purple-500 rounded-full mr-1"></span>
                  <span>1:00 PM - Physics Formula Practice</span>
                </li>
                <li className="flex items-center">
                  <span className="h-1.5 w-1.5 bg-blue-500 rounded-full mr-1"></span>
                  <span>3:30 PM - Biology Flashcards</span>
                </li>
                <li className="flex items-center">
                  <span className="h-1.5 w-1.5 bg-green-500 rounded-full mr-1"></span>
                  <span>5:00 PM - Practice Test (45 min)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    { 
      id: 1, 
      name: "Adaptive Study Plan", 
      icon: Calendar,
      content: (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4">
            <h3 className="text-lg font-semibold">Your Personalized Study Plan</h3>
            <p className="text-xs opacity-90">Adapts to your mood and learning style</p>
          </div>
          
          <div className="p-4">
            <div className="mb-4 bg-blue-50 p-3 rounded-lg border border-blue-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Brain size={18} />
                  </div>
                  <div className="ml-2">
                    <h4 className="text-sm font-semibold">Current Mood: Focused</h4>
                    <p className="text-xs text-gray-500">Plan optimized for deep learning</p>
                  </div>
                </div>
                <button className="text-xs text-blue-600 font-medium">Update</button>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-700">Today's Schedule</h4>
              
              {/* Study sessions timeline */}
              <div className="space-y-2">
                <motion.div 
                  className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded p-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-indigo-900">10:00 - 11:30 AM</span>
                    <span className="text-xs bg-indigo-200 text-indigo-800 px-2 py-0.5 rounded-full">High Focus</span>
                  </div>
                  <h5 className="text-sm font-medium mt-1 flex items-center">
                    <BookOpen size={14} className="mr-1 text-indigo-600" /> Organic Chemistry Deep Dive
                  </h5>
                  <p className="text-xs text-gray-600 mt-1">
                    Focus on reaction mechanisms with conceptual understanding
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="inline-block h-2 w-2 bg-green-500 rounded-full mr-1"></span>
                      <span className="text-xs text-green-700">Perfect for morning energy</span>
                    </div>
                    <button className="text-xs font-medium text-indigo-600">Start</button>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 rounded p-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-blue-900">1:00 - 2:00 PM</span>
                    <span className="text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full">Review</span>
                  </div>
                  <h5 className="text-sm font-medium mt-1 flex items-center">
                    <FlaskConical size={14} className="mr-1 text-blue-600" /> Formula Practice Session
                  </h5>
                  <p className="text-xs text-gray-600 mt-1">
                    Interactive physics formula application with problems
                  </p>
                  <div className="mt-2 flex items-center">
                    <span className="inline-block h-2 w-2 bg-amber-500 rounded-full mr-1"></span>
                    <span className="text-xs text-amber-700">Recommended post-lunch</span>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded p-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-green-900">3:30 - 5:00 PM</span>
                    <span className="text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded-full">Practice</span>
                  </div>
                  <h5 className="text-sm font-medium mt-1">Practice Test: Human Physiology</h5>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
                      <span className="inline-block h-2 w-2 bg-blue-500 rounded-full mr-1"></span>
                      <span className="text-xs text-blue-700">45 questions · Timed</span>
                    </div>
                    <span className="text-xs font-medium text-green-600">AI-Adaptive</span>
                  </div>
                </motion.div>
              </div>
              
              <motion.div 
                className="mt-4 flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <button className="text-sm text-indigo-600 font-medium hover:text-indigo-800 transition-colors">
                  View Full Week Plan →
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      )
    },
    { 
      id: 2, 
      name: "Concept Learning", 
      icon: Brain,
      content: (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4">
            <h3 className="text-lg font-semibold">Concepts Explorer</h3>
            <p className="text-xs opacity-90">Multi-technique deep learning</p>
          </div>
          
          <div className="p-4">
            <div className="mb-4 flex items-center space-x-2 overflow-x-auto pb-2">
              <button className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs whitespace-nowrap">
                All Concepts
              </button>
              <button className="px-3 py-1 bg-white border border-gray-200 text-gray-600 rounded-full text-xs whitespace-nowrap">
                Chemistry
              </button>
              <button className="px-3 py-1 bg-white border border-gray-200 text-gray-600 rounded-full text-xs whitespace-nowrap">
                Physics
              </button>
              <button className="px-3 py-1 bg-white border border-gray-200 text-gray-600 rounded-full text-xs whitespace-nowrap">
                Biology
              </button>
              <button className="px-3 py-1 bg-white border border-gray-200 text-gray-600 rounded-full text-xs whitespace-nowrap">
                Flagged
              </button>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Featured Concept</h4>
              
              <motion.div 
                className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-100 p-3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-between">
                  <span className="text-xs font-medium text-purple-700">Biology</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 rounded-full">Mastery: 78%</span>
                </div>
                <h3 className="font-medium mt-1">Cellular Respiration</h3>
                <p className="text-xs text-gray-600 mt-1">Process by which cells convert nutrients into energy</p>
                
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <button className="flex items-center justify-center p-2 bg-white rounded border border-gray-200 text-purple-700">
                    <BookOpen size={12} className="mr-1" />
                    Visual Explanation
                  </button>
                  <button className="flex items-center justify-center p-2 bg-white rounded border border-gray-200 text-blue-700">
                    <Activity size={12} className="mr-1" />
                    Practice Problems
                  </button>
                </div>
              </motion.div>
              
              <div className="space-y-2 mt-4">
                <h4 className="text-sm font-semibold text-gray-700">Recommended Concepts</h4>
                
                <motion.div 
                  className="p-2 bg-white border border-gray-200 rounded-lg flex items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center text-red-600 mr-3">
                    <FlaskConical size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h5 className="text-sm font-medium">Chemical Bonding</h5>
                      <span className="text-xs text-amber-600">Review Needed</span>
                    </div>
                    <p className="text-xs text-gray-500">Last practiced 14 days ago</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="p-2 bg-white border border-gray-200 rounded-lg flex items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                    <Activity size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h5 className="text-sm font-medium">Kinematics</h5>
                      <span className="text-xs text-green-600">Strong Concept</span>
                    </div>
                    <p className="text-xs text-gray-500">Last practiced 2 days ago</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    { 
      id: 3, 
      name: "Flashcard System", 
      icon: BookOpen,
      content: (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
          <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-4">
            <h3 className="text-lg font-semibold">Spaced Repetition Flashcards</h3>
            <p className="text-xs opacity-90">Memory-optimized learning system</p>
          </div>
          
          <div className="p-4">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-sm font-semibold text-gray-700">Today's Flashcards</h4>
              <div className="flex items-center space-x-1 text-green-600 text-xs">
                <CheckCircle size={12} />
                <span>23 / 40 Completed</span>
              </div>
            </div>
            
            <div className="relative h-64 perspective-1000">
              <motion.div 
                className="absolute inset-0 rounded-xl bg-gradient-to-br from-teal-50 to-green-50 border border-teal-200 p-4 flex flex-col justify-center shadow-lg transform-gpu"
                initial={{ rotateY: 0 }}
                animate={{ 
                  rotateY: isHovered ? [0, 180, 0] : 0,
                  zIndex: isHovered ? [1, 2, 1] : 1
                }}
                transition={{ 
                  duration: isHovered ? 1.5 : 0,
                  ease: "easeInOut",
                  repeat: isHovered ? 0 : 0,
                  repeatDelay: 1
                }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                style={{ backfaceVisibility: 'hidden' }}
              >
                <span className="text-xs font-medium text-teal-700 mb-2">Biology · NEET</span>
                <h3 className="text-base font-medium text-center">What is the function of mitochondria in a cell?</h3>
                
                <div className="mt-auto flex items-center justify-center space-x-2">
                  <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                    Biology
                  </span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                    Cell Biology
                  </span>
                </div>
                
                <p className="text-center text-xs text-teal-700 mt-4">Tap to flip</p>
              </motion.div>
              
              <motion.div 
                className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 p-4 flex flex-col transform-gpu"
                initial={{ rotateY: 180 }}
                animate={{ 
                  rotateY: isHovered ? [180, 0, 180] : 180,
                  zIndex: isHovered ? [0, 2, 0] : 0
                }}
                transition={{ 
                  duration: isHovered ? 1.5 : 0,
                  ease: "easeInOut"
                }}
                style={{ backfaceVisibility: 'hidden' }}
              >
                <span className="text-xs font-medium text-blue-700 mb-2">Answer</span>
                <p className="text-sm">
                  Mitochondria are the powerhouse of the cell. They generate most of the cell's supply of adenosine triphosphate (ATP), used as a source of chemical energy.
                </p>
                
                <div className="mt-auto flex justify-between items-center">
                  <div className="flex space-x-1">
                    <button className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" />
                      </svg>
                    </button>
                    <button className="p-1 bg-yellow-100 text-yellow-600 rounded hover:bg-yellow-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 110-12 6 6 0 010 12z" />
                      </svg>
                    </button>
                    <button className="p-1 bg-green-100 text-green-600 rounded hover:bg-green-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  
                  <span className="text-xs text-blue-600">Next review in 3 days</span>
                </div>
              </motion.div>
            </div>
            
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-gray-700">Memory Strength</h4>
                <span className="text-xs text-blue-600">View Analytics</span>
              </div>
              
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Biology</span>
                    <span className="text-green-600 font-medium">Strong</span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full mt-1">
                    <motion.div 
                      className="h-full bg-green-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "82%" }}
                      transition={{ delay: 0.3, duration: 1 }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Chemistry</span>
                    <span className="text-amber-600 font-medium">Moderate</span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full mt-1">
                    <motion.div 
                      className="h-full bg-amber-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "58%" }}
                      transition={{ delay: 0.5, duration: 1 }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Physics</span>
                    <span className="text-red-600 font-medium">Needs Work</span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full mt-1">
                    <motion.div 
                      className="h-full bg-red-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "35%" }}
                      transition={{ delay: 0.7, duration: 1 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    { 
      id: 4, 
      name: "Formula Practice",
      icon: FlaskConical,
      content: (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4">
            <h3 className="text-lg font-semibold">Formula Practice</h3>
            <p className="text-xs opacity-90">Master equations through application</p>
          </div>
          
          <div className="p-4 space-y-4">
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-blue-800">Physics: Kinematics</h4>
                <span className="text-xs bg-blue-200 text-blue-800 px-2 rounded-full">High Priority</span>
              </div>
              
              <div className="bg-white rounded border border-gray-100 p-3 text-center">
                <motion.div
                  className="font-mono text-lg mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  v = u + at
                </motion.div>
                <p className="text-xs text-gray-600">
                  Final velocity (v) equals initial velocity (u) plus acceleration (a) multiplied by time (t)
                </p>
              </div>
              
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button className="text-xs bg-white border border-blue-200 text-blue-700 rounded py-1.5 font-medium hover:bg-blue-50">
                  Practice Problems
                </button>
                <button className="text-xs bg-white border border-blue-200 text-blue-700 rounded py-1.5 font-medium hover:bg-blue-50">
                  Related Formulas
                </button>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-3">
              <h4 className="text-sm font-medium mb-2">Recently Practiced Formulas</h4>
              
              <div className="space-y-2">
                <motion.div 
                  className="bg-purple-50 border border-purple-100 rounded p-2 flex items-center justify-between"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <div>
                    <span className="text-xs text-purple-700">Chemistry</span>
                    <p className="font-mono text-sm">PV = nRT</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-green-100 text-green-800 px-1.5 rounded-full">92%</span>
                    <button className="text-xs text-purple-600">Review</button>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-indigo-50 border border-indigo-100 rounded p-2 flex items-center justify-between"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <div>
                    <span className="text-xs text-indigo-700">Physics</span>
                    <p className="font-mono text-sm">F = ma</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-green-100 text-green-800 px-1.5 rounded-full">98%</span>
                    <button className="text-xs text-indigo-600">Review</button>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-red-50 border border-red-100 rounded p-2 flex items-center justify-between"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  <div>
                    <span className="text-xs text-red-700">Chemistry</span>
                    <p className="font-mono text-sm">E = hv</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-amber-100 text-amber-800 px-1.5 rounded-full">68%</span>
                    <button className="text-xs text-red-600">Practice</button>
                  </div>
                </motion.div>
              </div>
            </div>
            
            <div className="rounded-lg border border-gray-200 p-3">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Formula Search</h4>
              <div className="relative">
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded py-1.5 px-3 pl-8 text-sm" 
                  placeholder="Search formulas by name or subject..."
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 absolute left-2.5 top-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )
    },
    { 
      id: 5, 
      name: "Exam Progress", 
      icon: BarChart3,
      content: (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-4">
            <h3 className="text-lg font-semibold">NEET Exam Syllabus Progress</h3>
            <p className="text-xs opacity-90">Track your preparation by subject</p>
          </div>
          
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold">Overall Progress</h4>
              <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">
                157 days to NEET
              </span>
            </div>
            
            <motion.div 
              className="bg-indigo-50 rounded-lg p-3 border border-indigo-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">Exam Readiness</span>
                <span className="font-semibold text-indigo-700">73%</span>
              </div>
              <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-violet-500"
                  initial={{ width: 0 }}
                  animate={{ width: "73%" }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Target: 95%</span>
                <span className="text-green-600">+8% improvement this month</span>
              </div>
            </motion.div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Subject Progress</h4>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-purple-500 inline-block mr-2"></span>
                    Physics
                  </span>
                  <span className="text-purple-700">62%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-purple-500"
                    initial={{ width: 0 }}
                    animate={{ width: "62%" }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-0.5">
                  <span>22/35 topics</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-green-500 inline-block mr-2"></span>
                    Chemistry
                  </span>
                  <span className="text-green-700">78%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-green-500"
                    initial={{ width: 0 }}
                    animate={{ width: "78%" }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-0.5">
                  <span>31/40 topics</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-blue-500 inline-block mr-2"></span>
                    Biology
                  </span>
                  <span className="text-blue-700">82%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: "82%" }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-0.5">
                  <span>41/50 topics</span>
                </div>
              </div>
            </div>
            
            <div className="p-3 border border-gray-200 rounded-lg">
              <h4 className="text-sm font-medium mb-2">Recent Improvements</h4>
              
              <div className="space-y-2">
                <motion.div 
                  className="flex items-center bg-green-50 p-2 rounded border border-green-100"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                >
                  <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-2">
                    <CheckCircle size={16} />
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-medium">Organic Chemistry</span>
                    <p className="text-xs text-gray-500">
                      Improved by 14% this week
                    </p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center bg-blue-50 p-2 rounded border border-blue-100"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                >
                  <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-2">
                    <CheckCircle size={16} />
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-medium">Human Physiology</span>
                    <p className="text-xs text-gray-500">
                      Improved by 9% this week
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="w-full lg:w-1/2 lg:pl-8 h-full"
    >
      {/* 3D Dashboard Preview */}
      <div className="relative w-full h-full perspective-1000">
        <motion.div 
          className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl transform-gpu overflow-hidden border border-gray-200"
          style={{ 
            height: '580px', 
            transformStyle: 'preserve-3d',
          }}
          initial={{ rotateX: 5 }}
          animate={{ rotateX: 5, rotateY: 5 }}
          transition={{ duration: 0.5 }}
        >
          {/* Screen Header */}
          <div className="h-6 w-full bg-gray-100 flex items-center justify-end px-2 space-x-1.5">
            <div className="h-2 w-2 rounded-full bg-red-400"></div>
            <div className="h-2 w-2 rounded-full bg-yellow-400"></div>
            <div className="h-2 w-2 rounded-full bg-green-400"></div>
          </div>
          
          <div className="h-full overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                {features[activeFeature].content}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
        
        {/* Feature Selection Tabs */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {features.map((feature) => (
            <motion.button
              key={feature.id}
              onClick={() => setActiveFeature(feature.id)}
              className={`px-3 py-1.5 rounded-full text-xs sm:text-sm flex items-center ${
                activeFeature === feature.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <feature.icon className="h-3.5 w-3.5 mr-1" />
              {feature.name}
            </motion.button>
          ))}
        </div>
        
        {/* Dashboard Prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-4 text-sm text-center text-gray-500"
        >
          Preview the features that will help you succeed in your NEET preparation
        </motion.div>
        
        {/* Realistic Dashboard Shadow */}
        <div 
          className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-4/5 h-10 rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 70%)',
            filter: 'blur(5px)'
          }}
        ></div>
      </div>
    </motion.div>
  );
};

export default DashboardPreview;
