
import React from "react";
import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";

const WhatIsSection: React.FC = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Text Content */}
          <div className="space-y-6">
            <motion.h2 
              className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              What is PREPZR?
            </motion.h2>
            
            <motion.div 
              className="space-y-4 text-lg text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p>
                PREPZR is the world's first emotionally intelligent AI study partner that adapts to your learning style, mood, and exam goals. Unlike traditional study apps that follow a one-size-fits-all approach, PREPZR understands that each student is unique.
              </p>
              
              <p>
                Our AI-powered platform creates hyper-personalized study plans based on your strengths, weaknesses, and preparation timeline. PREPZR analyzes your learning patterns and adjusts in real-time to keep you engaged and motivated throughout your exam preparation journey.
              </p>
              
              <p>
                Whether you're preparing for NEET, JEE, or UPSC, PREPZR becomes your dedicated study companion that not only helps you learn but also understands your emotional state to provide the right kind of support when you need it most.
              </p>
            </motion.div>
          </div>
          
          {/* Animated Image */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              {/* Background decorative elements */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-to-r from-purple-200/30 to-blue-200/30 blur-3xl"></div>
              
              {/* Main image with floating animation */}
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "reverse", 
                  duration: 5,
                  ease: "easeInOut"
                }}
                className="relative z-10 flex justify-center"
              >
                <img 
                  src="/lovable-uploads/8c62154a-6dbf-40c6-8117-f1c9cfd1effa.png" 
                  alt="PREPZR AI Study Companion" 
                  className="max-w-sm w-full h-auto rounded-lg shadow-xl" 
                />
              </motion.div>
              
              {/* Animated elements */}
              <motion.div 
                className="absolute top-0 -left-4 bg-purple-500 text-white text-xs rounded-full px-3 py-1"
                animate={{ 
                  x: [0, 10, 0],
                  rotate: [0, 5, 0, -5, 0]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 7,
                }}
              >
                Smart Learning
              </motion.div>
              
              <motion.div 
                className="absolute bottom-10 right-0 bg-blue-500 text-white text-xs rounded-full px-3 py-1"
                animate={{ 
                  y: [0, 8, 0],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 4,
                  delay: 1
                }}
              >
                AI-Powered
              </motion.div>
              
              <motion.div 
                className="absolute top-1/3 right-0 bg-amber-500 text-white text-xs rounded-full px-3 py-1"
                animate={{ 
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 3,
                  delay: 0.5
                }}
              >
                Personalized
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default WhatIsSection;
