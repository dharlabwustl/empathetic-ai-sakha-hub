
import React from 'react';
import { motion } from "framer-motion";
import { Brain, Sparkles, Layers, PlaySquare, FlashCard, CheckSquare } from "lucide-react";

const strengthsData = [
  {
    icon: Brain,
    title: "Cognitive-layered Exam Content",
    description: "Content structured according to cognitive complexity levels for each exam"
  },
  {
    icon: Sparkles,
    title: "Personalized AI Journey",
    description: "Adaptive learning paths customized to your unique needs and pace"
  },
  {
    icon: Layers,
    title: "Mood-aligned Delivery",
    description: "Content delivery that adapts to your emotional state for optimal learning"
  },
  {
    icon: PlaySquare,
    title: "Multimodal Smart Content",
    description: "Comprehensive learning through Text, Audio, Image, and Video formats"
  },
  {
    icon: FlashCard,
    title: "Instant Learning Tools",
    description: "On-demand generation of flashcards and tests for rapid revision"
  },
  {
    icon: CheckSquare,
    title: "Scientific Quality Scoring",
    description: "Built-in scoring system for content quality, relevance, and difficulty"
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
