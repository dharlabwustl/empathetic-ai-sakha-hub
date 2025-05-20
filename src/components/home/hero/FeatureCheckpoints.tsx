
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Target, Award, BookOpen } from 'lucide-react';

const FeatureCheckpoints: React.FC = () => {
  const features = [
    {
      text: "Personalized Study Plans for NEET, JEE, UPSC",
      icon: <Target className="h-5 w-5 text-green-500 flex-shrink-0" />,
      color: "from-green-500 to-green-400",
    },
    {
      text: "AI-Powered Adaptive Learning System", 
      icon: <BookOpen className="h-5 w-5 text-blue-500 flex-shrink-0" />,
      color: "from-blue-500 to-blue-400",
    },
    {
      text: "Exam-specific Mock Tests & Analysis", 
      icon: <CheckCircle className="h-5 w-5 text-purple-500 flex-shrink-0" />,
      color: "from-purple-500 to-purple-400",
    },
    {
      text: "Rank Predictor & Performance Insights",
      icon: <Award className="h-5 w-5 text-amber-500 flex-shrink-0" />,
      color: "from-amber-500 to-amber-400",
    }
  ];

  return (
    <motion.div 
      className="grid md:grid-cols-2 gap-4 mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      {features.map((feature, index) => (
        <motion.div 
          key={index} 
          className="flex items-center bg-white dark:bg-gray-800 shadow-sm hover:shadow-md rounded-lg p-3 border border-gray-100 dark:border-gray-700 transition-all"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + index * 0.1 }}
          whileHover={{ 
            scale: 1.03,
            boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.15)" 
          }}
        >
          <div className={`bg-gradient-to-r ${feature.color} p-2 rounded-full mr-3`}>
            {feature.icon}
          </div>
          <span className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-200">
            {feature.text}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FeatureCheckpoints;
