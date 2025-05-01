
import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { CheckCircle, Layers, BookOpen, Clock, Activity, Brain } from 'lucide-react';

const WhatIsSection = () => {
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animationTriggered, setAnimationTriggered] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animationTriggered) {
          setIsVisible(true);
          setAnimationTriggered(true);
          controls.start("visible");
        }
      },
      { threshold: 0.2 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [controls, animationTriggered]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const dashboardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6 }
    }
  };
  
  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      y: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section ref={containerRef} className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <motion.div
            variants={itemVariants}
            className="order-2 md:order-1"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">What is PREPZR?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              PREPZR is an AI-powered learning platform designed specifically for students preparing for competitive exams in India. Our platform intelligently adapts to your learning style, pace, and preferences.
            </p>
            
            <motion.div 
              className="space-y-4"
              variants={containerVariants}
            >
              <motion.div className="flex items-start" variants={itemVariants}>
                <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5" />
                <div>
                  <h3 className="text-xl font-semibold">Personalized Study Plans</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Custom learning paths based on your exam goals, current knowledge, and available study time.
                  </p>
                </div>
              </motion.div>
              
              <motion.div className="flex items-start" variants={itemVariants}>
                <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5" />
                <div>
                  <h3 className="text-xl font-semibold">Interactive Concept Cards</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Master complex topics with multi-layered explanations, visual aids, and real-world applications.
                  </p>
                </div>
              </motion.div>
              
              <motion.div className="flex items-start" variants={itemVariants}>
                <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5" />
                <div>
                  <h3 className="text-xl font-semibold">Adaptive Practice</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Practice exams and quizzes that adjust to your progress, focusing on areas that need improvement.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div
            variants={dashboardVariants}
            className="order-1 md:order-2 relative"
          >
            <div className="relative h-[400px] dashboard-animation-container perspective-1000">
              {/* Main dashboard visualization */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-xl transform-gpu"
                animate={{ 
                  rotateY: [0, 2, 0, -2, 0],
                  rotateX: [0, -1, 0, 1, 0]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                {/* Dashboard screen mockup */}
                <div className="absolute inset-2 bg-white dark:bg-gray-800 rounded-lg overflow-hidden flex flex-col">
                  {/* Mock dashboard header */}
                  <div className="h-10 bg-purple-600 flex items-center px-4">
                    <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <div className="ml-4 h-4 w-20 bg-white/20 rounded"></div>
                  </div>
                  
                  {/* Mock dashboard content */}
                  <div className="flex-1 p-4 grid grid-cols-6 gap-3">
                    {/* Sidebar */}
                    <div className="col-span-1 bg-gray-100 dark:bg-gray-700 rounded h-full flex flex-col p-2">
                      {[1, 2, 3, 4, 5].map((item) => (
                        <motion.div 
                          key={item}
                          className={`h-8 mb-2 rounded ${item === 1 ? 'bg-purple-200 dark:bg-purple-800' : 'bg-gray-200 dark:bg-gray-600'}`}
                          whileHover={{ scale: 1.05 }}
                        ></motion.div>
                      ))}
                    </div>
                    
                    {/* Main content */}
                    <div className="col-span-5 flex flex-col gap-3">
                      {/* Header section */}
                      <div className="h-16 bg-gray-100 dark:bg-gray-700 rounded p-2 flex justify-between items-center">
                        <div className="w-32 h-6 bg-gray-200 dark:bg-gray-600 rounded"></div>
                        <div className="w-24 h-8 bg-purple-200 dark:bg-purple-700 rounded"></div>
                      </div>
                      
                      {/* Metrics row */}
                      <div className="grid grid-cols-4 gap-2 h-20">
                        {[1, 2, 3, 4].map((item) => (
                          <motion.div 
                            key={item}
                            className="bg-gray-100 dark:bg-gray-700 rounded p-2 flex flex-col justify-between"
                            whileHover={{ y: -5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded"></div>
                            <div className="w-1/2 h-4 bg-gray-200 dark:bg-gray-600 rounded"></div>
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Content blocks */}
                      <div className="grid grid-cols-2 gap-2 flex-1">
                        <motion.div 
                          className="bg-gray-100 dark:bg-gray-700 rounded"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <div className="p-3">
                            <div className="w-3/4 h-3 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
                            <div className="w-1/2 h-3 bg-gray-200 dark:bg-gray-600 rounded"></div>
                          </div>
                        </motion.div>
                        <motion.div 
                          className="bg-gray-100 dark:bg-gray-700 rounded"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 2.5, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <div className="p-3">
                            <div className="w-3/4 h-3 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
                            <div className="w-1/2 h-3 bg-gray-200 dark:bg-gray-600 rounded"></div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Animated floating elements around the image */}
              <motion.div 
                className="absolute top-[-30px] right-[-20px] bg-blue-100 dark:bg-blue-900/70 p-3 rounded-lg shadow-lg z-20 backdrop-blur-sm"
                animate={floatingAnimation}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    <Activity size={16} />
                  </div>
                  <span className="font-medium text-sm">Progress Tracking</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute bottom-[50px] left-[-30px] bg-purple-100 dark:bg-purple-900/70 p-3 rounded-lg shadow-lg z-20 backdrop-blur-sm"
                animate={{
                  y: [5, -5, 5],
                  transition: {
                    y: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }
                }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white">
                    <BookOpen size={16} />
                  </div>
                  <span className="font-medium text-sm">Concept Mastery</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute top-[100px] right-[-40px] bg-green-100 dark:bg-green-900/70 p-3 rounded-lg shadow-lg z-20 backdrop-blur-sm"
                animate={{
                  y: [-8, 8, -8],
                  transition: {
                    y: {
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }
                }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                    <Brain size={16} />
                  </div>
                  <span className="font-medium text-sm">AI Tutor</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute bottom-[-20px] right-[30px] bg-amber-100 dark:bg-amber-900/70 p-3 rounded-lg shadow-lg z-20 backdrop-blur-sm"
                animate={{
                  y: [7, -7, 7],
                  transition: {
                    y: {
                      duration: 4.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }
                }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white">
                    <Clock size={16} />
                  </div>
                  <span className="font-medium text-sm">Study Planner</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Custom style for the perspective effect */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
};

export default WhatIsSection;
