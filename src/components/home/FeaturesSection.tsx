
import React from 'react';
import { motion } from 'framer-motion';

const FeaturesSection = () => {
  const features = [
    {
      icon: "📊",
      title: "Study smarter",
      description: "Our AI adapts to your learning style, pace, and preferences to create the most efficient study path."
    },
    {
      icon: "🧠",
      title: "Spaced Repetition",
      description: "Our algorithm identifies when you're about to forget something and reminds you at the optimal moment."
    },
    {
      icon: "📱",
      title: "Learn Anywhere",
      description: "Access PREP-zer on any device - study on your computer, continue on your phone, never miss a beat."
    },
    {
      icon: "🔍",
      title: "Detailed Analytics",
      description: "Track your progress with comprehensive analytics that highlight strengths and areas for improvement."
    },
    {
      icon: "🤖",
      title: "AI Tutor",
      description: "Get instant help with difficult concepts and personalized explanations from our AI tutor."
    },
    {
      icon: "🏆",
      title: "Success Guaranteed",
      description: "Our proven methodology has helped thousands of students achieve their target scores."
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            Features designed for your success
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            PREP-zer combines cutting-edge technology with proven learning methodologies to help you achieve your academic goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
