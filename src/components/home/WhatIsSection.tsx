
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const WhatIsSection = () => {
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
            
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5" />
                <div>
                  <h3 className="text-xl font-semibold">Personalized Study Plans</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Custom learning paths based on your exam goals, current knowledge, and available study time.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5" />
                <div>
                  <h3 className="text-xl font-semibold">Interactive Concept Cards</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Master complex topics with multi-layered explanations, visual aids, and real-world applications.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5" />
                <div>
                  <h3 className="text-xl font-semibold">Adaptive Practice</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Practice exams and quizzes that adjust to your progress, focusing on areas that need improvement.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 md:order-2"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl transform rotate-3"></div>
              <img 
                src="/lovable-uploads/9ca5a007-1086-4c37-81cc-cc869e880b5b.png" 
                alt="Student using PREPZR" 
                className="relative z-10 rounded-2xl shadow-xl object-cover w-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsSection;
