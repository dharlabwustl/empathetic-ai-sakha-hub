// Import only what's needed for the fix
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const PlatformStrengths = () => {
  const strengths = [
    {
      title: "Personalized Learning Paths",
      description: "AI-driven customization for effective learning.",
      icon: Sparkles,
    },
    {
      title: "Adaptive Quizzing",
      description: "Tailored quizzes that adjust to your skill level.",
      icon: Sparkles,
    },
    {
      title: "Smart Study Schedules",
      description: "Intelligent scheduling to optimize study time.",
      icon: Sparkles,
    },
  ];

  const animationVariants = {
    initial: { scale: 0.9 },
    animate: { 
      scale: [0.9, 1.05, 1], 
      transition: { 
        duration: 1.5, 
        repeat: Infinity, 
        repeatType: "loop" as const // Explicitly type as "loop"
      } 
    }
  };

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-8">
          Unleash Your Potential with AI-Powered Learning
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {strengths.map((strength, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <motion.div
                className="inline-block mb-4 text-purple-500"
                variants={animationVariants}
                initial="initial"
                animate="animate"
              >
                <strength.icon size={40} />
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
                {strength.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {strength.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformStrengths;
