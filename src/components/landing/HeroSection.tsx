import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, Sparkles, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeroMockup from './HeroMockup';

interface HeroSectionProps {
  scrollToFeatures: () => void;
  scrollToForWhom: () => void;
  openExamAnalyzer: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  scrollToFeatures, 
  scrollToForWhom,
  openExamAnalyzer
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  
  React.useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loggedIn);
    };
    
    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);
    
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-white dark:bg-gray-900 pt-16 md:pt-20 lg:pt-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Text */}
          <div className="text-center lg:text-left z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                Personalized Exam Preparation That Works
              </h1>
              
              <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0">
                PREPZR uses advanced AI to create personalized study plans aligned with individual learning styles, saving time and reducing anxiety.
              </p>
              
              <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
                {isLoggedIn ? (
                  <Button size="lg" asChild className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 text-lg rounded-xl">
                    <Link to="/dashboard/student">
                      Go to Dashboard
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 text-lg rounded-xl"
                      onClick={openExamAnalyzer}
                    >
                      <Sparkles className="mr-2 h-5 w-5" />
                      Exam Readiness Analyzer
                    </Button>
                    
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-gray-800 px-8 py-6 text-lg rounded-xl"
                      asChild
                    >
                      <Link to="/signup">
                        <Calendar className="mr-2 h-5 w-5" />
                        7 Days Free Trial
                      </Link>
                    </Button>
                  </>
                )}
              </div>
              
              <div className="mt-8">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Trusted by students preparing for NEET, JEE, and other competitive exams
                </span>
                
                {/* Trust Badges */}
                <div className="mt-4 flex flex-wrap gap-6 justify-center lg:justify-start">
                  {/* Trust badges would go here */}
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Hero Image/Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative z-10"
          >
            <HeroMockup />
          </motion.div>
        </div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        {/* Background elements would go here */}
      </div>
    </section>
  );
};

export default HeroSection;
