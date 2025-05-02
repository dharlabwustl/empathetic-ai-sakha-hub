import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';

const WhatIsSection = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <Container>
        <div className="max-w-4xl mx-auto text-center mb-12">
          <motion.h2 
            className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            How PREPZR helps you
          </motion.h2>
          
          <motion.p 
            className="text-gray-600 dark:text-gray-300 mb-8 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            PREPZR is your AI-powered learning companion designed to transform how you prepare for exams. 
            Our platform adapts to your learning style and pace, providing personalized study plans 
            and materials that evolve with your progress.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div 
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Personalized Study Plans</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Receive study plans tailored to your individual needs and learning style.
            </p>
          </motion.div>

          <motion.div 
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">AI-Driven Tutoring</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get instant help and explanations from our AI tutor, available 24/7.
            </p>
          </motion.div>

          <motion.div 
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Progress Tracking</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Monitor your progress and identify areas where you need to focus more.
            </p>
          </motion.div>

          <motion.div 
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Mock Tests</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Simulate exam conditions with our comprehensive mock tests.
            </p>
          </motion.div>

          <motion.div 
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Concept Cards</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Quickly review key concepts with our concise concept cards.
            </p>
          </motion.div>

          <motion.div 
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Flashcards</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Memorize important information with our interactive flashcards.
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default WhatIsSection;
