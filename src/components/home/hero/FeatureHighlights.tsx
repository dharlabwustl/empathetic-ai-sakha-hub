
import React from 'react';
import { motion } from "framer-motion";
import { Check, Brain, Zap, Film, FileSpreadsheet, Award } from "lucide-react";

const FeatureHighlights = () => {
  const features = [
    {
      icon: <Brain className="h-5 w-5 text-violet-500" />,
      text: "Cognitive-layered exam-specific content"
    },
    {
      icon: <Check className="h-5 w-5 text-green-500" />,
      text: "Personalized AI learning journey"
    },
    {
      icon: <Zap className="h-5 w-5 text-amber-500" />,
      text: "Mood-aligned delivery"
    },
    {
      icon: <Film className="h-5 w-5 text-blue-500" />,
      text: "Multimodal smart content (Text + Audio + Image + Video)"
    },
    {
      icon: <FileSpreadsheet className="h-5 w-5 text-indigo-500" />,
      text: "Instant flashcard & test generation"
    },
    {
      icon: <Award className="h-5 w-5 text-pink-500" />,
      text: "Built-in quality, relevance, and difficulty scoring"
    }
  ];
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            className="flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 shadow-sm backdrop-blur-sm border border-gray-100 dark:border-gray-700 rounded-lg px-4 py-3"
          >
            <div className="flex-shrink-0 p-1.5 rounded-full bg-gray-50 dark:bg-gray-700">
              {feature.icon}
            </div>
            <span className="text-sm font-medium">{feature.text}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeatureHighlights;
