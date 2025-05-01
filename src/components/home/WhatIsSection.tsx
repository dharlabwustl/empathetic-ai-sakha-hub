
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const WhatIsSection = () => {
  // Animation variants for the feature icons
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

  // Animation for the floating elements
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
    <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 md:order-1"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What is PREPZR?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              PREPZR is an AI-powered learning platform designed specifically for students preparing for competitive exams in India. Our platform intelligently adapts to your learning style, pace, and preferences.
            </p>
            
            <motion.div 
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
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
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 md:order-2"
          >
            <div className="relative h-[400px]">
              {/* Main image with shadow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl transform rotate-3"></div>
              <img 
                src="/lovable-uploads/9ca5a007-1086-4c37-81cc-cc869e880b5b.png" 
                alt="Student using PREPZR" 
                className="relative z-10 rounded-2xl shadow-xl object-cover w-full"
              />
              
              {/* Animated floating elements around the image */}
              <motion.div 
                className="absolute top-[-30px] right-[-20px] bg-blue-100 dark:bg-blue-900/70 p-3 rounded-lg shadow-lg z-20 backdrop-blur-sm"
                animate={floatingAnimation}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 20V10"></path>
                      <path d="M18 20V4"></path>
                      <path d="M6 20v-6"></path>
                    </svg>
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 11 12 14 22 4"></polyline>
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                    </svg>
                  </div>
                  <span className="font-medium text-sm">Exam Readiness</span>
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                    </svg>
                  </div>
                  <span className="font-medium text-sm">Smart Flashcards</span>
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <span className="font-medium text-sm">Adaptive Learning</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsSection;
