
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

interface HeroSectionProps {
  scrollToFeatures: () => void;
  scrollToForWhom: () => void;
  openExamAnalyzer: () => void;
}

const HeroSection = ({ scrollToFeatures, openExamAnalyzer }: HeroSectionProps) => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();
  const [showAuthButtons, setShowAuthButtons] = useState(true);

  useEffect(() => {
    setShowAuthButtons(!isAuthenticated);
  }, [isAuthenticated]);

  return (
    <div className="relative bg-gradient-to-r from-violet-100/30 via-transparent to-blue-100/30 dark:from-violet-950/30 dark:via-transparent dark:to-blue-950/30">
      <div className="relative px-4 py-16 md:py-24 lg:py-32 mx-auto max-w-7xl flex flex-col lg:flex-row items-center justify-between">
        <div className="flex-1 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="mb-6 text-4xl sm:text-5xl lg:text-6xl 2xl:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
              Crack Your Entrance Exam With Confidence
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="mb-8 text-lg md:text-xl text-gray-700 dark:text-gray-300">
              PREPZR provides personalized exam prep with AI-powered learning strategies, 
              focused concept mastery, and advanced performance analytics.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            {showAuthButtons ? (
              <>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white shadow-lg shadow-blue-600/20"
                  onClick={() => navigate('/signup')}
                >
                  7 Days Free Trial
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-blue-600 text-blue-600 hover:text-blue-700 hover:bg-blue-50 shadow-lg shadow-blue-600/10"
                  onClick={openExamAnalyzer}
                >
                  Exam Readiness Analyzer
                </Button>
              </>
            ) : (
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white shadow-lg shadow-blue-600/20"
                onClick={() => navigate('/dashboard/student')}
              >
                Go to Dashboard
              </Button>
            )}
            
            <Button
              size="lg"
              variant="ghost"
              className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
              onClick={scrollToFeatures}
            >
              See All Features
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex-1 mt-12 lg:mt-0 lg:ml-8"
        >
          {/* Hero image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full blur-3xl opacity-20"></div>
            <img
              src="https://fakeimg.pl/600x500?text=PREPZR+Dashboard&font=noto"
              alt="PREPZR Dashboard Preview"
              className="relative z-10 w-full h-auto rounded-2xl shadow-2xl"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
