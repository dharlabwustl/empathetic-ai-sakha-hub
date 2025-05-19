
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import StudentAvatarJourney from '@/components/animations/StudentAvatarJourney';
import { ArrowRight } from 'lucide-react';

const Hero3DSection = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/signup');
  };
  
  const handleExamReadiness = () => {
    navigate('/exam-readiness');
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-background/90 pt-24 pb-16">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent"></div>
      <div className="absolute top-1/3 -translate-y-1/2 left-1/4 -translate-x-1/2 w-[30rem] h-[30rem] bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 -translate-y-1/2 right-1/4 -translate-x-1/2 w-[30rem] h-[30rem] bg-blue-500/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-block py-1 px-3 mb-4 text-xs font-medium text-primary bg-primary/10 rounded-full">
              Supporting UN Sustainability Goal 4: Quality Education
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 mb-6">
              We understand your mindset, not just the Exam
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              PREP-zer adapts to your learning style, builds personalized paths for any exam, and uses AI to detect your mood for optimized learning.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              onClick={handleGetStarted}
              size="lg" 
              className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
            >
              7 Days Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <Button 
              onClick={handleExamReadiness}
              variant="outline"
              size="lg"
              className="border-primary/20 hover:border-primary/40"
            >
              Test Your Exam Readiness
            </Button>
          </motion.div>
        </div>
        
        {/* 3D Animated Student Journey */}
        <div className="mb-16">
          <div className="rounded-xl overflow-hidden bg-gradient-to-b from-background to-gray-50 dark:to-gray-900/50 border border-gray-100 dark:border-gray-800 shadow-lg">
            <div className="p-4 md:p-8">
              <div className="relative h-[400px] md:h-[500px]">
                <StudentAvatarJourney />
              </div>
            </div>
          </div>
        </div>
        
        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-16"
        >
          {/* Personalized Learning Feature */}
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-900/50 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-800"
          >
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center rounded-lg mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Personalized Learning</h3>
            <p className="text-gray-600 dark:text-gray-400">
              AI that adapts to your unique learning style and creates a personalized study plan.
            </p>
          </motion.div>
          
          {/* Mood-Adaptive Feature */}
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-900/50 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-800"
          >
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center rounded-lg mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 dark:text-purple-400">
                <path d="M2 9.5V4a2 2 0 0 1 2-2h4.586a1 1 0 0 1 .707.293l.707.707a1 1 0 0 0 .707.293H20a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5.5"></path>
                <path d="M2 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
                <path d="M6 13h4"></path>
                <path d="M17 12v5"></path>
                <path d="M14 15h6"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Mood-Adaptive</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Our AI detects your mood and adjusts your study materials for optimal learning efficiency.
            </p>
          </motion.div>
          
          {/* Proven Results Feature */}
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-900/50 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-800"
          >
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 flex items-center justify-center rounded-lg mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400">
                <path d="M18 8a6 6 0 0 1-7.743 5.743L10 14l-1 1 1 1H6v-4l1 1 .257-.257A6 6 0 1 1 18 8Z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Proven Results</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Our students achieve 32% better results using our emotionally intelligent exam preparation.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero3DSection;
