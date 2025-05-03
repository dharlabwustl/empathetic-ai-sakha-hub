
import React from 'react';
import { motion } from 'framer-motion';
import { Award, Shield, Zap } from 'lucide-react';

const AchievementsSection = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/30 dark:to-indigo-950/30 py-8 md:py-10">
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-xl md:text-2xl font-semibold text-center mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Recognitions & Achievements
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <motion.div 
            className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="bg-indigo-100 dark:bg-indigo-900/40 p-3 rounded-full mb-4">
              <Award className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">G-CARED 2025</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Selected at First Global Conference on AI Research and Emerging Developments for "Sakha AI: Building India's First Emotionally Intelligent Foundational AI Model for Exam Aspirants"
            </p>
          </motion.div>

          <motion.div 
            className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-green-100 dark:bg-green-900/40 p-3 rounded-full mb-4">
              <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">NVIDIA Startup</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Proud member of the NVIDIA Inception Program for cutting-edge AI startups, leveraging advanced technology for educational innovation
            </p>
          </motion.div>

          <motion.div 
            className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="bg-blue-100 dark:bg-blue-900/40 p-3 rounded-full mb-4">
              <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">NASSCOM CoE</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Incubated at NASSCOM Centre of Excellence, Gurgaon, developing AI-driven educational solutions with expert guidance and support
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AchievementsSection;
