
import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950/30 dark:via-gray-900 dark:to-purple-950/30 py-20 md:py-32">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
              Your Personalized AI-Powered 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600"> Exam Companion</span>
            </h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-8 text-gray-700 dark:text-gray-300 max-w-4xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              PREPZR analyzes your learning style and creates a personalized study plan to help you excel in your exams.
            </motion.p>
            
            {/* Hindi text with proper styling */}
            <motion.div
              className="w-full my-6 text-xl md:text-2xl text-gray-800 dark:text-gray-200"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <p className="w-full flex flex-wrap justify-center items-center gap-1 px-4">
                <span>अब तैयारी करो अपने तरीके से, सिर्फ</span>{" "}
                <motion.span
                  className="inline-block font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"]
                  }}
                  transition={{ 
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 3
                  }}
                >
                  PREPZR
                </motion.span>{" "}
                <span>के साथ</span>
              </p>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
          >
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="border-blue-300 dark:border-blue-700">
                Already a User? Login
              </Button>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-10"
          >
            <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-yellow-500" />
              Used by 50,000+ students & 300+ institutes across India
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Abstract background shapes */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full opacity-20 dark:opacity-10 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.5 }}
      >
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-purple-300 dark:bg-purple-900 filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-blue-300 dark:bg-blue-900 filter blur-3xl"></div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
