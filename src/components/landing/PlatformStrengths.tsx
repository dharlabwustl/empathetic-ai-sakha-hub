
import React from 'react';
import { motion } from "framer-motion";
import { Brain, Target, Sparkles, Shield } from "lucide-react";

const strengthsData = [
  {
    icon: Brain,
    title: "AI-Powered Learning",
    description: "Adaptive learning paths customized to your unique needs and pace"
  },
  {
    icon: Target,
    title: "Exam-Focused",
    description: "Targeted preparation for competitive exams with proven strategies"
  },
  {
    icon: Sparkles,
    title: "Emotional Intelligence",
    description: "First-of-its-kind emotional support system for students"
  },
  {
    icon: Shield,
    title: "Reliable Support",
    description: "24/7 assistance with doubts and comprehensive study materials"
  }
];

export const pulseAnimation = {
  initial: { scale: 1 },
  animate: { 
    scale: [1, 1.05, 1], 
    transition: { 
      duration: 2, 
      repeat: Infinity, 
      repeatType: "loop"
    }
  }
};

const PlatformStrengths = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose Sakha AI?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Experience the perfect blend of technology and empathy in your learning journey
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {strengthsData.map((strength, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                  <strength.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">{strength.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-center">{strength.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformStrengths;
