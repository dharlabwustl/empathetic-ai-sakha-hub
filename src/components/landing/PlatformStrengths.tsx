import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { 
  Brain, 
  Sparkles, 
  Smile, 
  Layout, 
  FileStack, 
  Star 
} from "lucide-react";
import { containerVariants, itemVariants, fadeInStagger, pulseAnimation } from "../home/hero/feature-highlights/animationVariants";

const floatAnimation: Variants = {
  initial: { 
    scale: 1,
    transition: { duration: 0.3 } 
  },
  animate: { 
    scale: 1.05,
    transition: { 
      duration: 2, 
      repeat: Infinity,
      repeatType: "loop" as const
    }
  }
};

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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  
  const staggerDelay = 0.1;

  return (
    <section ref={ref} className="py-12 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.h2 
            className="text-3xl font-bold mb-2"
            variants={pulseAnimation}
            initial="initial"
            animate="animate"
          >
            Our Platform's Unique Strengths
          </motion.h2>
          <motion.div 
            className="h-1 w-24 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : { width: 0 }}
            transition={{ duration: 1 }}
          />
        </motion.div>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          viewport={{ once: false, amount: 0.3 }}
        >
          {strengths.map((strength, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              custom={index}
              transition={{ delay: index * staggerDelay }}
              className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-4 overflow-hidden group"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
                transition: { duration: 0.2 } 
              }}
            >
              <motion.div 
                className="rounded-full bg-indigo-100 p-3 dark:bg-indigo-900/30 group-hover:bg-gradient-to-r group-hover:from-indigo-100 group-hover:to-purple-100 dark:group-hover:from-indigo-900/30 dark:group-hover:to-purple-900/30 transition-all duration-300"
                variants={floatAnimation}
                animate="animate"
                initial="initial"
              >
                {strength.icon}
              </motion.div>
              <div>
                <p className="font-medium group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors duration-300">{strength.title}</p>
                <div className="h-0.5 w-0 bg-indigo-500 mt-1 group-hover:w-full transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PlatformStrengths;
