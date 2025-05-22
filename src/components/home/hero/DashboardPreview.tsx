
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Calendar, BookMarked, Clock, Calculator, Target, BookOpen, Check, FileText, TrendingUp, Star } from 'lucide-react';

interface DashboardPreviewProps {
  activeFeature: number;
  setActiveFeature: React.Dispatch<React.SetStateAction<number>>;
}

const DashboardPreview: React.FC<DashboardPreviewProps> = ({ activeFeature, setActiveFeature }) => {
  const [animateProgress, setAnimateProgress] = useState(false);
  const [showNewConcept, setShowNewConcept] = useState(false);
  const [flashcardFlip, setFlashcardFlip] = useState(false);

  // Auto animate certain elements based on active feature
  useEffect(() => {
    if (activeFeature === 4) { // Formula Practice
      const timer = setTimeout(() => setAnimateProgress(true), 1000);
      return () => clearTimeout(timer);
    } else if (activeFeature === 2) { // Concept Cards
      const timer = setTimeout(() => setShowNewConcept(true), 1500);
      return () => {
        clearTimeout(timer);
        setShowNewConcept(false);
      };
    } else if (activeFeature === 3) { // Flashcard System
      const timer = setTimeout(() => setFlashcardFlip(true), 2000);
      const resetTimer = setTimeout(() => setFlashcardFlip(false), 4000);
      return () => {
        clearTimeout(timer);
        clearTimeout(resetTimer);
      };
    } else {
      setAnimateProgress(false);
    }
  }, [activeFeature]);

  const features = [
    {
      title: "Smart Dashboard",
      description: "AI-powered overview with personalized insights for optimal learning",
      icon: <Brain className="h-5 w-5" />,
      image: "/lovable-uploads/16da1ff5-9fab-4b4b-bd21-5977748acd16.png",
      highlight: "Your learning journey at a glance"
    },
    {
      title: "Adaptive Study Plan",
      description: "Personalized recommendations that adapt to your learning style and pace",
      icon: <Calendar className="h-5 w-5" />,
      image: "/lovable-uploads/1bd9164d-90e1-4088-b058-0fa5966be194.png",
      highlight: "Study smarter, not harder"
    },
    {
      title: "Concept Cards",
      description: "Multi-learning techniques for deep conceptual understanding",
      icon: <BookMarked className="h-5 w-5" />,
      image: "/lovable-uploads/26a404be-3145-4a01-9204-8e74a5984c36.png",
      highlight: "Master difficult concepts easily"
    },
    {
      title: "Flashcard System",
      description: "Spaced repetition for maximum retention and recall",
      icon: <Clock className="h-5 w-5" />,
      image: "/lovable-uploads/63143d4f-73cd-4fca-a1dd-82e6a5313142.png",
      highlight: "Never forget what you've learned"
    },
    {
      title: "Formula Practice",
      description: "Interactive practice for physics, chemistry and math equations",
      icon: <Calculator className="h-5 w-5" />,
      image: "/lovable-uploads/357a0e22-3fec-4a5c-808e-0540d5f7ba05.png",
      highlight: "Master every equation with confidence"
    },
    {
      title: "Exam Readiness",
      description: "Track your progress by subject with real-time readiness score",
      icon: <Target className="h-5 w-5" />,
      image: "/lovable-uploads/26db6370-4d7a-4e6a-a038-bae30c4c1f66.png", 
      highlight: "Always know where you stand"
    },
  ];

  // Function to render specific interactive elements based on active feature
  const renderFeatureInteractivity = () => {
    switch (activeFeature) {
      case 0: // Smart Dashboard
        return (
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-gray-800/80 backdrop-blur-sm p-3 rounded-lg border border-blue-500/30 z-20">
            <div className="text-xs text-white mb-1 text-center">Daily Progress Summary</div>
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col items-center">
                <div className="text-blue-400 text-lg font-bold">85%</div>
                <div className="text-xs text-gray-300">Completion</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-green-400 text-lg font-bold">12</div>
                <div className="text-xs text-gray-300">Concepts</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-amber-400 text-lg font-bold">3.5h</div>
                <div className="text-xs text-gray-300">Study Time</div>
              </div>
            </div>
          </div>
        );
        
      case 1: // Adaptive Study Plan
        return (
          <motion.div 
            className="absolute top-20 right-8 bg-indigo-900/80 backdrop-blur-sm p-3 rounded-lg border border-indigo-500/30 z-20 w-40"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-xs text-indigo-200 mb-2">Today's Priority Topics:</div>
            <ul className="space-y-1">
              {['Thermodynamics', 'Organic Chemistry', 'Cell Biology'].map((topic, i) => (
                <motion.li 
                  key={i}
                  className="flex items-center text-xs text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 + i * 0.2 }}
                >
                  <div className="h-1.5 w-1.5 bg-indigo-400 rounded-full mr-1"></div>
                  {topic}
                </motion.li>
              ))}
            </ul>
            
            <motion.div 
              className="mt-3 bg-indigo-700/50 p-1.5 rounded text-xs text-white flex items-center justify-between"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.3 }}
            >
              <span>Start Now</span>
              <div className="h-4 w-4 bg-indigo-500 rounded-full flex items-center justify-center">→</div>
            </motion.div>
          </motion.div>
        );

      case 2: // Concept Cards
        return (
          <AnimatePresence>
            {showNewConcept && (
              <motion.div
                className="absolute top-1/4 left-1/2 transform -translate-x-1/2 bg-purple-900/90 backdrop-blur-sm p-3 rounded-lg border border-purple-500/30 z-30 w-64"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ type: "spring" }}
              >
                <div className="text-sm text-white font-medium mb-2">New Concept Unlocked!</div>
                <div className="text-xs text-purple-200 mb-2">DNA Replication</div>
                <div className="bg-purple-800/60 rounded p-2 text-xs text-white">
                  Learn how DNA creates exact copies of itself during cell division through the process of replication.
                </div>
                <div className="flex justify-between items-center mt-3">
                  <div className="flex items-center text-xs text-purple-200">
                    <BookOpen className="h-3 w-3 mr-1" />
                    <span>10 min read</span>
                  </div>
                  <div className="bg-purple-600 text-white text-xs px-2 py-1 rounded">
                    Start Learning
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        );
        
      case 3: // Flashcard System
        return (
          <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-20 w-72">
            <motion.div 
              className="relative h-40 w-full perspective-1000"
              initial={{ rotateY: 0 }}
              animate={{ rotateY: flashcardFlip ? 180 : 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Front side */}
              <motion.div 
                className="absolute inset-0 bg-gray-700/90 backdrop-blur-sm p-4 rounded-lg border border-amber-500/30 flex flex-col items-center justify-center backface-hidden"
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className="text-amber-400 text-sm mb-2">Question:</div>
                <div className="text-white text-center font-medium">
                  What enzyme is responsible for unwinding the DNA helix during replication?
                </div>
                <div className="mt-4 text-xs text-gray-300">Tap to reveal answer</div>
              </motion.div>
              
              {/* Back side */}
              <motion.div 
                className="absolute inset-0 bg-amber-900/80 backdrop-blur-sm p-4 rounded-lg border border-amber-500/30 flex flex-col items-center justify-center rotate-y-180 backface-hidden"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <div className="text-amber-300 text-sm mb-2">Answer:</div>
                <div className="text-white text-center font-medium">
                  DNA Helicase
                </div>
                <div className="mt-4 flex justify-around w-full">
                  <div className="flex items-center text-xs text-red-300">
                    <div className="h-4 w-4 rounded-full bg-red-500/30 flex items-center justify-center mr-1">✕</div>
                    Hard
                  </div>
                  <div className="flex items-center text-xs text-amber-300">
                    <div className="h-4 w-4 rounded-full bg-amber-500/30 flex items-center justify-center mr-1">•</div>
                    Medium
                  </div>
                  <div className="flex items-center text-xs text-green-300">
                    <div className="h-4 w-4 rounded-full bg-green-500/30 flex items-center justify-center mr-1">✓</div>
                    Easy
                  </div>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="mt-3 flex justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: flashcardFlip ? 1 : 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-xs text-amber-500">Next review: 3 days</div>
              <div className="text-xs text-amber-500">32/100 cards</div>
            </motion.div>
          </div>
        );
        
      case 4: // Formula Practice
        return (
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 z-20">
            <motion.div
              className="bg-emerald-900/80 backdrop-blur-sm p-4 rounded-lg border border-emerald-500/30 w-64"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-emerald-200 text-sm font-medium mb-2">Formula Practice</div>
              <div className="text-white text-center py-2 font-mono">
                PV = nRT
              </div>
              <div className="grid grid-cols-2 gap-3 mt-3">
                {['P = ?', 'V = 2L', 'n = 1 mol', 'T = 300K'].map((item, i) => (
                  <div key={i} className="bg-emerald-800/60 p-1.5 rounded text-xs text-white text-center">
                    {item}
                  </div>
                ))}
              </div>
              
              <motion.div 
                className="mt-4 bg-emerald-700 h-1.5 rounded-full overflow-hidden"
                initial={{ width: "100%" }}
              >
                <motion.div 
                  className="h-full bg-emerald-400"
                  initial={{ width: "0%" }}
                  animate={{ width: animateProgress ? "65%" : "0%" }}
                  transition={{ delay: 0.5, duration: 1.5 }}
                />
              </motion.div>
              <div className="mt-1 flex justify-between text-xs text-emerald-200">
                <span>Progress</span>
                <span>{animateProgress ? "65%" : "0%"}</span>
              </div>
            </motion.div>
          </div>
        );
        
      case 5: // Exam Readiness
        return (
          <>
            <motion.div
              className="absolute top-20 left-10 flex items-center gap-2 z-30"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              <div className="relative">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-500 shadow-lg">
                  <img 
                    src="/lovable-uploads/ffb2594e-ee5e-424c-92ff-417777e347c9.png" 
                    alt="Happy Student" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <motion.div 
                  className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    delay: 1 
                  }}
                >
                  +1
                </motion.div>
                <motion.div
                  className="absolute -bottom-1 -right-1 text-lg"
                  animate={{ 
                    rotate: [0, 15, 0, -15, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    delay: 1.5
                  }}
                >
                  🎉
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              className="absolute right-10 top-20 flex items-center z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="bg-gray-800/90 backdrop-blur-sm p-3 rounded-lg border border-indigo-500/30">
                <div className="text-xs text-white mb-1">Exam Readiness</div>
                <motion.div 
                  className="h-2 w-36 bg-gray-700 rounded-full overflow-hidden"
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div 
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                    initial={{ width: '40%' }}
                    animate={{ width: '76%' }}
                    transition={{ 
                      duration: 1.5,
                      ease: "easeOut",
                      delay: 1.2
                    }}
                  />
                </motion.div>
                <div className="flex justify-between items-center mt-1 text-xs text-gray-300">
                  <span>Day 1</span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.7 }}
                    className="text-indigo-300"
                  >
                    76%
                  </motion.span>
                  <span>Day 30</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="absolute bottom-32 left-1/2 transform -translate-x-1/2 z-20 w-80"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="bg-gray-800/90 backdrop-blur-sm p-3 rounded-lg border border-blue-500/30">
                <div className="text-sm text-blue-400 font-medium mb-2">Subject Readiness</div>
                <div className="space-y-2">
                  {[
                    { subject: "Physics", progress: 82, color: "bg-blue-500" },
                    { subject: "Chemistry", progress: 67, color: "bg-purple-500" },
                    { subject: "Biology", progress: 91, color: "bg-green-500" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center">
                      <div className="w-24 text-xs text-white">{item.subject}</div>
                      <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div 
                          className={`h-full ${item.color}`}
                          initial={{ width: "0%" }}
                          animate={{ width: `${item.progress}%` }}
                          transition={{ delay: 1.5 + i * 0.3, duration: 1 }}
                        />
                      </div>
                      <div className="w-8 text-right text-xs text-white ml-2">{item.progress}%</div>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="text-xs text-blue-300">Predicted NEET Score: 620/720</div>
                  <div className="flex items-center text-xs text-green-400">
                    <Star className="h-3 w-3 mr-1" fill="currentColor" />
                    <span>Top 5%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        );
        
      default:
        return null;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="w-full lg:w-1/2 flex flex-col items-center relative"
    >
      {/* NEET Live Now Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        className="absolute -top-6 -left-2 md:-left-6 z-30"
      >
        <motion.div 
          className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
          animate={{ 
            boxShadow: ['0px 0px 8px rgba(34, 197, 94, 0.6)', '0px 0px 16px rgba(34, 197, 94, 0.8)', '0px 0px 8px rgba(34, 197, 94, 0.6)']
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="h-2 w-2 bg-white rounded-full animate-pulse"></span>
          <span className="font-bold text-sm">NEET Live Now!</span>
        </motion.div>
      </motion.div>

      {/* Dashboard preview container with 3D effect */}
      <div className="relative w-full max-w-lg perspective-1000 preserve-3d">
        {/* Animated screen glow */}
        <motion.div 
          className="absolute inset-2 bg-blue-400/20 dark:bg-blue-500/20 rounded-xl blur-xl"
          animate={{ 
            opacity: [0.5, 0.8, 0.5],
            scale: [0.98, 1.01, 0.98]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />

        {/* Dashboard frame */}
        <motion.div 
          className="relative bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-950 rounded-xl shadow-xl overflow-hidden border border-gray-700 depth-shadow"
          animate={{ 
            rotateX: [0, 2, 0, -2, 0], 
            rotateY: [0, -3, 0, 3, 0] 
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          {/* Screen content */}
          <div className="p-1 relative">
            {/* Dashboard header */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 p-3 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-white text-xs font-medium">PREPZR Dashboard</div>
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse mr-1"></div>
                <div className="text-xs text-gray-400">Live</div>
              </div>
            </div>

            {/* Feature images/content with animated transitions */}
            <div className="relative aspect-video w-full bg-gray-50 dark:bg-gray-900 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <img 
                    src={features[activeFeature].image} 
                    alt={features[activeFeature].title}
                    className="w-full h-full object-cover object-top"
                  />
                  
                  {/* Feature highlight overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-white font-bold">{features[activeFeature].title}</h3>
                    <p className="text-white/80 text-sm">{features[activeFeature].highlight}</p>
                  </div>
                  
                  {/* Interactive feature UI elements */}
                  {renderFeatureInteractivity()}
                  
                  {/* Animated cursor */}
                  <motion.div 
                    className="absolute w-5 h-5 border-2 border-yellow-400 rounded-full flex items-center justify-center pointer-events-none z-20"
                    animate={{ 
                      x: [100, 250, 180, 300],
                      y: [150, 100, 200, 120],
                      scale: [1, 0.8, 1]
                    }}
                    transition={{ 
                      duration: 5,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Feature selector/navigation */}
            <div className="bg-gray-800 dark:bg-gray-800 p-2 rounded-b-lg">
              <div className="flex flex-wrap justify-between items-center">
                {features.map((feature, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setActiveFeature(index)}
                    className={`flex flex-col items-center p-2 rounded ${
                      activeFeature === index 
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'text-gray-400 hover:text-gray-200'
                    } transition-colors`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="p-1.5 rounded-full bg-gray-700/50">
                      {feature.icon}
                    </div>
                    <span className="text-xs mt-1 hidden md:block">{feature.title.split(" ")[0]}</span>
                    
                    {activeFeature === index && (
                      <motion.div 
                        className="h-0.5 w-full bg-blue-400 mt-1"
                        layoutId="activeIndicator"
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Feature description */}
      <motion.div 
        className="mt-6 text-center max-w-md"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ delay: 1 }}
      >
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {features[activeFeature].title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          {features[activeFeature].description}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default DashboardPreview;
