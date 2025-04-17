
import React from "react";
import { motion } from "framer-motion";
import { 
  Brain, 
  Sparkles, 
  Smile, 
  Layout, 
  FileStack, 
  Star 
} from "lucide-react";
import { containerVariants, itemVariants, floatAnimation } from "../home/hero/feature-highlights/animationVariants";

const strengths = [
  {
    icon: <Brain className="h-6 w-6 text-purple-500" />,
    title: "Cognitive-layered exam-specific content"
  },
  {
    icon: <Sparkles className="h-6 w-6 text-blue-500" />,
    title: "Personalized AI learning journey"
  },
  {
    icon: <Smile className="h-6 w-6 text-green-500" />,
    title: "Mood-aligned delivery"
  },
  {
    icon: <Layout className="h-6 w-6 text-orange-500" />,
    title: "Multimodal smart content (Text + Audio + Image + Video)"
  },
  {
    icon: <FileStack className="h-6 w-6 text-pink-500" />,
    title: "Instant flashcard & test generation"
  },
  {
    icon: <Star className="h-6 w-6 text-indigo-500" />,
    title: "Scientifically built-in quality, relevance, and difficulty scoring"
  }
];

const PlatformStrengths: React.FC = () => {
  return (
    <section className="py-8 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-2xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Platform's Unique Strengths
        </motion.h2>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {strengths.map((strength, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center gap-3 overflow-hidden"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
                transition: { duration: 0.2 } 
              }}
            >
              <motion.div 
                className="rounded-full bg-indigo-100 p-2 dark:bg-indigo-900/30"
                variants={floatAnimation}
                animate="animate"
                initial="initial"
              >
                {strength.icon}
              </motion.div>
              <p className="font-medium">{strength.title}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PlatformStrengths;
