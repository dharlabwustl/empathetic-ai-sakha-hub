
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import ExamNamesBadge from '../home/hero/ExamNamesBadge';
import KpiStats from '../home/hero/feature-highlights/KpiStats';
import { ArrowRight, SparklesIcon } from 'lucide-react';

const HeroSection = () => {
  const { user } = useAuth();
  const [currentTagline, setCurrentTagline] = useState(0);
  const taglines = [
    "Ace your exams.",
    "Save time.",
    "Stress less.",
    "Study smarter."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-purple-100 via-white to-blue-100 dark:from-purple-900 dark:via-gray-900 dark:to-blue-900 py-20 md:py-28 lg:py-36 overflow-hidden">
      {/* Enhanced background with gradient overlay and animated particles */}
      <div className="absolute inset-0 bg-[url('/img/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-purple-300/50 to-blue-300/40 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/3 -left-48 w-96 h-96 bg-gradient-to-tr from-blue-300/50 to-purple-300/40 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter max-w-4xl mb-6 leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              अब तैयारी करो अपने तरीके से, सिर्फ PREPZR के साथ!
            </span>
            <span className="block text-gray-800 dark:text-white">
              We understand Your Mindset, Not Just the Exam.
            </span>
          </motion.h1>
          
          <div className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 h-8 flex items-center justify-center">
            <motion.span
              key={currentTagline}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="inline-block"
            >
              {taglines[currentTagline]}
            </motion.span>
            {currentTagline === taglines.length - 1 && (
              <motion.span
                className="ml-2 inline-block font-bold"
                initial={{ backgroundSize: '0% 100%' }}
                animate={{ 
                  backgroundSize: '100% 100%',
                  color: ["#8b5cf6", "#3b82f6", "#8b5cf6"],
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  backgroundSize: { duration: 1.2 },
                  color: { duration: 3, repeat: Infinity, repeatType: "reverse" },
                  scale: { duration: 3, repeat: Infinity, repeatType: "reverse" }
                }}
                style={{
                  backgroundImage: 'linear-gradient(to right, #8b5cf6, #3b82f6)',
                  backgroundRepeat: 'no-repeat',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent'
                }}
              >
                Crack your exams!
              </motion.span>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            {user ? (
              <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all group">
                <Link to="/dashboard/student" className="flex items-center">
                  <SparklesIcon size={18} className="mr-2" />
                  <span>Go to Dashboard</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="ml-2"
                  >
                    <ArrowRight size={18} />
                  </motion.div>
                </Link>
              </Button>
            ) : (
              <>
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all group"
                  onClick={() => {
                    const event = new CustomEvent('open-exam-analyzer');
                    window.dispatchEvent(event);
                  }}
                >
                  <Link to="#" className="flex items-center">
                    <SparklesIcon size={18} className="mr-2" />
                    <span>Test Your Exam Readiness</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-purple-200 hover:border-purple-300 hover:bg-purple-50 shadow-sm hover:shadow-lg transition-all dark:border-purple-800 dark:hover:border-purple-700 dark:hover:bg-purple-900/50">
                  <Link to="/signup" className="flex items-center">
                    7-Day Free Trial
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="ml-2"
                    >
                      <ArrowRight size={18} />
                    </motion.div>
                  </Link>
                </Button>
              </>
            )}
          </div>
          
          {/* Trusted by students section - enhanced */}
          <motion.div 
            className="mt-8 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/40 dark:to-blue-900/40 py-4 px-8 rounded-full border border-purple-200 dark:border-purple-700 shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <p className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-200">
              Trusted by students preparing for: 
              <span className="ml-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-sm">
                NEET Launched
              </span>
            </p>
          </motion.div>
          
          {/* Exam Names Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-6 mb-12 w-full max-w-5xl"
          >
            <ExamNamesBadge />
          </motion.div>
        </div>
        
        {/* Stats Section - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12"
        >
          <div className="max-w-7xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Smart Data. Real Impact. Humanizing exam prep.
            </h3>
            <KpiStats />
          </div>
        </motion.div>
      </div>
      
      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
          <path 
            fill="rgba(196, 181, 253, 0.1)" 
            fillOpacity="1" 
            d="M0,160L40,144C80,128,160,96,240,90.7C320,85,400,107,480,144C560,181,640,235,720,234.7C800,235,880,181,960,170.7C1040,160,1120,192,1200,197.3C1280,203,1360,181,1400,170.7L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z">
          </path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
