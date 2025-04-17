
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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { x: -10, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.4 } }
  };

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
          animate="visible"
        >
          {strengths.map((strength, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center gap-3"
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
              <div className="rounded-full bg-indigo-100 p-2 dark:bg-indigo-900/30">
                {strength.icon}
              </div>
              <p className="font-medium">{strength.title}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PlatformStrengths;
