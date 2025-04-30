
import React from 'react';
import { motion } from "framer-motion";
import { HeartPulse, BookOpenCheck, GraduationCap } from "lucide-react";

const WhatIsSection = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose PREPZR?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Experience the perfect blend of technology and empathy in your learning journey
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 p-6 rounded-2xl shadow-sm"
          >
            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/50 rounded-2xl flex items-center justify-center mb-5">
              <HeartPulse className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Emotionally Intelligent</h3>
            <p className="text-gray-600 dark:text-gray-300">
              PREPZR adapts to your emotional state, learning style and pace, making studying less stressful and more effective.
            </p>
          </motion.div>
          
          {/* Card 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/50 dark:to-blue-950/50 p-6 rounded-2xl shadow-sm"
          >
            <div className="h-12 w-12 bg-green-100 dark:bg-green-900/50 rounded-2xl flex items-center justify-center mb-5">
              <BookOpenCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Personalized Learning</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get a completely customized study plan optimized for your goals, strengths, weaknesses, and learning preferences.
            </p>
          </motion.div>
          
          {/* Card 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50 p-6 rounded-2xl shadow-sm"
          >
            <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/50 rounded-2xl flex items-center justify-center mb-5">
              <GraduationCap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Result-Driven Approach</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Our AI tracks your progress, identifies knowledge gaps, and adjusts your study plan to maximize your exam score.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsSection;
